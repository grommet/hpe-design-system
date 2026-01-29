/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { ListIconIdentifierExample } from 'apps/aries-site/src/examples/templates/list-views/ListIconIdentifierExample';
import { ListImageIdentifierExample } from 'apps/aries-site/src/examples/templates/list-views/ListImageIdentifierExample';
import { ListNameDescriptionOptionExample } from 'apps/aries-site/src/examples/templates/list-views/ListNameDescriptionOptionExample';
import { ListNameExample } from 'apps/aries-site/src/examples/templates/list-views/ListNameExample';
import { ListNameOptionActionExample } from 'apps/aries-site/src/examples/templates/list-views/ListNameOptionActionExample';
import { ListOrderExample } from 'apps/aries-site/src/examples/templates/list-views/ListOrderExample';
import { ListScreenExample } from 'apps/aries-site/src/examples/templates/list-views/ListScreenExample';

const meta = {
  title: 'Lists',
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
