import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Grid,
  Diagram,
  Select,
  Text,
  Stack,
  ThemeContext,
  Pagination,
} from 'grommet';
import { Annotation } from '../../../layouts';

const color = 'border';
const anchor = 'vertical';
const thickness = 'hair';
const type = 'direct';

const connections = [
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '1',
    toTarget: 'border',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '2',
    toTarget: 'summary',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '3',
    toTarget: 'step',
  },
  {
    anchor,
    type,
    color,
    thickness,
    fromTarget: '4',
    toTarget: 'pagination',
  },
];

const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['24px', 'xsmall', 'medium', '300px']}
    justify="center"
    gap={{ column: 'none', row: 'xsmall' }}
    {...rest}
  />
);

const AnatomyBox = ({ background, id }) => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      id={id}
      fill="horizontal"
      background={background}
      height={theme.global.edgeSize.medium}
      round="xxsmall"
    />
  );
};

export const PaginationAnatomy = () => (
  <Stack margin={{ bottom: 'medium' }}>
    <Box direction="row" gap="none">
      <AnatomyGrid>
        <Annotation id={1} target="1" />
        <Box />
        <Box />
        <Box />
        <Box
          fill
          id="border"
          border={{ side: 'top' }}
          width="12px"
          pad={{ vertical: '3xsmall' }}
        />
        <Box
          fill
          border={{ side: 'top' }}
          id="summary"
          justify="center"
          pad={{ vertical: '3xsmall' }}
        >
          <Text>Showing 1-20 of 100 items</Text>
        </Box>
        <Box
          border={{ side: 'top' }}
          id="step"
          direction="row"
          gap="3xsmall"
          fill
          justify="end"
          align="center"
          pad={{ vertical: '3xsmall' }}
        >
          <Text>Items per page</Text>
          <Select
            value="10"
            width="5xsmall"
            options={['5', '10', '15']}
            tabIndex={-1}
          />
        </Box>
        <Box
          align="end"
          fill
          border={{ side: 'top' }}
          pad={{ vertical: '3xsmall' }}
        >
          <Pagination id="pagination" numberItems={5} step={1} />
        </Box>
        <Box />
        <Annotation id={2} target="2" />
        <Annotation id={3} target="3" />
        <Annotation margin={{ left: '30px' }} id={4} target="4" />
      </AnatomyGrid>
    </Box>
    <Diagram connections={connections} />
  </Stack>
);

AnatomyBox.propTypes = {
  background: PropTypes.string,
  id: PropTypes.string,
};
