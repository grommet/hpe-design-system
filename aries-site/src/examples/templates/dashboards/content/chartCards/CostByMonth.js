import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Chart,
  ResponsiveContext,
  Stack,
  Text,
  ThemeContext,
} from 'grommet';
import { parseMetricToNum } from 'grommet/utils';
import { ChartCard, Legend, Measure } from '../../components';
import { defaultWindow, formatCurrency, REPORT_WINDOW_MAP } from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostByMonth = ({ period }) => {
  const [values, setValues] = useState(null);
  const [totalCost, setTotalCost] = useState(null);
  const [reportWindow, setReportWindow] = useState(defaultWindow);
  const [activeDataPoint, setActiveDataPoint] = useState(null);
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
          const key = datum.endDate;
          const value = parseFloat(datum.cost.replace(/[$,]/gm, ''));
          const index = nextValues.findIndex(el => el.key === key);

          if (index >= 0) {
            const nextValue = nextValues[index].value + value;
            nextValues[index].value = nextValue;
            nextValues[index].displayValue = formatCurrency(nextValue);
          } else {
            nextValues.push({
              key,
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
        ['measure', 'projection'],
        ['chart', 'chart'],
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
    <ChartCard title="Cost by Month" subtitle={period}>
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
              max: `${parseMetricToNum(theme.global.size.small) +
                parseMetricToNum(theme.global.size.xsmall)}px`,
            }}
          >
            <Stack guidingChild="first" interactiveChild="first">
              <Chart
                bounds={[
                  [new Date(reportWindow.begin), new Date(reportWindow.end)],
                  [0, 32000],
                ]}
                values={values.map(v => ({
                  label: v.displayValue,
                  value: [new Date(v.key), v.value],
                  onHover: over => {
                    setActiveDataPoint(
                      over
                        ? {
                            label: new Date(v.key).toLocaleDateString('en-US', {
                              month: 'short',
                              year: 'numeric',
                            }),
                            value: v.displayValue,
                          }
                        : null,
                    );
                  },
                }))}
                type="bar"
              />
              {activeDataPoint && (
                <Box align="center" justify="center">
                  <Box
                    background="background-front"
                    border
                    round="xsmall"
                    pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
                  >
                    <Text weight="bold">{activeDataPoint.value}</Text>
                    <Text size="small">{activeDataPoint.label}</Text>
                  </Box>
                </Box>
              )}
            </Stack>
          </Box>
          <Measure
            gridArea="measure"
            alignSelf="center"
            name={{ label: { label: 'Monthly Average', size: 'medium' } }}
            value={{
              value: formatCurrency(totalCost),
              size: 'xlarge',
            }}
          />
          <Measure
            gridArea="projection"
            alignSelf="center"
            name={{ label: { label: 'Projected, Next Month', size: 'medium' } }}
            value={{
              value: formatCurrency(totalCost),
              size: 'xlarge',
            }}
          />
        </Grid>
      )}
    </ChartCard>
  );
};

CostByMonth.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year']),
};
