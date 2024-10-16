import { StatusWarningSmall } from '../../icons/StatusWarningSmall';

export const Notification = ({
  message,
  status = 'info',
}) => `<div class="notification ${status} row">
${StatusWarningSmall({ color: 'foreground-status-warning', size: 'medium' })}
<span>${message}</span>
</div>`;
