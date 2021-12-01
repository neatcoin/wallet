// Copyright 2021 @neatcoin/apps authors & contributors
// SPDX-License-Identifier: GPL-3.0

// setup these right at front
import './initSettings';
import 'semantic-ui-css/semantic.min.css';
import '@polkadot/react-components/i18n';

import React from 'react';
import ReactDOM from 'react-dom';

import Root from './Root';

const rootId = 'root';
const rootElement = document.getElementById(rootId);

if (!rootElement) {
  throw new Error(`Unable to find element with id '${rootId}'`);
}

ReactDOM.render(
  <Root isElectron={false} />,
  rootElement
);
