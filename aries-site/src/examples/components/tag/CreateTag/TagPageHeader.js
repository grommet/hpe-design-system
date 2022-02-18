import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Heading, Text } from 'grommet';
import { PageContainerContext } from '../../..';

export const TagPageHeader = ({ description }) => {
  const { ...pageContainer } = useContext(PageContainerContext);
  return (
    <Box {...pageContainer} gap="medium" flex={false}>
      <Box gap="xsmall" flex={false}>
        <Heading level={2} margin="none">
          Create and Assign Tags
        </Heading>
        <Text size="large">
          {description ||
            'Tags are name-value pairs that can be assigned to resources.'}
        </Text>
      </Box>
      <Text size="large">
        Tags will be assigned to <Text weight="bold">1</Text> selected device.
      </Text>
    </Box>
  );
};

TagPageHeader.propTypes = {
  description: PropTypes.string,
};
