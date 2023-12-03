import Link from 'next/link';
import { Data, Cards, PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';

import { ComponentList } from './ComponentList';

async function getComponents() {
  const res = await fetch(`${process.env.API_URL}/components`);
  return res.json();
}

const Page = async () => {
  const components = await getComponents();

  return (
    <>
      <PageHeader
        title="Components"
        parent={
          <Link href="/" passHref legacyBehavior>
            <ReverseAnchor label="Home" />
          </Link>
        }
      />
      <Data data={components} toolbar >
        <ComponentList />
        <Cards />
      </Data>
    </>
)};

export default Page;