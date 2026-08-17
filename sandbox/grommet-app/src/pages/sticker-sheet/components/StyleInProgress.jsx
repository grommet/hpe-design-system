// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Notification } from 'grommet';

export const StyleInProgress = () => (
  <Notification
    status="warning"
    message="This component style is still being refined."
    margin={{ bottom: 'medium' }}
  />
);
