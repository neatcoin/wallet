// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

/* eslint sort-keys: ["error", "asc", { caseSensitive: false }] */

import { sanitize } from './util';

// The mapping here is done on the actual chain name (system.chain RPC) or
// the actual RPC node it is corrected to (system.name RPC)

// defaults
const emptyColor = '#99999';

// based on chain name
// alphabetical

// based on node name
// alphabetical

// based on the spec name

export { emptyColor };

// Alphabetical overrides based on the actual matched chain name
// NOTE: This is as retrieved via the system.chain RPC
export const chainColors: Record<string, string> = Object.entries({

} as Record<string, string>).reduce<Record<string, string>>((colors, [chain, color]) => ({
  ...colors,
  [sanitize(chain)]: color
}), {});

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via the system.name RPC
export const nodeColors: Record<string, string> = Object.entries({

} as Record<string, string>).reduce<Record<string, string>>((colors, [node, color]) => ({
  ...colors,
  [sanitize(node)]: color
}), {});

// Alphabetical overrides based on the actual software node type
// NOTE: This is as retrieved via the system.name RPC
export const specColors: Record<string, string> = Object.entries({

} as Record<string, string>).reduce<Record<string, string>>((colors, [spec, color]) => ({
  ...colors,
  [sanitize(spec)]: color
}), {});
