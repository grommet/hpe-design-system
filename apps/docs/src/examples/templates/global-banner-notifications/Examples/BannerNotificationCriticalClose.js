// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCriticalClose = () => (
  <Notification
    status="critical"
    onClose={() => {}}
    message={`Scheduled maintenance will begin at 12:00am UTC on 02/17/2022. 
    The platform will not be accessible.`}
    global
  />
);
