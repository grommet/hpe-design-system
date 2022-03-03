import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { DataChart, Text } from 'grommet';
import { ChartCard } from '../../components';
import {
  defaultWindow,
  formatCurrency,
  DEMO_DATE,
  REPORT_WINDOW_MAP,
} from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostByYear = ({ period }) => {
  const [values, setValues] = useState(null);
  const [reportWindow, setReportWindow] = useState(defaultWindow);

  const consumptionData = MOCK_DATA.consumption;

  // Set reporting window
  useEffect(() => {
    setReportWindow(prevWindow => ({
      ...prevWindow,
      begin: new Date(
        new Date(DEMO_DATE).setDate(
          prevWindow.end.getDate() - REPORT_WINDOW_MAP[period],
        ),
      ),
    }));
  }, [period]);

  // Filter and assemble data set
  useEffect(() => {
    if (consumptionData) {
      const nextValues = [];
      consumptionData.forEach(datum => {
        const dataPointDate = new Date(datum.endDate);
        if (
          dataPointDate > reportWindow.begin &&
          dataPointDate < reportWindow.end
        ) {
          const key = datum.year;
          const value = parseFloat(datum.cost.replace(/[$,]/gm, ''));
          const index = nextValues.findIndex(el => el.key === key);

          if (index === -1) {
            nextValues.push({
              key,
              value,
            });
          } else {
            const nextValue = (
              parseFloat(nextValues[index].value) + parseFloat(value)
            ).toFixed(2);
            nextValues[index].value = Number(nextValue);
          }
        }
      });
      nextValues.sort((a, b) => a.key - b.key);
      setValues(nextValues);
    }
  }, [consumptionData, reportWindow.begin, reportWindow.end]);

  return (
    <ChartCard title="Annual Spend" subtitle={period}>
      {values && <AnnualSpend reportWindow={reportWindow} data={values} />}
    </ChartCard>
  );
};

CostByYear.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};

const AnnualSpend = ({ data: dataProp, ...rest }) => {
  const data = dataProp.map(datum => ({ date: datum.key, cost: datum.value }));

  return (
    <DataChart
      data={data}
      series={[
        {
          property: 'date',
          label: 'Year',
          render: value => <Text>{value}</Text>,
        },
        {
          property: 'cost',
          label: 'Spend',
          render: value => <Text>{formatCurrency(value)}</Text>,
        },
      ]}
      axis={{
        x: { property: 'date', granularity: 'medium' },
        y: { property: 'cost', granularity: 'medium' },
      }}
      chart={{ property: 'cost', thickness: 'xxsmall', type: 'line' }}
      detail
      guide={{ y: { granularity: 'fine' } }}
      margin={{ right: 'medium' }}
      {...rest}
    />
  );
};

AnnualSpend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
