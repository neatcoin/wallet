// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Option, Vec } from '@polkadot/types';
  import type { AccountId, H256 } from '@polkadot/types/interfaces/runtime';
  import type { ITuple } from '@polkadot/types/types';

/** @name DomainLabel */
export interface DomainLabel extends Bytes {}

/** @name DomainName */
export interface DomainName extends Vec<DomainLabel> {}

/** @name NameHash */
export interface NameHash extends H256 {}

/** @name RegistryOwnership */
export interface RegistryOwnership extends Enum {
  readonly isNone: boolean;
  readonly isRoot: boolean;
  readonly isFcfs: boolean;
  readonly isAccount: boolean;
  readonly asAccount: AccountId;
}

/** @name RegistryOwnershipEntries */
export interface RegistryOwnershipEntries extends Vec<ITuple<[NameHash, Option<ITuple<[DomainName, RegistryOwnership]>>]>> {}

export type PHANTOM_NOMO = 'nomo';
