// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type BN from 'bn.js';

export type LinkTypes = 'address' | 'block' | 'bounty' | 'council' | 'extrinsic' | 'proposal' | 'referendum' | 'techcomm' | 'tip' | 'treasury';

export interface ExternalDef {
  chains: Record<string, string>;
  isActive: boolean;
  logo: string;
  paths: Partial<Record<LinkTypes, string>>;
  url: string;
  create: (chain: string, path: string, data: BN | number | string, hash?: string) => string;
}
