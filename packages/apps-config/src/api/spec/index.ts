// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

import neatcoin from './neatcoin';

// NOTE: The mapping is done from specName in state.getRuntimeVersion
const spec: Record<string, OverrideBundleDefinition> = {
  neatcoin,
  vodka: neatcoin
};

export default spec;
