// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { StatusWarningSmall } from '../../icons/StatusWarningSmall';

export const Notification = ({
  message,
  status = 'info',
}) => `<div class="notification ${status} row">
${StatusWarningSmall({ color: 'foreground-status-warning', size: 'medium' })}
<span>${message}</span>
</div>`;
