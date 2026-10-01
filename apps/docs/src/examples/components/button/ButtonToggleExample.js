// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
