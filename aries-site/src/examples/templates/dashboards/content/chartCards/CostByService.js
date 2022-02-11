import { useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Meter, ResponsiveContext, ThemeContext } from 'grommet';
import { ChartCard, Legend, Measure } from '../../components';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

const current = new Date();
const endDate = current;
const beginDate = new Date(new Date().setDate(current.getDate() - 365));

const defaultWindow = { begin: beginDate, end: endDate };

const REPORT_WINDOW_MAP = {
  'Last 30 Days': 30,
  'Last Year': 365,
};

export const CostByService = ({ period }) => {
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
          nextValues.push({
            label: `${datum.service[0].toLocaleUpperCase()}${datum.service
              .slice(1)
              .toLocaleLowerCase()}`,
            value: parseFloat(datum.cost.replace(/[$,]/gm, '')),
            displayValue: datum.cost,
            color: undefined,
          });
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
    <ChartCard title="Cost by Service" subtitle={period}>
      {values && (
        <Grid
          columns={grid.columns}
          rows={grid.rows}
          areas={grid.areas[size]}
          gap={grid.gap[size]}
        >
          <Box gridArea="chart" alignSelf="start">
            <Meter
              values={values.map(value => ({
                label: value.label,
                value: value.value,
              }))}
              type="pie"
              size="full"
            />
          </Box>
          <Measure
            gridArea="measure"
            alignSelf="center"
            name={{ label: { label: 'Total Cost', size: 'medium' } }}
            value={{
              value: Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(totalCost),
              size: 'xlarge',
            }}
          />
          <Legend gridArea="legend" values={values} />
        </Grid>
      )}
    </ChartCard>
  );
};

CostByService.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days']),
};
