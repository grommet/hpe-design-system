import PropTypes from 'prop-types';
import { Box, PageHeader, Text } from 'grommet';

export const TagPageHeader = ({ description }) => (
  <Box gap="medium" flex={false}>
    <Box gap="xsmall" flex={false}>
      <PageHeader
        title="Create and Assign Tags"
        subtitle={
          description ||
          'Tags are name-value pairs that can be assigned to resources.'
        }
      />
    </Box>
    <Text size="large">
      Tags will be assigned to <Text weight="bold">1</Text> selected device.
    </Text>
  </Box>
);

TagPageHeader.propTypes = {
  description: PropTypes.string,
};
