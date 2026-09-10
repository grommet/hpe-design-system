import figma from '@figma/code-connect';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Text } from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Card
 * Uses a static composition because the Figma component represents layout
 * structure rather than meaningful prop-driven variants.
 */
figma.connect(
  Card,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3062-2494',
  {
    example: () => (
      <Card width="medium">
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
            <Button label="Primary" primary />
            <Button label="Secondary" />
          </Box>
        </CardFooter>
      </Card>
    ),
  },
);