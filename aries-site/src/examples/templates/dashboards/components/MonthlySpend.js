import React from 'react';
import PropTypes from 'prop-types';
import { DataChart, Text } from 'grommet';
import { formatCurrency } from '../content/chartCards/utils';

export const MonthlySpend = ({ color, data: dataProp, ...rest }) => {
  const data = dataProp.map(datum => ({ date: datum.key, cost: datum.value }));

  return (
    <DataChart
      data={data}
      series={[
        {
          property: 'date',
          label: 'Month',
          render: value => (
            <Text>
              {new Date(value).toLocaleDateString(Navigator.language, {
                month: 'short',
                year: 'numeric',
              })}
            </Text>
          ),
        },
        {
          property: 'cost',
          label: 'Spend',
          prefix: '$',
          render: value => <Text>{formatCurrency(value)}</Text>,
        },
      ]}
      axis={{
        x: { property: 'date', granularity: 'medium' },
        y: { property: 'cost', granularity: 'medium' },
      }}
      chart={{
        property: 'cost',
        thickness: 'small',
        color,
      }}
      detail
      guide={{ y: { granularity: 'fine' } }}
      size={{ width: 'fill' }}
      {...rest}
    />
  );
};

MonthlySpend.propTypes = {
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
  data: PropTypes.arrayOf(PropTypes.object),
};
