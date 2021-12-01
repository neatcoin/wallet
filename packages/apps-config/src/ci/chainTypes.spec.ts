// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { checkEndpoints } from './util';

describe('--SLOW--: check configured chain types', (): void => {
  checkEndpoints('./.github/chain-types.md', [
    'Cannot construct unknown type'
  ]);
});
