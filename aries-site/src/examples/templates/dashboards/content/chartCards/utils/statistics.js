/* Utility functions for statistics used in charting */

export const mean = series =>
  series.reduce((acc, cur) => acc + cur, 0) / series.length;

export const linearRegression = pairs => {
  /* Finds the linear regression formula using least-squares method
   * https://en.wikipedia.org/wiki/Simple_linear_regression#Fitting_the_regression_line
   * https://en.wikipedia.org/wiki/Ordinary_least_squares#Linear_model
   */

  if (typeof pairs[0].x !== 'number') {
    console.error(
      `${pairs[0].x} is not of type === 'number'. Linear regression
requires categorical variables (e.g. dates) to be converted to numerical
representations.`,
    );
    return undefined;
  }

  const n = pairs.length;
  const independents = pairs.map(pair => {
    if (typeof pair.x !== 'number') {
      console.error(
        `${pair.x} is not of type === 'number'. Linear regression
requires categorical variables (e.g. dates) to be converted to numerical
representations.`,
      );
    }
    return pair.x;
  });
  const dependendents = pairs.map(pair => pair.y);
  const sumX = independents.reduce((acc, cur) => acc + cur, 0);
  const sumY = dependendents.reduce((acc, cur) => acc + cur, 0);
  const sumXX = independents.reduce((acc, cur) => acc + cur * cur, 0);
  const sumXY = pairs.reduce((acc, cur) => acc + cur.x * cur.y, 0);
  const sumYY = dependendents.reduce((acc, cur) => acc + cur * cur, 0);
  // console.log(sumX, sumY, sumXX, sumXY, sumYY);

  /* y = mx + b */
  const m = (n * sumXY - sumX * sumY) / (n * sumXX - sumX ** 2);
  const b = (sumY - m * sumX) / n;
  const regressionLine = `y = ${m}x + ${b}`;
  /* correlation coefficient */
  const r =
    (n * sumXY - sumX * sumY) /
    (Math.sqrt(n * sumXX - sumX ** 2) * Math.sqrt(n * sumYY - sumY ** 2));
  /* coefficient of determination - proportion of the variation in the
   * dependent variable that is predictable from the independent variable(s)
   * (i.e. how well does the line fit the data?) https://en.wikipedia.org/wiki/Coefficient_of_determination
   */
  const r2 = r ** 2;
  return { regressionLine, m, b, r2 };
};

// Input array of date strings and a period. Outputs object of key-value
// mappings, where the key is the date string and the value is a
// numerical value representing each date period in the range provided;
export const convertDatesToFeatures = (
  dates,
  period = 'month',
  futurePeriods = 0,
) => {
  const PERIOD_TYPES = ['month', 'year'];

  if (!PERIOD_TYPES.includes(period)) {
    console.error(
      `Period of '${period}' is not currently supported. Implementation
currently supports one of [${PERIOD_TYPES.map(type => `'${type}'`)}].`,
    );
  }
  dates.sort((a, b) => new Date(a) - new Date(b));
  const max = dates[dates.length - 1];
  const min = dates[0];
  const maxYear = new Date(max).getFullYear();
  const minYear = new Date(min).getFullYear();
  const maxMonth = new Date(max).getMonth();
  const minMonth = new Date(min).getMonth();
  const yearsDelta = maxYear - minYear;
  // +1's compensate for 0 based month index
  const monthsDelta = maxMonth + 1 - minMonth + 1;
  let periods;
  const normalizedDates = new Map();

  if (period === 'month') {
    periods = yearsDelta * 12 + monthsDelta * 1 + futurePeriods - 1;

    for (let i = 0; i < periods; i += 1) {
      // 0 gets last day in previous month; + 1 to get last day of minMonth.
      const date = new Date(minYear, minMonth + 1 + i, 0);

      normalizedDates.set(
        `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
        i,
      );
    }
  } else if (period === 'year') {
    periods = yearsDelta + 1 + futurePeriods - 1;
    for (let i = 0; i < periods; i += 1) {
      // 0 gets last day in month
      const date = new Date(minYear + i, 12, 0);

      normalizedDates.set(`${date.getFullYear()}`, i);
    }
  }

  return normalizedDates;
};
