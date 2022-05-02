import React from 'react';
import { Button, Nav } from 'grommet';

export function NavExample() {
  return <Nav direction="row">
    <Button label="Profile" />
    <Button label="Settings" />
    <Button label="Contact" />
  </Nav>;
}
