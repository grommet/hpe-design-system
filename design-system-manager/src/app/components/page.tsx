import Link from 'next/link';
import { Box, Data, Heading, PageHeader } from 'grommet';
import { ReverseAnchor } from 'aries-core';

import { ComponentList, CardGroup } from './DataCollections';
import Head from 'next/head';

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
      <Heading level={2}>Insights</Heading>
      <Box direction='row' gap='medium'>
        <Box pad="medium" background="orange-yellow" round>KPI a</Box>
        <Box pad="medium" background="purple-blue" round>KPI b</Box>
        <Box pad="medium" background="purple-blue-yellow" round>KPI c</Box>
      </Box>
      <Heading level={2}>Manage</Heading>
      <Data data={components} toolbar >
        {/* <ComponentList /> */}
        <CardGroup />
      </Data>
    </>
)};

export default Page;