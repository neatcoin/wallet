// Copyright 2021 @neatcoin/page-registry authors & contributors
// SPDX-License-Identifier: GPL-3.0

import type { ComponentProps as Props } from '../types';

import React, { useCallback, useState } from 'react';

import { Button, Input, InputAddress, Modal, TxButton } from '@polkadot/react-components';
import { useApi, useModal } from '@polkadot/react-hooks';

import { useTranslation } from '../translate';

function Register ({ className = '' }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const { isOpen, onClose, onOpen } = useModal();
  const [domainLabel, setDomainLabel] = useState<string>('');

  const [accountId, setAcountId] = useState<string | null>(null);

  const TLD = api.runtimeChain.toString() === 'Vodka' ? 'vodkauser' : 'neatuser';
  const COIN = api.runtimeChain.toString() === 'Vodka' ? 'VODKA' : 'NEAT';

  const _onChangeDomainLabel = useCallback(
    (domainLabel: string): void => setDomainLabel(domainLabel),
    []
  );

  return (
    <>
      {isOpen && (
        <Modal
          header={t<string>('Register a new domain name')}
          onClose={onClose}
        >
          <Modal.Content>
            <p>
              This allows you to register domain names. Currently, only
              <code>.{TLD}</code> TLD is enabled in a first-come-first-served
              basis. More TLDs will be added later. Registration costs 500 {COIN} per
              year to avoid domain name hoarding. You are guaranteed to only pay
              at maximum this amount for renewal fees.
            </p>
            {domainLabel && domainLabel !== '' && (
              <p>Your domain name will be {domainLabel}.{TLD}</p>
            )}
            <InputAddress
              help={t<string>('Select the account you wish to register the domain name with.')}
              label={t<string>('register from account')}
              onChange={setAcountId}
              type='account'
              withLabel
            />
            <Input
              className='medium'
              help={t<string>('Domain name to register')}
              label={t<string>('name')}
              onChange={_onChangeDomainLabel}
              placeholder={t<string>('A valid domain label')}
              value={domainLabel}
            />
          </Modal.Content>
          <Modal.Actions>
            <TxButton
              accountId={accountId}
              isDisabled={!domainLabel || domainLabel === ''}
              onStart={onClose}
              params={[[TLD, domainLabel]]}
              tx={api.tx.fcfs.register}
            />
          </Modal.Actions>
        </Modal>
      )}
      <Button
        icon='plus'
        label={t<string>('Register domain')}
        onClick={onOpen}
      />
    </>
  );
}

export default React.memo(Register);
