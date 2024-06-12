import { RpcClient } from '../node_modules/cosmes/src/client';
import { utf8 } from '../node_modules/cosmes/src/codec';
import { CosmwasmWasmV1QueryContractsByCodeService as QueryContractsByCodeService, CosmwasmWasmV1QuerySmartContractStateService as QuerySmartContractStateService } from '../node_modules/cosmes/src/protobufs';

import { ConfigResponse as HubConfigResponse } from '../src/types/Hub.types';
import { ConfigResponse as LiquifierConfigResponse } from '../src/types/Liquifier.types';
import { ConfigResponse as UnifierConfigResponse } from '../src/types/Unifier.types';


type NETWORK = 'harpoon-4' | 'kaiyo-1';
type Codes = {
    [K in NETWORK]: {
        [contract: string]: number[];
    }
}

const codesFile = Bun.file("src/registry/codes.json");
const outputDir = "src/registry";

const endpoints: { [K in NETWORK]: string } = {
    "harpoon-4": "https://test-rpc-kujira.mintthemoon.xyz/",
    "kaiyo-1": "https://rpc.cosmos.directory/kujira/"
}

const mappers: { [contract: string]: ((any) => any) | undefined } = {
    hub: (config: HubConfigResponse) => {
        delete config.fees;
        delete config.owner;
        delete config.adapter;
        return config;
    },
    unifier: (config: UnifierConfigResponse) => {
        delete config.fees;
        delete config.owner;
        delete config.fin_multi_contract;
        delete config.crank_window;
        return config;
    },
    liquifier: (config: LiquifierConfigResponse) => {
        delete config.owner;
        return config;
    }
}

async function main() {
    const allCodes: Codes = JSON.parse(await codesFile.text());

    const data: { [K in NETWORK]: {
        [contract: string]: {
            [address: string]: any[]
        }
    } } = {
        "harpoon-4": {},
        "kaiyo-1": {},
    }

    for (const network in allCodes) {
        console.log(`Fetching data for ${network}...`);
        const contractsQuery = RpcClient.newBatchQuery(endpoints[network as NETWORK]);
        const configsQuery = RpcClient.newBatchQuery(endpoints[network as NETWORK]);

        const codes = allCodes[network as NETWORK];
        for (const contract in codes) {
            for (const codeId of codes[contract]) {
                contractsQuery.add(QueryContractsByCodeService, { codeId: BigInt(codeId) }, (err, res) => {
                    if (err) {
                        console.error(err);
                        process.exit(1);
                    }
                    console.log(`Contract: ${contract} on ${network} has ${res.contracts.length} instances`);

                    for (const addr of res.contracts) {
                        configsQuery.add(QuerySmartContractStateService, { address: addr, queryData: utf8.decode(JSON.stringify({ config: {} })) }, (err, res) => {
                            if (err) {
                                console.error(err);
                                process.exit(1);
                            }
                            if (!data[network as NETWORK][contract]) {
                                data[network as NETWORK][contract] = {};
                            }

                            let config = JSON.parse(utf8.encode(res.data));
                            if (mappers[contract]) {
                                config = mappers[contract](config);
                            }

                            data[network as NETWORK][contract][addr] = config;
                        });
                    }
                });
            }
        }

        await contractsQuery.send();
        await configsQuery.send();
    }

    const byContractData: { [contract: string]: { [network in NETWORK]: { [address: string]: any } } } = {};
    for (const network in data) {
        for (const contract in data[network as NETWORK]) {
            if (!byContractData[contract]) {
                byContractData[contract] = {
                    "harpoon-4": {},
                    "kaiyo-1": {}
                };
            }

            byContractData[contract][network as NETWORK] = data[network as NETWORK][contract];
        }
    }

    for (const contract in byContractData) {
        const output = `${outputDir}/${contract}.ts`;
        const data = `
import type { Registry } from ".";
const registry = ${JSON.stringify(byContractData[contract], null, 4)};
const typedRegistry: Registry<typeof registry> = registry;
export default typedRegistry;
`.trim();
        console.log(`Writing ${output}...`);
        await Bun.write(output, data);
    }

    console.log("Done!");
}


main().catch(console.error).finally(() => process.exit(0));