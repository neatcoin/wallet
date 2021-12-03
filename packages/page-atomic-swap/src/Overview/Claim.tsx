// Copyright 2021 @neatcoin/page-atomic-swap authors & contributors
// SPDX-License-Identifier: GPL-3.0

import React, { useState } from 'react';

import { AddressSmall, Button, Input, InputBalance, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useModal } from '@polkadot/react-hooks';
import { AccountId } from '@polkadot/types/interfaces/runtime';
import { blake2AsHex } from '@polkadot/util-crypto';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  account: AccountId | string;
  secretHash: string;
  value: unknown;
}

function Claim ({ account, className = '', secretHash, value }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { isOpen, onClose, onOpen } = useModal();

  const [secret, setSecret] = useState<string>('');

  return (
    <>
      {isOpen && (
        <Modal
          header={t<string>('Claim a swap')}
          onClose={onClose}
        >
          <Modal.Content>
            <AddressSmall
              className='disabledLook'
              help={t<string>('The claim account.')}
              label={t<string>('claim account')}
              type='account'
              value={account}
            />
            <Input
              className='medium'
              help={t<string>('Secret for the atomic swap.')}
              label={t<string>('secret')}
              onChange={setSecret}
              value={secret}
            />
            <Input
              className='disabledLook'
              help={t<string>('Secret hash gave to the counterparty.')}
              label={t<string>('secret hash')}
              value={secretHash}
            />
            <InputBalance
              className='disabledLook'
              help={t<string>('Value to send to the other party.')}
              label={t<string>('value')}
              value={value}
            />
          </Modal.Content>
          <Modal.Actions>
            <TxButton
              accountId={account}
              isDisabled={blake2AsHex(secret) !== secretHash}
              onStart={onClose}
              params={[secret, { value }]}
              tx={api.tx.atomicSwap.claimSwap}
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        label={t<string>('Claim')}
        onClick={onOpen}
      />
    </>
  );
}

export default React.memo(Claim);
