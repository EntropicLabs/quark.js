/**
* This file was automatically generated by @cosmwasm/ts-codegen@0.34.2.
* DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
* and run the @cosmwasm/ts-codegen generate command to regenerate this file.
*/

import { Decimal, Addr, AdapterOptions, Duration, Denom, InstantiateMsg, ExecuteMsg, CallbackData, CallbackData1, CallbackData2, AdapterUpdate, Uint128, CallbackData3, Binary, BondMsg, UnbondMsg, WithdrawMsg, CallbackMsg, QueryMsg, BatchStatus, Expiration, Timestamp, Uint64, BatchAdapterMeta, AllBatchesResponse, BatchInfo, ConfigResponse, PendingWithdrawalsResponse, WithdrawalInfo } from "./Hub.types";
import { CamelCasedProperties } from "type-fest";
export abstract class HubExecuteMsgBuilder {
  static bond = ({
    callback
  }: CamelCasedProperties<Extract<ExecuteMsg, {
    bond: unknown;
  }>["bond"]>): ExecuteMsg => {
    return {
      bond: ({
        callback
      } as const)
    };
  };
  static unbond = ({
    callback,
    recipient
  }: CamelCasedProperties<Extract<ExecuteMsg, {
    unbond: unknown;
  }>["unbond"]>): ExecuteMsg => {
    return {
      unbond: ({
        callback,
        recipient
      } as const)
    };
  };
  static withdraw = ({
    callback,
    recipient
  }: CamelCasedProperties<Extract<ExecuteMsg, {
    withdraw: unknown;
  }>["withdraw"]>): ExecuteMsg => {
    return {
      withdraw: ({
        callback,
        recipient
      } as const)
    };
  };
  static crank = (): ExecuteMsg => {
    return {
      crank: ({} as const)
    };
  };
  static updateConfig = ({
    adapter,
    fees,
    owner,
    rewardsContract,
    unbondMinInterval
  }: CamelCasedProperties<Extract<ExecuteMsg, {
    update_config: unknown;
  }>["update_config"]>): ExecuteMsg => {
    return {
      update_config: ({
        adapter,
        fees,
        owner,
        rewards_contract: rewardsContract,
        unbond_min_interval: unbondMinInterval
      } as const)
    };
  };
  static callback = ({
    callback,
    data
  }: CamelCasedProperties<Extract<ExecuteMsg, {
    callback: unknown;
  }>["callback"]>): ExecuteMsg => {
    return {
      callback: ({
        callback,
        data
      } as const)
    };
  };
}
export abstract class HubQueryMsgBuilder {
  static config = (): QueryMsg => {
    return {
      config: ({} as const)
    };
  };
  static pendingWithdrawals = ({
    address
  }: CamelCasedProperties<Extract<QueryMsg, {
    pending_withdrawals: unknown;
  }>["pending_withdrawals"]>): QueryMsg => {
    return {
      pending_withdrawals: ({
        address
      } as const)
    };
  };
  static allBatches = (): QueryMsg => {
    return {
      all_batches: ({} as const)
    };
  };
  static rewardsStateDump = (): QueryMsg => {
    return {
      rewards_state_dump: ({} as const)
    };
  };
}