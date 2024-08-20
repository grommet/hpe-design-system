import React, { useRef } from 'react';
import { Popover } from 'aries-core';
import { Button, Paragraph } from 'grommet';
import { CircleInformation } from 'grommet-icons';

export const PopoverPreview = () => {
  const targetRef = useRef();
  return (
    <>
      <Button
        icon={<CircleInformation />}
        a11yTitle="informational help"
        tabIndex={-1}
        ref={targetRef}
      />
      <Popover
        target={targetRef.current}
        align={{ bottom: 'top', left: 'left' }}
      >
        <Paragraph size="small" margin="none">
          The Popover body
        </Paragraph>
      </Popover>
    </>
  );
};
