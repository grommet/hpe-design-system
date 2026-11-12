// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4377-1430&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/RadioButton/RadioButton.js
// component=RadioButton

import figma from 'figma';

const label = figma.selectedInstance.getBoolean('show Label', {
  true: figma.selectedInstance.getString('Label'),
  false: undefined,
});
const checked = figma.selectedInstance.getEnum('is Checked', {
  false: false,
  true: true,
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const reverse = figma.selectedInstance.getEnum('is Reversed', {
  false: false,
  true: true,
});

export default {
  id: 'RadioButton',
  imports: ["import { RadioButton } from 'grommet';"],
  example: figma.code`<RadioButton name="radio-button"${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'checked',
    checked,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp('reverse', reverse)}/>`,
  metadata: { nestable: true },
};
