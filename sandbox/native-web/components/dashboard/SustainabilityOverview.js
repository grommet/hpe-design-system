/* eslint-disable max-len */
import { DashboardCard } from '../common/DashboardCard';
import { Notification } from '../common/Notification';
import { Metric } from '../common/Metric';

const currencyOptions = {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
};

export const SustainabilityOverview = () =>
  `${DashboardCard({
    title: 'Sustainability overview',
    body: `<div class="gap-medium">${Metric({
      label: 'Carbon emissions',
      size: 'small',
      value: 132000,
      unit: 'MTC02e',
    })}
    ${Metric({
      label: 'Energy consumption',
      size: 'small',
      value: 325000,
      unit: 'kWh',
    })}
      ${Metric({
        label: 'Energy cost',
        size: 'small',
        value: 48750,
        unit: 'USD',
        options: currencyOptions,
      })}
    </div>`,
    footer: `${Notification({
      message: `Your carbon emissions have increased by 
        83% in the past month.`,
      status: 'warning',
    })}`,
  })}`;
