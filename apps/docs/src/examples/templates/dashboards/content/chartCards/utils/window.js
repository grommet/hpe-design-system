// eslint-disable-next-line max-len
const mockAccountData = require('../../../../../../data/mockData/accounts.json');

// Date examples should use to represent "today's date". Since mock data
// is currently static, chose a fixed date which aligns with the data.
export const DEMO_DATE = new Date('2022-02-22');
const accountCreatedDate =
  mockAccountData.accounts.find(account => account.createdDate)?.createdDate ||
  DEMO_DATE.toISOString();
const current = DEMO_DATE;
const endDate = current;
const beginDate = new Date(new Date().setDate(current.getDate() - 365));

export const defaultWindow = { begin: beginDate, end: endDate };

export const REPORT_WINDOW_MAP = {
  'Last 30 Days': 30,
  'Last Year': 365,
  Lifetime: 365 * (current.getFullYear() - 
  new Date(accountCreatedDate).getFullYear() + 1),
};
