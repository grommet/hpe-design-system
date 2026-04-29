import React from 'react';
import { Button, Box, Paragraph } from 'grommet';
import { Info } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';

export const PopoverPreview = () => {
  const ref = useInert();

  return (
    <>
      <Button ref={ref} icon={<Info />} a11yTitle="informational help" />
      <Box
        background="background-front"
        pad="xsmall"
        round="xxsmall"
        elevation="medium"
      >
        <Paragraph size="small" margin="none">
          This is a popover
        </Paragraph>
      </Box>
    </>
  );
};
