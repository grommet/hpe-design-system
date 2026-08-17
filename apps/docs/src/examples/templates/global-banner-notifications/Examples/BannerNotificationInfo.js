// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationInfo = () => (
  <Notification
    status="info"
    onClose={() => {}}
    actions={[
      {
        href: '#',
        label: 'View more',
      },
    ]}
    message="Updates to this service will be available soon
     including feature a, b, and c."
    global
  />
);