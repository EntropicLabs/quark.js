import { fetchContracts } from "../src/registry/contracts";
import "dotenv/config";
import { config } from "dotenv";
config({ path: __dirname + "/.env" });

const contractData = await fetchContracts(
  process.env["REGISTRY-API-URL"] || ""
);

const outputDir = "src/registry";

await writeContractToJson(
  JSON.stringify(contractData.hub, null, 4),
  outputDir,
  "hub"
);
await writeContractToJson(
  JSON.stringify(contractData.liquifier, null, 4),
  outputDir,
  "liquifier"
);
await writeContractToJson(
  JSON.stringify(contractData.icaController, null, 4),
  outputDir,
  "icaController"
);
await writeContractToJson(
  JSON.stringify(contractData.unifier, null, 4),
  outputDir,
  "unifier"
);

async function writeContractToJson(
  contractData: any,
  outputDir: string,
  contractName: string
) {
  const output = `${outputDir}/${contractName}.ts`;
  const data = `
      import type { Registry } from ".";
      const registry = ${contractData};
      const typedRegistry: Registry<typeof registry> = registry;
      export default typedRegistry;
      `.trim();
  await Bun.write(output, data);
}
