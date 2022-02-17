const current = new Date();
const endDate = current;
const beginDate = new Date(new Date().setDate(current.getDate() - 365));

export const defaultWindow = { begin: beginDate, end: endDate };

export const REPORT_WINDOW_MAP = {
  'Last 30 Days': 30,
  'Last Year': 365,
  Lifetime: 365 * 20,
};
