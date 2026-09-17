// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Notification } from 'grommet';

export const BetaNotification = () => (
  <Notification
    message={`Design tokens are currently in beta testing.
       Token names may have breaking changes in v1.`}
    width={{ max: 'xlarge' }}
    margin={{ bottom: 'medium' }}
    status="warning"
  />
);
