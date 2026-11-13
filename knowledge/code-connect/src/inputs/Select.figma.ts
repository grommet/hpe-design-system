// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3237-3363&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Select/Select.js
// component=Select

import figma from 'figma';

const options = figma.helpers.react.array([
  'Item one',
  'Item two',
  'Item three',
  'Item four',
  'Item five',
  'Item six',
]);
const value = figma.selectedInstance.getEnum('is Value', {
  false: undefined,
  true: 'Item three',
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const open = figma.selectedInstance.getEnum('is Drop Open', {
  false: false,
  true: true,
});
const focusIndicator = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: true,
  disabled: false,
});

export default {
  id: 'Select',
  imports: ["import { Select } from 'grommet';"],
  example: figma.code`
  <Select name="select"
    placeholder="Select item"
  ${figma.helpers.react.renderProp(
    'options',
    options,
  )}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'open',
    open,
  )} focusIndicator={${focusIndicator}}/>`,
  metadata: { nestable: true },
};
