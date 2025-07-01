import React from 'react';
import { PropertiesPane } from '../../../../components';

const properties = [
  { key: 'model', value: 'HPE_3PAR 8400' },
  { key: 'software', value: '4.3.0' },
  { key: 'management-ip', value: '15.213.65.157', render: 'Management-IP' },
  { key: 'WWN', value: "2FF7 0002 AC07 E217", render: 'WWN' },
  { key: 'uptime', value: '137 days, 9 hours, 53 minutes' },
  { key: 'cpu', value: '21%', render: 'CPU' },
  { key: 'volume sets', value: 8 },
  { key: 'volumes', value: 32 }
];

export const PropertiesGeneral = ({ ...rest }) => {
  return (
    <PropertiesPane
      heading="General"
      level={2}
      properties={properties}
      {...rest}
    />
  );
}
