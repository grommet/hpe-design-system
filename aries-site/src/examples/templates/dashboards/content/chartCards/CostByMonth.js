import PropTypes from 'prop-types';
import { Grid } from 'grommet';
import { ChartCard, Measure, MonthlySpend } from '../../components';
import {
  formatCurrency,
  useCost,
  useSpendByMonth,
  useMounted,
  useReportWindow,
} from './utils';

const MOCK_DATA = require('../../../../../data/mockData/consumption.json');

export const CostByMonth = ({ period }) => {
  const reportWindow = useReportWindow(period);
  const consumptionData = MOCK_DATA.consumption;
  const values = useSpendByMonth(consumptionData, reportWindow);
  const { meanCost, projectedCost } = useCost(values);

  // ensure component is mounted before trying to access
  // browser's Navigator
  const mounted = useMounted();

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
    <ChartCard title="Cost by Month" subtitle={period}>
      {values && (
        <Grid
          columns={grid.columns}
          rows={grid.rows}
          areas={grid.areas}
          gap={grid.gap}
        >
          {mounted && (
            <>
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
            </>
          )}
        </Grid>
      )}
    </ChartCard>
  );
};

CostByMonth.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};
