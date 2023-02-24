import React from 'react';
import { Anchor, Text } from 'grommet';
import { Next } from 'grommet-icons';

export const AnchorExample = () => (
  <>
    <Text>
      Default anchor: <Anchor href="#" label="Anchor" />
    </Text>
    <Text>
      <Anchor href="#" label="Color override" color="text-strong" />
    </Text>
    <Text>
      <Anchor href="#" label="Size override" size="small" />
    </Text>
    <Text>
      <Anchor href="#" label="Weight override" weight="bold" />
    </Text>
    <Text>
      <Anchor
        href="#"
        label="Style prop"
        style={{
          fontSize: '16px',
        }}
      />
    </Text>
  </>
);
