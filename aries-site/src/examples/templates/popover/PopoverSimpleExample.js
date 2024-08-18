import React, { useState, useRef } from 'react';

import { Popover } from 'aries-core';
import { Anchor, Button, Box, Paragraph } from 'grommet';
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
      />
      {showPopover && (
        <Popover
          heading="Automatically Adding Servers"
          footer={<Anchor label="Learn more" href="#" />}
          target={targetRef.current}
          onClickOutside={handleClosePopover}
          onEsc={handleClosePopover}
          onClose={handleClosePopover}
        >
          <Paragraph size="small" margin="none">
            A server is added to a group when you apply an HPE GreenLake device
            tag that matches the tag of a server group with Automate adding
            servers enabled or when a server with a matching device tag is added
            to a Compute Ops Management application instance.
          </Paragraph>
        </Popover>
      )}
    </Box>
  );
};
