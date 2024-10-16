import React, { useState, useRef } from 'react';

import { Popover } from 'aries-core';
import { Button, Box, Paragraph, Text } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverSimpleExample = () => {
  const [showPopover, setShowPopover] = useState(false);
  const targetRef = useRef();

  const handleButtonClick = () => {
    setShowPopover(prev => !prev);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <Box direction="row" justify="center" align="center">
      <Text>Click for Popover.</Text>
      <Button
        align="center"
        justify="start"
        icon={<CircleInformation />}
        onClick={handleButtonClick}
        ref={targetRef}
        aria-expanded={showPopover}
        a11yTitle="informational help"
        aria-haspopup="true"
        aria-controls="simple-popover"
      />
      {showPopover && (
        <Popover
          id="simple-popover"
          title={<Text>I am a Popover</Text>}
          target={targetRef.current}
          onClickOutside={handleClosePopover}
          onEsc={handleClosePopover}
          onClose={handleClosePopover}
          align={{ bottom: 'top', left: 'left' }}
        >
          <Paragraph size="small" margin="none">
            A popover's contents provide contextual information for the related UI element.
            
            Unlike a tooltip, a popover is revealed and closed by a click event and may contain interactive elements.
          </Paragraph>
        </Popover>
      )}
    </Box>
  );
};
