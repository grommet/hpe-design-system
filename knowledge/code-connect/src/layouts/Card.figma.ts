// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3062-2494
// source=https://github.com/grommet/grommet/blob/master/src/js/components/Card/Card.js
// component=Card

import figma from 'figma';

export default {
  id: 'Card',
  imports: [
    "import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from 'grommet';",
  ],
  example: figma.code`<Card width="medium">
        <CardHeader pad="medium">
          <Heading level={3} margin="none">
            Card title
          </Heading>
        </CardHeader>
        <CardBody pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <Text>Card body content</Text>
        </CardBody>
        <CardFooter pad={{ horizontal: 'medium', bottom: 'medium' }}>
          <Box direction="row" gap="small">
            <Button label="Primary" primary/>
            <Button label="Secondary"/>
          </Box>
        </CardFooter>
      </Card>`,
};
