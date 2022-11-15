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
  connection('1a', 'layer-title'),
  connection('1b', 'layer-subtitle'),
  connection('1c', 'layer-header'),
  connection('2', 'layer-body'),
  connection('3', 'layer-actions'),
];

export const SideDrawerLayerAnatomy = () => (
  <Stack interactiveChild="first">
    <Grid
      align="center"
      columns={['flex', 'auto', 'flex']}
      rows={['24px', '37px', '6px', '24px', '24px', 'small', 'auto']}
      areas={[
        ['empty-0', 'layer', 'empty-1'],
        ['annotation-1a', 'layer', 'annotation-1c'],
        ['gap-1', 'layer', 'empty-2'],
        ['annotation-1b', 'layer', 'empty-2'],
        ['gap-2', 'layer', 'empty-2'],
        ['annotation-2', 'layer', 'empty-2'],
        ['annotation-3', 'layer', 'empty-2'],
      ]}
      gap={{ column: 'medium' }}
    >
      <Annotation
        alignSelf="center"
        id="1a"
        target="1a"
        gridArea="annotation-1a"
      />
      <Annotation
        alignSelf="center"
        id="1b"
        target="1b"
        gridArea="annotation-1b"
      />
      <Annotation
        alignSelf="center"
        id="1c"
        target="1c"
        gridArea="annotation-1c"
      />
      <Annotation
        alignSelf="center"
        id="2"
        target="2"
        gridArea="annotation-2"
      />
      <Annotation
        alignSelf="center"
        id="3"
        target="3"
        gridArea="annotation-3"
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
    animate={false}
    round={{
      size: 'small',
      corner: 'left',
    }}
    {...rest}
  >
    <CardBody gap="medium">
      <Box direction="row" align="start" gap="small" flex={false}>
        <Box gap="xsmall">
          <Heading level={2} margin="none" size="small" id="layer-title">
            Layer title
          </Heading>
          <Paragraph margin="none" id="layer-subtitle">
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
      <Box id="layer-footer" direction="row" gap="small" flex={false}>
        <Button label="Confirm action" primary id="layer-actions" />
        <Button label="Cancel" />
      </Box>
    </CardBody>
  </Card>
);
