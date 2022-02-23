import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Meter,
  ResponsiveContext,
  Stack,
  ThemeContext,
} from 'grommet';
import { parseMetricToNum } from 'grommet/utils';
import { ChartCard, Legend, Measure } from '../../components';
import { defaultWindow, formatCurrency, REPORT_WINDOW_MAP } from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostCompact = ({ period }) => {
  const [values, setValues] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [reportWindow, setReportWindow] = useState(defaultWindow);
  const [active, setActive] = useState();
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
    columns: {
      xsmall: [['xsmall', 'small'], 'auto'],
      small: [['xsmall', 'small'], 'auto'],
      medium: ['auto', 'auto'],
      large: ['auto', 'auto'],
      xlarge: ['auto', 'auto'],
    },
    rows: [['auto']],
    areas: {
      xsmall: [['chart', 'legend']],
      small: [['chart', 'legend']],
      medium: [['chart', 'legend']],
      large: [['chart', 'legend']],
      xlarge: [['chart', 'legend']],
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
    <ChartCard title="Cost" subtitle="Consumption Analytics">
      {values && (
        <Grid
          columns={grid.columns[size]}
          rows={grid.rows}
          areas={grid.areas[size]}
          gap={grid.gap[size]}
          pad={{ top: 'medium' }}
        >
          <Stack alignSelf="start" gridArea="chart" anchor="center">
            <Box
              alignSelf="start"
              height={{
                max: `${parseMetricToNum(theme.global.size.small) +
                  parseMetricToNum(theme.global.size.xsmall)}px`,
              }}
            >
              <Meter
                values={values.map((value, index) => ({
                  label: value.label,
                  value: value.value,
                  color: {
                    color: chartColors[index % chartColors.length],
                    opacity:
                      !active || (active && active === value) ? '100%' : 'weak',
                  },
                }))}
                size="full"
                type="circle"
              />
            </Box>
            <Measure
              alignSelf="center"
              align="center"
              direction="column-reverse"
              name={{ label: { label: period, size: 'xsmall' } }}
              value={{
                value: formatCurrency(active ? active.value : totalCost),
                size: 'xlarge',
              }}
              justify="center"
              width="xsmall"
            />
          </Stack>
          <Legend
            alignSelf="center"
            gridArea="legend"
            mode="compact"
            onClick={datum => setActive(active !== datum ? datum : undefined)}
            values={values}
          />
        </Grid>
      )}
    </ChartCard>
  );
};

CostCompact.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year']),
};
