import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Grid,
  Heading,
  Paragraph,
  Stack,
} from 'grommet';
import { FormClose } from 'grommet-icons';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils/utils';

const connections = [
  connection('1', 'layer-header'),
  connection('2', 'layer-actions'),
  connection('screen', 'layer-container'),
];

export const SideDrawerLayerAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      align="center"
      columns={['medium', 'auto']}
      rows={['24px', '36px', '55px', '24px', 'small', '24px', '36px', '24px']}
      areas={[
        ['layer', 'empty-1'],
        ['layer', 'annotation-1'],
        ['layer', 'empty-2'],
        ['layer', 'empty-2'],
        ['layer', 'annotation-screen'],
        ['layer', 'empty-3'],
        ['layer', 'annotation-2'],
        ['layer', 'empty-4'],
      ]}
      gap={{ column: 'medium' }}
    >
      <Annotation
        alignSelf="center"
        id="1"
        target="1"
        gridArea="annotation-1"
      />
      <Annotation
        alignSelf="center"
        id="2"
        target="2"
        gridArea="annotation-2"
      />
      <Annotation
        alignSelf="center"
        id="screen"
        target="Right edge of window"
        pad={{ horizontal: 'small' }}
        background="background-contrast"
        gridArea="annotation-screen"
        width="fit-content"
      />
      <LayerContent gridArea="layer" />
    </Grid>
    <Diagram connections={connections} />
  </Stack>
);

const LayerContent = ({ ...rest }) => (
  <Card
    id="layer-container"
    alignSelf="start"
    elevation="large"
    round={{
      size: 'small',
      corner: 'left',
    }}
    {...rest}
  >
    <CardBody gap="medium">
      <Box direction="row" align="start" gap="small" flex={false}>
        <Box gap="xsmall">
          <Heading level={2} margin="none" size="small">
            Layer title
          </Heading>
          <Paragraph margin="none">
            A concise subtitle that provides additional context.
          </Paragraph>
        </Box>
        <Button id="layer-header" icon={<FormClose />} />
      </Box>
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="small"
        align="center"
        justify="center"
      >
        Layer body content goes here.
      </Box>
      <Box direction="row" gap="small" flex={false}>
        <Button label="Confirm action" primary />
        <Button label="Cancel" id="layer-actions" />
      </Box>
    </CardBody>
  </Card>
);
