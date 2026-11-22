// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { pageBackground } from 'apps/docs/src/examples/templates/dashboards/content/overview/data';
import type { WidgetProps } from './WidgetCard';

/** Shared Storybook meta pieces so every widget treatment is compared alike. */
export const widgetArgTypes = {
  width: {
    control: 'radio',
    options: ['medium', 'xlarge', 'xxlarge'],
    description: 'Widget size: small (384px), medium (768px), large (1024px)',
  },
  columns: { control: { type: 'number', min: 1, max: 3 } },
  limit: { control: { type: 'number', min: 1 } },
};

export const widgetGlobals = {
  background: { value: 'background-back' },
};

export const widgetSizes: Record<string, { name: string; args: WidgetProps }> =
  {
    small: { name: 'Small', args: { width: 'medium', columns: 1 } },
    medium: { name: 'Medium', args: { width: 'xlarge', columns: 2 } },
    large: { name: 'Large', args: { width: 'xxlarge', columns: 3 } },
    constrained: {
      name: 'Height constrained',
      args: { width: 'medium', columns: 1, limit: 5 },
    },
  };

/** Meta pieces for the "on Overview dashboard" story set. */
export const dashboardArgTypes = {
  ...widgetArgTypes,
  widget: { table: { disable: true } },
  background: { table: { disable: true } },
};

export const dashboardParameters = {
  layout: 'fullscreen',
  background: pageBackground,
};

export const dashboardSizes: Record<
  string,
  { name: string; args: WidgetProps }
> = {
  small: widgetSizes.small,
  medium: widgetSizes.medium,
  large: widgetSizes.large,
};
