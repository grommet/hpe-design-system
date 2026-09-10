// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Notification } from 'grommet';

export const BannerNotificationCritical = () => (
  <Notification
    status="critical"
    global
    message={`This service is currently unavailable. We are working on getting 
    things fixed.`}
  />
);
