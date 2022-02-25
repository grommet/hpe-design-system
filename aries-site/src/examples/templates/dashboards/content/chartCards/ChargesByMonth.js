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

export const ChargesByMonth = ({ period }) => {
  const reportWindow = useReportWindow(period);
  const consumptionData = MOCK_DATA.consumption;
  const values = useSpendByMonth(consumptionData, reportWindow);
  const { lastMonthCost } = useCost(values);

  // ensure component is mounted before trying to access
  // browser's Navigator
  const mounted = useMounted();

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
          {mounted && (
            <>
              <MonthlySpend
                gridArea="chart"
                reportWindow={reportWindow}
                data={values}
              />
              <Measure
                gridArea="measure"
                name={{
                  label: { label: 'Last Month', size: 'medium' },
                }}
                value={{
                  value: formatCurrency(lastMonthCost, Navigator.language),
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

ChargesByMonth.propTypes = {
  period: PropTypes.oneOf(['Last 30 Days', 'Last Year', 'Lifetime']),
};
