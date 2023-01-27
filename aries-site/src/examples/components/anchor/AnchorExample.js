import React from 'react';
import { Anchor, Box, Text } from 'grommet';
import { FormNextLink } from 'grommet-icons';

export const AnchorExample = () => (
  <Box direction="row" gap="large">
    <Box>
      <Text>
        Default anchor: <Anchor href="#" label="Anchor" />
      </Text>
      <Text size="large">
        Large:{' '}
        <Anchor href="#" label="Add users" icon={<FormNextLink />} reverse />
      </Text>
      <Text size="medium">
        Medium:{' '}
        <Anchor
          href="#"
          label="Stage instance"
          icon={<FormNextLink />}
          reverse
        />
      </Text>
      <Text size="small">
        Small:{' '}
        <Anchor
          href="#"
          label="Buy now"
          icon={<FormNextLink />}
          reverse
          size="small"
        />
      </Text>
    </Box>
    <Box>
      <Text>
        Default anchor: <Anchor href="#" label="Anchor" />
      </Text>
      <Text size="large">
        Large: <Anchor href="#" label="Add users" />
      </Text>
      <Text size="medium">
        Medium: <Anchor href="#" label="Stage instance" />
      </Text>
      <Text size="small">
        Small: <Anchor href="#" label="Buy now" size="small" />
      </Text>
    </Box>
  </Box>
);
