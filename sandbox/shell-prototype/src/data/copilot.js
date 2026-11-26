// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Device, HelpBook, UserSettings } from '@hpe-design/icons-grommet';

export const user = {
  firstName: 'Jordan',
  lastName: 'Reyes',
  email: 'jordan.reyes@acme.com',
  role: 'Workspace administrator',
};

export const copilotSuggestions = [
  {
    id: 'sg1',
    icon: UserSettings,
    title: 'User & Workspace Management',
    description: 'Track user activity and workspace setup.',
    prompts: [
      'Who was added to this workspace in the last 30 days?',
      'Which users have not signed in for 90 days?',
    ],
  },
  {
    id: 'sg2',
    icon: Device,
    title: 'Device & Subscription Management',
    description:
      'Monitor inventory, subscriptions, and track device assignments.',
    prompts: [
      'Which device subscriptions expire in the next 60 days?',
      'Show servers that are not assigned to a location.',
    ],
  },
  {
    id: 'sg3',
    icon: HelpBook,
    title: 'How-to & Guidance',
    description: 'Step-by-step answers to common setup and configurations.',
    prompts: [
      'How do I onboard a new ProLiant server?',
      'How do I switch workspaces?',
    ],
  },
];

export const copilotFavorites = [
  { id: 'f1', title: 'Latency early warnings' },
  { id: 'f2', title: 'Host resource saturation' },
  { id: 'f3', title: 'Storage capacity exhaustion prevention' },
  { id: 'f4', title: 'End-to-end application dependency monitoring' },
];

export const copilotHistory = [
  {
    id: 'h1',
    title: 'Analyze what changed on my Flex Solutions bill',
    kind: 'chat',
    when: 'Today 5:58 PM',
    messages: [
      {
        role: 'user',
        text: 'Analyze why overall Flex Solutions charges rose by 12% compared to last month.',
      },
      {
        role: 'assistant',
        text: 'I looked at your Flex charges for September vs. August. Total spend rose 12% ($18,420 → $20,630). The increase is mostly usage-driven, not pricing: compute hours in your East-2 pool grew 19%, driven by 3 new workloads onboarded mid-August that ramped to full usage this month. Storage and networking stayed flat (+1–2%). No rate changes or new SKUs were applied to your contract this period.',
      },
      { role: 'assistant', text: 'Open in canvas', action: true },
    ],
  },
  {
    id: 'h2',
    title: 'Create a report about subscription renewals',
    kind: 'chat',
    when: 'Yesterday',
    messages: [
      {
        role: 'user',
        text: 'Create a report about subscription renewals due this quarter.',
      },
      {
        role: 'assistant',
        text: 'Here is a summary: 31 service subscriptions are active in North America IT Ops. 6 expire within 60 days (3 Compute Ops Management, 2 Data Services, 1 OpsRamp). I can export the full list as CSV or schedule a weekly digest.',
      },
    ],
  },
  {
    id: 'h3',
    title: 'Storage capacity exhaustion in Houston',
    kind: 'chat',
    when: 'Mon',
    messages: [
      {
        role: 'user',
        text: 'Which Houston volumes will hit 90% capacity in the next 30 days?',
      },
      {
        role: 'assistant',
        text: 'Two volumes are trending toward 90%: hou-vol-07 (86%, ~12 days) and hou-vol-12 (84%, ~21 days). Both are backed by the same array; a 20 TB expansion would cover projected growth through Q2.',
      },
    ],
  },
  {
    id: 'h4',
    title: 'See latest examples of dashboards',
    kind: 'canvas',
    when: 'Last week',
    messages: [
      { role: 'user', text: 'Show me the latest dashboard templates.' },
      {
        role: 'assistant',
        text: 'I’ve opened a canvas with the three most recent dashboard templates: Fleet health, Cost by service, and Sustainability.',
      },
    ],
  },
  {
    id: 'h5',
    title: 'Test canvas',
    kind: 'canvas',
    when: 'Last week',
    messages: [],
  },
];

export const cannedResponse = prompt =>
  `Thanks — I’m looking into “${prompt}”. In this prototype responses are simulated, but in the real experience GreenLake AI would answer using the context of your current workspace, region, and service.`;
