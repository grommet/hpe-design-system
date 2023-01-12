import React, { useContext } from 'react';
import {
  Box,
  Button,
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
  connection('1', 'feedback-title'),
  connection('2', 'feedback-body'),
  connection('3', 'feedback-footer'),
];

export const FeedbackAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  let columns = ['36px', 'medium'];
  let rows = ['86px', '148px', '48px'];

  let areas = [['annotation-1'], ['annotation-2'], ['annotation-3']];

  if (['xsmall', 'small'].includes(breakpoint)) {
    columns = ['36px', 'flex'];
    rows = ['60px', 'small', '60px'];
    areas = [['annotation-1'], ['annotation-2'], ['annotation-3']];
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
        <FeedbackContent gridArea="layer" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};

const FeedbackContent = () => (
  <>
    <Box justify="center" border={{ style: 'dashed' }}>
      <Header flex={false} align="center">
        <Heading id="feedback-title" level={2} margin="none" size="small">
          Feedback title
        </Heading>
      </Header>
    </Box>
    <Box
      id="feedback-body"
      border={{ style: 'dashed' }}
      align="center"
      justify="center"
    >
      Body containing feedback questions.
    </Box>
    <Box
      height="xxsmall"
      id="feedback-footer"
      border={{ style: 'dashed' }}
      flex={false}
      justify="center"
    >
      <Box alignSelf="end" direction="row" gap="small" flex={false}>
        <Button label="Submit" primary />
        <Button label="Dismiss" />
      </Box>
    </Box>
    <Box pad="small" id="bottom-pad" />
  </>
);
