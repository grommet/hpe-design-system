// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=59-2098
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Tab/Tab.js
// component=Tab

import figma from 'figma';

const showIcon = figma.selectedInstance.getBoolean('show Icon', {
  true: figma.helpers.react.jsxElement('<CircleInformation />'),
  false: undefined,
});

export default {
  id: 'Tab',
  imports: ["import { Box, Tab } from 'grommet';"],
  example: figma.code`<Tab title="Label"${figma.helpers.react.renderProp(
    'icon',
    showIcon,
  )}>
        <Box pad="small">Tab content</Box>
      </Tab>`,
  metadata: { nestable: true },
};
