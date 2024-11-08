import React from 'react';
import {
  // Box,
  Heading,
  PageContent,
  Paragraph,
} from 'grommet';

import { CardGrid, Meta } from '../../components';
import { PageIntro } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Templates';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Templates = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/templates"
    />
    <PageContent>
      <PageIntro>
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </PageIntro>
      <CardGrid cards={cards} pad={{ bottom: 'large' }} headingLevel={2} />
    </PageContent>
  </>
);

export default Templates;
