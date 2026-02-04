import React from 'react';
import { Anchor, Paragraph } from 'grommet';

export const AnchorBadExample = () => (
  <Paragraph>
    If you haven't yet,{' '}
    {/* Ignore rule because this is demonstrating a bad practice. */}
    {/* eslint-disable-next-line grommet/anchor-label */}
    <Anchor
      label="click here"
      href="https://design-system.hpe.design/foundation/philosophy"
    />{' '}
    to read about Our Philosophy.
  </Paragraph>
);
