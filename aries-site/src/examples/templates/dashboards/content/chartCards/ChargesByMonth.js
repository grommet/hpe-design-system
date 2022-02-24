import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, DataChart, Text } from 'grommet';
import { ChartCard, Measure } from '../../components';
import { defaultWindow, formatCurrency, REPORT_WINDOW_MAP } from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const ChargesByMonth = ({ period }) => {
  const [values, setValues] = useState(null);
  const [reportWindow, setReportWindow] = useState(defaultWindow);

  const consumptionData = MOCK_DATA.consumption;

  // Set reporting window
  useEffect(() => {
    setReportWindow(prevWindow => ({
      ...prevWindow,
      begin: new Date(
        new Date().setDate(
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
          const key = datum.endDate;
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
      nextValues.sort((a, b) => b.key - a.key);
      setValues(nextValues);
    }
  }, [consumptionData, reportWindow.begin, reportWindow.end]);

  const grid = {
    columns: ['auto'],
    rows: ['auto', 'auto'],
    areas: [['measure'], ['chart']],
    gap: 'medium',
  };

  return (
    <ChartCard title="Monthly Charges" subtitle="Billing">
      {values && (
        <Grid
          columns={grid.columns}
          rows={grid.rows}
          areas={grid.areas}
          gap={grid.gap}
        >
          <MonthlySpend
            gridArea="chart"
            reportWindow={reportWindow}
            data={values}
          />
          <Measure
            gridArea="measure"
            name={{ label: { label: 'Last Month', size: 'medium' } }}
            value={{
              value: formatCurrency(
                values[values.length - 1].value,
                Navigator.language,
              ),
              size: 'xlarge',
            }}
          />
        </Grid>
      )}
    </ChartCard>
  );
};

ChargesByMonth.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};

const MonthlySpend = ({ data: dataProp, ...rest }) => {
  const data = dataProp.map(datum => ({
    date: datum.key,
    cost: datum.value,
  }));

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
      }}
      detail
      guide={{ y: { granularity: 'fine' } }}
      size={{ width: 'fill' }}
      {...rest}
    />
  );
};

MonthlySpend.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};
