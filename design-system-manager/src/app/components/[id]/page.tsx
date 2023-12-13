import Link from 'next/link';
import { Box, Button, Heading, PageHeader } from 'grommet';
import { ContentContainer, ReverseAnchor } from 'aries-core';
import { ComponentType } from '@/utilities/types';
import { Detail } from './Detail';
import { Resources } from './Resources';
import { getComponent, getResources } from './actions';
import { Suspense } from 'react';

const Component = async ({
  params,
}: {
  params: { id: string };
}) => {
  const component: ComponentType = await getComponent(params.id);

  return (
    <> 
      <PageHeader
        title={component.name}
        parent={
          <Link href="/components" passHref legacyBehavior>
            <ReverseAnchor label="Components" />
          </Link>}
      />
      <Box gap='large' alignSelf='start'>
        <Detail id={params.id} />
        <Suspense>
          <Resources id={params.id} level={2} />
        </Suspense>
        <ContentContainer>
          <Heading level={2}>Design</Heading>
          <Heading level={3}>Anatomy</Heading>
          <Heading level={3}>Interactive states</Heading>
          <Heading level={3}>Color</Heading>
          <Heading level={3}>Behaviors</Heading>
        </ContentContainer>
        <ContentContainer>
          <Heading level={2}>Usage</Heading>
          <Heading level={3}>Modifiers and configurations</Heading>
          <Heading level={3}>Use case examples</Heading>
        </ContentContainer>
        <ContentContainer>
          <Heading level={2}>References</Heading>
          <Heading level={3}>Documentation</Heading>
          <Heading level={3}>Research</Heading>
          <Heading level={3}>Design criteria</Heading>
          <Heading level={3}>Design rationale</Heading>
        </ContentContainer>
      </Box>
    </>
  );
};

export default Component;