// Generated by dedot cli

import type { GenericSubstrateApi } from "dedot/types";
import type {
  GenericContractTx,
  GenericContractTxCall,
  ContractTxOptions,
  ContractSubmittableExtrinsic,
} from "dedot/contracts";

export interface ContractTx<ChainApi extends GenericSubstrateApi>
  extends GenericContractTx<ChainApi> {
  /**
   *
   * @param {string} content
   * @param {ContractTxOptions} options
   *
   * @selector 0xbc42c980
   **/
  addTodo: GenericContractTxCall<
    ChainApi,
    (
      content: string,
      options: ContractTxOptions,
    ) => ContractSubmittableExtrinsic<ChainApi>
  >;

  /**
   *
   * @param {bigint} id
   * @param {ContractTxOptions} options
   *
   * @selector 0x7561f746
   **/
  toggleTodo: GenericContractTxCall<
    ChainApi,
    (
      id: bigint,
      options: ContractTxOptions,
    ) => ContractSubmittableExtrinsic<ChainApi>
  >;
}
