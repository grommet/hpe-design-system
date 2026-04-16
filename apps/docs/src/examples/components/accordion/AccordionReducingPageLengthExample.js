import React from 'react';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';

const sections = [
  {
    label: 'Overview',
    content:
      'HPE ProLiant DL380 Gen11 is a versatile 2U server designed for'
      + ' performance-intensive workloads. It supports up to two 4th Gen'
      + ' Intel Xeon Scalable processors.',
  },
  {
    label: 'Specifications',
    content:
      'Max RAM: 8TB DDR5. Storage: up to 24 SFF or 12 LFF drives.'
      + ' Networking: up to 4x 100GbE ports.'
      + ' Power: up to 2x 1600W Platinum PSUs.',
  },
  {
    label: 'Compatibility',
    content:
      'Compatible with HPE Smart Array controllers, HPE Synergy, and HPE'
      + ' OneView for unified management across hybrid environments.',
  },
  {
    label: 'Support & Warranty',
    content:
      'Includes a 3-year parts, labor, and onsite warranty. Extend with'
      + ' HPE Care Pack services for 24x7 critical support coverage.',
  },
  {
    label: 'Documentation',
    content:
      'Full QuickSpecs, installation guides, and firmware downloads are'
      + ' available on the HPE Support Center at support.hpe.com.',
  },
];

export const AccordionReducingPageLengthExample = () => (
  <Box width="large" pad="small">
    <Accordion>
      {sections.map(({ label, content }) => (
        <AccordionPanel key={label} label={label}>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <Text>{content}</Text>
          </Box>
        </AccordionPanel>
      ))}
    </Accordion>
  </Box>
);
