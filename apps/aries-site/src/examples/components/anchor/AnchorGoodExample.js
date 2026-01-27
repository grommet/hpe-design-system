import React from 'react';
import { Anchor, Paragraph } from 'grommet';

export const AnchorGoodExample = () => (
  <Paragraph>
    If you haven't yet, you can read about{' '}
    <Anchor
      label="Our Philosophy"
      href="https://design-system.hpe.design/foundation/philosophy"
    />
    .
  </Paragraph>
);
