// Copyright 2017-2021 @neatcoin/apps-routing authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-storage';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'developer',
    icon: 'database',
    name: 'chainstate',
    text: t('nav.storage', 'Chain state', { ns: 'apps-routing' })
  };
}
