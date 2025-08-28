import React from 'react';
import { PropertiesPane } from '../../../../components';
import { Anchor } from 'grommet';

const properties = [
  { key: 'hosts', value: <Anchor label="3" href="#" /> },
  { key: 'host groups', value: <Anchor label="4" href="#" /> },
];

export const PropertiesRelated = ({ ...rest }) => {
  return (
    <PropertiesPane
      heading="Related info"
      level={2}
      properties={properties}
      {...rest}
    />
  );
};
