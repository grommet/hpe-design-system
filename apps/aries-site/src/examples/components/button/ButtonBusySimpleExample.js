import React, { useState } from 'react';
import { Button } from 'grommet';

export const ButtonBusySimpleExample = () => {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <Button
      label="Click me"
      onClick={() => {
        setBusy(true);
        setTimeout(() => {
          setBusy(false);
          setSuccess(true);
        }, 2000);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      }}
      busy={busy}
      success={success}
      primary
    />
  );
};
