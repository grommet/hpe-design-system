import React from 'react';
import { Button, Footer } from 'grommet';
import { FormPrevious, FormNext } from 'grommet-icons';

export const FooterPageExample = () => (
  <Footer fill="horizontal">
    <Button label="Go back" icon={<FormPrevious />} />
    <Button label="Next" icon={<FormNext />} reverse />
  </Footer>
);
