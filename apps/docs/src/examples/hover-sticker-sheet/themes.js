/* eslint-disable */
import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

// Current: unchanged HPE theme
export const currentTheme = hpe;

// ─── Shared helpers ───────────────────────────────────────────────────────────

// Resolve a design-token color name to its current-mode hex/string value.
const resolveColor = (token, theme) => {
  const color = theme?.global?.colors?.[token];
  if (color && typeof color === 'object') {
    return color[theme.dark ? 'dark' : 'light'];
  }
  return color || token;
};

// ─── Option 1 helpers ────────────────────────────────────────────────────────

// Remove hover background fill from the unchecked checkbox square only.
// For checked / indeterminate / disabled states the original CSS is preserved.
const checkNoUncheckedFill = props => {
  const base =
    typeof hpe.checkBox?.check?.extend === 'function'
      ? hpe.checkBox.check.extend(props)
      : hpe.checkBox?.check?.extend ?? '';
  const { checked, indeterminate, disabled } = props;
  if (!checked && !indeterminate && !disabled) {
    return `${base}\n&:hover { background: transparent; }`;
  }
  // Grommet's base checkBox.hover.border applies a border colour on hover even
  // for filled (indeterminate/checked) states. The HPE check.extend sets
  // border-color: transparent statically but doesn't override the hover rule.
  // Append a hover border reset so only the background fill changes on hover.
  if (indeterminate && !disabled) {
    return `${base}\n&:hover { border-color: rgba(0, 0, 0, 0); }`;
  }
  return base;
};

// Override checkBox.extend for the container (StyledCheckBoxContainer = label).
// The HPE theme's checkBox.extend returns a css-tagged template array which
// styled-components handles correctly when used directly, but breaks when
// composed via string interpolation (array.toString() produces garbled CSS with
// commas that causes the closing `}` to escape the scoped rule, turning the
// hover selector into a global classless rule that fires on any ancestor hover).
//
// Fix: write the CSS directly as a plain string, replicating the HPE extend's
// content (font-weight, transparent label border, toggle-knob position) and
// adding the hover border rule for unchecked state only.
const checkboxExtend = props => {
  const borderStrongColor = resolveColor('border-strong', props.theme);
  return `
    font-weight: 400;
    width: auto;
    border: ${hpe.checkBox?.border?.width ?? '1px'} solid rgba(0, 0, 0, 0);
    & input:checked + span[class*=CheckBoxToggle] > span[class*=CheckBoxKnob] {
      left: 25px;
    }
    &:hover input:not([disabled]):not(:checked):not(:indeterminate) + div {
      border-color: ${borderStrongColor};
    }
  `;
};

// For RadioButton: the base HPE theme already darkens the border on hover for
// ALL states via radioButton.hover.border.color. Cancel that for the checked
// (selected) state so only unselected radio buttons get border darkening.
const radiobuttonExtend = props => {
  const borderDefault = resolveColor('border-default', props.theme);
  return `
&:hover input:checked + div,
&:hover input:checked + span {
  border-color: ${borderDefault};
}`;
};

const option1Override = {
  checkBox: {
    check: { extend: checkNoUncheckedFill },
    extend: checkboxExtend,
  },
  radioButton: {
    extend: radiobuttonExtend,
  },
};

export const option1Theme = deepMerge(hpe, option1Override);

// ─── Option 2 helpers ────────────────────────────────────────────────────────

// Compose with the existing formField.extend and append a hover border rule.
// The border lives on FormFieldContentBox (class contains "ContentBox").
// Exclude FormFields whose ContentBox contains a checkbox or radio input so
// that selection-control FormFields don't get the container border treatment.
const formFieldWithHoverBorder = props => {
  const base =
    typeof hpe.formField?.extend === 'function'
      ? hpe.formField.extend(props)
      : hpe.formField?.extend ?? '';
  const { theme } = props;
  const borderStrongColor = resolveColor('border-strong', theme);
  return `${base}
&:hover:not(:focus-within) [class*="ContentBox"]:not(:has(input[type="checkbox"], input[type="radio"])) { border-color: ${borderStrongColor}; }`;
};

export const option2Theme = deepMerge(hpe, {
  ...option1Override,
  fileInput: {
    hover: { border: { color: 'border-strong' } },
  },
  formField: {
    extend: formFieldWithHoverBorder,
  },
});

// ─── Option 3 helpers ────────────────────────────────────────────────────────

