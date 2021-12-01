// Copyright 2021 @neatcoin/apps-config authors & contributors
// SPDX-License-Identifier: GPL-3.0

export interface Option {
  info?: string;
  isDisabled?: boolean;
  isHeader?: boolean;
  text: React.ReactNode;
  value: string | number;
}

export interface LinkOption extends Option {
  dnslink?: string;
  genesisHash?: string;
  genesisHashRelay?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  isSpaced?: boolean;
  isLightClient?: boolean;
  linked?: LinkOption[];
  paraId?: number;
  textBy: string;
}
