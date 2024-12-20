import { DataTable } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const DataTables = () => {
  return (
    <ContentPane>
      <Compare>
        <DataTable
          onSelect={() => {}}
          select={['4352351']}
          columns={[
            {
              property: 'id',
              header: 'ID',
            },
            {
              property: 'firstName',
              header: 'First name',
            },
            {
              property: 'lastName',
              header: 'Last name',
              units: 'GB',
            },
          ]}
          data={[
            {
              id: '2341234',
              firstName: 'Taylor',
              lastName: 'Seamans',
            },
            {
              id: '4352351',
              firstName: 'Oliver',
              lastName: 'Plunkett',
            },
            {
              id: '6439201',
              firstName: 'Joelle',
              lastName: 'Gregory',
            },
          ]}
          sort={{
            property: 'firstName',
            direction: 'asc',
          }}
        />
      </Compare>
    </ContentPane>
  );
};
