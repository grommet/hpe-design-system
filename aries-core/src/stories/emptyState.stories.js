/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ActionEmptyState } from 'aries-site/src/examples/templates/empty-state/ActionEmptyState';
import { CardEmptyState } from 'aries-site/src/examples/templates/empty-state/CardEmptyState';
import { EmptyStateExample } from 'aries-site/src/examples/templates/empty-state/EmptyStateExample';
import { ErrorManagementEmptyState } from 'aries-site/src/examples/templates/empty-state/ErrorManagementEmptyState';
import { LayerEmptyState } from 'aries-site/src/examples/templates/empty-state/LayerEmptyState';
import { PageEmptyState } from 'aries-site/src/examples/templates/empty-state/PageEmptyState';

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
