import Link from 'next/link';
import { PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';
import { ComponentType } from '@/utilities/types';

async function getComponent(id: string) {
  const res = await fetch(`${process.env.API_URL}/components/${id}`);
  return res.json();
}

const User = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { name: string };
}) => {
  const component: ComponentType = await getComponent(params.id);

  return (
    <>
      <PageHeader
        title={component.name || searchParams.name}
        parent={
          <Link href="/components" passHref legacyBehavior>
        <ReverseAnchor label="Components" />
        </Link>}
      />
      {Object.entries(component).map(([key, value]) => `${key}: ${value.toString()}`)}
    </>
  );
};

export default User;