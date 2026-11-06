// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3039-2385
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Tag/Tag.js
// component=Tag

import figma from 'figma';

const name = figma.selectedInstance.getBoolean('show Name', {
  true: figma.selectedInstance.getString('Name'),
  false: undefined,
});
const value = figma.selectedInstance.getString('Value');
const size = figma.selectedInstance.getEnum('Size', {
  xSmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'xlarge',
});
const onClick = figma.selectedInstance.getEnum('is Clickable', {
  true: figma.helpers.react.function('() => {}'),
  false: undefined,
});
const onRemove = figma.selectedInstance.getBoolean('is Removable', {
  true: figma.helpers.react.function('() => {}'),
  false: undefined,
});

export default {
  id: 'Tag',
  imports: ["import { Tag } from 'grommet';"],
  example: figma.code`<Tag${figma.helpers.react.renderProp(
    'name',
    name,
  )}${figma.helpers.react.renderProp(
    'value',
    value,
  )}${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp(
    'onClick',
    onClick,
  )}${figma.helpers.react.renderProp('onRemove', onRemove)}/>`,
  metadata: { nestable: true },
};
