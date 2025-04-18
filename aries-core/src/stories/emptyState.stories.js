import React from 'react';
/* eslint-disable max-len */
import { ActionEmptyState } from 'aries-site/src/examples/templates/empty-state/ActionEmptyState';
import { CardEmptyState } from 'aries-site/src/examples/templates/empty-state/CardEmptyState';
import { EmptyStateExample } from 'aries-site/src/examples/templates/empty-state/EmptyStateExample';
import { ErrorManagementEmptyState } from 'aries-site/src/examples/templates/empty-state/ErrorManagementEmptyState';
import { LayerEmptyState } from 'aries-site/src/examples/templates/empty-state/LayerEmptyState';
import { PageEmptyState } from 'aries-site/src/examples/templates/empty-state/PageEmptyState';

export const Action = () => <ActionEmptyState />;
export const Card = () => <CardEmptyState />;
export const EmptyState = () => <EmptyStateExample />;
export const ErrorManagement = () => <ErrorManagementEmptyState />;
export const Layer = () => <LayerEmptyState />;
export const Page = () => <PageEmptyState />;

export default {
  title: 'Empty State',
};
