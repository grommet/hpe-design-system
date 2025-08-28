import React, { useContext } from 'react';
import {
  Anchor,
  Box,
  Button,
  Diagram,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
  Stack,
} from 'grommet';
import { CircleInformation } from 'grommet-icons';
import { Annotation } from '../../../layouts';
import { connection } from '../../../utils';

const rows = mobile => [
  '30px',
  mobile ? '12px' : '24px',
  '24px',
  mobile ? '3px' : '6px',
  '24px',
  mobile ? '12px' : '24px',
  '36px',
  mobile ? '6px' : '12px',
  '24px',
];

const connections = [
  connection('1', 'icon'),
  connection('2', 'heading'),
  connection('3', 'description'),
  connection('4', 'action'),
  connection('5', 'anchor'),
];

export const EmptyStateAnatomy = () => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Stack interactiveChild="first">
      <Grid
        align="start"
        columns={[
          ['xsmall', 'small'].includes(breakpoint) ? 'flex' : 'medium',
          'auto',
        ]}
        rows={rows(['xsmall', 'small'].includes(breakpoint))}
        areas={[
          ['emptyState', 'icon'],
          ['emptyState', 'gap-1'],
          ['emptyState', 'heading'],
          ['emptyState', 'gap-2'],
          ['emptyState', 'description'],
          ['emptyState', 'gap-3'],
          ['emptyState', 'action'],
          ['emptyState', 'gap-4'],
          ['emptyState', 'anchor'],
        ]}
        gap={{ column: 'medium' }}
      >
        <Box gap="medium" align="center" flex={false} gridArea="emptyState">
          <CircleInformation size="xlarge" id="icon" />
          <Box align="center" gap='3xsmall'>
            <Heading id="heading" margin="none" level={2}>
              No items exist
            </Heading>
            <Paragraph id="description" margin="none" textAlign="center">
              Once an item is created, it will be displayed here.
            </Paragraph>
          </Box>
          <Box align="center" gap='xsmall'>
            <Button id="action" label="New item" primary />
            <Anchor id="anchor" label="What is an item?" />
          </Box>
        </Box>
        <Annotation alignSelf="center" id={1} target="1" gridArea="icon" />
        <Annotation alignSelf="center" id={2} target="2" gridArea="heading" />
        <Annotation
          alignSelf="center"
          id={3}
          target="3"
          gridArea="description"
        />
        <Annotation alignSelf="center" id={4} target="4" gridArea="action" />
        <Annotation alignSelf="center" id={5} target="5" gridArea="anchor" />
      </Grid>
      <Diagram connections={connections} />
    </Stack>
  );
};
