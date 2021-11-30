// Copyright 2017-2021 @neatcoin/apps-routing authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { Route } from './types';

import Component from '@neatcoin/page-registry';

export default function create (t: TFunction): Route {
  return {
    Component,
    display: {
      needsApi: ['query.registry.ownerships']
    },
    group: 'domains',
    icon: 'podcast',
    name: 'registry',
    text: t('nav.registry', 'Registry', { ns: 'apps-routing' })
  };
}
