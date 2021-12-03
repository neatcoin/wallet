// Copyright 2021 @neatcoin/page-atomic-swap authors & contributors
// SPDX-License-Identifier: GPL-3.0

import React from 'react';

interface Props {
  className?: string;
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  return (
    <div className={className}>
      HelpOverlay, world!
    </div>
  );
}

export default React.memo(Overview);
