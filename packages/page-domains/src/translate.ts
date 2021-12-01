// Copyright 2021 @neatcoin/page-domains authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { UseTranslationResponse } from 'react-i18next';

import { useTranslation as useTranslationBase } from 'react-i18next';

export function useTranslation (): UseTranslationResponse<'page-domains', undefined> {
  return useTranslationBase('page-domains');
}
