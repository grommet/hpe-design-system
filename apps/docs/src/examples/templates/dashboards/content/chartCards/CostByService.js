import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Meter,
  NameValueList,
  ResponsiveContext,
  ThemeContext,
} from 'grommet';
import { parseMetricToNum } from 'grommet/utils';
import { ChartCard, Legend, Measure } from '../../components';
import {
  defaultWindow,
  formatCurrency,
  DEMO_DATE,
  REPORT_WINDOW_MAP,
} from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostByService = ({ period, notification }) => {
  const [values, setValues] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [reportWindow, setReportWindow] = useState(defaultWindow);
  const consumptionData = MOCK_DATA.consumption;
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const chartColors = useMemo(
    () =>
      Object.entries(theme.global.colors)
        .filter(([key]) => key.includes('graph'))
        .map(([, value]) => value),
    [theme.global.colors],
  );

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
          const key = datum.service;
          const value = parseFloat(datum.cost.replace(/[$,]/gm, ''));
          const index = nextValues.findIndex(el => el.key === key);

          if (index >= 0) {
            const nextValue = nextValues[index].value + value;
            nextValues[index].value = nextValue;
            nextValues[index].displayValue = formatCurrency(nextValue);
          } else {
            nextValues.push({
              key,
              label: `${datum.service[0].toLocaleUpperCase()}${datum.service
                .slice(1)
                .toLocaleLowerCase()}`,
              value,
              displayValue: formatCurrency(value),
              color: undefined,
            });
          }
        }
      });
      nextValues
        .sort((a, b) => b.value - a.value)
        .forEach((value, index) => {
          // eslint-disable-next-line no-param-reassign
          value.color = chartColors[index % chartColors.length];
        });
      setValues(nextValues);
    }
  }, [chartColors, consumptionData, reportWindow.begin, reportWindow.end]);

  // Calculate total cost
  useEffect(() => {
    let nextTotalCost = 0;
    if (values) {
      Object.keys(values).forEach(key => {
        nextTotalCost += values[key].value;
      });
      setTotalCost(nextTotalCost);
    }
  }, [values]);

  const grid = {
    columns: ['auto', 'auto'],
    rows: ['auto', 'auto'],
    areas: {
      xsmall: [
        ['chart', 'measure'],
        ['chart', 'legend'],
      ],
      small: [
        ['chart', 'measure'],
        ['chart', 'legend'],
      ],
      medium: [
        ['chart', 'measure'],
        ['chart', 'legend'],
      ],
      large: [
        ['chart', 'measure'],
        ['legend', 'legend'],
      ],
      xlarge: [
        ['chart', 'measure'],
        ['chart', 'legend'],
      ],
    },
    gap: {
      xsmall: 'medium',
      small: 'medium',
      medium: 'small',
      large: 'medium',
      xlarge: 'medium',
    },
  };

  return (
    <ChartCard title="Cost by service" subtitle={period}>
      <Box gap="medium">
        {notification}
        {values && (
          <Grid
            columns={grid.columns}
            rows={grid.rows}
            areas={grid.areas[size]}
            gap={grid.gap[size]}
          >
            <Box
              gridArea="chart"
              alignSelf="start"
              height={{
                max: `${
                  parseMetricToNum(theme.global.size.small) +
                  parseMetricToNum(theme.global.size.xsmall)
                }px`,
              }}
            >
              <Meter
                values={values.map(value => ({
                  label: value.label,
                  value: value.value,
                }))}
                type="pie"
                size="full"
              />
            </Box>
            <NameValueList
              valueProps={{ width: ['3xsmall', 'auto'] }}
              pairProps={{ direction: 'column' }}
              layout="grid"
              gridArea="measure"
            >
              <Measure
                name={{ label: { label: 'Total Cost', size: 'medium' } }}
                value={{
                  value: formatCurrency(totalCost),
                  size: 'xlarge',
                }}
              />
            </NameValueList>
            <Legend gridArea="legend" values={values} />
          </Grid>
        )}
      </Box>
    </ChartCard>
  );
};

CostByService.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year']),
  notification: PropTypes.element,
};
