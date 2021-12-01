// Copyright 2021 @neatcoin/types authors & contributors
// SPDX-License-Identifier: GPL-3.0

/* eslint sort-keys: "off" */

export default {
  types: {
    NameHash: 'H256',
    DomainLabel: 'Vec<u8>',
    DomainName: 'Vec<DomainLabel>',
    RegistryOwnership: {
      _enum: {
        None: null,
        Root: null,
        FCFS: null,
        Account: 'AccountId'
      }
    },
    RegistryOwnershipEntries: 'Vec<(NameHash, Option<(DomainName, RegistryOwnership)>)>'
  }
};
