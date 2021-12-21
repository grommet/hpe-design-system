import { Box, Heading, Text } from 'grommet';

export const TagPageHeader = () => (
  <Box gap="medium" flex={false}>
    <Box gap="xsmall" flex={false}>
      <Heading level={2} margin="none">
        Create and Assign Tags
      </Heading>
      <Text size="large">
        Tags are name-value pairs that can be assigned to resources.
      </Text>
    </Box>
    <Text size="large">
      Tags will be assigned to <Text weight="bold">1</Text> selected device.
    </Text>
  </Box>
);
