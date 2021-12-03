// Copyright 2021 @neatcoin/page-atomic-swap authors & contributors
// SPDX-License-Identifier: GPL-3.0

import React, { useState } from 'react';

import { Button, Input, InputAddress, InputBalance, InputNumber, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useModal } from '@polkadot/react-hooks';
import { blake2AsHex } from '@polkadot/util-crypto';

import { useTranslation } from '../translate';

interface Props {
  className?: string;
  type: 'initiator' | 'counterparty';
}

function Declare ({ className = '', type }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { isOpen, onClose, onOpen } = useModal();

  const [secretOrHash, setSecretOrHash] = useState<string>('');
  const [source, setSource] = useState<string | null>(null);
  const [target, setTarget] = useState<string | null>(null);
  const [value, setValue] = useState(null);
  const [duration, setDuration] = useState(null);

  return (
    <>
      {isOpen && (
        <Modal
          header={t<string>('Declare as ' + type)}
          onClose={onClose}
        >
          <Modal.Content>
            <InputAddress
              help={t<string>('Select the sender account.')}
              label={t<string>('sender account')}
              onChange={setSource}
              type='account'
              withLabel
            />
            <InputAddress
              help={t<string>('Select the receiver account.')}
              label={t<string>('receiver account')}
              onChange={setTarget}
              type='account'
              withLabel
            />
            {type === 'initiator'
              ? <>
                <Input
                  className='medium'
                  help={t<string>('Secret for the atomic swap.')}
                  label={t<string>('secret')}
                  onChange={setSecretOrHash}
                  value={secretOrHash}
                />
                <Input
                  className='disabledLook'
                  help={t<string>('Secret hash to give to the counterparty.')}
                  label={t<string>('secret hash')}
                  value={blake2AsHex(secretOrHash)}
                />
              </>
              : <>
                <Input
                  className='medium'
                  help={t<string>('Secret hash from the initiator.')}
                  label={t<string>('secret hash')}
                  onChange={setSecretOrHash}
                  value={secretOrHash}
                />
              </>}
            <InputBalance
              help={t<string>('Value to send to the other party.')}
              label={t<string>('value')}
              onChange={setValue}
              value={value}
            />
            <InputNumber
              help={t<string>('Duration of the swap.')}
              label={t<string>('duration')}
              onChange={setDuration}
              value={duration}
            />
          </Modal.Content>
          <Modal.Actions>
            {type === 'initiator'
              ? (
                <TxButton
                  accountId={source}
                  onStart={onClose}
                  params={[target, blake2AsHex(secretOrHash), { value }, duration]}
                  tx={api.tx.atomicSwap.createSwap}
                />)
              : (
                <TxButton
                  accountId={source}
                  onStart={onClose}
                  params={[target, secretOrHash, { value }, duration]}
                  tx={api.tx.atomicSwap.createSwap}
                />)
            }
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='plus'
        label={t<string>('Declare as ' + type)}
        onClick={onOpen}
      />
    </>
  );
}

export default React.memo(Declare);
