// Copyright 2017-2021 @neatcoin/apps-routing authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@polkadot/app-addresses';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: []
    },
    group: 'accounts',
    icon: 'address-card',
    name: 'addresses',
    text: t('nav.addresses', 'Address book', { ns: 'apps-routing' })
  };
}