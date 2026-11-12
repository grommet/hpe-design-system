// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2023-48&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Avatar/Avatar.js
// component=Avatar

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('Kind') === 'initials') {
  const initials = figma.selectedInstance.getString('Initials');
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Avatar',
    imports: ["import { Avatar, Text } from 'grommet';"],
    example: figma.code`<Avatar${figma.helpers.react.renderProp(
      'size',
      size,
    )} background="decorative-green">
      <Text size="large" color="text-strong">
        ${figma.helpers.react.renderChildren(initials)}
      </Text>
    </Avatar>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue('Kind') === 'icon') {
  const swapIcon = figma.selectedInstance
    .getInstanceSwap('↪️ swap Icon')
    ?.executeTemplate().example;
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Avatar',
    imports: ["import { Avatar } from 'grommet';"],
    example: figma.code`<Avatar${figma.helpers.react.renderProp(
      'size',
      size,
    )}>${figma.helpers.react.renderChildren(swapIcon)}</Avatar>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue('Kind') === 'image') {
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Avatar',
    imports: ["import { Avatar } from 'grommet';"],
    example: figma.code`<Avatar${figma.helpers.react.renderProp(
      'size',
      size,
    )} src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"/>`,
    metadata: { nestable: true },
  };
} else {
  const size = figma.selectedInstance.getEnum('Size', {
    xSmall: 'xsmall',
    small: 'small',
    medium: 'medium',
    large: 'large',
    xLarge: 'xlarge',
  });

  template = {
    id: 'Avatar',
    imports: ["import { Avatar } from 'grommet';"],
    example: figma.code`<Avatar${figma.helpers.react.renderProp(
      'size',
      size,
    )} src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80"/>`,
    metadata: { nestable: true },
  };
}

export default template;
