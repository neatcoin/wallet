// Copyright 2021 @neatcoin/types authors & contributors
// SPDX-License-Identifier: GPL-3.0

/* eslint sort-keys: "off" */

export default {
  types: {
    BalanceSwapAction: { value: 'Balance' },
    PendingSwap: {
      source: 'AccountId',
      action: 'BalanceSwapAction',
      endBlock: 'BlockNumber'
    },
    PendingSwapEntries: 'Vec<(Vec<u8>, Option<PendingSwap>)>'
  }
};
