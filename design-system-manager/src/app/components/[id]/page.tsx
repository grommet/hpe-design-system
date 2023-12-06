import Link from 'next/link';
import { Button, Heading, PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';
import { ComponentType } from '@/utilities/types';
import { Detail } from './Detail';

async function getComponent(id: string) {
  const res = await fetch(`${process.env.API_URL}/components/${id}`);
  return res.json();
}

const Component = async ({
  params,
}: {
  params: { id: string };
}) => {
  const component: ComponentType = await getComponent(params.id);

  return (<Detail component={component} />);
};

export default Component;