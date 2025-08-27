import React from 'react';
import { Anchor, Heading, PageContent, Paragraph } from 'grommet';

import { CardGrid, Meta, SubsectionText } from '../../components';
import { ContentSection, PageIntro, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Components';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Components = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/components"
    />
    <PageContent>
      <PageIntro>
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </PageIntro>
      <ContentSection gap="medium">
        <Subsection name="Layouts">
          <CardGrid
            cards={cards.filter(
              card => card.category === 'Layouts' && !card.parentPage,
            )}
            headingLevel={3}
          />
        </Subsection>
        <Subsection name="Controls">
          <CardGrid
            cards={cards.filter(
              card => card.category === 'Controls' && !card.parentPage,
            )}
            headingLevel={3}
          />
        </Subsection>
        <Subsection name="Inputs">
          <CardGrid
            cards={cards.filter(
              card => card.category === 'Inputs' && !card.parentPage,
            )}
            headingLevel={3}
          />
        </Subsection>
        <Subsection name="Data">
          <CardGrid
            cards={cards.filter(
              card => card.category === 'Data' && !card.parentPage,
            )}
            headingLevel={3}
          />
        </Subsection>
        <Subsection name="Visualizations">
          <CardGrid
            cards={cards.filter(
              card => card.category === 'Visualizations' && !card.parentPage,
            )}
            headingLevel={3}
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
          <CardGrid
            cards={cards.filter(card => card.category === 'All')}
            headingLevel={3}
          />
        </Subsection>
      </ContentSection>
    </PageContent>
  </>
);

export default Components;
