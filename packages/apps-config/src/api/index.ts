// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { OverrideBundleType } from '@polkadot/types/types';

import typesChain from './chain';
import spec from './spec';

export * from './constants';
export * from './params';

export function getChainTypes (_specName: string, chainName: string): Record<string, string | Record<string, unknown>> {
  return {
    ...(typesChain[chainName as keyof typeof typesChain] || {})
  };
}

export const typesBundle: OverrideBundleType = { spec };

export { typesChain };
