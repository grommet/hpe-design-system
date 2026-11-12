// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Button/Button.js
// component=Button

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const primary = figma.selectedInstance.getEnum('Kind', {
  primary: true,
});
const secondary = figma.selectedInstance.getEnum('Kind', {
  secondary: true,
});
const size = figma.selectedInstance.getEnum('Size', {
  xSmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'xlarge',
});
const disabled = figma.selectedInstance.getEnum('State', {
  enabled: false,
  hovered: false,
  focused: false,
  disabled: true,
});
const icon = figma.selectedInstance
  .getInstanceSwap('Icon')
  ?.executeTemplate().example;
const badge = figma.selectedInstance.getBoolean('show Badge', {
  true: true,
  false: undefined,
});
const tip = figma.selectedInstance.getBoolean('show Tip', {
  true: figma.helpers.react.object({ content: 'Tip' }),
  false: undefined,
});

export default {
  id: 'Button',
  imports: ["import { Button } from 'grommet';"],
  example: figma.code`<Button${figma.helpers.react.renderProp(
    'label',
    label,
  )}${figma.helpers.react.renderProp(
    'primary',
    primary,
  )}${figma.helpers.react.renderProp(
    'secondary',
    secondary,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'disabled',
    disabled,
  )}${figma.helpers.react.renderProp(
    'icon',
    icon,
  )}${figma.helpers.react.renderProp(
    'badge',
    badge,
  )}${figma.helpers.react.renderProp('tip', tip)}/>`,
  metadata: { nestable: true },
};
