import React from 'react';
import { Anchor, Box, Button, Diagram, Grid, Stack, Text } from 'grommet';
import { StatusWarningSmall } from 'grommet-icons/icons/StatusWarningSmall';
import { FormClose } from 'grommet-icons/icons/FormClose';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const connections = [
  connection('1', 'icon', 'vertical'),
  connection('2', 'title', 'vertical'),
  connection('3', 'message', 'horizontal'),
  connection('4', 'anchor', 'vertical'),
  connection('5', 'close-button', 'vertical'),
];

const NotificationContent = ({ ...rest }) => (
  <Box
    id="notification-container"
    alignSelf="start"
    round="xsmall"
    background="validation-warning"
    {...rest}
  >
    <Box
      direction="row"
      gap="xsmall"
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
    >
      <StatusWarningSmall id="icon" color="status-warning" />
      <Box fill border={{ style: 'dashed' }}>
        <Box alignSelf="start" id="title">
          <Text>Title</Text>
        </Box>
        <Box direction="row" gap="xsmall">
          <Box id="message">
            <Text>Message</Text>
          </Box>
          <Anchor id="anchor">Anchor</Anchor>
        </Box>
      </Box>
      <Box>
        <Button
          id="close-button"
          hoverIndicator
          plain
          icon={<FormClose color="text-strong" />}
        />
      </Box>
    </Box>
  </Box>
);

export const InlineNotificationAnatomy = () => {
  let columns = ['34px', '44px', '24px', '94px', 'auto'];
  let rows = ['30px', 'auto'];

  let areas = [
    ['empty', 'annotation-1', 'annotation-2', 'annotation-4', 'annotation-5'],
    [
      'annotation-3',
      'notification',
      'notification',
      'notification',
      'notification',
    ],
  ];

  return (
    <Stack interactiveChild="first">
      <Grid columns={columns} rows={rows} areas={areas} gap={{ row: 'large' }}>
        <Box gridArea="empty" />
        <Box>
          <Annotation
            alignSelf="center"
            id="1"
            target="1"
            gridArea="annotation-1"
          />
        </Box>
        <Box>
          <Annotation
            alignSelf="center"
            id="2"
            target="2"
            gridArea="annotation-2"
          />
        </Box>
        <Box>
          <Annotation
            alignSelf="center"
            id="4"
            target="4"
            gridArea="annotation-4"
          />
        </Box>
        <Box pad={{ right: 'xsmall' }}>
          <Annotation
            alignSelf="end"
            id="5"
            target="5"
            gridArea="annotation-5"
          />
        </Box>
        <Box pad={{ bottom: 'xsmall' }} alignSelf="end">
          <Annotation id="3" target="3" gridArea="annotation-3" />
        </Box>
        <NotificationContent gridArea="notification" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
