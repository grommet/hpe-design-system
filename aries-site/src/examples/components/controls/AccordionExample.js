import React from 'react';
import { Box } from 'grommet';
import { Accordion, AccordionPanel } from 'aries-core';

export const AccordionExample = () => {
  const pad = { vertical: 'medium' };

  return (
    <Box
      pad={{ horizontal: 'large', bottom: 'large', top: 'medium' }}
      background="background-front"
    >
      <Accordion>
        <AccordionPanel label="Our Company">
          <Box pad={pad}>We are HPE.</Box>
        </AccordionPanel>
        <AccordionPanel label="Our History">
          <Box pad={pad}>
            At Hewlett Packard Enterprise, we advance the way you live and work
            by engineering experiences that unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Our Purpose">
          <Box pad={pad}>
            We advance the way you live and work by engineering experiences that
            unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="What's New">
          <Box pad={pad}>We make Bold Moves.</Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
};
