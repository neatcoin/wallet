// Copyright 2021 @neatcoin/page-registry authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { ComponentProps as Props } from '../types';

import React from 'react';

import { AddressSmall, CardSummary, Spinner, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useCall } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

function hexToName (hex: string): string {
  let ret = '';

  for (let c = 2; c < hex.length; c += 2) {
    ret += String.fromCharCode(parseInt(hex.substr(c, 2), 16));
  }

  return ret;
}

function nameToString (name: string[]): string {
  let ret = '';

  for (let i = 0; i < name.length; i++) {
    if (ret === '') {
      ret = hexToName(name[i]);
    } else {
      ret = hexToName(name[i]) + '.' + ret;
    }
  }

  if (ret === '') {
    return '[root]';
  } else {
    return ret;
  }
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const { api } = useApi();

  const ownerships = useCall<unknown>(api.query.registry.ownerships.entries);

  return (
    <div className={className}>
      <SummaryBox>
        <section>
          <CardSummary label={t('Domain count')}>
            {ownerships ? ownerships.length : <Spinner noLabel />}
          </CardSummary>
        </section>
      </SummaryBox>
      <Table
        empty={!ownerships}
        header={[[t('Registered domains'), 'start', 2], [t('current owner'), 'expand']]}
      >
        {(ownerships || []).map(([namehash, valueRaw]): React.ReactNode => {
          const value = JSON.parse(valueRaw.toString());
          const name = value[0];
          const ownership = value[1];

          if (ownership.account) {
            return (
              <tr key={namehash.toString()}>
                <td>{nameToString(name)}</td>
                <td className='expand all'></td>
                <td className='address'><AddressSmall value={ownership.account} /></td>
              </tr>
            );
          }
        })}
      </Table>
    </div>
  );
}

export default React.memo(Overview);
