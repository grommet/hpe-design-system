import { Box, Header, Heading, Page, PageContent, Paragraph } from 'grommet';

import { PageHeader } from '../../templates/PageHeader';

export const PageSimple = () => (
  <Page>
    <PageContent gap="large">
      <PageHeader
        title="Explore Datasets"
        subtitle={`Explore datasets from a variety sources without reliance
        on IT or governance and compliance.`}
        contextualNav={{
          upButton: { label: 'MLOps' },
          breadCrumbs: [
            { label: 'home', href: '#' },
            { label: 'level1', href: '#' },
            { label: 'level2', href: '#' },
          ],
        }}
      />
    </PageContent>
  </Page>
);
