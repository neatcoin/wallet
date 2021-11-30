// Copyright 2021 @neatcoin/page-registry authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { ComponentProps as Props } from '../types';

import React from 'react';

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      <p>Hello, world!</p>
    </div>
  );
}

export default React.memo(Overview);
