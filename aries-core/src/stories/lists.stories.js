import React from 'react';
/* eslint-disable max-len */
import { ListIconIdentifierExample } from 'aries-site/src/examples/templates/list-views/ListIconIdentifierExample';
import { ListImageIdentifierExample } from 'aries-site/src/examples/templates/list-views/ListImageIdentifierExample';
import { ListNameDescriptionOptionExample } from 'aries-site/src/examples/templates/list-views/ListNameDescriptionOptionExample';
import { ListNameExample } from 'aries-site/src/examples/templates/list-views/ListNameExample';
import { ListNameOptionActionExample } from 'aries-site/src/examples/templates/list-views/ListNameOptionActionExample';
import { ListOrderExample } from 'aries-site/src/examples/templates/list-views/ListOrderExample';
import { ListScreenExample } from 'aries-site/src/examples/templates/list-views/ListScreenExample';

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
