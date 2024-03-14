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
            icon={<Edit color="foreground-brand-default" />}
            kind="subtle"
            reverse
          />
        )}
      </Box>
      <Box gap="small">
        <Anchor
          icon={icons && <ChapterAdd color="foreground-brand-default" />}
          label="Add devices"
          href="#"
        />
        <Anchor
          icon={icons && <Cloud color="foreground-brand-default" />}
          label="Add service subscriptions"
          href="#"
        />
        <Anchor
          icon={icons && <UserAdd color="foreground-brand-default" />}
          label="Add users"
          href="#"
        />
        <Anchor
          icon={icons && <Stakeholder color="foreground-brand-default" />}
          label="Assign roles"
          href="#"
        />
        <Anchor
          icon={icons && <MapLocation color="foreground-brand-default" />}
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
