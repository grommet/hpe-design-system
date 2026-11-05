// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  AIGen,
  Compliance,
  Device,
  Group,
  History,
  Home,
  Organization,
  Services,
  UserAdmin,
} from '@hpe-design/icons-grommet';

// Global rail — Capability (top).
// These are the platform-level groupings that used to live in the header
// hamburger menu. Each entry opens its own local nav (menu) in the
// navigation slot; items inside the menu navigate.
//
// Menu item shape:
//   { id, label, description?, serviceId?, pageId?, external? }
//   - serviceId: opens that service (replaces the local nav wholesale)
//   - pageId:    opens a platform management page (nav stays on this menu)
//   - external:  opens in a new window (prototype: no-op)
export const capabilities = [
  {
    id: 'home',
    label: 'Home',
    icon: Home,
    behavior: 'home',
  },
  {
    id: 'copilot',
    label: 'GreenLake AI',
    icon: AIGen,
    behavior: 'copilot',
  },
  {
    id: 'recent',
    label: 'Recent',
    icon: History,
    behavior: 'menu',
    menu: {
      title: 'Recent',
      sections: [
        {
          items: [
            {
              id: 'r1',
              label: 'OpsRamp',
              description: 'US-east',
              serviceId: 'opsramp-us',
            },
            {
              id: 'r2',
              label: 'HPE Compute Ops Management',
              description: 'US West',
              serviceId: 'compute',
            },
            {
              id: 'r3',
              label: 'OpsRamp',
              description: 'EU-west',
              serviceId: 'opsramp',
            },
            {
              id: 'r4',
              label: 'Backup and recovery',
              description: 'GLP platform',
              serviceId: 'backup',
            },
            {
              id: 'r5',
              label: 'Acme Manufacturing',
              description: 'US-east',
              pageId: 'customer-workspace',
            },
            {
              id: 'r6',
              label: 'Roles & Permissions',
              description: 'GLP platform',
              pageId: 'roles-permissions',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'services',
    label: 'Services',
    icon: Services,
    behavior: 'menu',
    menu: {
      title: 'Services',
      sections: [
        {
          heading: 'My Services',
          headingAction: {
            label: 'View all my services',
            pageId: 'my-services',
          },
          items: [
            {
              id: 's1',
              label: 'HPE Compute Ops Management',
              description: 'US West',
              serviceId: 'compute',
            },
            {
              id: 's2',
              label: 'OpsRamp',
              description: 'EU-west',
              serviceId: 'opsramp',
            },
            {
              id: 's3',
              label: 'Consumption analytics',
              description: 'EU-west',
              serviceId: 'consumption-analytics',
            },
            {
              id: 's4',
              label: 'VMware Cloud Foundation, Managed for you',
              description: 'US-east',
              serviceId: 'vmware',
            },
            {
              id: 's5',
              label: 'Wellness Dashboard',
              description: 'US West',
              serviceId: 'wellness',
            },
            {
              id: 's6',
              label: 'Data Services',
              description: 'AP NorthEast- Tokyo',
              serviceId: 'data-services',
            },
            {
              id: 's15',
              label: 'Mist AI',
              description: 'US-east',
              serviceId: 'networking',
            },
            {
              id: 's9',
              label: 'FLEETPOC3',
              description: 'US West',
              serviceId: 'fleetpoc3',
            },
            {
              id: 's10',
              label: 'HPE Aruba Networking Central AQA',
              description: 'US West',
              serviceId: 'aruba-central-aqa',
            },
            {
              id: 's11',
              label: 'HCIPOC',
              description: 'US West',
              serviceId: 'hcipoc',
            },
            {
              id: 's12',
              label: 'OpsRamp',
              description: 'US West',
              serviceId: 'opsramp-us-west',
            },
            {
              id: 's13',
              label: 'User Experience Insight',
              description: 'US West',
              serviceId: 'user-experience-insight',
            },
            {
              id: 's14',
              label: 'HPE Aruba Networking Central PPK',
              description: 'US West',
              serviceId: 'aruba-central-ppk',
            },
          ],
        },
        {
          items: [
            {
              id: 's7',
              label: 'Manage service subscription',
              description: 'Add and view your service subscriptions',
              pageId: 'service-subscriptions',
            },
            {
              id: 's8',
              label: 'Service catalog',
              description: 'View all cloud services',
              pageId: 'service-catalog',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: Organization,
    behavior: 'menu',
    menu: {
      title: 'Customers',
      sections: [
        {
          heading: 'Recent',
          items: [
            {
              id: 'c1',
              label: 'Acme Manufacturing',
              pageId: 'customer-workspace',
            },
            {
              id: 'c2',
              label: 'Globex Retail Group',
              pageId: 'customer-workspace',
            },
            {
              id: 'c3',
              label: 'Initech Financial',
              pageId: 'customer-workspace',
            },
            {
              id: 'c4',
              label: 'Umbrella Health',
              pageId: 'customer-workspace',
            },
            {
              id: 'c5',
              label: 'Stark Logistics',
              pageId: 'customer-workspace',
            },
          ],
        },
        {
          items: [
            {
              id: 'c6',
              label: 'Customers workspaces',
              description: 'View all customers workspaces.',
              pageId: 'customer-workspaces',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'devices',
    label: 'Asset explorer',
    icon: Device,
    behavior: 'menu',
    menu: {
      title: 'Asset explorer',
      sections: [
        {
          items: [
            {
              id: 'd1',
              label: 'Device inventory',
              description: 'View all devices or add new devices.',
              pageId: 'device-inventory',
            },
            {
              id: 'd2',
              label: 'Device subscription',
              description: 'Manage and add device subscription keys.',
              pageId: 'device-subscription',
            },
            {
              id: 'd3',
              label: 'Device configuration',
              description:
                'Configure auto-subscribe for each supported device type.',
              pageId: 'device-configuration',
            },
          ],
        },
      ],
    },
  },
  {
    id: 'iam',
    label: 'IAM and administration',
    icon: UserAdmin,
    behavior: 'menu',
    menu: {
      title: 'IAM and administration',
      sections: [
        {
          items: [
            {
              id: 'i1',
              label: 'Workspace details',
              pageId: 'workspace-details',
            },
          ],
        },
        {
          items: [
            { id: 'i2', label: 'Users', pageId: 'users' },
            { id: 'i3', label: 'User groups', pageId: 'user-groups' },
            { id: 'i4', label: 'Baseline access', pageId: 'baseline-access' },
            {
              id: 'i5',
              label: 'Roles & permissions',
              pageId: 'roles-permissions',
            },
            { id: 'i6', label: 'Scope groups', pageId: 'scope-groups' },
            { id: 'i7', label: 'IP access rules', pageId: 'ip-access-rules' },
            { id: 'i8', label: 'API access', pageId: 'api-access' },
          ],
        },
        {
          items: [
            { id: 'i9', label: 'Policies', pageId: 'policies' },
            { id: 'i10', label: 'Domains', pageId: 'domains' },
            { id: 'i11', label: 'SSO connections', pageId: 'sso-connections' },
            {
              id: 'i12',
              label: 'SSO authentication policies',
              pageId: 'sso-authentication-policies',
            },
            {
              id: 'i13',
              label: 'External SCIM integrations',
              pageId: 'scim-integrations',
            },
          ],
        },
        {
          items: [
            { id: 'i14', label: 'Audit log', pageId: 'audit-log' },
            { id: 'i15', label: 'Task tracker', pageId: 'task-tracker' },
            { id: 'i16', label: 'Reports', pageId: 'reports' },
            { id: 'i17', label: 'Locations', pageId: 'locations' },
            { id: 'i18', label: 'Tags', pageId: 'tags' },
            { id: 'i19', label: 'Webhooks', pageId: 'webhooks' },
            {
              id: 'i20',
              label: 'Usage monitoring',
              pageId: 'usage-monitoring',
            },
            { id: 'i21', label: 'Order history', pageId: 'order-history' },
          ],
        },
      ],
    },
  },
  {
    id: 'communities',
    label: 'Communities',
    icon: Group,
    behavior: 'menu',
    menu: {
      title: 'Communities',
      sections: [
        {
          items: [
            {
              id: 'm1',
              label: 'HPE developer community',
              description:
                'Engage with HPE’s technologies, share insights and access resources.',
              external: true,
            },
            {
              id: 'm2',
              label: 'HPE community',
              description: 'Share knowledge, collaborate and access resources.',
              external: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: 'legal',
    label: 'Legal & financial',
    icon: Compliance,
    behavior: 'menu',
    menu: {
      title: 'Legal & financial',
      sections: [
        {
          items: [
            {
              id: 'l1',
              label: 'Privacy policy',
              description: 'How HPE ensure users’ privacy and security.',
              external: true,
            },
            {
              id: 'l2',
              label: 'Cookies',
              description: 'See section in HPE privacy policy.',
              external: true,
            },
            {
              id: 'l3',
              label: 'Terms of use',
              description: 'The rules and guidelines for using our facilities.',
              external: true,
            },
            {
              id: 'l4',
              label: 'Do not sell my personal info.',
              description:
                'Informing users of their rights to opt out of the sale of personal info.',
              external: true,
            },
            {
              id: 'l5',
              label: 'Financial services',
              description:
                'A range of services tailored to meet the needs of business and individuals.',
              pageId: 'financial-services',
            },
          ],
        },
      ],
    },
  },
];

export const getCapability = id => capabilities.find(c => c.id === id);

// Platform management pages reachable from capability menus. These are
// "just another capability", rendered in the primary content area with the
// capability menu acting as the local nav.
export const platformPages = {
  'my-services': {
    title: 'My services',
    description: 'All services provisioned in this workspace, by region.',
  },
  'service-subscriptions': {
    title: 'Service subscriptions',
    description: 'Add and view your service subscriptions.',
  },
  'service-catalog': {
    title: 'Service catalog',
    description: 'Browse and launch every HPE GreenLake cloud service.',
  },
  'customer-workspace': {
    title: 'Customer workspace',
    description: 'Tenant details, assigned services, and operators.',
  },
  'customer-workspaces': {
    title: 'Customers workspaces',
    description: 'View all customer workspaces you manage.',
  },
  'device-inventory': {
    title: 'Device inventory',
    description: 'View all devices or add new devices.',
  },
  'device-subscription': {
    title: 'Device subscription',
    description: 'Manage and add device subscription keys.',
  },
  'device-configuration': {
    title: 'Device configuration',
    description: 'Configure auto-subscribe for each supported device type.',
  },
  'roles-permissions': {
    title: 'Roles & permissions',
    description: 'Manage identity and access across the platform.',
  },
  'workspace-details': {
    title: 'Workspace details',
    description: 'Name, ID, tenant and contacts for this workspace.',
  },
  users: {
    title: 'Users',
    description: 'People with access to this workspace and their status.',
  },
  'user-groups': {
    title: 'User groups',
    description: 'Group users to assign roles and scopes together.',
  },
  'baseline-access': {
    title: 'Baseline access',
    description: 'The minimum access every user in the workspace receives.',
  },
  'scope-groups': {
    title: 'Scope groups',
    description: 'Limit roles to sets of resources, regions or sites.',
  },
  'ip-access-rules': {
    title: 'IP access rules',
    description: 'Allow or deny sign-in from specific networks.',
  },
  'api-access': {
    title: 'API access',
    description: 'Client credentials and tokens for the platform API.',
  },
  policies: {
    title: 'Policies',
    description: 'Session, password and MFA policies for the workspace.',
  },
  domains: {
    title: 'Domains',
    description: 'Verified email domains that can join this workspace.',
  },
  'sso-connections': {
    title: 'SSO connections',
    description: 'SAML and OIDC identity providers connected to the workspace.',
  },
  'sso-authentication-policies': {
    title: 'SSO authentication policies',
    description: 'Which users must sign in through which identity provider.',
  },
  'scim-integrations': {
    title: 'External SCIM integrations',
    description: 'Provision users and groups from an external directory.',
  },
  'audit-log': {
    title: 'Audit log',
    description: 'Who did what, where and when across the workspace.',
  },
  'task-tracker': {
    title: 'Task tracker',
    description: 'Long-running platform tasks and their progress.',
  },
  reports: {
    title: 'Reports',
    description: 'Scheduled and on-demand reports across services.',
  },
  locations: {
    title: 'Locations',
    description: 'Physical sites used to place devices and route support.',
  },
  tags: {
    title: 'Tags',
    description: 'Key-value tags applied to resources across services.',
  },
  webhooks: {
    title: 'Webhooks',
    description: 'Send platform events to external endpoints.',
  },
  'usage-monitoring': {
    title: 'Usage monitoring',
    description: 'Consumption and metering across subscribed services.',
  },
  'order-history': {
    title: 'Order history',
    description: 'Orders, quotes and deliveries for this workspace.',
  },
  'financial-services': {
    title: 'Financial services',
    description: 'Flexible payment and consumption options for your estate.',
  },
};
