import PropTypes from 'prop-types';
import { Heading } from 'grommet';
import { FilterServers } from './FilterServers';
import { ContentPane } from '../../../../layouts/content/ContentPane';

export const FilteringTable = ({ containerRef }) => (
  <ContentPane gap="medium">
    <Heading id="servers-heading" level={2} margin="none">
      Servers
    </Heading>
    <FilterServers containerRef={containerRef} filtersOpen />
  </ContentPane>
);

FilteringTable.propTypes = {
  containerRef: PropTypes.node,
};
