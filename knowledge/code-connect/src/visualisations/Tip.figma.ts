// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2009-618&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Tip/Tip.js
// component=Tip

import figma from 'figma';

const content = figma.selectedInstance.getString('Content');

export default {
  id: 'Tip',
  imports: ["import { Box, Button, Text, Tip } from 'grommet';"],
  example: figma.code`<Tip content={<Box width={{ max: 'xsmall' }} round="xsmall">
          <Text>${figma.helpers.react.renderChildren(content)}</Text>
        </Box>}>
      <Button a11yTitle="show tip" label="Hover to see tip" secondary/>
    </Tip>`,
  metadata: { nestable: true },
};
