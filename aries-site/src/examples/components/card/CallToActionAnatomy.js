import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Grid,
  Heading,
  Image,
  Paragraph,
  Stack,
  Text,
} from 'grommet';
import { Annotation } from '../../../layouts';
import { event } from './data';

const connection = (fromTarget, toTarget) => ({
  anchor: 'horizontal',
  type: 'direct',
  color: 'border',
  thickness: 'hair',
  fromTarget,
  toTarget,
});

const connections = [
  connection('cta-1a', 'cta-title'),
  connection('cta-1b', 'cta-pretitle'),
  connection('cta-1c', 'cta-subtitle'),
  connection('cta-3', 'cta-description'),
  connection('cta-2', 'cta-action'),
  connection('cta-4', 'cta-image'),
  connection('cta-5', 'cta-background-image'),
];

export const CallToActionAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      align="center"
      columns={['3xsmall', 'medium']}
      rows={['xsmall', '24px', '24px', '48px', '24px', '100px', '24px', '40px']}
      areas={[
        ['cta-annotation-4', 'card-example'],
        ['cta-empty', 'card-example'],
        ['cta-annotation-1b', 'card-example'],
        ['cta-annotation-1a', 'card-example'],
        ['cta-annotation-1c', 'card-example'],
        ['cta-annotation-3', 'card-example'],
        ['cta-empty-2', 'card-example'],
        ['cta-annotation-2', 'card-example'],
        ['cta-annotation-5', 'card-example'],
      ]}
    >
      <Annotation id="cta-4" target="4" gridArea="cta-annotation-4" />
      <Annotation id="cta-1b" target="1b" gridArea="cta-annotation-1b" />
      <Annotation id="cta-1a" target="1a" gridArea="cta-annotation-1a" />
      <Annotation id="cta-1c" target="1c" gridArea="cta-annotation-1c" />
      <Annotation id="cta-2" target="2" gridArea="cta-annotation-2" />
      <Annotation id="cta-3" target="3" gridArea="cta-annotation-3" />
      <Annotation id="cta-5" target="5" gridArea="cta-annotation-5" />
      <Box gridArea="cta-empty" />
      <Box gridArea="cta-empty-2" />
      <CardExample gridArea="card-example" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const DashedBox = ({ ...rest }) => (
  <Box
    alignSelf="start"
    border={{ style: 'dashed' }}
    round="xxsmall"
    {...rest}
  />
);

const CardExample = ({ ...rest }) => (
  <Card width="medium" onClick={() => {}} {...rest}>
    <Box id="cta-image" height='xsmall'>
      <Image alt={event.image.alt} {...event.image} />
    </Box>
    <CardBody align="start" gap="medium">
      <Box gap='3xsmall'>
        <DashedBox id="cta-pretitle">
          <Text size="small">{event.pretitle}</Text>
        </DashedBox>
        <DashedBox id="cta-title">
          <Heading level={3} margin="none">
            {event.title}
          </Heading>
        </DashedBox>
        <DashedBox id="cta-subtitle">
          <Text size="small">{event.subtitle}</Text>
        </DashedBox>
        <DashedBox id="cta-description">
          <Paragraph margin="none">{event.description}</Paragraph>
        </DashedBox>
      </Box>
      <DashedBox id="cta-action" flex={false}>
        <Button
          label="Register now"
          kind="cta-primary"
          reverse
          // tabIndex is -1 because entire card is clickable
          tabIndex={-1}
        />
      </DashedBox>
    </CardBody>
    <Box id="cta-background-image" />
  </Card>
);
