import React, { useState } from 'react';
import { Button } from 'grommet';

export const ButtonToggleExample = () => {
  const [active, setActive] = useState(false);

  return (
    <Button
      active={active}
      label={active ? 'Notifications on' : 'Notifications off'}
      onClick={() => setActive(!active)}
      secondary
    />
  );
};
