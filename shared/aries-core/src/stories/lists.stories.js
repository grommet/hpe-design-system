/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ListIconIdentifierExample } from 'apps/docs/src/examples/templates/list-views/ListIconIdentifierExample';
import { ListImageIdentifierExample } from 'apps/docs/src/examples/templates/list-views/ListImageIdentifierExample';
import { ListNameDescriptionOptionExample } from 'apps/docs/src/examples/templates/list-views/ListNameDescriptionOptionExample';
import { ListNameExample } from 'apps/docs/src/examples/templates/list-views/ListNameExample';
import { ListNameOptionActionExample } from 'apps/docs/src/examples/templates/list-views/ListNameOptionActionExample';
import { ListOrderExample } from 'apps/docs/src/examples/templates/list-views/ListOrderExample';
import { ListScreenExample } from 'apps/docs/src/examples/templates/list-views/ListScreenExample';

const meta = {
  title: 'Patterns/Lists',
};

export default meta;

export const IconIdentifier = {
  render: () => <ListIconIdentifierExample />,
};

export const ImageIdentifier = {
  render: () => <ListImageIdentifierExample />,
};

export const NameDescriptionOption = {
  render: () => <ListNameDescriptionOptionExample />,
};

export const Name = {
  render: () => <ListNameExample />,
};

export const NameOptionAction = {
  render: () => <ListNameOptionActionExample />,
};

export const Order = {
  render: () => <ListOrderExample />,
};

export const Screen = {
  render: () => <ListScreenExample />,
};
