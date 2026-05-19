import React, { useState } from 'react';
import { Box, Button } from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

export const ButtonToggleExample = () => {
  const [active, setActive] = useState(false);

  return (
    <Box align="start" pad="medium">
      <ButtonGroup>
        <Button
          active={active}
          label={active ? 'Notifications on' : 'Notifications off'}
          onClick={() => setActive(!active)}
        />
      </ButtonGroup>
    </Box>
  );
};
