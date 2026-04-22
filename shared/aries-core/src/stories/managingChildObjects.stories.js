import React from 'react';
import { CreateCluster } from 'apps/docs/src/examples/templates/forms/managing-child-objects/CreateCluster';
import { CreateRole } from 'apps/docs/src/examples/templates/forms/managing-child-objects/CreateRole';
import { EditRole } from 'apps/docs/src/examples/templates/forms/managing-child-objects/EditRole';
import CreateRoleSource from 'apps/docs/src/examples/templates/forms/managing-child-objects/CreateRole.js?raw';
import CreateClusterSource from 'apps/docs/src/examples/templates/forms/managing-child-objects/CreateCluster.js?raw';
import EditRoleSource from 'apps/docs/src/examples/templates/forms/managing-child-objects/EditRole.js?raw';

const meta = {
  title: 'Patterns/Managing Child Objects',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const OptionalChildren = {
  render: () => <CreateRole />,
  parameters: {
    docs: {
      source: {
        code: CreateRoleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const RequiredChildren = {
  render: () => <CreateCluster />,
  parameters: {
    docs: {
      source: {
        code: CreateClusterSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const RemoveAllAction = {
  render: () => <EditRole />,
  parameters: {
    docs: {
      source: {
        code: EditRoleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
