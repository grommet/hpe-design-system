import React from 'react';
import { Anchor, Box, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, Layout, PageIntro, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Components';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Components = () => (
  <Layout
    backgroundImage={{
      src: {
        dark: '/components-dark.svg',
        light: '/components-light.svg',
      },
      alt: 'HPE Design System',
      fit: 'contain',
      margin: { top: '-200px', left: '-75px' },
      small: {
        margin: { top: '-250px' },
      },
    }}
    title={title}
    isLanding
  >
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components"
    />
    <PageContent gap="large">
      <PageIntro>
        <Box justify="center" fill>
          <Heading margin="none">{title}</Heading>
          <Paragraph size="large" fill>
            {pageDetails.description}
          </Paragraph>
        </Box>
      </PageIntro>
      <ContentSection>
        <Subsection name="Layouts">
          <CardGrid cards={cards.filter(card => card.category === 'Layouts')} />
        </Subsection>
        <Subsection name="Controls">
          <CardGrid
            cards={cards.filter(card => card.category === 'Controls')}
          />
        </Subsection>
        <Subsection name="Inputs">
          <CardGrid cards={cards.filter(card => card.category === 'Inputs')} />
        </Subsection>
        <Subsection name="Visualizations">
          <CardGrid
            cards={cards.filter(card => card.category === 'Visualizations')}
          />
        </Subsection>
        <Subsection name="All Components">
          <SubsectionText>
            View additional Grommet components which haven't been presented
            above. Some, like{' '}
            <Anchor href="/components/all-components#datachart)">
              DataChart
            </Anchor>{' '}
            {/* // eslint-disable-next-line max-len */}
            and <Anchor
              label="Video"
              href="/components/all-components#video"
            />{' '}
            have not yet been customized by the HPE Design System. Others, like
            {/* // eslint-disable-next-line max-len */}{' '}
            <Anchor label="Image" href="/components/all-components#image" />,
            Keyboard, and ResponsiveContext provide tremendous utility, but may
            not require specific HPE styling or guidance.
          </SubsectionText>
          <CardGrid cards={cards.filter(card => card.category === 'All')} />
        </Subsection>
      </ContentSection>
    </PageContent>
  </Layout>
);

export default Components;
