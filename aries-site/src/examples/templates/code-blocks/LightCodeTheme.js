import { colors } from 'grommet-theme-hpe';

export const LightCodeTheme = {
    'code[class*="language-"]': {
        'color': colors.text.light,
        'background': 'none',
        'textAlign': 'left',
        'whiteSpace': 'pre',
        'wordSpacing': 'normal',
        'wordBreak': 'normal',
        'wordWrap': 'normal',
        'lineHeight': '1.5',
        'MozTabSize': '4',
        'OTabSize': '4',
        'tabSize': '4',
        'WebkitHyphens': 'none',
        'MozHyphens': 'none',
        'msHyphens': 'none',
        'hyphens': 'none',
    },
    'pre[class*="language-"]': {
        'color': colors.text.light,
        'background': colors['background-contrast'].light,
        'textAlign': 'left',
        'whiteSpace': 'pre',
        'wordSpacing': 'normal',
        'wordBreak': 'normal',
        'wordWrap': 'normal',
        'lineHeight': '1.5',
        'MozTabSize': '4',
        'OTabSize': '4',
        'tabSize': '4',
        'WebkitHyphens': 'none',
        'MozHyphens': 'none',
        'msHyphens': 'none',
        'hyphens': 'none',
        'padding': '1em',
        'margin': '0.5em 0',
        'overflow': 'auto',
        'borderRadius': '0.3em',
    },
    ':not(pre) > code[class*="language-"]': {
        'background': colors['background-contrast'].light,
        'padding': '0.1em',
        'borderRadius': '0.3em',
        'whiteSpace': 'normal',
    },
    'class-name': {
        'color': colors.red.dark,
    },
    'maybe-class-name': {
        'color': colors['purple!'],
    },
    'comment': {
        'color': colors['status-unknown'].dark,
    },
    'function': {
        'color': colors.red.dark,
    },
    'operator': {
        'color': colors.orange.dark,
    },
    'string': {
        'color': colors.teal.dark,
    },
    'boolean': {
        'color': colors.teal.dark,
    },
    'number': {
        'color': colors.teal.dark,
    },
    'keyword': {
        'color': colors.blue.dark,
    },
    'selector': {
        'color': colors.teal.dark,
    },
    'attr-name': {
        'color': colors.teal.dark,
    },
    'char': {
        'color': colors.teal.dark,
    },
    'builtin': {
        'color': colors.teal.dark,
    },
    'inserted': {
        'color': colors.teal.dark,
    },
    'entity': {
        'color': colors.blue.dark,
        'cursor': 'help',
    },
    'url': {
        'color': colors.blue.dark,
    },
    '.language-css .token.string': {
        'color': colors.blue.dark,
    },
    '.style .token.string': {
        'color': colors.blue.dark,
    },
    'variable': {
        'color': colors.blue.dark,
    },
    'atrule': {
        'color': colors.orange.dark,
    },
    'attr-value': {
        'color': colors.orange.dark,
    },
    'regex': {
        'color': colors.orange.dark,
    },
    'important': {
        'color': colors.orange.dark,
        'fontWeight': 'bold',
    },
    'bold': {
        'fontWeight': 'bold',
    },
    'italic': {
        'fontStyle': 'italic',
    },
};
