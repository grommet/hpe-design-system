export const emailMask = [
  {
    regexp: /^[\w\-_.]+$/,
    placeholder: 'jane.smith',
  },
  { fixed: '@' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'hpe',
  },
  { fixed: '.' },
  {
    regexp: /^[\w]+$/,
    placeholder: 'com',
  },
];

// Add validation for the date
/* Check the date in which is passed in the form 
  since the date is not a full date we need to add
  the beginning of 20 to make it in format YYYY
  dates in starting in 2000 need the full formate YYYY
  https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  
*/

const currentDate = new Date();
export const dateValidation = [
  date => {
    const expireDate = date.split('/').reverse();
    expireDate.splice(0, 0, '20');
    const newYear = expireDate[0] + expireDate[1];
    expireDate.splice(0, 2, newYear);
    const expires = new Date(expireDate);
    if (
      expires.getMonth() < currentDate.getMonth() &&
      expires.getFullYear() <= currentDate.getFullYear()
    )
      return { message: 'invalid date', status: 'error' };
    return undefined;
  },
];

export const dateMask = [
  {
    length: [1, 2],
    options: Array.from({ length: 12 }, (v, k) => k + 1),
    regexp: /^1[0,1-2]$|^0?[1-9]$|^0$/,
    placeholder: 'MM',
  },
  { fixed: '/' },
  {
    length: 2,
    options: Array.from({ length: 6 }, (v, k) => 20 + k),
    regexp: /^2[0,1-5]$|^2?$/,
    placeholder: 'YY',
  },
];

export const cvvMask = [
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: '123',
  },
];

const creditCardRegExp = /^[0-9]{1,4}$/;

export const creditCardMask = [
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
  { fixed: ' ' },
  {
    length: 4,
    regexp: creditCardRegExp,
    placeholder: '0000',
  },
];

export const emailValidation = [
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    message: 'Missing an @?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: 'Missing an .?',
    status: 'info',
  },
  {
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: "Email address doesn't look quite right",
    status: 'error',
  },
];

export const passwordRulesStrong = [
  {
    regexp: new RegExp('(?=.*?[A-Z])'),
    message: 'At least one uppercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[a-z])'),
    message: 'At least one lowercase English letter',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[0-9])'),
    message: 'At least one number',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
  {
    regexp: new RegExp('.{8,}'),
    message: 'At least eight characters',
    status: 'error',
  },
];

export const passwordRulesWeak = [
  {
    regexp: new RegExp('.{4,}'),
    message: 'At least four characters',
    status: 'error',
  },
  {
    regexp: new RegExp('(?=.*?[#?!@$ %^&*-])'),
    message: 'At least one special character or space',
    status: 'error',
  },
];

export const phoneMask = [
  { fixed: '(' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'XXX',
  },
  { fixed: ')' },
  { fixed: ' ' },
  {
    length: 3,
    regexp: /^[0-9]{1,3}$/,
    placeholder: 'XXX',
  },
  { fixed: '-' },
  {
    length: 4,
    regexp: /^[0-9]{1,4}$/,
    placeholder: 'XXXX',
  },
];

export const states = [
  'AK',
  'AL',
  'AR',
  'AZ',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'IA',
  'ID',
  'IL',
  'IN',
  'KS',
  'KY',
  'LA',
  'MA',
  'ME',
  'MD',
  'MN',
  'MO',
  'MS',
  'MT',
  'NC',
  'ND',
  'NE',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NV',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VA',
  'VT',
  'WA',
  'WI',
  'WV',
  'WY',
];
