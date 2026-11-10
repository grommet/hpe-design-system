// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4955-3437
// source=https://github.com/grommet/grommet/blob/master/src/js/components/TextInput/TextInput.js
// component=TextInput

import figma from 'figma';

const value = figma.selectedInstance.getEnum('Value', {
  false: undefined,
  true: '33',
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const focusIndicator = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: true,
  disabled: false,
});

export default {
  id: 'NumberInput',
  imports: ["import { TextInput } from 'grommet';"],
  example: figma.code`<TextInput type="number"${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )} focusIndicator={${focusIndicator}}/>`,
  metadata: { nestable: true },
};
