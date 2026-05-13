import { deepMerge } from 'grommet/utils';
import { themes } from '../../themes/theme';

// Re-implement the theme's private getThemeColor utility
const getThemeColor = (color, theme) =>
  theme.global?.colors?.[color]?.[theme.dark ? 'dark' : 'light'] || color;

// Capture the original extend functions BEFORE the merge so closures work correctly
const origFormFieldExtend = themes.v2.formField?.extend;
const origCheckBoxHoverExtend = themes.v2.checkBox?.hover?.extend;
const origCheckBoxCheckExtend = themes.v2.checkBox?.check?.extend;

// Shared checkbox overrides used by both Option 2 and Option 3.
// - Suppresses the background fill on unchecked hover (check.extend rebuilt from scratch
//   so the &:hover { background } rule is never emitted for unchecked state).
// - Explicitly darkens the control border on unchecked hover.
// - Preserves all existing behaviour for checked, indeterminate, switch, and radio.
const checkBoxNoFill = {
  check: {
    extend: props => {
      const { checked, indeterminate } = props;
      if (!checked && !indeterminate) {
        return `background: transparent;`;
      }
      return typeof origCheckBoxCheckExtend === 'function'
        ? origCheckBoxCheckExtend(props)
        : origCheckBoxCheckExtend || '';
    },
  },
  hover: {
    background: { color: 'transparent' },
    extend: props => {
      const { theme, toggle, checked } = props;
      if (!checked && !toggle) {
        return `border-color: ${getThemeColor('border-strong', theme)};`;
      }
      return typeof origCheckBoxHoverExtend === 'function'
        ? origCheckBoxHoverExtend(props)
        : origCheckBoxHoverExtend || '';
    },
  },
};

/**
 * Option 2: Input controls (checkbox, radio) get a stronger border on hover.
 * FormField containers are unchanged — no border change, cursor change only.
 * Checkbox fill on hover is removed.
 */
export const option2Theme = deepMerge(themes.v2, {
  checkBox: checkBoxNoFill,
});

/**
 * Option 3: FormField containers AND input controls both get a stronger border on hover.
 * Checkbox fill on hover is removed.
 */
export const option3Theme = deepMerge(themes.v2, {
  formField: {
    extend: props => {
      const { theme, disabled } = props;
      const base =
        typeof origFormFieldExtend === 'function'
          ? origFormFieldExtend(props)
          : origFormFieldExtend || '';
      if (disabled) return base;
      const borderStrongColor = getThemeColor('border-strong', theme);
      return `${base}
        &:hover [class*="ContentBox"] {
          border-color: ${borderStrongColor};
        }`;
    },
  },
  checkBox: checkBoxNoFill,
});

export const THEME_OPTIONS = ['Current', 'Option 2', 'Option 3'];

export const themeMap = {
  Current: themes.v2,
  'Option 2': option2Theme,
  'Option 3': option3Theme,
};
