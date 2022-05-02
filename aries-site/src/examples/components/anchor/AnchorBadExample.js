import React from 'react';
import { Anchor, Paragraph } from 'grommet';

export function AnchorBadExample() {
  return <Paragraph>
    If you haven't yet,{' '}
    <Anchor
      label="click here"
      href="https://design-system.hpe.design/foundation/philosophy"
    />{' '}
    to read about Our Philosophy.
  </Paragraph>;
}
