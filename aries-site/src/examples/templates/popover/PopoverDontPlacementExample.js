import React, { useRef } from 'react';

import { Popover } from 'aries-core';
import { Button, Anchor, Box, Paragraph } from 'grommet';

export const PopoverDontPlacementExample = () => {
  const targetRef = useRef();

  return (
    <Box justify="center" align="center">
      <Button
        align="center"
        justify="start"
        primary
        label="primary button"
        ref={targetRef}
        a11yTitle="informational help"
        popovertarget="popover-primary"
      />
      <Popover
        target={targetRef.current}
        align={{ top: 'top', left: 'left' }}
        footer={<Anchor size="small" label="Anchor" />}
      >
        <Paragraph size="small" margin="none">
          This popover is partially covering up the primary button below.
        </Paragraph>
      </Popover>
    </Box>
  );
};
