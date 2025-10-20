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
      <Icon />
      <Box>
        <Heading level="4" margin="none">
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
      aliases={['Create']}
      guidance="Use in buttons to initiate adding or creating things."
    />
    <CoreIcon
      Icon={Edit}
      name="Edit"
      guidance="Use in buttons to initiate editing things."
    />
    <CoreIcon
      Icon={Trash}
      name="Trash"
      aliases={['Delete']}
      guidance="Use in buttons to initiate deleting things."
    />
  </Grid>
);

export const IconUIActionsExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Close}
      name="Close"
      guidance="Use in buttons to close layers."
    />
    <CoreIcon
      Icon={Search}
      name="Search"
      guidance="Use next to and within search fields to
        access and execute searching."
    />
    <CoreIcon
      Icon={Filter}
      name="Filter"
      guidance="Use in buttons to toggle filter controls associated with
        grids of cards, lists, and tables."
    />
    <CoreIcon
      Icon={Notification}
      name="Notification"
      guidance="Use in buttons in the global header to
        open a recent list or new page of notifications."
    />
    <CoreIcon
      Icon={Download}
      name="Download"
      guidance="Use in buttons to initiate downloading files."
    />
  </Grid>
);

export const IconControlsExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Add}
      name="Add"
      aliases={['Increase', 'Zoom In']}
      guidance="Use in buttons to increase counts, and zoom in on maps."
    />
    <CoreIcon
      Icon={Subtract}
      name="Subtract"
      aliases={['Decrease', 'Zoom Out']}
      guidance="Use in buttons to decrease counts, and zoom out on maps."
    />
    <CoreIcon
      Icon={Up}
      name="Collapse"
      guidance="Use in buttons to collapse content."
    />
    <CoreIcon
      Icon={Down}
      name="Expand"
      guidance="Use in buttons to expand content."
    />
    <CoreIcon
      Icon={Close}
      name="Close"
      aliases={['Clear']}
      guidance="Use in in file input fields to clear them."
    />
  </Grid>
);

export const IconInformationalExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="xsmall">
    <CoreIcon
      Icon={Info}
      name="Information"
      guidance={`Use to reveal additional contextual information inline or as a 
      tooltip.`}
    />
    <CoreIcon
      Icon={Help}
      name="Help"
      guidance={`Use to assist the user via a modal dialog, side drawer, 
      navigation to a help center, or other mechanism.`}
    />
  </Grid>
);
