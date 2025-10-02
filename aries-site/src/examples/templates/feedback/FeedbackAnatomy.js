import React from 'react';
import { Box, Button, Diagram, Grid, Header, Heading, Stack } from 'grommet';
import { ButtonGroup } from 'aries-core';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'feedback-title'),
  connection('2', 'feedback-body'),
  connection('3', 'feedback-footer'),
];

export const FeedbackAnatomy = () => {
  const columns = [
    ['auto', '5xsmall'],
    ['auto', 'medium'],
  ];
  const areas = [
    ['annotation-1', 'feedback-header'],
    ['annotation-2', 'feedback-body'],
    ['annotation-3', 'feedback-footer'],
  ];

  return (
    <section>
      <Stack interactiveChild="first">
        <Grid columns={columns} areas={areas}>
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
          <FeedbackContent />
        </Grid>
        <Diagram connections={connections} />
      </Stack>
    </section>
  );
};

const FeedbackContent = () => (
  <>
    <Header gridArea="feedback-header" border={{ style: 'dashed' }}>
      <Heading id="feedback-title" level={2} margin="none" size="small">
        Feedback title
      </Heading>
    </Header>
    <Box
      gridArea="feedback-body"
      id="feedback-body"
      border={{ style: 'dashed' }}
      align="center"
      justify="center"
      height="3xsmall"
    >
      Body containing feedback questions.
    </Box>
    <Box
      gridArea="feedback-footer"
      id="feedback-footer"
      border={{ style: 'dashed' }}
    >
      <ButtonGroup>
        <Button label="Submit feedback" primary />
        <Button label="No thanks" />
      </ButtonGroup>
    </Box>
  </>
);