// Like Option 1 but unchecked checkboxes get background-hover fill on hover
// in addition to the darker border.
const checkWithHoverFill = props => {
  const base =
    typeof hpe.checkBox?.check?.extend === 'function'
      ? hpe.checkBox.check.extend(props)
      : hpe.checkBox?.check?.extend ?? '';
  const { checked, indeterminate, disabled } = props;
  if (!checked && !indeterminate && !disabled) {
    const bgHoverColor = resolveColor('background-hover', props.theme);
    return `${base}\n&:hover { background: ${bgHoverColor}; }`;
  }
  if (indeterminate && !disabled) {
    return `${base}\n&:hover { border-color: rgba(0, 0, 0, 0); }`;
  }
  return base;
};

// Unchecked radio buttons get background-hover fill + border-strong on hover.
// Checked radio buttons keep their default border (no darkening).
const radiobuttonExtendOption3 = props => {
  const borderDefault = resolveColor('border-default', props.theme);
  const borderStrongColor = resolveColor('border-strong', props.theme);
  const bgHoverColor = resolveColor('background-hover', props.theme);
  return `
&:hover input:not([disabled]):not(:checked) + div,
&:hover input:not([disabled]):not(:checked) + span {
  background: ${bgHoverColor};
  border-color: ${borderStrongColor};
}
&:hover input:checked + div,
&:hover input:checked + span {
  border-color: ${borderDefault};
}`;
};

export const option3Theme = deepMerge(hpe, {
  checkBox: {
    check: { extend: checkWithHoverFill },
    extend: checkboxExtend,
  },
  radioButton: { extend: radiobuttonExtendOption3 },
});

// ─── Option 4 helpers ────────────────────────────────────────────────────────

// Like Option 2, but suppress the row-level background fill for group items.
//
// The fill does NOT come from checkBox.hover.background — that token is already
// transparent in the hpe theme. It comes from hpe's formField.extend, which
// injects this CSS for checkbox/radio groups inside a FormField:
//
//   [role="group"], [role="radiogroup"] {
//     label { &:hover:not([disabled]) { background: rgba(0,0,0,.04); } }
//   }
//
// Fix: append an override rule with equal specificity, placed after the base
// CSS so the cascade suppresses the fill.
const formFieldOption4Extend = props => {
  const base = formFieldWithHoverBorder(props);
  return `${base}
[class*="ContentBox"] [role="group"] label:hover:not([disabled]),
[class*="ContentBox"] [role="radiogroup"] label:hover:not([disabled]) {
  background: transparent;
}`;
};

// Darken the checked control fill when any part of the row label is hovered,
// not just when the pointer is directly over the control square/circle.
const checkboxExtendOption4 = props => {
  const checkedHoverBg = resolveColor(
    'background-selected-primary-strong-hover',
    props.theme,
  );
  return `${checkboxExtend(props)}
  &:hover input:checked:not([disabled]) + div {
    background: ${checkedHoverBg};
  }`;
};

const radiobuttonExtendOption4 = props => {
  const checkedHoverBg = resolveColor(
    'background-selected-primary-strong-hover',
    props.theme,
  );
  return `${radiobuttonExtend(props)}
  &:hover input:checked:not([disabled]) + div,
  &:hover input:checked:not([disabled]) + span {
    background: ${checkedHoverBg};
  }`;
};

export const option4Theme = deepMerge(option2Theme, {
  checkBox: {
    extend: checkboxExtendOption4,
  },
  radioButton: {
    extend: radiobuttonExtendOption4,
  },
  formField: {
    extend: formFieldOption4Extend,
  },
});

// ─── Option 5 helpers ────────────────────────────────────────────────────────

// Check (square div) extend: unchecked border = border-strong at rest, reverts
// to border-default on hover. Checked / indeterminate / disabled are unchanged.
const checkBorderStrongDefaultHover = props => {
  const base =
    typeof hpe.checkBox?.check?.extend === 'function'
      ? hpe.checkBox.check.extend(props)
      : hpe.checkBox?.check?.extend ?? '';
  const { checked, indeterminate, disabled } = props;
  const borderStrongColor = resolveColor('border-strong', props.theme);
  const borderDefaultColor = resolveColor('border-default', props.theme);

  if (!checked && !indeterminate && !disabled) {
    return `${base}
border-color: ${borderStrongColor};
&:hover { background: transparent; border-color: ${borderDefaultColor}; }`;
  }
  if (indeterminate && !disabled) {
    return `${base}\n&:hover { border-color: rgba(0, 0, 0, 0); }`;
  }
  return base;
};

// RadioButton extend: unchecked border = border-strong at rest, border-default
// on hover. Checked radio border is left at its default appearance.
const radiobuttonExtendOption5 = props => {
  const borderStrongColor = resolveColor('border-strong', props.theme);
  const borderDefaultColor = resolveColor('border-default', props.theme);
  return `
& input:not([disabled]):not(:checked) + div,
& input:not([disabled]):not(:checked) + span {
  border-color: ${borderStrongColor};
}
&:hover input:not([disabled]):not(:checked) + div,
&:hover input:not([disabled]):not(:checked) + span {
  border-color: ${borderDefaultColor};
}`;
};

