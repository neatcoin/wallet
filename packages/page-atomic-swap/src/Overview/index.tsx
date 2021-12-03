// Copyright 2021 @neatcoin/page-atomic-swap authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { PendingSwap, PendingSwapEntries } from '@neatcoin/types/interfaces';
import React from 'react';

import { AddressSmall, Button, CardSummary, Spinner, SummaryBox, Table } from '@polkadot/react-components';
import { useApi, useEventTrigger, useMapEntries } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { Bytes, Option } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';

import { useTranslation } from '../translate';
import Claim from './Claim';
import Declare from './Declare';

interface Props {
  className?: string;
}

function usePendingSwapEntries (): PendingSwapEntries | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.atomicSwap.NewSwap, api.events.atomicSwap.SwapClaimed]);

  return useMapEntries(api.query.atomicSwap.pendingSwaps, { at: trigger.blockHash });
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const pendingSwaps = usePendingSwapEntries();

  return (
    <div className={className}>
      <SummaryBox>
        <section>
          <CardSummary label={t<string>('Pending count')}>
            {pendingSwaps ? pendingSwaps.length : <Spinner noLabel />}
          </CardSummary>
        </section>
        <Button.Group>
          <Declare type='initiator' />
          <Declare type='counterparty' />
        </Button.Group>
      </SummaryBox>
      <Table
        empty={t<string>('No pending atomic swap.')}
        header={[[t('Pending swaps'), 'start', 2], [t('sender'), 'expand'], [(t('receiver'))], [t('end block')], [t('value')], [t('claim')]]}
      >
        {(pendingSwaps || []).map((entry: ITuple<[Bytes, Option<PendingSwap>]>): React.ReactNode | null => {
          const secretHash = '0x' + Buffer.from(entry[0].slice(-32)).toString('hex');
          const receiver = '0x' + Buffer.from(entry[0].slice(-80, -48)).toString('hex');

          if (entry[1].isSome) {
            const value = entry[1].unwrap();
            const source = value.source;
            const action = value.action;
            const endBlock = value.endBlock;

            return (<tr key={source.toString() + ':' + secretHash.toString()}>
              <td>{secretHash}</td>
              <td className='expand all'></td>
              <td className='address'><AddressSmall value={source} /></td>
              <td className='address'><AddressSmall value={receiver} /></td>
              <td>{endBlock.toString()}</td>
              <td><FormatBalance value={action.value} /></td>
              <td>
                <Claim
                  account={receiver}
                  secretHash={secretHash}
                  value={action.value}
                />
              </td>
            </tr>);
          } else {
            return null;
          }
        })}
      </Table>
    </div>
  );
}

export default React.memo(Overview);
