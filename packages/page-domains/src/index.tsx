// Copyright 2021 @neatcoin/page-domains authors & contributors
// SPDX-License-Identifier: GPL-3.0

import React from 'react';

import App from './App';

interface Props {
  basePath: string;
  className?: string;
}

function Domains ({ basePath, className }: Props): React.ReactElement<Props> {
  return (
    <App
      basePath={basePath}
      className={className}
    />
  );
}

export default React.memo(Domains);
