import Link from 'next/link';
import { Heading, NameValueList, NameValuePair, PageHeader, Text } from 'grommet';
import { ReverseAnchor } from 'aries-core';
import { ComponentType } from '@/utilities/types';

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
  const {name, description, keywords} = component;

  return (
    <>
      <PageHeader
        title={name}
        parent={
          <Link href="/components" passHref legacyBehavior>
            <ReverseAnchor label="Components" />
          </Link>}
      />
      <NameValueList>
        <NameValuePair name="Description">{description}</NameValuePair>
        <NameValuePair name="Keywords">
          {typeof keywords !== 'undefined' ? 
            keywords.map((keyword) => (<Text>{keyword}</Text>) ) : 
            '--'}
        </NameValuePair>
      </NameValueList>
      <Heading level={2}>Resources</Heading>
        <Heading level={3}>Design</Heading>
        <Heading level={3}>Code</Heading>
      <Heading level={2}>Design</Heading>
        <Heading level={3}>Anatomy</Heading>
        <Heading level={3}>Interactive states</Heading>
        <Heading level={3}>Color</Heading>
        <Heading level={3}>Behaviors</Heading>
      <Heading level={2}>Usage</Heading>
        <Heading level={3}>Modifiers and configurations</Heading>
        <Heading level={3}>Use case examples</Heading>
      <Heading level={2}>References</Heading>
        <Heading level={3}>Documentation</Heading>
        <Heading level={3}>Research</Heading>
        <Heading level={3}>Design criteria</Heading>
        <Heading level={3}>Design rationale</Heading>
    </>
  );
};

export default Component;