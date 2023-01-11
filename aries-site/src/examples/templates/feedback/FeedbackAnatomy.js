import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Diagram,
  Grid,
  Header,
  Heading,
  Stack,
  ResponsiveContext,
} from 'grommet';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'layer-title'),
  connection('2', 'layer-body'),
  connection('3', 'layer-footer'),
];

export const FeedbackAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  let columns = ['36px', 'medium', 'auto'];
  let rows = ['86px', '180px', '86px'];

  let areas = [
    ['annotation-1', 'layer', 'empty'],
    ['annotation-2', 'layer', 'empty-2'],
    ['annotation-3', 'layer', 'empty-3'],
  ];

  if (['xsmall', 'small'].includes(breakpoint)) {
    columns = ['36px', 'flex'];
    rows = ['60px', 'small', '60px'];
    areas = [
      ['annotation-1', 'layer'],
      ['annotation-2', 'layer'],
      ['annotation-3', 'layer'],
    ];
  }
  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
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
          id="3"
          target="3"
          gridArea="annotation-3"
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
    round="small"
    elevation="large"
    {...rest}
  >
    <CardBody pad={{ top: 'medium', horizontal: 'medium' }}>
      <Box border={{ style: 'dashed' }}>
        <Header flex={false} align="start" justify="between">
          <Heading id="layer-title" level={2} margin="none" size="small">
            Feedback title
          </Heading>
        </Header>
      </Box>
      <Box pad="small" id="first-gap" />
      <Box
        id="layer-body"
        border={{ style: 'dashed' }}
        height="small"
        align="center"
        justify="center"
      >
        Body of the feedback.
      </Box>
      <Box pad="small" id="layer-gap" />
      <Box id="layer-footer" border={{ style: 'dashed' }} flex={false}>
        <Box direction="row" gap="small" justify="end" flex={false}>
          <Button label="Cancel" />
          <Button label="Submit" primary />
        </Box>
      </Box>
      <Box pad="small" id="bottom-pad" />
    </CardBody>
  </Card>
);
