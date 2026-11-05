// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4377-3922&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/SelectMultiple/SelectMultiple.js
// component=SelectMultiple

import figma from 'figma';

const value = figma.selectedInstance.getEnum('has Value', {
  false: undefined,
  true: figma.helpers.react.array([
    'Azure ISO27001:2013',
    'Azure MAS-TRM:v2019.03',
    'Azure NIST800-53:R4',
  ]),
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
const showSelectedInline = figma.selectedInstance.getEnum('Selected Inline', {
  false: false,
  true: true,
});

export default {
  id: 'SelectMultiple',
  imports: ["import { SelectMultiple } from 'grommet';"],
  example: figma.code`<SelectMultiple name="select-multiple" placeholder="Select multiple items" searchPlaceholder="Search Frameworks" options={options}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'open',
    open,
  )}${figma.helpers.react.renderProp(
    'focusIndicator',
    focusIndicator,
  )}${figma.helpers.react.renderProp(
    'showSelectedInline',
    showSelectedInline,
  )}/>`,
  metadata: { nestable: true },
};
