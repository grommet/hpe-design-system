import React from 'react';
import { Button, Footer } from 'grommet';
import { Previous, Next } from 'grommet-icons';

export const FooterPageExample = () => (
  <Footer fill="horizontal">
    <Button label="Go back" icon={<Previous />} />
    <Button label="Next" icon={<Next />} reverse />
  </Footer>
);
