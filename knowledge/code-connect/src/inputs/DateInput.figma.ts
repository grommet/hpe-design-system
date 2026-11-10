// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3136-2109
// source=https://github.com/grommet/grommet/blob/master/src/js/components/DateInput/DateInput.js
// component=DateInput

import figma from 'figma';

const placeholder = figma.selectedInstance.getEnum('Kind', {
  single: 'mm/dd/yyyy',
  range: 'mm/dd/yyyy-mm/dd/yyyy',
});
const value = figma.selectedInstance.getEnum('Value', {
  False: undefined,
  True: '10/30/2024',
});
const icon = figma.selectedInstance.getBoolean('show Calendar', {
  true: figma.helpers.react.jsxElement('<Calendar />'),
  false: undefined,
});
const readOnlyFocus = figma.selectedInstance.getBoolean('show ReadOnlyFocus', {
  true: true,
  false: false,
});
const a11yTitle = figma.selectedInstance.getBoolean('show readOnlyCopy', {
  true: 'Date input with copy action',
  false: 'Date input',
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  'focused (button)': false,
  disabled: true,
  readOnly: false,
});
const readOnly = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  'focused (button)': false,
  disabled: false,
  readOnly: true,
});
const id = figma.selectedInstance.getEnum('State', {
  enabled: 'enabled',
  hovered: 'hovered',
  focused: 'focused',
  'focused (button)': 'focused-button',
  disabled: 'disabled',
  readOnly: 'readOnly',
});

export default {
  id: 'DateInput',
  imports: [
    "import { DateInput } from 'grommet';",
    "import { Calendar } from '@hpe-design/icons-grommet';",
  ],
  example: figma.code`<DateInput${figma.helpers.react.renderProp(
    'id',
    id,
  )}${figma.helpers.react.renderProp(
    'a11yTitle',
    a11yTitle,
  )}${figma.helpers.react.renderProp(
    'format',
    placeholder,
  )}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'icon',
    icon,
  )}${figma.helpers.react.renderProp(
    'readOnly',
    readOnly,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )} focusIndicator={${readOnlyFocus}}/>`,
  metadata: { nestable: true },
};
