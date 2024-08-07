// Generated by dedot cli

import type { GenericSubstrateApi } from "dedot/types";
import type { Result, AccountId32Like } from "dedot/codecs";
import type {
  GenericContractQuery,
  GenericContractQueryCall,
  ContractCallOptions,
  GenericContractCallResult,
  ContractCallResult,
} from "dedot/contracts";
import type { InkPrimitivesLangError, TodoAppTodo } from "./types";

export interface ContractQuery<ChainApi extends GenericSubstrateApi>
  extends GenericContractQuery<ChainApi> {
  /**
   *
   * @param {string} content
   * @param {ContractCallOptions} options
   *
   * @selector 0xbc42c980
   **/
  addTodo: GenericContractQueryCall<
    ChainApi,
    (
      content: string,
      options: ContractCallOptions,
    ) => Promise<GenericContractCallResult<[], ContractCallResult<ChainApi>>>
  >;

  /**
   *
   * @param {bigint} id
   * @param {ContractCallOptions} options
   *
   * @selector 0x7561f746
   **/
  toggleTodo: GenericContractQueryCall<
    ChainApi,
    (
      id: bigint,
      options: ContractCallOptions,
    ) => Promise<
      GenericContractCallResult<boolean, ContractCallResult<ChainApi>>
    >
  >;

  /**
   *
   * @param {bigint} id
   * @param {ContractCallOptions} options
   *
   * @selector 0x770698cf
   **/
  getTodo: GenericContractQueryCall<
    ChainApi,
    (
      id: bigint,
      options: ContractCallOptions,
    ) => Promise<
      GenericContractCallResult<
        TodoAppTodo | undefined,
        ContractCallResult<ChainApi>
      >
    >
  >;

  /**
   *
   * @param {AccountId32Like} accountId
   * @param {ContractCallOptions} options
   *
   * @selector 0x8100e7b8
   **/
  getCounter: GenericContractQueryCall<
    ChainApi,
    (
      accountId: AccountId32Like,
      options: ContractCallOptions,
    ) => Promise<
      GenericContractCallResult<bigint, ContractCallResult<ChainApi>>
    >
  >;
}
