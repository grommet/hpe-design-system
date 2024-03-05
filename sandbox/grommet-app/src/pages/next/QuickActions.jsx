import { Anchor, Box, Button, Heading } from 'grommet';
import PropTypes from 'prop-types';
import { ChapterAdd, Cloud, Edit, MapLocation, User } from 'grommet-icons';

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
            icon={<Edit color="brand" />}
            kind="subtle"
            reverse
          />
        )}
      </Box>
      <Box gap="xsmall">
        <Anchor
          icon={icons && <ChapterAdd color="brand" />}
          label="Add devices"
          href="#"
        />
        <Anchor
          icon={icons && <Cloud color="brand" />}
          label="Add service subscriptions"
          href="#"
        />
        <Anchor
          icon={icons && <User color="brand" />}
          label="Add users / Assign roles"
          href="#"
        />
        <Anchor
          icon={icons && <MapLocation color="brand" />}
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
