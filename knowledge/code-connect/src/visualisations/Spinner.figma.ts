// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2128-593&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Spinner/Spinner.js
// component=Spinner

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  xSmall: 'xsmall',
  small: 'small',
  medium: 'medium',
  large: 'large',
  xLarge: 'xlarge',
});
const message = figma.selectedInstance.getBoolean('has Label', {
  true: 'Loading',
  false: undefined,
});

export default {
  id: 'Spinner',
  imports: ["import { Spinner } from 'grommet';"],
  example: figma.code`<Spinner${figma.helpers.react.renderProp(
    'size',
    size,
  )}${figma.helpers.react.renderProp('message', message)}/>`,
  metadata: { nestable: true },
};
