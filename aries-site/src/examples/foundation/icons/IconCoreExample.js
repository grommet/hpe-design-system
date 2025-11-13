import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Grid,
  Heading,
  Paragraph,
  Text,
} from 'grommet';
import {
  Add,
  Alert,
  Info,
  Help,
  Close,
  Download,
  Edit,
  Filter,
  Down,
  Up,
  Notification,
  Search,
  Subtract,
  Trash,
  ZoomIn,
  ZoomOut,
} from '@hpe-design/icons-grommet';
import { TextEmphasis } from 'aries-core';

const CoreIcon = ({ Icon, name, aliases, guidance }) => (
  <Card elevation={false}>
    <CardHeader
      direction="column"
      align="stretch"
      gap="xsmall"
      pad={{ top: 'medium', horizontal: 'medium', bottom: 'xsmall' }}
    >
      <Icon size="xlarge"/>
      <Box>
        <Heading level="4" margin="none" size="small">
          {name}
        </Heading>
        {aliases && (
          <Box direction="row" gap="3xsmall" wrap>
            <Text>or</Text>
            {aliases.map((a, i) => (
              <>
                <TextEmphasis>{a}</TextEmphasis>
                {i < aliases.length - 1 && ', '}
              </>
            ))}
          </Box>
        )}
      </Box>
    </CardHeader>
    <CardBody pad={{ top: 'none', horizontal: 'medium', bottom: 'medium' }}>
      <Paragraph margin="none">{guidance}</Paragraph>
    </CardBody>
  </Card>
);

CoreIcon.propTypes = {
  Icon: PropTypes.object,
  name: PropTypes.string,
  aliases: PropTypes.arrayOf(PropTypes.string),
  guidance: PropTypes.string,
};

export const IconResourceActionsExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Add}
      name="Add"
      guidance="Use to initiate the creation or addition of a new item."
    />
    <CoreIcon
      Icon={Edit}
      name="Edit"
      guidance="Use to initiate editing or modification of content."
    />
    <CoreIcon
      Icon={Trash}
      name="Trash"
      guidance="Use to initiate the removal or deletion of content."
    />
  </Grid>
);

export const IconUIActionsExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Close}
      name="Close"
      guidance="Use to dismiss or close layers, modals, or panels."
    />
    <CoreIcon
      Icon={Search}
      name="Search"
      guidance="Use to indicate that an input field supports search."
    />
    <CoreIcon
      Icon={Filter}
      name="Filter"
      guidance={
        'Use to toggle filter controls for data collections such as ' +
        'lists, tables, or card grids.'
      }
    />
    <CoreIcon
      Icon={Notification}
      name="Notification"
      guidance={
        'Use to signal updates, alerts, or new activity requiring ' +
        'user attention.'
      }
    />
    <CoreIcon
      Icon={Download}
      name="Download"
      guidance={
        'Use to indicate that a file or resource is available to ' +
        'download.'
      }
    />
  </Grid>
);

export const IconControlsExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Add}
      name="Add"
      guidance="Use to increase a value or quantity."
    />
    <CoreIcon
      Icon={Subtract}
      name="Subtract"
      guidance="Use to decrease a value or quantity."
    />
    <CoreIcon
      Icon={ZoomIn}
      name="Zoom In"
      guidance="Use to increase zoom level or enlarge content."
    />
    <CoreIcon
      Icon={ZoomOut}
      name="Zoom Out"
      guidance="Use to decrease zoom level or reduce content size."
    />
    <CoreIcon
      Icon={Up}
      name="Up"
      guidance="Use to indicate collapsable content."
    />
    <CoreIcon
      Icon={Down}
      name="Down"
      guidance="Use to indicate expandable content."
    />
    {/* The Design system doesnt have a custom design solution for
    clearing input fields */}
    {/* <CoreIcon
      Icon={Close}
      name="Close"
      guidance="Use in in file input fields to clear them."
    /> */}
  </Grid>
);

export const IconInformationalExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Info}
      name="Info"
      guidance={
        'Use to indicate additional contextual information, either ' +
        'inline or in a tooltip.'
      }
    />
    <CoreIcon
      Icon={Help}
      name="Help"
      guidance={
        'Use to signal that contextual help or support content is ' +
        'available, such as guidance or help center.'
      }
    />
    <CoreIcon
      Icon={Alert}
      name="Alert"
      guidance={
        'Use to indicate a warning or important message that requires ' +
        'user attention. Not used to indicate status.'
      }
    />
  </Grid>
);
