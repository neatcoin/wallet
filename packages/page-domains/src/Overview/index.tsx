// Copyright 2021 @neatcoin/page-domains authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { Option } from '@polkadot/types';
import type { ITuple } from '@polkadot/types/types';
import type { ComponentProps as Props } from '../types';

import { DomainName, NameHash, RegistryOwnership, RegistryOwnershipEntries } from '@neatcoin/types/interfaces';
import React from 'react';

import { AddressSmall, Button, CardSummary, Spinner, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useEventTrigger, useMapEntries } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';
import Register from './Register';

function hexToName (hex: string): string {
  let ret = '';

  for (let c = 2; c < hex.length; c += 2) {
    ret += String.fromCharCode(parseInt(hex.substr(c, 2), 16));
  }

  return ret;
}

function nameToString (name: DomainName): string {
  let ret = '';

  for (let i = 0; i < name.length; i++) {
    if (ret === '') {
      ret = hexToName(name[i].toString());
    } else {
      ret = hexToName(name[i].toString()) + '.' + ret;
    }
  }

  if (ret === '') {
    return '[root]';
  } else {
    return ret;
  }
}

function useOwnershipEntries (): RegistryOwnershipEntries | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.registry.OwnershipSet]);

  return useMapEntries(api.query.registry.ownerships, { at: trigger.blockHash });
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const ownerships = useOwnershipEntries();

  return (
    <div className={className}>
      <SummaryBox>
        <section>
          <CardSummary label={t<string>('Domain count')}>
            {ownerships ? ownerships.length : <Spinner noLabel />}
          </CardSummary>
        </section>
        <Button.Group>
          <Register />
        </Button.Group>
      </SummaryBox>
      <Table
        empty={!ownerships}
        header={[[t('Registered domains'), 'start', 2], [t('type'), 'expand'], [t('current owner')]]}
      >
        {(ownerships || []).map((entry: ITuple<[NameHash, Option<ITuple<[DomainName, RegistryOwnership]>>]>): React.ReactNode | null => {
          const namehash = entry[0];
          const value = entry[1];

          if (value.isSome) {
            const name = value.unwrap()[0];
            const ownership = value.unwrap()[1];

            if (ownership.isAccount || ownership.isFCFS || ownership.isRoot) {
              return (<tr key={namehash.toString()}>
                <td>{nameToString(name)}</td>
                <td className='expand all'></td>
                {(() => {
                  if (ownership.isAccount) {
                    return <td>Account</td>;
                  } else if (ownership.isFCFS) {
                    return <td>FCFS top-level</td>;
                  } else if (ownership.isRoot) {
                    return <td>External / ICANN</td>;
                  } else {
                    return <td>Other</td>;
                  }
                })()}
                {(() => {
                  if (ownership.isAccount) {
                    return (
                      <td className='address'><AddressSmall value={ownership.asAccount} /></td>
                    );
                  } else {
                    return <td className='address'><AddressSmall value={null} /></td>;
                  }
                })()}
              </tr>);
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
