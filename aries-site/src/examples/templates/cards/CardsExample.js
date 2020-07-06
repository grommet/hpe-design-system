import React from 'react';
import { Box, Image, Text, Grid, Paragraph } from 'grommet';
import { StatusWarning, Location, CircleQuestion } from 'grommet-icons';

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from '../../../components/Card';

export const CardsExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium">
      <Grid columns={{ count: 'fit', size: ['auto', 'medium'] }} gap="medium">
        <CardDefaults />
        <Identifier />
        <IdentifierImageRow />
        <IdentifierFooter />
        <IdentifierIconRow />
        <IdentifierIconColumn />
        <ImageCard />
        <MapCard />
        <HelpHeader />
        <ColorCard />
      </Grid>
    </Box>
  );
};

const CardDefaults = () => (
  <Card>
    <CardHeader>Card Header</CardHeader>
    <CardBody>Card Body</CardBody>
    <CardFooter>Card Footer</CardFooter>
  </Card>
);

const Identifier = () => (
  <Card>
    <CardBody>
      <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text>
    </CardBody>
  </Card>
);

const IdentifierImageRow = () => (
  <Card>
    <CardBody>
      <Box direction="row">
        <Image src="/static/images/color-swirls.png" />
        <Box margin={{ left: 'medium' }}>
          <Text color="text-strong" size="xxlarge" weight="bold">
            Heading
          </Text>
          <Text>Subtitle</Text>
        </Box>
      </Box>
    </CardBody>
  </Card>
);

const IdentifierFooter = () => (
  <Card>
    <CardBody>
      <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text>
    </CardBody>
    <CardFooter
      background="none"
      border={{ color: 'border-weak', side: 'top' }}
    >
      <Box direction="row" align="center" gap="small">
        <StatusWarning size="medium" />
        <Text size="small" weight="bold">
          Text Small
        </Text>
      </Box>
    </CardFooter>
  </Card>
);

const IdentifierIconRow = () => (
  <Card>
    <CardBody direction="row" align="center" gap="small">
      <Location size="large" />
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          Heading
        </Text>
        <Text>Subtitle</Text>
      </Box>
    </CardBody>
    <CardFooter
      background="none"
      border={{ color: 'border-weak', side: 'top' }}
    >
      <Box direction="row" align="center" gap="small">
        <StatusWarning size="medium" />
        <Text size="small" weight="bold">
          Text Small
        </Text>
      </Box>
    </CardFooter>
  </Card>
);

const IdentifierIconColumn = () => (
  <Card>
    <CardBody gap="small">
      <Location size="large" />
      <Box>
        <Text color="text-strong" size="xxlarge" weight="bold">
          Heading
        </Text>
        <Text>Subtitle</Text>
      </Box>
    </CardBody>
    <CardFooter
      background="none"
      border={{ color: 'border-weak', side: 'top' }}
    >
      <Box direction="row" align="center" gap="small">
        <StatusWarning size="medium" />
        <Text size="small" weight="bold">
          Text Small
        </Text>
      </Box>
    </CardFooter>
  </Card>
);

const ImageCard = () => (
  <Card>
    <Image src="/static/images/Doorhood-4.jpg" />
    <CardBody>
      <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text>
    </CardBody>
  </Card>
);

const MapCard = () => (
  <Card>
    <CardBody>
      <Text color="text-strong" size="xxlarge" weight="bold">
        Heading
      </Text>
      <Text>Subtitle</Text>
    </CardBody>
    <Image src="/static/images/map-07.png" />
  </Card>
);

const HelpHeader = () => (
  <Card>
    <CardHeader border={{ color: 'border-weak', side: 'bottom' }}>
      <Box direction="row" gap="small">
        <CircleQuestion />
        <Text weight="bold">Text</Text>
      </Box>
    </CardHeader>
    <CardBody>
      <Paragraph margin={{ top: 'none' }}>
        Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor
        incididunt ut labore et magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.
      </Paragraph>
    </CardBody>
  </Card>
);

const ColorCard = () => {
  const textColor = 'text-strong';

  return (
    <Card background="blue!">
      <CardBody pad={{ horizontal: 'medium', top: 'small' }}>
        <Box
          height="xsmall"
          width="xsmall"
          pad={{ vertical: 'small', left: 'none', right: 'medium' }}
        >
          <Image src="/static/images/i00045804.png" />
        </Box>
        <Box>
          <Text color={textColor} size="xxlarge" weight="bold">
            Heading
          </Text>
          <Text color={textColor}>Subtitle</Text>
        </Box>
      </CardBody>
      <CardFooter>
        <Box direction="row" align="center" gap="small">
          <StatusWarning color={textColor} />
          <Text color={textColor} size="small" weight="bold">
            Text Small
          </Text>
        </Box>
      </CardFooter>
    </Card>
  );
};
