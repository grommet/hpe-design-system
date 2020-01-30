import React from 'react';
import { Accordion, AccordionPanel, Box } from 'grommet';

import { UsageExample } from '../../../layouts';

export const AccordionExample = () => {
  const pad = { vertical: 'medium' };

  return (
    <UsageExample
      pad={{
        top: 'medium',
        bottom: 'large',
        horizontal: 'large',
        small: { horizontal: 'large', top: 'medium', bottom: 'xlarge' },
      }}
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
    </UsageExample>
  );
};
