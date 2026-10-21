// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { RhythmProvider } from 'apps/docs/src/examples/templates/rhythm-spacing/RhythmContext';
import { OverviewDashboard } from 'apps/docs/src/examples/templates/dashboards/OverviewDashboard';
import { DevicesCollection } from 'apps/docs/src/examples/templates/data-collections/DevicesCollection';
import { OperationsDashboard } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/OperationsDashboard';
import { ServerDetail } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/ServerDetail';
import { ServiceCatalog } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/ServiceCatalog';
import { BillingCosts } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/BillingCosts';
import { AccountSettings } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/AccountSettings';
import { SupportCenter } from 'apps/docs/src/examples/templates/rhythm-spacing/pages/SupportCenter';
import OverviewDashboardSource from 'apps/docs/src/examples/templates/dashboards/OverviewDashboard.js?raw';
import DevicesCollectionSource from 'apps/docs/src/examples/templates/data-collections/DevicesCollection.js?raw';
import OperationsDashboardSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/OperationsDashboard.js?raw';
import ServerDetailSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/ServerDetail.js?raw';
import ServiceCatalogSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/ServiceCatalog.js?raw';
import BillingCostsSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/BillingCosts.js?raw';
import AccountSettingsSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/AccountSettings.js?raw';
import SupportCenterSource from 'apps/docs/src/examples/templates/rhythm-spacing/pages/SupportCenter.js?raw';

// Full page designs rendered in both spacing rhythms. Every design carries a
// Rhythm 1 / Rhythm 2 toggle in its page header, so the two can be compared
// on the fly without navigating between stories.
const meta = {
  title: 'Patterns/Rhythm spacing',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

const story = (Page, source, name, withProvider) => ({
  name,
  render: () =>
    withProvider ? (
      <RhythmProvider>
        <Page />
      </RhythmProvider>
    ) : (
      <Page />
    ),
  parameters: {
    docs: {
      source: { code: source, language: 'jsx', type: 'code' },
      canvas: { sourceState: 'shown' },
    },
  },
});

export const Overview = story(
  OverviewDashboard,
  OverviewDashboardSource,
  'Overview dashboard',
  true,
);

export const DataCollection = story(
  DevicesCollection,
  DevicesCollectionSource,
  'Data collection',
  true,
);

export const Operations = story(
  OperationsDashboard,
  OperationsDashboardSource,
  'Operations dashboard',
  false,
);

export const ResourceDetail = story(
  ServerDetail,
  ServerDetailSource,
  'Resource detail',
  false,
);

export const Catalog = story(
  ServiceCatalog,
  ServiceCatalogSource,
  'Service catalog',
  false,
);

export const Billing = story(
  BillingCosts,
  BillingCostsSource,
  'Billing and costs',
  false,
);

export const Settings = story(
  AccountSettings,
  AccountSettingsSource,
  'Settings hub',
  false,
);

export const Support = story(
  SupportCenter,
  SupportCenterSource,
  'Support center',
  false,
);
