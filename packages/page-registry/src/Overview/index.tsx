// Copyright 2021 @neatcoin/page-registry authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { Option } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { ComponentProps as Props } from '../types';

import { DomainName, NameHash, RegistryOwnership, RegistryOwnershipEntries } from '@neatcoin/types/interfaces';
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

  const ownerships = useCall<RegistryOwnershipEntries>(api.query.registry.ownerships.entries);

  return (
    <div className={className}>
      <SummaryBox>
        <section>
          <CardSummary label={t<string>('Domain count')}>
            {ownerships ? ownerships.length : <Spinner noLabel />}
          </CardSummary>
        </section>
      </SummaryBox>
      <Table
        empty={!ownerships}
        header={[[t('Registered domains'), 'start', 2], [t('current owner'), 'expand']]}
      >
        {(ownerships || []).map((entry: ITuple<[NameHash, Option<ITuple<[DomainName, RegistryOwnership]>>]>): React.ReactNode | null => {
          const namehash = entry[0];
          const value = entry[1];

          if (value.isSome) {
            const name = value.unwrap()[0];
            const ownership = value.unwrap()[1];

            if (ownership.isAccount) {
              return (
                <tr key={namehash.toString()}>
                  <td>{nameToString(JSON.parse(name.toString()) as string[])}</td>
                  <td className='expand all'></td>
                  <td className='address'><AddressSmall value={ownership.asAccount} /></td>
                </tr>
              );
            } else {
              return null;
            }
          } else {
            return null;
          }
        })}
      </Table>
    </div>
  );
}

export default React.memo(Overview);
