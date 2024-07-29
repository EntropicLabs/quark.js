import type { ConfigResponse as HubConfigResponse } from "../types/Hub.types";
import type { ConfigResponse as LiquifierConfigResponse } from "../types/Liquifier.types";
import type { ConfigResponse as UnifierConfigResponse } from "../types/Unifier.types";

import { fetchRegistry } from "@entropic-labs/registry-api";

const contracts = {
  hub: {
    codes: {
      "harpoon-4": [2850, 2852, 3498, 3595],
      "kaiyo-1": [378],
    },
    mapper: (address: string, config: unknown) => {
      const {
        ["fees"]: _,
        ["owner"]: __,
        ...newConfig
      } = config as HubConfigResponse;
      return newConfig;
    },
  },
  unifier: {
    codes: {
      "harpoon-4": [3599],
      "kaiyo-1": [331, 362],
    },
    mapper: (address: string, config: unknown) => {
      const {
        ["owner"]: _,
        ["fees"]: __,
        ["fin_multi_contract"]: ___,
        ["crank_window"]: ____,
        ...newConfig
      } = config as UnifierConfigResponse;

      return newConfig;
    },
  },
  liquifier: {
    codes: {
      "harpoon-4": [2892, 3500, 3600],
      "kaiyo-1": [330, 363],
    },
    mapper: (address: string, config: unknown) => {
      const { ["owner"]: __, ...newConfig } = config as LiquifierConfigResponse;
      return newConfig;
    },
  },
  icaController: {
    codes: {
      "harpoon-4": [],
      "kaiyo-1": [358],
    },
    mapper: (address: string, config: unknown) => {
      return config as LiquifierConfigResponse;
    },
  },
};

/**
 * Queries typed ontract data from a registry API
 * @param registryApiUrl URL for the registry api
 * @returns Typed unstake contract data
 */
export async function fetchContracts(registryApiUrl: string) {
  return fetchRegistry(registryApiUrl, contracts);
}
