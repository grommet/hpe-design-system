/* eslint-disable react/prop-types */
import { Card, Box, Heading, Paragraph } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

export const SectionCard = ({ section, onClick }) => (
  <Card default onClick={() => onClick(section.id)} pad="small">
    <Box direction="row" fill justify="between">
      <Heading level="2" size="medium" margin="none">
        {section.label}
      </Heading>
      <LinkNext height="xlarge" />
    </Box>
    <Paragraph>{section.subtitle}</Paragraph>
  </Card>
);
