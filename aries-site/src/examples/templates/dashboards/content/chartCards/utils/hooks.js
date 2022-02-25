import { useEffect, useMemo, useState } from 'react';
import {
  convertDatesToFeatures,
  defaultWindow,
  linearRegression,
  mean,
  REPORT_WINDOW_MAP,
} from '.';

// calculate cost stats
export const useCost = values => {
  const costs = useMemo(() => {
    let meanCost = null;
    let lastMonthCost = null;
    let projectedCost = null;

    const datapoints = [];
    if (values) {
      Object.keys(values).forEach(key => {
        datapoints.push({ x: values[key].key, y: values[key].value });
      });

      meanCost = mean(datapoints.map(point => point.y));
      lastMonthCost = datapoints[datapoints.length - 1].y;

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
            `${nextMonth.getMonth() +
              1}/${nextMonth.getDate()}/${nextMonth.getFullYear()}`,
          ) +
        b;
      projectedCost = costNextMonth.toFixed(2);
    }

    return { meanCost, lastMonthCost, projectedCost };
  }, [values]);

  return costs;
};

// Filter and assemble data set. Limit consumptionData to datapoints within
// the reportWindow range. Create data set which sums spend by month.
export const useSpendByMonth = (consumptionData, reportWindow) => {
  const values = useMemo(() => {
    const nextValues = [];
    if (consumptionData) {
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
    }
    return nextValues;
  }, [consumptionData, reportWindow.begin, reportWindow.end]);

  return values;
};

export const useReportWindow = period => {
  const [reportWindow, setReportWindow] = useState(defaultWindow);
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

  return reportWindow;
};

// ensure component is mounted before trying to access
// browser's Navigator
export const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
};
