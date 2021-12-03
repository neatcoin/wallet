// Copyright 2017-2021 @neatcoin/apps-routing authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@neatcoin/page-atomic-swap';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: ['query.atomicSwap.pendingSwaps']
    },
    group: 'accounts',
    icon: 'anchor',
    name: 'atomic-swap',
    text: t('nav.atomic-swap', 'Atomic Swap', { ns: 'apps-routing' })
  };
}
