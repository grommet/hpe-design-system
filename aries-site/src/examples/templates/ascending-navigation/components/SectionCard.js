/* eslint-disable react/prop-types */
import { Card, Box, Heading, Paragraph } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';

export const SectionCard = ({ section, onClick }) => (
  <Card default onClick={() => onClick(section.id)} pad="xsmall">
    <Box direction="row" fill justify="between">
      <Heading
        level="2"
        margin={{
          horizontal: 'none',
          vertical: '3xsmall',
        }}
      >
        {section.label}
      </Heading>
      <LinkNext height="xxlarge" />
    </Box>

    <Paragraph>
      This leads to the {section.label} page of your HPE Design System demo app.
    </Paragraph>
  </Card>
);
