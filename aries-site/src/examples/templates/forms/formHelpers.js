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
