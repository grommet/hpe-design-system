import PropTypes from 'prop-types';
import { Box, PageHeader, Text } from 'grommet';
import { TextEmphasis } from 'library';

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
      Tags will be assigned to <TextEmphasis>1</TextEmphasis> selected device.
    </Text>
  </Box>
);

TagPageHeader.propTypes = {
  description: PropTypes.string,
};
