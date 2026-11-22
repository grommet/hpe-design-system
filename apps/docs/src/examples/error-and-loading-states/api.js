// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Simulated API request. Resolves with `data` or rejects with an error
// object shaped like a typical API error payload.
export const request = ({
  delay = 2000,
  outcome = 'success',
  data,
  error,
} = {}) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (outcome === 'error') {
        reject(
          error || {
            status: 503,
            title: 'Service unavailable',
            message: 'The request could not be completed.',
          },
        );
      } else {
        resolve(data);
      }
    }, delay);
  });

export const servers = [
  {
    id: 'web-prod-01',
    name: 'web-prod-01',
    model: 'HPE ProLiant DL380 Gen11',
    os: 'Ubuntu Server 24.04 LTS',
    ip: '10.12.4.21',
    power: 'On',
    health: 'ok',
  },
  {
    id: 'web-prod-02',
    name: 'web-prod-02',
    model: 'HPE ProLiant DL380 Gen11',
    os: 'Ubuntu Server 24.04 LTS',
    ip: '10.12.4.22',
    power: 'On',
    health: 'ok',
  },
  {
    id: 'db-prod-01',
    name: 'db-prod-01',
    model: 'HPE ProLiant DL360 Gen11',
    os: 'Red Hat Enterprise Linux 9',
    ip: '10.12.4.40',
    power: 'On',
    health: 'warning',
  },
  {
    id: 'cache-prod-01',
    name: 'cache-prod-01',
    model: 'HPE ProLiant DL360 Gen11',
    os: 'Ubuntu Server 24.04 LTS',
    ip: '10.12.4.52',
    power: 'Off',
    health: 'unknown',
  },
  {
    id: 'batch-prod-01',
    name: 'batch-prod-01',
    model: 'HPE ProLiant DL385 Gen11',
    os: 'SUSE Linux Enterprise 15',
    ip: '10.12.4.61',
    power: 'On',
    health: 'critical',
  },
];
