// Copyright 2021 @neatcoin/apps authors & contributors
// SPDX-License-Identifier: GPL-3.0

import { ApiPromise } from '@polkadot/api';
import { isFunction } from '@polkadot/util';

type ApiMapper = Record<string, Record<string, Record<string, unknown>>>;

function hasEndpoint (api: ApiPromise, endpoint: string, needsApiInstances: boolean): boolean {
  const [area, _section, method] = endpoint.split('.');
  const [section] = (needsApiInstances && api.registry.getModuleInstances(api.runtimeVersion.specName.toString(), _section)) || [_section];

  try {
    return isFunction((api as unknown as ApiMapper)[area][section][method]);
  } catch (error) {
    return false;
  }
}

export function findMissingApis (api: ApiPromise, needsApi?: (string | string[])[], needsApiInstances = false): (string | string[])[] {
  if (!needsApi) {
    return [];
  }

  return needsApi.filter((endpoint: string | string[]): boolean => {
    const hasApi = Array.isArray(endpoint)
      ? endpoint.reduce((hasApi, endpoint) => hasApi || hasEndpoint(api, endpoint, needsApiInstances), false)
      : hasEndpoint(api, endpoint, needsApiInstances);

    return !hasApi;
  });
}
