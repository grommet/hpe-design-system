// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationWarning = () => (
  <Notification
    actions={[
      {
        href: '#',
        label: 'Refresh',
      },
    ]}
    status="warning"
    global
    message="Your session has timed out due to inactivity."
  />
);
