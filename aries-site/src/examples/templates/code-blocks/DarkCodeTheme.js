import { colors } from 'grommet-theme-hpe';

export const DarkCodeTheme = {
    'code[class*="language-"]': {
        'color': colors.text.dark,
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
        'color': colors.text.dark,
        'background': 'black',
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
        'background': 'black',
        'padding': '0.1em',
        'borderRadius': '0.3em',
        'whiteSpace': 'normal',
    },
    'class-name': {
        'color': colors['status-critical'].light,
    },
    'maybe-class-name': {
        'color': colors.purple.light,
    },
    'comment': {
        'color': colors['status-unknown'].light,
    },
    'function': {
        'color': colors['status-critical'].light,
    },
    'operator': {
        'color': colors.orange.light,
    },
    'string': {
        'color': colors['teal!'],
    },
    'boolean': {
        'color': colors['teal!'],
    },
    'number': {
        'color': colors['teal!'],
    },
    'keyword': {
        'color': colors.blue.light,
    },

    'selector': {
        'color': colors['teal!'],
    },
    'attr-name': {
        'color': colors['teal!'],
    },
    'char': {
        'color': colors['teal!'],
    },
    'builtin': {
        'color': colors['teal!'],
    },
    'inserted': {
        'color': colors['teal!'],
    },
    'entity': {
        'color': colors.blue.light,
        'cursor': 'help',
    },
    'url': {
        'color': colors.blue.light,
    },
    '.language-css .token.string': {
        'color': colors.blue.light,
    },
    '.style .token.string': {
        'color': colors.blue.light,
    },
    'variable': {
        'color': colors.blue.light,
    },
    'atrule': {
        'color': colors.orange.light,
    },
    'attr-value': {
        'color': colors.orange.light,
    },
    
    'regex': {
        'color': colors.orange.light,
    },
    'important': {
        'color': colors.orange.light,
        'fontWeight': 'bold',
    },
    'bold': {
        'fontWeight': 'bold',
    },
    'italic': {
        'fontStyle': 'italic',
    },
};
