import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';

export const AccordionPreview = () => {
  return (
    <Accordion>
      <AccordionPanel label="Panel 1" />
      <AccordionPanel label="Panel 2">
        <Box background="light-2" style={{ height: '50px' }}>
          Panel 2 contents
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Panel 3" />
    </Accordion>
  );
};
