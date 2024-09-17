import { DashboardCard } from '../common/DashboardCard';
import { NotificationMetric } from '../common/NotificationMetric';
import mockData from '../../mockData/mockData.json';
import { StatusWarningSmall } from '../../icons/StatusWarningSmall';
import { StatusOkSmall } from '../../icons/StatusOkSmall';
import { StatusCriticalSmall } from '../../icons/StatusCriticalSmall';

export const Notifications = () =>
  `${DashboardCard({
    title: 'Notifications',
    body: `
    <div class="gap-medium">
    <div class="row gap-small">
        ${NotificationMetric({ status: 'critical', value: 1 })}
        ${NotificationMetric({ status: 'warning', value: 6 })}
        ${NotificationMetric({ status: 'ok', value: 86 })}
        ${NotificationMetric({ status: 'info', value: 17 })}
    </div>
    <h3>Recents</h3>
    <div>
    ${mockData.notifications
      .slice(0, 4)
      .map(notification => {
        const { status } = notification;
        let icon;
        if (status === 'warning')
          icon = StatusWarningSmall({
            color: 'foreground-status-warning',
            size: 'medium',
          });
        else if (status === 'ok')
          icon = StatusOkSmall({
            color: 'foreground-status-ok',
            size: 'medium',
          });
        else if (status === 'critical')
          icon = StatusCriticalSmall({
            color: 'foreground-status-critical',
            size: 'medium',
          });
        else
          icon = StatusOkSmall({
            color: 'foreground-status-info',
            size: 'medium',
          });
        return `<div class="row gap-small pad-block-small 
          border-top-xsmall 
          border-weak">
                <span>${icon}</span>
              <span class="text-emphasis truncate">${
                notification.service
              }</span>
              <div style="max-width: 150px;">
                <span class="truncate">${notification.message}</span>
              </div>
              <div class="align-end">
              <span>
              ${Intl.DateTimeFormat(undefined, {
                timeStyle: 'short',
              }).format(new Date(notification.createdAt))}</span>
              </div>
          </div>`;
      })
      .join('')}
    </div>
    </div>
`,
  })}`;
