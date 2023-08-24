import { ViewContext } from '../../pages/_app';
import { Box, DataTable, Heading, Text } from 'grommet';
import { useContext } from 'react';

function ChangeLogTable({ data }) {
  return (
    <Box pad={'small'} round="small" background="background-front">
      <DataTable
        columns={[
          {
            property: 'date',
            header: <Text weight={'500'}>Date</Text>,
            size: 'small',
          },
          {
            property: 'description',
            header: <Text weight={'500'}>Description</Text>,
          },
        ]}
        data={data}
        pad={'small'}
        border={{
          body: {
            color: 'light-2',
            side: 'bottom',
          },
        }}
      />
    </Box>
  );
}

export const InPageChangeLog = ({ name, id }) => {
  const { changeLog } = useContext(ViewContext) || undefined;
  return (
    <>
      <Heading id={id} size="small" margin={{ bottom: 'small' }}>
        Change Log
      </Heading>
      <Box margin={{ bottom: 'medium' }}>
        {name in changeLog ? (
          <Text size="large">
            This change log only contains updates within the past 3 months.
          </Text>
        ) : (
          <Text size="large">
            Current change log only shows updates within 3 months. There are no
            updates within the past 3 months.
          </Text>
        )}
      </Box>
      {name in changeLog && <ChangeLogTable data={changeLog[name]} />}
    </>
  );
};
