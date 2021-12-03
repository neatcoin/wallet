// Copyright 2021 @neatcoin/page-atomic-swap authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { PendingSwap, PendingSwapEntries } from '@neatcoin/types/interfaces';
import React from 'react';

import { AddressSmall, Table } from '@polkadot/react-components';
import { useApi, useEventTrigger, useMapEntries } from '@polkadot/react-hooks';
import { FormatBalance } from '@polkadot/react-query';
import { Bytes, Option } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
}

function usePendingSwapEntries (): PendingSwapEntries | undefined {
  const { api } = useApi();
  const trigger = useEventTrigger([api.events.atomicSwap.NewSwap]);

  return useMapEntries(api.query.atomicSwap.pendingSwaps, { at: trigger.blockHash });
}

function Overview ({ className = '' }: Props): React.ReactElement<Props> {
  const { t } = useTranslation();
  const pendingSwaps = usePendingSwapEntries();

  return (
    <div className={className}>
      <Table
        empty={!pendingSwaps}
        header={[[t('Pending swaps'), 'start', 2], [t('initiator'), 'expand'], [t('end block')], [t('value')]]}
      >
        {(pendingSwaps || []).map((entry: ITuple<[Bytes, Option<PendingSwap>]>): React.ReactNode | null => {
          const secretHash = '0x' + Buffer.from(entry[0].slice(-32)).toString('hex');

          if (entry[1].isSome) {
            const value = entry[1].unwrap();
            const source = value.source;
            const action = value.action;
            const endBlock = value.endBlock;

            console.log(action);

            return (<tr key={source.toString() + ':' + secretHash.toString()}>
              <td>{secretHash}</td>
              <td className='expand all'></td>
              <td className='address'><AddressSmall value={source} /></td>
              <td>{endBlock.toString()}</td>
              <td><FormatBalance value={action.value} /></td>
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
