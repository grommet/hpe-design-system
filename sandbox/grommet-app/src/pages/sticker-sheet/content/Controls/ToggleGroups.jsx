import { Box, ToggleGroup } from 'grommet';
import { List, MapLocation, Table } from 'grommet-icons';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components/Compare';

export const ToggleGroups = () => {
  return (
    <ContentPane>
      <Box gap="xsmall">
        <Compare>
          <ToggleGroup
            a11yTitle="Choose view"
            options={[
              {
                icon: <List a11yTitle="List view" />,
                value: 'list',
                tip: 'List',
              },
              {
                icon: <Table a11yTitle="Map view" />,
                value: 'table',
                tip: 'Table',
              },
              {
                icon: <MapLocation a11yTitle="Map view" />,
                value: 'map',
                tip: 'Map',
              },
            ]}
            defaultValue="list"
          />
        </Compare>
      </Box>
    </ContentPane>
  );
};
