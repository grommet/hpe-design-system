import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, Grid, Heading, Paragraph } from 'grommet';
import {
  Add,
  Close,
  Download,
  Edit,
  Filter,
  FormDown,
  FormUp,
  Notification,
  Search,
  Subtract,
  Trash,
} from 'grommet-icons';

const CoreIcon = ({ Icon, name, guidance }) => (
  <Card elevation={false}>
    <CardHeader direction="column" align="stretch" gap="small">
      <Icon />
      <Heading level="3" size="small" margin="none">
        {name}
      </Heading>
    </CardHeader>
    <CardBody pad={{ top: 'none', horizontal: 'medium', bottom: 'medium' }}>
      <Paragraph margin="none">{guidance}</Paragraph>
    </CardBody>
  </Card>
);

CoreIcon.propTypes = {
  Icon: PropTypes.object,
  name: PropTypes.string,
  guidance: PropTypes.string,
};

export const IconCoreExample = () => (
  <Grid alignSelf="stretch" gap="medium" columns="small">
    <CoreIcon
      Icon={Add}
      name="Add"
      guidance="Placed in buttons as an action to
        add items, increase count, and zoom out on maps."
    />
    <CoreIcon
      Icon={Subtract}
      name="Subtract"
      guidance="Placed in buttons as an action to
        remove a selection, decrease count, and zoom in on maps."
    />
    <CoreIcon
      Icon={Edit}
      name="Edit"
      guidance="Placed in buttons as an action to edit objects."
    />
    <CoreIcon
      Icon={Trash}
      name="Trash"
      guidance="Placed in buttons as an action to delete objects."
    />
    <CoreIcon
      Icon={Filter}
      name="Filter"
      guidance="Placed in buttons as an action to filter grids of cards,
        lists, and tables."
    />
    <CoreIcon
      Icon={Download}
      name="Download"
      guidance="Placed in buttons as an action to
        download files."
    />
    <CoreIcon
      Icon={Notification}
      name="Notification"
      guidance="Placed in buttons in the global header as an action to
        open a recent list or new page of notifications."
    />
    <CoreIcon
      Icon={Search}
      name="Search"
      guidance="Placed next to and within search fields as an action to
        access and execute search and filtering."
    />
    <CoreIcon
      Icon={Close}
      name="Close"
      guidance="Placed in buttons as an action to
        close layers."
    />
    <CoreIcon
      Icon={FormUp}
      name="Collapse"
      guidance="Placed in buttons as an action to
        collapse content."
    />
    <CoreIcon
      Icon={FormDown}
      name="Expand"
      guidance="Placed in buttons as an action to
        expand content."
    />
  </Grid>
);
