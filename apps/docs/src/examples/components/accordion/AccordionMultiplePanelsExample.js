import React from 'react';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';

const releaseNotes = [
  {
    version: 'v3.2.0 — April 2026',
    notes:
      'Added support for HPE GreenLake Kubernetes Service. Improved'
      + ' dashboard load times by 40%. Fixed token refresh edge case on'
      + ' idle sessions.',
  },
  {
    version: 'v3.1.0 — March 2026',
    notes:
      'Introduced new cost analytics view. Added bulk export for audit'
      + ' logs. Resolved intermittent login failures on Safari 17.',
  },
  {
    version: 'v3.0.0 — February 2026',
    notes:
      'Major release: redesigned navigation, new design system components,'
      + ' and API v3 support. See migration guide for breaking changes.',
  },
];

export const AccordionMultiplePanelsExample = () => (
  <Box width="large" pad="small">
    <Accordion multiple>
      {releaseNotes.map(({ version, notes }) => (
        <AccordionPanel key={version} label={version}>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <Text>{notes}</Text>
          </Box>
        </AccordionPanel>
      ))}
    </Accordion>
  </Box>
);
