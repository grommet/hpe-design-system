import React from 'react';
import { Anchor, Box, Button, Diagram, Grid, Stack, Paragraph } from 'grommet';
import { Close, StatusWarning } from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'icon', 'horizontal'),
  connection('2', 'title', 'vertical'),
  connection('3', 'message', 'vertical'),
  connection('4', 'anchor', 'vertical'),
  connection('5', 'close-button', 'vertical'),
];

const NotificationContent = ({ ...rest }) => (
  <Box
    id="notification-container"
    alignSelf="start"
    round="xsmall"
    background="validation-warning"
    fill
    {...rest}
  >
    <Box
      direction="row"
      gap="3xsmall"
      pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
    >
      <StatusWarning
        gridArea="icon"
        id="icon"
        color="status-warning"
        height="medium"
      />
      <Box fill border={{ style: 'dashed' }}>
        <TextEmphasis id="title" alignSelf="start">
          Title
        </TextEmphasis>
        <Box direction="row" gap="3xsmall">
          <Paragraph id="message" margin="none">
            Message
          </Paragraph>
          <Anchor id="anchor">Anchor</Anchor>
        </Box>
      </Box>
      <Button
        a11yTitle="Close notification"
        id="close-button"
        alignSelf="start"
        hoverIndicator
        plain
        icon={<Close color="text-strong" />}
      />
    </Box>
  </Box>
);

export const InlineNotificationAnatomy = () => {
  const columns = ['5xsmall', 'auto', 'auto', 'auto', 'flex', 'auto'];
  const rows = ['5xsmall', 'auto', 'auto', '5xsmall'];
  const areas = [
    [
      'empty-1-1',
      'empty-2-1',
      'annotation-2',
      'empty-4-1',
      'empty-5-1',
      'annotation-5',
    ],
    [
      'annotation-1',
      'notification',
      'notification',
      'notification',
      'notification',
      'notification',
    ],
    [
      'empty-1-3',
      'notification',
      'notification',
      'notification',
      'notification',
      'notification',
    ],
    [
      'empty-1-4',
      'empty-2-4',
      'annotation-3',
      'annotation-4',
      'empty-5',
      'empty-5',
    ],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid
        columns={columns}
        rows={rows}
        areas={areas}
        align="center"
        justify="center"
      >
        <Annotation id="1" target="1" gridArea="annotation-1" />
        <Annotation id="2" target="2" gridArea="annotation-2" />
        <Annotation id="3" target="3" gridArea="annotation-3" />
        <Annotation id="4" target="4" gridArea="annotation-4" />
        <Annotation id="5" target="5" gridArea="annotation-5" />
        <NotificationContent gridArea="notification" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
