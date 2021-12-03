// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { expandEndpoints } from './util';

/* eslint-disable sort-keys */

// The available endpoints that will show in the dropdown. For the most part (with the exception of
// Polkadot) we try to keep this to live chains only, with RPCs hosted by the community/chain vendor
//   info: The chain logo name as defined in ../ui/logos/index.ts in namedLogos (this also needs to align with @polkadot/networks)
//   text: The text to display on the dropdown
//   value: The actual hosted secure websocket endpoint

// alphabetical based on chain name
export function createProduction (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [
    {
      info: 'neatcoin',
      text: t('rpc.prod.neatcoin', 'Neatcoin', { ns: 'apps-config' }),
      providers: {
        Neatcoin: 'wss://rpc.neatcoin.org/ws'
      }
    }
  ], firstOnly, withSort);
}

export function createProductionKulupu (t: TFunction, firstOnly: boolean, withSort: boolean): LinkOption[] {
  return expandEndpoints(t, [
    {
      dnslink: 'kulupu',
      info: 'kulupu',
      text: t('rpc.prod.kulupu', 'Kulupu', { ns: 'apps-config' }),
      providers: {
        Kulupu: 'wss://rpc.kulupu.corepaper.org/ws'
      }
    }
  ], firstOnly, withSort);
}