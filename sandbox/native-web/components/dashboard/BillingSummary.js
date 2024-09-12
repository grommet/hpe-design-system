/* eslint-disable max-len */
import { DashboardCard } from '../common/DashboardCard';
import { Notification } from '../common/Notification';
import { Metric } from '../common/Metric';

const currencyOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
};

export const BillingSummary = () =>
  `${DashboardCard({
    title: 'Billing summary',
    subtitle: 'August 1-10, 2023',
    body: `<div class="gap-medium">${Metric({
      label: 'Month-to-date total cost',
      size: 'medium',
      value: 618.18,
      options: currencyOptions,
    })}
    ${Metric({
      label: 'End-of-month total cost (forecasted)',
      size: 'medium',
      value: 652.11,
      options: currencyOptions,
    })}
    </div>`,
    footer: `${Notification({
      message: `Your costs have increased by 14% this month. Avoid 
        surprises with a <a>budget alert</a>.`,
      status: 'warning',
    })}`,
  })}`;
