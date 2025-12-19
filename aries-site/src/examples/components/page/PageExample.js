import React from 'react';
import { Paragraph, Page, PageContent } from 'grommet';

import { ContentArea } from '../../templates/page-layouts/anatomy/components';
// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
import { demoStyle } from './demoStyle';

export const PageExample = () => (
  <Page
    kind="narrow"
    as={ContentArea}
    title="Page"
    flex="grow"
    pad={{ bottom: 'xlarge' }}
    {...demoStyle}
  >
    <PageContent
      as={ContentArea}
      title="PageContent"
      gap="xsmall"
      {...demoStyle}
    >
      <ContentArea
        title="Page header"
        border
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-purple', opacity: 'weak' }}
      />
      <ContentArea
        title="Other content"
        border
        // TODO: Using opacity weak is a temporary solution until
        // we have a wider range of colors in the theme.
        background={{ color: 'decorative-blue', opacity: 'weak' }}
      >
        <Paragraph color="text-strong" margin={{ bottom: 'none' }}>
          Page is a container providing context (i.e. instructions) for how
          content should be laid out on a page.
        </Paragraph>
        <Paragraph color="text-strong" margin={{ bottom: 'none' }}>
          PageContent is a container for content within a page and executes
          Page's instructions. In this particular example, Page's "kind" is set
          to "narrow" instructing PageContent to have a specified maximum-width,
          to be horizontally center-aligned, and specifies the width of the
          horizontal padding surrounding PageContent's content across responsive
          breakpoints.
        </Paragraph>
        <Paragraph color="text-strong">
          Resize your browser window to see how Page and PageContent affect this
          example's layout across various screen widths.
        </Paragraph>
      </ContentArea>
    </PageContent>
  </Page>
);
