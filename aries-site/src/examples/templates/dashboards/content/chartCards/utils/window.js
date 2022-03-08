// eslint-disable-next-line max-len
const mockAccountData = require('../../../../../../data/mockData/accounts.json');

const account = mockAccountData.accounts.find(
  a => a.id === '407f1f7g6ty86cd56te3903y',
);

// Date examples should use to represent "today's date". Since mock data
// is currently static, chose a fixed date which aligns with the data.
export const DEMO_DATE = new Date('2022-02-22');
const current = DEMO_DATE;
const endDate = current;
const beginDate = new Date(new Date().setDate(current.getDate() - 365));

export const defaultWindow = { begin: beginDate, end: endDate };

export const REPORT_WINDOW_MAP = {
  'Last 30 Days': 30,
  'Last Year': 365,
  Lifetime:
    365 *
    (current.getFullYear() - new Date(account.createdDate).getFullYear() + 1),
};
