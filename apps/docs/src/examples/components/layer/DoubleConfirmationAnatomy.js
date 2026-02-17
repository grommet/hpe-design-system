import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Grid,
  Heading,
  Stack,
  Paragraph,
} from 'grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1a-confirmation', 'confirmation-title'),
  connection('1b-confirmation', 'confirmation-subtitle'),
  connection('2-confirmation', 'confirmation-footer'),
];

export const DoubleConfirmationAnatomy = () => {
  const columns = ['36px', 'medium', 'auto'];
  const rows = ['24px', '37px', '25px', '24px', '36px', '24px'];

  const areas = [
    ['empty-0', 'layer', 'empty'],
    ['annotation-1a', 'layer', 'empty'],
    ['annotation-1b', 'layer', 'empty-3'],
    ['gap-1', 'layer', 'empty-3'],
    ['annotation-2', 'layer', 'empty-4'],
    ['empty-2', 'layer', 'annotation-round'],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
        gap={{ column: 'xlarge' }}
      >
        <Annotation
          alignSelf="center"
          id="1a-confirmation"
          target="1a"
          gridArea="annotation-1a"
        />
        <Annotation
          alignSelf="center"
          id="1b-confirmation"
          target="1b"
          gridArea="annotation-1b"
        />
        <Annotation
          alignSelf="center"
          id="2-confirmation"
          target="2"
          gridArea="annotation-2"
        />
        <LayerContent gridArea="layer" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const LayerContent = ({ ...rest }) => (
  <Card
    id="layer-container"
    alignSelf="start"
    round="medium"
    elevation="large"
    {...rest}
  >
    <CardBody pad={{ top: 'medium', horizontal: 'medium' }}>
      <Box>
        <Heading id="confirmation-title" level={2} margin="none">
          Discard "Add application"?
        </Heading>
        <Paragraph id="confirmation-subtitle" margin="none">
          Your changes will not be applied.
        </Paragraph>
      </Box>
      <Box pad="xsmall" />
      <Box
        id="confirmation-footer"
        direction="row"
        border={{ style: 'dashed' }}
        justify="end"
        flex={false}
        gap="xsmall"
      >
        <Button label="Cancel" />
        <Button label="Discard" primary />
      </Box>
      <Box pad="xsmall" id="bottom-pad" />
    </CardBody>
  </Card>
);
