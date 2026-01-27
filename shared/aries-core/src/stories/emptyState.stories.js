/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ActionEmptyState } from 'apps/aries-site/src/examples/templates/empty-state/ActionEmptyState';
import { CardEmptyState } from 'apps/aries-site/src/examples/templates/empty-state/CardEmptyState';
import { EmptyStateExample } from 'apps/aries-site/src/examples/templates/empty-state/EmptyStateExample';
import { ErrorManagementEmptyState } from 'apps/aries-site/src/examples/templates/empty-state/ErrorManagementEmptyState';
import { LayerEmptyState } from 'apps/aries-site/src/examples/templates/empty-state/LayerEmptyState';
import { PageEmptyState } from 'apps/aries-site/src/examples/templates/empty-state/PageEmptyState';

const meta = {
  title: 'Empty State',
};

export default meta;

export const Action = {
  render: () => <ActionEmptyState />,
};

export const Card = {
  render: () => <CardEmptyState />,
};

export const EmptyState = {
  render: () => <EmptyStateExample />,
};

export const ErrorManagement = {
  render: () => <ErrorManagementEmptyState />,
};

export const Layer = {
  render: () => <LayerEmptyState />,
};

export const Page = {
  render: () => <PageEmptyState />,
};
