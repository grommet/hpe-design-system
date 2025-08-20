import { useEffect, useState } from "react";
import PocketBase, { type RecordModel } from 'pocketbase';
import {
  Box,
  Data,
  Grid,
  List,
  Page,
  PageContent,
  PageHeader,
} from "grommet";
import { CollapsibleDetail } from "../../components";
import { ComponentListItem } from "./ComponentListItem";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const reportError = ({ message }: { message: string }) => {
  console.log(`Error occurred while fetching 'components' collection`, message);
}

const getComponents = async (
  { setAuthorized, setComponents }:
    {
      setAuthorized: (authorized: boolean) => void,
      setComponents: (components: RecordModel[]) => void
    }
) => {
  try {
    const records = (await pb.collection('components').getFullList({ sort: 'type,name' }));
    setComponents(records);
    setAuthorized(true);
  } catch (error: unknown) {
    let message;
    let status;
    if (error instanceof Error) {
      message = error.message;
      status = error.message.includes('status') ? Number(error.message.split('status code ')[1]) : 0;
      if (status === 403) {
        console.log('Unauthorized access');
        setAuthorized(false);
        return;
      }
    } else {
      message = String(error);
    }
    reportError({ message });
  }
};

const Components = () => {
  const [components, setComponents] = useState<RecordModel[]>([])
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    getComponents({ setComponents, setAuthorized });
  }, []);

  return (
    <Page pad={{ bottom: "large" }}>
      <PageContent>
        <PageHeader title="Components" />
        {authorized ? <ComponentsView data={components} /> : 'Please enable view permission for this collection.'}
      </PageContent>
    </Page>
  )
}

const ComponentsView = ({ data }: { data: RecordModel[] }) => {
  return (
    <Box flex={false} gap="medium">
      <Data data={data} toolbar>
        <Grid columns={[['small', 'medium'], 'flex']}>
          <List pad={{ vertical: "xxsmall" }}>
            {(datum: RecordModel) =>
              <ComponentListItem
                key={datum.id}
                component={datum}
              />}
          </List>
        </Grid>
      </Data>
      <CollapsibleDetail>
        <Box overflow="horizontal">
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </Box>
      </CollapsibleDetail>
    </Box>
  )
}

export default Components