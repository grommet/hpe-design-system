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
import { FormNextLink } from 'grommet-icons';
import { Annotation } from '../../../layouts';
import { event } from './data';

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
    <Box id="cta-image" height="small">
      {/* eslint-disable-next-line grommet/image-alt-text */}
      <Image {...event.image} />
    </Box>
    <CardBody align="start" gap="medium">
      <Box gap="xsmall">
        <DashedBox id="cta-pretitle">
          <Text size="small">{event.pretitle}</Text>
        </DashedBox>
        <DashedBox id="cta-title">
          <Heading level={3} margin="none" size="small">
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
          icon={<FormNextLink />}
          primary
          reverse
          // tabIndex is -1 because entire card is clickable
          tabIndex={-1}
        />
      </DashedBox>
    </CardBody>
    <Box id="cta-background-image" />
  </Card>
);

const color = 'border';
const anchor = 'horizontal';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-1a',
    toTarget: 'cta-title',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-1b',
    toTarget: 'cta-pretitle',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-1c',
    toTarget: 'cta-subtitle',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-2',
    toTarget: 'cta-description',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-3',
    toTarget: 'cta-action',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-4',
    toTarget: 'cta-image',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: 'cta-5',
    toTarget: 'cta-background-image',
  },
];

export const CallToActionAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      justify="start"
      columns={['xsmall', 'medium']}
      rows={['small', '24px', '24px', '48px', '24px', '100px', '24px', '40px']}
      areas={[
        ['cta-annotation-4', 'card-example'],
        ['cta-empty', 'card-example'],
        ['cta-annotation-1b', 'card-example'],
        ['cta-annotation-1a', 'card-example'],
        ['cta-annotation-1c', 'card-example'],
        ['cta-annotation-2', 'card-example'],
        ['cta-empty-2', 'card-example'],
        ['cta-annotation-3', 'card-example'],
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
      <CardExample gridArea="card-example" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);
