// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=42063-13844&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/TimeInput/TimeInput.js
// component=TimeInput

import figma from 'figma';

const format = figma.selectedInstance.getEnum('Format', {
  '12': '12',
  '24': '24',
});
const value = figma.selectedInstance.getEnum('has Value', {
  True: '10:30',
  False: undefined,
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  'focused button': false,
  disabled: true,
  readOnly: false,
});
const readOnly = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  'focused button': false,
  disabled: false,
  readOnly: true,
});
const focusIndicator = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: true,
  'focused button': true,
  disabled: false,
  readOnly: false,
});

export default {
  id: 'TimeInput',
  imports: ["import { TimeInput } from 'grommet';"],
  example: figma.code`<TimeInput name="time-input"${figma.helpers.react.renderProp(
    'format',
    format,
  )}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'readOnly',
    readOnly,
  )}${figma.helpers.react.renderProp('focusIndicator', focusIndicator)}/>`,
  metadata: { nestable: true },
};
