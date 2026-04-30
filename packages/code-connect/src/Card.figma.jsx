import figma from '@figma/code-connect';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Text,
} from 'grommet';

/**
 * Figma Code Connect mapping for the HPE Design System Card - V2
 *
 * The Card in Figma is built with slot-based sub-components:
 *   Header - Card  → CardHeader
 *   Body - Card    → CardBody
 *   Footer - Card  → CardFooter
 *
 * Each slot is toggled via `show Header` and `show Footer` boolean props
 * on the top-level Card component. The body is always present.
 */
figma.connect(
  Card,
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3062-2494',
  {
    example: () => (
      <Card>
        <CardHeader pad="medium">
          <Image src="header-image.png" fit="cover" />
        </CardHeader>
        <CardBody pad="medium">
          <Text weight="bold">Card Title</Text>
          <Text>Card description content goes here.</Text>
        </CardBody>
        <CardFooter
          pad={{ horizontal: 'medium' }}
          background="background-contrast"
        >
          <Button label="Action" primary />
          <Button label="Secondary" secondary />
        </CardFooter>
      </Card>
    ),
  },
);
