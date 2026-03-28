import PropTypes from 'prop-types';
import { Box, PageHeader, Text } from 'grommet';
import { TextEmphasis } from '@shared/aries-core';

export const TagPageHeader = ({ description }) => (
  <Box gap="medium" flex={false}>
    <Box gap="3xsmall" flex={false}>
      <PageHeader
        title="Create and assign tags"
        subtitle={
          description ||
          'Tags are name-value pairs that can be assigned to resources.'
        }
        pad="none"
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
