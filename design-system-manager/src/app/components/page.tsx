import Link from 'next/link';
import { Box, PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';
import { Collection } from './Collection'
import { Insights } from './Insights';

async function getComponents() {
  const res = await fetch(`${process.env.API_URL}/components`);
  return res.json();
}

const Page = async () => {
  const components = await getComponents();
  console.log('components', components); 

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
      <Box gap='medium'>
        <Insights level={2} />
        <Collection data={components} level={2} />
      </Box>
      <Box pad="large"/>
    </>
)};

export default Page;