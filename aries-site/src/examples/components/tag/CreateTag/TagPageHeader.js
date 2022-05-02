import PropTypes from 'prop-types';
import { Box, PageHeader, Paragraph, Text } from 'grommet';

export function TagPageHeader({ description }) {
  return <Box gap="medium" flex={false}>
    <PageHeader
      title="Create and Assign Tags"
      subtitle={
        <Paragraph size="large" margin="none" fill>
          {description ||
            'Tags are name-value pairs that can be assigned to resources.'}
        </Paragraph>
      }
    />
    <Text size="large">
      Tags will be assigned to <Text weight="bold">1</Text> selected device.
    </Text>
  </Box>;
}

TagPageHeader.propTypes = {
  description: PropTypes.string,
};
