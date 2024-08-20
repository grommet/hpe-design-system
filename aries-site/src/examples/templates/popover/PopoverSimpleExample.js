import React, { useState, useRef } from 'react';

import { Popover } from 'aries-core';
import { Button, Box, Paragraph, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverSimpleExample = () => {
  const [showPopover, setShowPopover] = useState(false);
  const targetRef = useRef();

  const handleButtonClick = () => {
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <Box justify="center" align="center">
      <Button
        align="center"
        justify="start"
        icon={<CircleInformation />}
        onClick={handleButtonClick}
        ref={targetRef}
        ariaExpanded={showPopover}
        a11yTitle="informational help"
        popovertarget="simple-popover"
      />
      {showPopover && (
        <Popover
          heading={<Text>I am a Popover</Text>}
          target={targetRef.current}
          onClickOutside={handleClosePopover}
          onEsc={handleClosePopover}
          onClose={handleClosePopover}
          align={{ bottom: 'top', left: 'left' }}
          id="simple-popover"
        >
          <Paragraph size="small" margin="none">
            The Popover body provides contextual information related to the
            trigger
          </Paragraph>
        </Popover>
      )}
    </Box>
  );
};
