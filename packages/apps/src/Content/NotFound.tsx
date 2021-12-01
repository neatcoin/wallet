// Copyright 2021 @neatcoin/apps authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { RouteProps } from '@neatcoin/apps-routing/types';

import React from 'react';
import { Redirect } from 'react-router';

interface Props extends RouteProps {
  missingApis?: (string | string[])[];
}

function NotFound ({ basePath, missingApis = [] }: Props): React.ReactElement {
  console.log(`Redirecting from route "${basePath}" to "/explorer"${missingApis.length ? `, missing the following APIs: ${JSON.stringify(missingApis)}` : ''}`);

  return (
    <Redirect to='/explorer' />
  );
}

export default React.memo(NotFound);
