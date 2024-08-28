import React, { useRef, useState } from 'react';

import { Popover } from 'aries-core';
import { Button, Anchor, Box, Paragraph } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverDoExample = () => {
  const targetRef = useRef();
  const [showPopover, setShowPopover] = useState(true);

  const handleClosePopover = () => {
    setShowPopover(false);
  };

  return (
    <Box justify="center" align="center">
      <Button
        align="center"
        justify="start"
        icon={<CircleInformation />}
        ref={targetRef}
        a11yTitle="informational help"
        popovertarget="popover-example-do"
      />
      {showPopover && (
        <Popover
          target={targetRef.current}
          align={{ bottom: 'top', left: 'right' }}
          footer={<Anchor size="small" label="Learn more" />}
          onClose={handleClosePopover}
        >
          <Paragraph size="small" margin="none">
            The SAML attributes must be configured on the IdP according to
            specifications associated with a user account in HPE GreenLake.
          </Paragraph>
        </Popover>
      )}
    </Box>
  );
};
