// Copyright 2021 @neatcoin/apps authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { IconName } from '@fortawesome/fontawesome-svg-core';
import type { Routes } from '@neatcoin/apps-routing/types';

import React from 'react';

export interface ItemRoute {
  Modal?: React.ComponentType<any>;
  href?: string;
  icon: IconName;
  name: string;
  text: string;
  useCounter?: () => number | string | null;
}

export interface Group {
  name: string;
  routes: Routes;
}

export type Groups = Record<string, Group>;
