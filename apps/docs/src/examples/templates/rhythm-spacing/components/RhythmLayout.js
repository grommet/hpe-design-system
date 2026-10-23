// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Heading, ResponsiveContext } from 'grommet';
import { useRhythm } from '../RhythmContext';

// Building blocks that apply the current rhythm at each level of a page.
// Designs compose these so every gap comes from the rhythm, never a literal.

// A main column pair. Stacks on small screens, where the column gap remaps.
export const PageColumns = ({ children, sideWidth = 'medium', ...rest }) => {
  const size = useContext(ResponsiveContext);
  const { gaps } = useRhythm();
  const stacked = ['xsmall', 'small'].includes(size);
  return (
    <Grid
      columns={stacked ? ['flex'] : ['flex', sideWidth]}
      gap={gaps.column}
      {...rest}
    >
      {children}
    </Grid>
  );
};

PageColumns.propTypes = {
  children: PropTypes.node,
  sideWidth: PropTypes.string,
};

// Content sections stacked inside a page or a column.
export const PageSections = ({ children, ...rest }) => {
  const { gaps } = useRhythm();
  return (
    <Box gap={gaps.section} {...rest}>
      {children}
    </Box>
  );
};

PageSections.propTypes = {
  children: PropTypes.node,
};

// An H2-headed content section. The heading sits tighter to its body than
// the body's contents sit to each other.
export const Section = ({ action, children, title, ...rest }) => {
  const { gaps } = useRhythm();
  const heading = (
    <Heading level={2} margin="none">
      {title}
    </Heading>
  );
  return (
    <Box as="section" gap={gaps.heading} {...rest}>
      {action ? (
        <Box direction="row" align="center" justify="between" gap="small" wrap>
          {heading}
          {action}
        </Box>
      ) : (
        heading
      )}
      {children}
    </Box>
  );
};

Section.propTypes = {
  action: PropTypes.node,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

// Peers, such as cards, laid out in a responsive grid.
export const CardGrid = ({ children, size = 'small', ...rest }) => {
  const { gaps } = useRhythm();
  return (
    <Grid columns={{ count: 'fit', size }} gap={gaps.peer} {...rest}>
      {children}
    </Grid>
  );
};

CardGrid.propTypes = {
  children: PropTypes.node,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

// Peers stacked vertically, such as a list of cards in a side column.
export const PeerStack = ({ children, ...rest }) => {
  const { gaps } = useRhythm();
  return (
    <Box gap={gaps.peer} {...rest}>
      {children}
    </Box>
  );
};

PeerStack.propTypes = {
  children: PropTypes.node,
};
