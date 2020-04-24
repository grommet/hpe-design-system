import React from 'react';
import { Accordion, AccordionPanel, Box, Heading } from 'grommet';

const PanelHeader = title => (
  <Box pad={{ horizontal: 'small', vertical: 'small' }}>
    <Heading margin="none" level={4}>
      {title}
    </Heading>
  </Box>
);

const PanelHeader1 = title => (
  <Box pad={{ horizontal: 'small', vertical: 'medium' }}>
    <Heading margin="none" level={4}>
      {title}
    </Heading>
  </Box>
);

export const AccordionExample = () => {
  const pad = 'small';

  return (
    <Box gap="xlarge">
      <Accordion>
        <AccordionPanel label={PanelHeader('Our Company')}>
          <Box pad={pad}>We are HPE.</Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader('Our History')}>
          <Box pad={pad}>
            At Hewlett Packard Enterprise, we advance the way you live and work
            by engineering experiences that unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader('Our Purpose')}>
          <Box pad={pad}>
            We advance the way you live and work by engineering experiences that
            unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader("What's New")}>
          <Box pad={pad}>We make Bold Moves.</Box>
        </AccordionPanel>
      </Accordion>
      <Accordion>
        <AccordionPanel label={PanelHeader1('Our Company')}>
          <Box pad={pad}>We are HPE.</Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader1('Our History')}>
          <Box pad={pad}>
            At Hewlett Packard Enterprise, we advance the way you live and work
            by engineering experiences that unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader1('Our Purpose')}>
          <Box pad={pad}>
            We advance the way you live and work by engineering experiences that
            unlock your full potential.
          </Box>
        </AccordionPanel>
        <AccordionPanel label={PanelHeader1("What's New")}>
          <Box pad={pad}>We make Bold Moves.</Box>
        </AccordionPanel>
      </Accordion>
    </Box>
  );
};
