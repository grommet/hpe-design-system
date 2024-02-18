import Link from 'next/link';
import { Grid, PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';
import { Collection } from './Collection.tsx'
import { Insights } from './Insights.tsx';

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
      <Grid 
        columns={{count: 'fit', size: ['20vw', 'auto']}}
        gap='large'
        align='start'
      >
        <Insights level={2} />
        <Collection data={components} level={2} />
      </Grid>
    </>
)};

export default Page;