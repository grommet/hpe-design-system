import { Suspense } from 'react';
import Link from 'next/link';
import { Box, Heading, PageHeader } from 'grommet';
import { Panel, ReverseAnchor } from 'aries-core';
import type { ComponentType } from '@/utilities/types';
import { Detail } from './Detail/index.tsx';
import { Resources } from './Resources/index.tsx';
import { getComponent } from './actions.ts';


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
        <Panel>
          <Heading level={2}>Design</Heading>
          <Heading level={3}>Anatomy</Heading>
          <Heading level={3}>Interactive states</Heading>
          <Heading level={3}>Color</Heading>
          <Heading level={3}>Behaviors</Heading>
        </Panel>
        <Panel>
          <Heading level={2}>Usage</Heading>
          <Heading level={3}>Modifiers and configurations</Heading>
          <Heading level={3}>Use case examples</Heading>
        </Panel>
        <Panel>
          <Heading level={2}>References</Heading>
          <Heading level={3}>Documentation</Heading>
          <Heading level={3}>Research</Heading>
          <Heading level={3}>Design criteria</Heading>
          <Heading level={3}>Design rationale</Heading>
        </Panel>
      </Box>
    </>
  );
};

export default Component;