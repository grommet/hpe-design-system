// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=37187-1324&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Anchor/Anchor.js
// component=Anchor

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('has Icon') === 'false') {
  const label = figma.selectedInstance.getString('Label');
  const disabled = figma.selectedInstance.getBoolean('is Disabled');
  const reverse = figma.selectedInstance.getEnum('is Reversed', {
    false: false,
    true: true,
  });
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Anchor',
    imports: ["import { Anchor } from 'grommet';"],
    example: figma.code`<Anchor href="#"${figma.helpers.react.renderProp(
      'label',
      label,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'reverse',
      reverse,
    )}${figma.helpers.react.renderProp('size', size)}/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue('has Icon') === 'true') {
  const icon = figma.selectedInstance
    .getInstanceSwap('Icon Swap')
    ?.executeTemplate().example;
  const label = figma.selectedInstance.getString('Label');
  const disabled = figma.selectedInstance.getBoolean('is Disabled');
  const reverse = figma.selectedInstance.getEnum('is Reversed', {
    false: false,
    true: true,
  });
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Anchor',
    imports: ["import { Anchor } from 'grommet';"],
    example: figma.code`<Anchor href="#"${figma.helpers.react.renderProp(
      'label',
      label,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'reverse',
      reverse,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('icon', icon)}/>`,
    metadata: { nestable: true },
  };
} else {
  const icon = figma.selectedInstance
    .getInstanceSwap('Icon Swap')
    ?.executeTemplate().example;
  const label = figma.selectedInstance.getString('Label');
  const disabled = figma.selectedInstance.getBoolean('is Disabled');
  const reverse = figma.selectedInstance.getEnum('is Reversed', {
    false: false,
    true: true,
  });
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Anchor',
    imports: ["import { Anchor } from 'grommet';"],
    example: figma.code`<Anchor href="#"${figma.helpers.react.renderProp(
      'label',
      label,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'reverse',
      reverse,
    )}${figma.helpers.react.renderProp(
      'size',
      size,
    )}${figma.helpers.react.renderProp('icon', icon)}/>`,
    metadata: { nestable: true },
  };
}

export default template;
