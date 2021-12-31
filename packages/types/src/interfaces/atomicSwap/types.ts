// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Option, Struct, Vec } from '@polkadot/types-codec';
import type { ITuple } from '@polkadot/types-codec/types';
import type { AccountId, Balance, BlockNumber } from '@polkadot/types/interfaces/runtime';

/** @name BalanceSwapAction */
export interface BalanceSwapAction extends Struct {
  readonly value: Balance;
}

/** @name PendingSwap */
export interface PendingSwap extends Struct {
  readonly source: AccountId;
  readonly action: BalanceSwapAction;
  readonly endBlock: BlockNumber;
}

/** @name PendingSwapEntries */
export interface PendingSwapEntries extends Vec<ITuple<[Bytes, Option<PendingSwap>]>> {}

export type PHANTOM_ATOMICSWAP = 'atomicSwap';
