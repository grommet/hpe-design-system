import { DashboardCard } from '../common/DashboardCard';
import { Notification } from '../common/Notification';
import mockData from '../../mockData/mockData.json';
import { StatusWarningSmall } from '../../icons/StatusWarningSmall';
import { StatusCriticalSmall } from '../../icons/StatusCriticalSmall';

export const ExpiringSubscriptions = () =>
  `${DashboardCard({
    title: 'Expiring subscriptions',
    body: `
    <div>
        ${mockData.services
          .filter(service => service.subscription)
          .map(service => {
            const expired =
              new Date(service.subscription.expiration).getTime() < Date.now();
            let icon = StatusWarningSmall({
              color: 'foreground-status-warning',
              size: 'medium',
            });
            if (expired)
              icon = StatusCriticalSmall({
                color: 'foreground-status-critical',
                size: 'medium',
              });

            return `
            <div class="row 
            gap-xsmall border-bottom-xsmall border-weak pad-xsmall">
                <span>${icon}</span>
                <div>
                <span class="text-text-strong">${
                  service.subscription.name
                }</span>
                <span class="text-small">
                ${expired ? 'Expired' : 'Expires'} ${Intl.DateTimeFormat(
              undefined,
              {
                dateStyle: 'medium',
              },
            ).format(new Date(service.subscription.expiration))}
                </span>
                </div>
            </div>
          `;
          })
          .join('')}
    </div>
  `,
    footer: Notification({
      message: '12 of your subscriptions will expire this month.',
      status: 'warning',
    }),
  })}`;
