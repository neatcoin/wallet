// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { TFunction } from 'i18next';
import type { LinkOption } from './types';

import { createCustom, createDev, createOwn } from './development';
import { createProduction, createProductionKulupu } from './production';
import { createTesting } from './testing';

export { CUSTOM_ENDPOINT_KEY } from './development';

export function createWsEndpoints (t: TFunction, firstOnly = false, withSort = true): LinkOption[] {
  return [
    ...createCustom(t),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.live', 'Neatcoin networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createProduction(t, firstOnly, withSort),
    ...createTesting(t, firstOnly, withSort),
    {
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.live', 'Kulupu networks', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createProductionKulupu(t, firstOnly, withSort),
    {
      isDevelopment: true,
      isDisabled: false,
      isHeader: true,
      isSpaced: true,
      text: t('rpc.header.dev', 'Development', { ns: 'apps-config' }),
      textBy: '',
      value: ''
    },
    ...createDev(t),
    ...createOwn(t)
  ].filter(({ isDisabled }) => !isDisabled);
}
