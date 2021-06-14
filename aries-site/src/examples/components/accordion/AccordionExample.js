import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';

export const AccordionExample = ({ ...rest }) => {
  const pad = 'small';

  return (
    <Accordion width="large" {...rest}>
      <AccordionPanel label="Our Company">
        <Box pad={pad}>We are HPE.</Box>
      </AccordionPanel>
      <AccordionPanel label="Our History">
        <Box pad={pad}>
          At Hewlett Packard Enterprise, we advance the way you live and work by
          engineering experiences that unlock your full potential.
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
  );
};
