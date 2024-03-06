import { Anchor, Box, Button, Heading } from 'grommet';
import PropTypes from 'prop-types';
import {
  ChapterAdd,
  Cloud,
  Edit,
  MapLocation,
  Stakeholder,
  UserAdd,
} from 'grommet-icons';

export const QuickActions = ({ edit = true, icons }) => {
  return (
    <Box gap="medium">
      <Box direction="row" align="center" justify="between">
        <Heading level={2} margin="none">
          Quick Actions
        </Heading>
        {edit && (
          <Button
            label="Edit"
            icon={<Edit color="primary" />}
            kind="subtle"
            reverse
          />
        )}
      </Box>
      <Box gap="small">
        <Anchor
          icon={icons && <ChapterAdd color="primary" />}
          label="Add devices"
          href="#"
        />
        <Anchor
          icon={icons && <Cloud color="primary" />}
          label="Add service subscriptions"
          href="#"
        />
        <Anchor
          icon={icons && <UserAdd color="primary" />}
          label="Add users"
          href="#"
        />
        <Anchor
          icon={icons && <Stakeholder color="primary" />}
          label="Assign roles"
          href="#"
        />
        <Anchor
          icon={icons && <MapLocation color="primary" />}
          label="Create location"
          href="#"
        />
      </Box>
    </Box>
  );
};

QuickActions.propTypes = {
  icons: PropTypes.bool,
  edit: PropTypes.bool,
};
