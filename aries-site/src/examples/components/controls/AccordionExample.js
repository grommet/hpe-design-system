import React from 'react';
import { Box } from 'grommet';
import { Accordion, AccordionPanel } from 'aries-core';

export const AccordionExample = () => {
  return (
    <Box width={{ max: 'medium' }}>
      <Accordion>
        <AccordionPanel label="Our Company">
          <Box pad={{ vertical: 'medium' }}>We are HPE.</Box>
        </AccordionPanel>
        <AccordionPanel label="Our History">
          <Box pad={{ vertical: 'medium' }}>
            At Hewlett Packard Enterprise, we advance the way you live and work
            by engineering experiences that unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="Our Purpose">
          <Box pad={{ vertical: 'medium' }}>
            We advance the way you live and work by engineering experiences that
            unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label="What's New">
          <Box pad={{ vertical: 'medium' }}>We make Bold Moves.</Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
};
