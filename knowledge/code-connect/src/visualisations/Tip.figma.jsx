import figma from '@figma/code-connect';
import { Box, Button, Text, Tip } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2009-618&m=dev';

figma.connect(Tip, FIGMA_URL, {
  props: {
    content: figma.string('Content'),
  },
  example: ({ content }) => (
    <Tip
      content={
        <Box width={{ max: 'xsmall' }} round="xsmall">
          <Text>{content}</Text>
        </Box>
      }
    >
      <Button a11yTitle="show tip" label="Hover to see tip" secondary />
    </Tip>
  ),
});
