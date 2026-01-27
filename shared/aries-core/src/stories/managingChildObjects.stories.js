/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { CreateCluster } from 'apps/aries-site/src/examples/templates/forms/managing-child-objects/CreateCluster';
import { CreateRole } from 'apps/aries-site/src/examples/templates/forms/managing-child-objects/CreateRole';
import { EditRole } from 'apps/aries-site/src/examples/templates/forms/managing-child-objects/EditRole';

const meta = {
  title: 'Managing Child Objects',
};

export default meta;

export const OptionalChildren = {
  render: () => <CreateRole />,
};

export const RequiredChildren = {
  render: () => <CreateCluster />,
};

export const RemoveAllAction = {
  render: () => <EditRole />,
};
