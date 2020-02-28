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
    regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    message: "Email address doesn't look quite right",
    status: 'error',
  },
];

export const passwordValidation = [
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
