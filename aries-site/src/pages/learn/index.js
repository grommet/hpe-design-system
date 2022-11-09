import React, { useState } from 'react';
import {
  Box,
  Button,
  Heading,
  PageContent,
  PageHeader,
  Paragraph,
  Select,
  TextInput,
} from 'grommet';
import { Search } from 'grommet-icons';
import { CardGrid, Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Learn';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Developer = () => {
  const [type, setType] = useState('All types');
  const [topic, setTopic] = useState('All topics');

  return (
    <Layout title={title} isLanding>
      <Meta
        title={title}
        description={pageDetails.seoDescription}
        canonicalUrl="https://design-system.hpe.design/components"
      />

      <PageContent gap="small">
        <PageHeader
          title={<Heading margin="none">{title}</Heading>}
          subtitle={pageDetails.description}
          actions={<Button label="Request a topic" secondary />}
        />
        <Box direction="row" align="center" gap="small">
          <Box width="medium">
            <TextInput placeholder="Search" icon={<Search />} />
          </Box>
          <Select
            options={[
              'All types',
              'Tutorials',
              'How-to guides',
              'Explanations',
              'References',
            ]}
            value={type}
            onChange={e => setType(e.value)}
          />
          <Select
            options={[
              'All topics',
              'Application setup',
              'Accessibility',
              'Layouts',
              'Performance',
              'Routing',
            ]}
            value={topic}
            onChange={e => setTopic(e.value)}
          />
        </Box>
        <ContentSection pad={{ top: 'medium' }}>
          <Subsection name="Tutorials">
            <Paragraph size="large" margin="none">
              Gain knowledge on the fundamentals of building with Grommet.
            </Paragraph>
            <CardGrid
              cards={cards.filter(
                card => card.category === 'Tutorials' && !card.parentPage,
              )}
              developer
              pad={{ bottom: 'large', top: 'medium' }}
            />
          </Subsection>
          <Subsection name="How-to guides">
            <Paragraph size="large" margin="none">
              Recipes for how to implement a specific concept.
            </Paragraph>
            <CardGrid
              cards={cards.filter(
                card => card.category === 'Guides' && !card.parentPage,
              )}
              developer
              pad={{ bottom: 'large', top: 'medium' }}
            />
          </Subsection>
          <Subsection name="Explanations">
            <Paragraph size="large" margin="none">
              Broader context and explanations about Grommet concepts that can
              inform how you build.
            </Paragraph>
            <CardGrid
              cards={cards.filter(
                card => card.category === 'Explanations' && !card.parentPage,
              )}
              pad={{ bottom: 'large', top: 'medium' }}
              developer
            />
          </Subsection>
          <Subsection name="References">
            <Paragraph size="large" margin="none">
              Technical documentation related to Grommet.
            </Paragraph>
            <CardGrid
              cards={cards.filter(
                card => card.category === 'References' && !card.parentPage,
              )}
              pad={{ bottom: 'large', top: 'medium' }}
              developer
            />
          </Subsection>
        </ContentSection>
      </PageContent>
    </Layout>
  );
};

export default Developer;
