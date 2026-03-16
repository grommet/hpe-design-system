import React from 'react';
import { Anchor, Paragraph } from 'grommet';

export const AnchorInlineExample = () => (
    <Paragraph>
      Embracing the courage and commitment to learn, share and serve with
      uncompromising integrity, the HPE Design System will advance the way
      people live and work. If you haven't yet, you can read about{' '}
      <Anchor
        label="Our Philosophy"
        href="https://design-system.hpe.design/foundation/philosophy"
      />
      .
    </Paragraph>
  );
