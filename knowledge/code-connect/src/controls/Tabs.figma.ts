// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=59-2087
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Tabs/Tabs.js
// component=Tabs

import figma from 'figma';

const overflow = figma.selectedInstance.getEnum('has Overflow', {
  True: 'auto',
});

export default {
  id: 'Tabs',
  imports: ["import { Box, Tab, Tabs } from 'grommet';"],
  example: figma.code`<Box${figma.helpers.react.renderProp(
    'overflow',
    overflow,
  )}>
        <Tabs>
          <Tab title="Tab 1">
            <Box pad="small">Tab 1 content</Box>
          </Tab>
          <Tab title="Tab 2">
            <Box pad="small">Tab 2 content</Box>
          </Tab>
          <Tab title="Tab 3">
            <Box pad="small">Tab 3 content</Box>
          </Tab>
        </Tabs>
      </Box>`,
  metadata: { nestable: true },
};
