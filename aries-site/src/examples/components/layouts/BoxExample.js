import React, { useContext } from 'react';
import { Box, Heading, ResponsiveContext, Text } from 'grommet';
import { IconGuidelines } from '../../../components';

export const BoxExample = () => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      align="start"
      background="green"
      gap={size === 'small' ? 'large' : 'medium'}
      pad="large"
      round="small"
      width="medium"
    >
      <IconGuidelines size="xlarge" />
      <Heading level={2} margin="none" responsive={false}>
        Guidelines
      </Heading>
      <Text size="small">
        This is the ideology and heartbeat of the HPE Design System.
      </Text>
    </Box>
  );
};
