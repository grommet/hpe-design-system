// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3060-10921
// source=https://github.com/grommet/grommet/blob/master/src/js/components/CheckBox/CheckBox.js
// component=CheckBox

import figma from 'figma';

const label = figma.selectedInstance.getBoolean('show Label', {
  true: 'CheckBox label',
  false: undefined,
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const checked = figma.selectedInstance.getEnum('Checked', {
  unchecked: false,
  checked: true,
  indeterminate: true,
});
const indeterminate = figma.selectedInstance.getEnum('Checked', {
  unchecked: false,
  checked: false,
  indeterminate: true,
});
const reverse = figma.selectedInstance.getEnum('is Reversed', {
  false: false,
  true: true,
});

export default {
  id: 'CheckBox',
  imports: ["import { CheckBox } from 'grommet';"],
  example: figma.code`<CheckBox${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp(
    'indeterminate',
    indeterminate,
  )}${figma.helpers.react.renderProp('reverse', reverse)}/>`,
  metadata: { nestable: true },
};