// Option 5: selection-control borders — border-strong at rest, border-default on
// hover. Text/select/textarea inputs get a darker border (border-strong) on hover,
// matching Option 2's field behaviour.
export const option5Theme = deepMerge(hpe, {
  checkBox: {
    check: { extend: checkBorderStrongDefaultHover },
  },
  radioButton: {
    extend: radiobuttonExtendOption5,
  },
  formField: {
    extend: formFieldWithHoverBorder,
  },
  fileInput: {
    hover: { border: { color: 'border-strong' } },
  },
});

// ─── Option 6 helpers ────────────────────────────────────────────────────────

// FormField extend: ContentBox border = border-strong at rest, border-default on
// hover for all non-selection-control fields (checkbox/radio FormField wrappers
// are excluded to avoid double-bordering the control square/circle).
const formFieldBorderStrongDefaultHover = props => {
  const base =
    typeof hpe.formField?.extend === 'function'
      ? hpe.formField.extend(props)
      : hpe.formField?.extend ?? '';
  const { theme } = props;
  const borderStrongColor = resolveColor('border-strong', theme);
  const borderDefaultColor = resolveColor('border-default', theme);
  return `${base}
[class*="ContentBox"]:not(:has(input[type="checkbox"], input[type="radio"])) { border-color: ${borderStrongColor}; }
&:hover:not(:focus-within) [class*="ContentBox"]:not(:has(input[type="checkbox"], input[type="radio"])) { border-color: ${borderDefaultColor}; }`;
};

// Option 6: all form inputs use border-strong at rest; hover lightens to
// border-default. Builds on Option 5's selection-control changes.
export const option6Theme = deepMerge(hpe, {
  checkBox: {
    check: { extend: checkBorderStrongDefaultHover },
  },
  radioButton: {
    extend: radiobuttonExtendOption5,
  },
  formField: {
    extend: formFieldBorderStrongDefaultHover,
  },
  fileInput: {
    hover: { border: { color: 'border-default' } },
  },
});

// ─── Option 7 helpers ────────────────────────────────────────────────────────

// Option 7: override border-default to base.color.grey.600 (#7D8A92) — a darker
// grey that meets 3:1 contrast — so every resting border is automatically
// accessible. Hover continues to darken to border-strong, exactly as Option 2.
export const option7Theme = deepMerge(option2Theme, {
  global: {
    colors: {
      'border-default': { light: '#7D8A92', dark: '#7D8A92' },
    },
  },
});

// ─── Option 8 helpers ────────────────────────────────────────────────────────

// Like Option 5: unchecked checkbox border = border-strong at rest.
// On hover the border stays border-strong (no change) and the control
// background fills with background-hover instead.
const checkBorderStrongBgHover = props => {
  const base =
    typeof hpe.checkBox?.check?.extend === 'function'
      ? hpe.checkBox.check.extend(props)
      : hpe.checkBox?.check?.extend ?? '';
  const { checked, indeterminate, disabled } = props;
  const borderStrongColor = resolveColor('border-strong', props.theme);
  const bgHoverColor = resolveColor('background-hover', props.theme);

  if (!checked && !indeterminate && !disabled) {
    return `${base}
border-color: ${borderStrongColor};
&:hover { background: ${bgHoverColor}; border-color: ${borderStrongColor}; }`;
  }
  if (indeterminate && !disabled) {
    return `${base}\n&:hover { border-color: rgba(0, 0, 0, 0); }`;
  }
  return base;
};

// RadioButton extend: unchecked border = border-strong at rest and on hover.
// On hover the circle fills with background-hover.
const radiobuttonExtendOption8 = props => {
  const borderStrongColor = resolveColor('border-strong', props.theme);
  const bgHoverColor = resolveColor('background-hover', props.theme);
  return `
& input:not([disabled]):not(:checked) + div,
& input:not([disabled]):not(:checked) + span {
  border-color: ${borderStrongColor};
}
&:hover input:not([disabled]):not(:checked) + div,
&:hover input:not([disabled]):not(:checked) + span {
  background: ${bgHoverColor};
  border-color: ${borderStrongColor};
}`;
};

// Option 8: identical to Option 5 but hover feedback on selection controls is
// a background fill (background-hover) rather than a border colour change.
// Border stays border-strong at rest and on hover.
export const option8Theme = deepMerge(hpe, {
  checkBox: {
    check: { extend: checkBorderStrongBgHover },
  },
  radioButton: {
    extend: radiobuttonExtendOption8,
  },
  formField: {
    extend: formFieldWithHoverBorder,
  },
  fileInput: {
    hover: { border: { color: 'border-strong' } },
  },
});
