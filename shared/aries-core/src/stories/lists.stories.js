/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { ListIconIdentifierExample } from 'apps/docs/src/examples/templates/list-views/ListIconIdentifierExample';
import { ListImageIdentifierExample } from 'apps/docs/src/examples/templates/list-views/ListImageIdentifierExample';
import { ListNameDescriptionOptionExample } from 'apps/docs/src/examples/templates/list-views/ListNameDescriptionOptionExample';
import { ListNameExample } from 'apps/docs/src/examples/templates/list-views/ListNameExample';
import { ListNameOptionActionExample } from 'apps/docs/src/examples/templates/list-views/ListNameOptionActionExample';
import { ListOrderExample } from 'apps/docs/src/examples/templates/list-views/ListOrderExample';
import { ListScreenExample } from 'apps/docs/src/examples/templates/list-views/ListScreenExample';
import ListIconIdentifierExampleSource from 'apps/docs/src/examples/templates/list-views/ListIconIdentifierExample.js?raw';
import ListImageIdentifierExampleSource from 'apps/docs/src/examples/templates/list-views/ListImageIdentifierExample.js?raw';
import ListNameDescriptionOptionExampleSource from 'apps/docs/src/examples/templates/list-views/ListNameDescriptionOptionExample.js?raw';
import ListNameExampleSource from 'apps/docs/src/examples/templates/list-views/ListNameExample.js?raw';
import ListNameOptionActionExampleSource from 'apps/docs/src/examples/templates/list-views/ListNameOptionActionExample.js?raw';
import ListOrderExampleSource from 'apps/docs/src/examples/templates/list-views/ListOrderExample.js?raw';
import ListScreenExampleSource from 'apps/docs/src/examples/templates/list-views/ListScreenExample.js?raw';

const meta = {
  title: 'Patterns/Lists',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const IconIdentifier = {
  render: () => <ListIconIdentifierExample />,
  parameters: {
    docs: {
      source: {
        code: ListIconIdentifierExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const ImageIdentifier = {
  render: () => <ListImageIdentifierExample />,
  parameters: {
    docs: {
      source: {
        code: ListImageIdentifierExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const NameDescriptionOption = {
  render: () => <ListNameDescriptionOptionExample />,
  parameters: {
    docs: {
      source: {
        code: ListNameDescriptionOptionExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Name = {
  render: () => <ListNameExample />,
  parameters: {
    docs: {
      source: {
        code: ListNameExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const NameOptionAction = {
  render: () => <ListNameOptionActionExample />,
  parameters: {
    docs: {
      source: {
        code: ListNameOptionActionExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Order = {
  render: () => <ListOrderExample />,
  parameters: {
    docs: {
      source: {
        code: ListOrderExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Screen = {
  render: () => <ListScreenExample />,
  parameters: {
    docs: {
      source: {
        code: ListScreenExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
