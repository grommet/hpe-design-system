// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2475-3768
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Menu/Menu.js
// component=Menu

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('is Icon Only') === 'True') {
  const open = figma.selectedInstance.getBoolean('is Open', {
    true: true,
    false: undefined,
  });
  const dropProps = figma.selectedInstance.getEnum('Aligned', {
    left: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', left: 'left' }),
    }),
    right: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', right: 'right' }),
    }),
  });

  template = {
    id: 'Menu',
    imports: [
      "import { Menu } from 'grommet';",
      "import { More } from '@hpe-design/icons-grommet';",
    ],
    example: figma.code`<Menu icon={<More />}${figma.helpers.react.renderProp(
      'dropProps',
      dropProps,
    )}${figma.helpers.react.renderProp('open', open)} items={[
        [{ label: 'Action 1' }, { label: 'Action 2' }],
        [{ label: 'Secondary 1' }, { label: 'Secondary 2' }],
    ]}/>`,
    metadata: { nestable: true },
  };
} else if (
  figma.selectedInstance.getPropertyValue('is Icon Only') === 'False'
) {
  const open = figma.selectedInstance.getBoolean('is Open', {
    true: true,
    false: undefined,
  });
  const dropProps = figma.selectedInstance.getEnum('Aligned', {
    left: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', left: 'left' }),
    }),
    right: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', right: 'right' }),
    }),
  });

  template = {
    id: 'Menu',
    imports: ["import { Menu } from 'grommet';"],
    example: figma.code`<Menu label="Menu"${figma.helpers.react.renderProp(
      'dropProps',
      dropProps,
    )}${figma.helpers.react.renderProp('open', open)} items={[
        [{ label: 'Action 1' }, { label: 'Action 2' }],
        [{ label: 'Secondary 1' }, { label: 'Secondary 2' }],
    ]}/>`,
    metadata: { nestable: true },
  };
} else {
  const open = figma.selectedInstance.getBoolean('is Open', {
    true: true,
    false: undefined,
  });
  const dropProps = figma.selectedInstance.getEnum('Aligned', {
    left: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', left: 'left' }),
    }),
    right: figma.helpers.react.object({
      align: figma.helpers.react.object({ top: 'bottom', right: 'right' }),
    }),
  });

  template = {
    id: 'Menu',
    imports: ["import { Menu } from 'grommet';"],
    example: figma.code`<Menu label="Menu"${figma.helpers.react.renderProp(
      'dropProps',
      dropProps,
    )}${figma.helpers.react.renderProp('open', open)} items={[
        [{ label: 'Action 1' }, { label: 'Action 2' }],
        [{ label: 'Secondary 1' }, { label: 'Secondary 2' }],
    ]}/>`,
    metadata: { nestable: true },
  };
}

export default template;
