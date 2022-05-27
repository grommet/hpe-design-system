import { Box, Heading } from 'grommet';

import { FilterServers } from './FilterServers';

export const FilteringTable = () => (
  <Box background="background-front" pad="small" gap="medium" fill>
    <Heading id="servers-heading" level={2} margin="none">
      Servers
    </Heading>
    <FilterServers />
  </Box>
);
