import { Box, ToggleGroup } from 'grommet';
import { List, Map, Table } from '@hpe-design/icons-grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components/Compare';

export const ToggleGroups = () => {
  return (
    <ContentPane>
      <Box gap="small">
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
                icon: <Map a11yTitle="Map view" />,
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
