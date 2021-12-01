// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

export function sanitize (value?: string): string {
  return value?.toLowerCase().replace(/-/g, ' ') || '';
}
