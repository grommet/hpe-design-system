import React from 'react';
/* eslint-disable max-len */
import { CreateCluster } from 'aries-site/src/examples/templates/forms/managing-child-objects/CreateCluster';
import { CreateRole } from 'aries-site/src/examples/templates/forms/managing-child-objects/CreateRole';
import { EditRole } from 'aries-site/src/examples/templates/forms/managing-child-objects/EditRole';

export const OptionalChildren = () => <CreateRole />;
export const RequiredChildren = () => <CreateCluster />;
export const RemoveAllAction = () => <EditRole />;

export default {
  title: 'Managing Child Objects',
};
