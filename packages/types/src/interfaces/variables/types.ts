// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bool, Enum, U128, U32, U64 } from '@polkadot/types';

/** @name VariableValue */
export interface VariableValue extends Enum {
  readonly isU32: boolean;
  readonly asU32: U32;
  readonly isU64: boolean;
  readonly asU64: U64;
  readonly isU128: boolean;
  readonly asU128: U128;
  readonly isBool: boolean;
  readonly asBool: Bool;
}

export type PHANTOM_VARIABLES = 'variables';
