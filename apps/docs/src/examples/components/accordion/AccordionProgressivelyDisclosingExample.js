import React from 'react';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';

const faqs = [
  {
    question: 'What is HPE GreenLake?',
    answer:
      'HPE GreenLake is a cloud experience that runs in your data center,'
      + ' at the edge, or in a colocation facility, delivering cloud'
      + ' services wherever your data lives.',
  },
  {
    question: 'How is billing calculated?',
    answer:
      'Usage is metered monthly based on actual consumption. You pay only'
      + ' for what you use, with no upfront hardware costs.',
  },
  {
    question: 'What support tiers are available?',
    answer:
      'HPE offers Foundation, Enhanced, and Critical support tiers. Each'
      + ' tier includes different response times and access to dedicated'
      + ' support engineers.',
  },
  {
    question: 'Can I scale resources on demand?',
    answer:
      'Yes. Resources can be scaled up or down at any time through the HPE'
      + ' GreenLake Central console without requiring new hardware'
      + ' procurement.',
  },
];

export const AccordionProgressivelyDisclosingExample = () => (
  <Box width="large" pad="small">
    <Accordion>
      {faqs.map(({ question, answer }) => (
        <AccordionPanel key={question} label={question}>
          <Box pad={{ horizontal: 'small', vertical: 'xsmall' }}>
            <Text>{answer}</Text>
          </Box>
        </AccordionPanel>
      ))}
    </Accordion>
  </Box>
);
