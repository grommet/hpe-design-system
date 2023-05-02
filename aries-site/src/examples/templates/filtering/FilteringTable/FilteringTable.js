import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { FilterServers } from './FilterServers';

export const FilteringTable = ({ containerRef }) => (
  <Box background="background-front" pad="small" gap="medium" fill>
    <Heading id="servers-heading" level={2} margin="none">
      Servers
    </Heading>
    <FilterServers containerRef={containerRef} filtersOpen />
  </Box>
);

FilteringTable.propTypes = {
  containerRef: PropTypes.node,
};
