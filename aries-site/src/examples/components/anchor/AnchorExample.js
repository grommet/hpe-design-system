import React from 'react';
import { Anchor, Box, Paragraph, Text } from 'grommet';
import { LinkNext } from 'grommet-icons';

export const AnchorExample = () => (
  <Box>
    <Box direction="row" gap="large">
      <Anchor href="#" label="Anchor" />
      <Box>
        <Text>
          Default anchor: <Anchor href="#" label="Anchor" />
        </Text>
        <Text size="large">
          Large:{' '}
          <Anchor
            href="#"
            label="Add users"
            icon={<LinkNext color="green!" />}
            reverse
          />
        </Text>
        <Text size="medium">
          Medium:{' '}
          <Anchor
            href="#"
            label="Stage instance"
            icon={<LinkNext color="green!" />}
            reverse
          />
        </Text>
        <Text size="small">
          Small:{' '}
          <Anchor
            href="#"
            label="Buy now"
            icon={<LinkNext color="green!" />}
            reverse
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
          Small: <Anchor href="#" label="Buy now" />
        </Text>
      </Box>
    </Box>
    <Paragraph>
      Here is a block of text that has an <Anchor label="anchor embedded" /> in
      it. The size needs to be 14pt (18.667px) on light mode.
    </Paragraph>
  </Box>
);
