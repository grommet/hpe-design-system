import { Box, Button, Heading } from 'grommet';
import { Edit } from 'grommet-icons';

export const QuickActions = () => {
  return (
    <Box>
      <Box direction="row" align="center" justify="between">
        <Heading level={2} margin="none">
          Quick Actions
        </Heading>
        <Button
          label="Edit"
          icon={<Edit color="brand" />}
          kind="subtle"
          reverse
        />
      </Box>
    </Box>
  );
};
