// Copyright 2021 @neatcoin/page-domains authors & contributors
// SPDX-License-Identifier: GPL-3.0

import React, { useMemo } from 'react';
import { Route, Switch } from 'react-router';

import { Tabs } from '@polkadot/react-components';

import Overview from './Overview';
import { useTranslation } from './translate';

interface Props {
  basePath: string;
  className?: string;
}

function DomainsApp ({ basePath, className }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();

  const items = useMemo(() => [
    {
      isRoot: true,
      name: 'overview',
      text: t<string>('Overview')
    }
  ], [t]);

  return (
    <main className={className}>
      <Tabs
        basePath={basePath}
        items={items}
      />
      <Switch>
        <Route path={basePath}>
          <Overview />
        </Route>
      </Switch>
    </main>
  );
}

export default React.memo(DomainsApp);
