// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { checkEndpoints } from './util';

describe('--SLOW--: check configured chain endpoints', (): void => {
  checkEndpoints('./.github/chain-endpoints.md', [
    'No DNS entry for',
    'Timeout connecting to'
  ]);
});
