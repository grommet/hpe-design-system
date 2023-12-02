import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, DataChart, Text } from 'grommet';
import { ChartCard, Measure } from '../../components';
import {
  convertDatesToFeatures,
  defaultWindow,
  formatCurrency,
  linearRegression,
  mean,
  DEMO_DATE,
  REPORT_WINDOW_MAP,
} from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostByMonth = ({ period }) => {
  const [values, setValues] = useState(null);
  const [meanCost, setMeanCost] = useState(null);
  const [projectedCost, setProjectedCost] = useState(null);
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

  // Calculate cost stats
  useEffect(() => {
    const datapoints = [];
    if (values?.length) {
      Object.keys(values).forEach(key => {
        datapoints.push({ x: values[key].key, y: values[key].value });
      });

      setMeanCost(mean(datapoints.map(point => point.y)));

      const lastMonth = new Date(datapoints[datapoints.length - 1].x);
      // Want last month +1, but also need to compensate for 0-based index,
      // therefor +2.
      const nextMonth = new Date(
        lastMonth.getMonth() === 11
          ? lastMonth.getFullYear() + 1
          : lastMonth.getFullYear(),
        (lastMonth.getMonth() + 2) % 12,
        0,
      );
      /* Project next month's cost by fitting a regression line to our
       * data. Dates are converted to numerical representations so that
       * least-squares regression can interpret dates as the dependent
       * variable. */
      const dateMap = convertDatesToFeatures(
        datapoints.map(point => point.x),
        'month',
        3,
      );
      /* y = mx + b, where y = projected cost, x = month, m = slope,
       * and b = intercept. */
      const { m, b } = linearRegression(
        datapoints.map(point => ({
          x: dateMap.get(point.x),
          y: point.y,
        })),
      );
      const costNextMonth =
        m *
          dateMap.get(
            `${
              nextMonth.getMonth() + 1
            }/${nextMonth.getDate()}/${nextMonth.getFullYear()}`,
          ) +
        b;
      setProjectedCost(costNextMonth.toFixed(2));
    }
  }, [values]);

  const grid = {
    columns: ['auto', 'auto'],
    rows: ['auto', 'auto'],
    areas: [
      ['measure', 'projection'],
      ['chart', 'chart'],
    ],
    gap: 'medium',
  };

  return (
    <ChartCard title="Cost by month" subtitle={period}>
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
            name={{ label: { label: 'Monthly Average', size: 'medium' } }}
            value={{
              value: formatCurrency(meanCost, Navigator.language),
              size: 'xlarge',
            }}
          />
          <Measure
            gridArea="projection"
            name={{
              label: { label: 'Projected, Next Month', size: 'medium' },
            }}
            value={{
              value: formatCurrency(projectedCost, Navigator.language),
              size: 'xlarge',
            }}
          />
        </Grid>
      )}
    </ChartCard>
  );
};

CostByMonth.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};

const MonthlySpend = ({ data: dataProp, ...rest }) => {
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
      chart={{ property: 'cost', thickness: 'small' }}
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
