// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// The `apps/docs` alias is resolved by Storybook's webpack config only; these
// shims give TypeScript the shape of the untyped docs templates we borrow.
declare module 'apps/docs/src/examples/templates/dashboards/OverviewDashboard' {
  import type { ComponentType, ReactNode } from 'react';

  export const OverviewDashboard: ComponentType<{ children?: ReactNode }>;
}

declare module 'apps/docs/src/examples/templates/dashboards/content/overview/data' {
  export const pageBackground: string;
  export const surfaceBackground: string;
}
