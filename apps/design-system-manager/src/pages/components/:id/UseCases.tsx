import { useEffect, useState } from "react";
import PocketBase, { type RecordModel } from "pocketbase";
import { Card, CardBody, CardHeader, Cards, Data, Heading, Paragraph } from "grommet";
import type { LevelType } from '../../../utils'

const pb = new PocketBase(import.meta.env.VITE_DATABASE_URL);

const reportError = ({ message }: { message: string }) => {
  console.log(`Error occurred while fetching 'use cases'`, message);
}

const getData = async (
  { ids, setAuthorized, setData }:
    {
      ids: string[];
      setAuthorized: (authorized: boolean) => void,
      setData: (component: RecordModel[]) => void
    }
) => {
  try {
    const promises = ids.map(async (id) => {
      return await pb.collection('use_cases').getOne(id);
    })
    const data = await Promise.all(promises)
    setData(data);
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

export const UseCases = (
  { component, level }:
    {
      component: RecordModel;
      level?: LevelType;
    }
) => {
  const { use_cases } = component
  const [data, setData] = useState<RecordModel[]>([])
  const [authorized, setAuthorized] = useState<boolean>(false)

  useEffect(() => {
    getData({ ids: use_cases, setData, setAuthorized });
  }, [use_cases]);

  return (
    authorized ? (
      <Data data={data}>
        <Cards size="medium">
          {(datum) => {
            const { use_case, description } = datum;
            return (
              <Card>
                <CardHeader pad={{ horizontal: 'medium', top: 'small' }}>
                  <Heading level={level} margin="none">{use_case}</Heading>
                </CardHeader>
                <CardBody pad={{ horizontal: 'medium' }}>
                  <Paragraph>{description}</Paragraph>
                </CardBody>
              </Card>
            );
          }}
        </Cards>
      </Data >
    ) : 'Please enable view permission for this collection.'
  );
}