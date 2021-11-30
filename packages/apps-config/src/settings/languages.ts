// Copyright 2017-2021 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { TFunction } from 'i18next';
import type { Option } from './types';

export function createLanguages (t: TFunction): Option[] {
  return [
    {
      text: t('lng.detect', 'Default browser language (auto-detect)', { ns: 'apps-config' }),
      value: 'default'
    },
    // default/native
    {
      text: 'English',
      value: 'en'
    }
  ];
}
