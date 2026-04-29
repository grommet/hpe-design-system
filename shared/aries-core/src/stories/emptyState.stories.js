import React from 'react';
import { ActionEmptyState } from 'apps/docs/src/examples/templates/empty-state/ActionEmptyState';
import { CardEmptyState } from 'apps/docs/src/examples/templates/empty-state/CardEmptyState';
import { EmptyStateExample } from 'apps/docs/src/examples/templates/empty-state/EmptyStateExample';
import { ErrorManagementEmptyState } from 'apps/docs/src/examples/templates/empty-state/ErrorManagementEmptyState';
import { LayerEmptyState } from 'apps/docs/src/examples/templates/empty-state/LayerEmptyState';
import { PageEmptyState } from 'apps/docs/src/examples/templates/empty-state/PageEmptyState';
import ActionEmptyStateSource from 'apps/docs/src/examples/templates/empty-state/ActionEmptyState.js?raw';
import CardEmptyStateSource from 'apps/docs/src/examples/templates/empty-state/CardEmptyState.js?raw';
import EmptyStateExampleSource from 'apps/docs/src/examples/templates/empty-state/EmptyStateExample.js?raw';
import ErrorManagementEmptyStateSource from 'apps/docs/src/examples/templates/empty-state/ErrorManagementEmptyState.js?raw';
import LayerEmptyStateSource from 'apps/docs/src/examples/templates/empty-state/LayerEmptyState.js?raw';
import PageEmptyStateSource from 'apps/docs/src/examples/templates/empty-state/PageEmptyState.js?raw';

const meta = {
  title: 'Patterns/Empty State',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const Action = {
  render: () => <ActionEmptyState />,
  parameters: {
    docs: {
      source: {
        code: ActionEmptyStateSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Card = {
  render: () => <CardEmptyState />,
  parameters: {
    layout: 'fullscreen',
    background: 'background-back',
    docs: {
      source: {
        code: CardEmptyStateSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const EmptyState = {
  render: () => <EmptyStateExample />,
  parameters: {
    docs: {
      source: {
        code: EmptyStateExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const ErrorManagement = {
  render: () => <ErrorManagementEmptyState />,
  parameters: {
    docs: {
      source: {
        code: ErrorManagementEmptyStateSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Layer = {
  render: () => <LayerEmptyState />,
  parameters: {
    docs: {
      source: {
        code: LayerEmptyStateSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Page = {
  render: () => <PageEmptyState />,
  parameters: {
    docs: {
      source: {
        code: PageEmptyStateSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
