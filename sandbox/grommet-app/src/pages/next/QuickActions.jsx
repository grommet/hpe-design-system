import { Anchor, Box, Button, Heading } from 'grommet';
import PropTypes from 'prop-types';
import { Edit } from 'grommet-icons';

export const QuickActions = ({ edit = true }) => {
  return (
    <Box>
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
      <Box pad="medium" gap="xsmall">
        <Anchor label="Add devices" href="#" />
        <Anchor label="Add service subscriptions" href="#" />
        <Anchor label="Add users / Assign roles" href="#" />
        <Anchor label="Create location" href="#" />
      </Box>
    </Box>
  );
};

QuickActions.propTypes = {
  edit: PropTypes.bool,
};
