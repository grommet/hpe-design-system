import { useEffect, useState } from "react";
import PocketBase, { type RecordModel } from 'pocketbase';
import { useParams } from "react-router-dom";
import {
  Page,
  PageContent,
  PageHeader,
} from "grommet";
import { ComponentDetail } from "./ComponentDetail";
import { ReverseAnchor } from "../../../components";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

const reportError = ({ message }: { message: string }) => {
  console.log(`Error occurred while fetching 'component'`, message);
}

const getComponent = async (
  { id, setAuthorized, setComponent }:
    {
      id: string,
      setAuthorized: (authorized: boolean) => void,
      setComponent: (component: RecordModel) => void
    }
) => {
  try {
    const record = await pb.collection('components').getOne(id);
    setComponent(record);
    setAuthorized(true);
  } catch (error: unknown) {
    let message: string;
    let status: number;
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

const Component = () => {
  const [component, setComponent] = useState<RecordModel | null>(null)
  const [authorized, setAuthorized] = useState<boolean>(false)
  const { id } = useParams();

  useEffect(() => {
    if (id)
      getComponent({ id, setComponent, setAuthorized });
  }, [id]);

  return (
    <Page pad={{ bottom: "large" }}>
      <PageContent>
        <PageHeader
          title={component?.name}
          subtitle={component?.description}
          parent={<ReverseAnchor label="Components" href={'/components'} />}
        />
        {authorized && component ? <ComponentDetail component={component} /> : 'Please enable view permission for this collection.'}
      </PageContent>
    </Page>
  )
}

export default Component;