import React, { useRef } from 'react';

import { Popover } from 'aries-core';
import { Button, Box, Paragraph } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverDontNestExample = () => {
  const targetRef = useRef();
  const targetRefNested = useRef();

  return (
    <Box justify="center" align="center">
      <Button
        align="center"
        justify="start"
        icon={<CircleInformation />}
        ref={targetRef}
        a11yTitle="informational help"
        popovertarget="popover-nested"
      />
      <Popover
        target={targetRef.current}
        align={{ bottom: 'bottom', left: 'right' }}
      >
        <Box direction="row" gap="xxsmall">
          <Paragraph size="small" margin="none">
            Popovers should not be nested.
          </Paragraph>
          <Button
            justify="start"
            icon={<CircleInformation />}
            ref={targetRefNested}
            a11yTitle="informational help"
            popovertarget="popover-nested-example"
          />
        </Box>
      </Popover>
      <Popover
        target={targetRefNested.current}
        align={{ top: 'bottom', right: 'right' }}
      >
        <Paragraph size="small" margin="none">
          Popovers should not be nested.
        </Paragraph>
      </Popover>
    </Box>
  );
};
