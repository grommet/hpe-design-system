import React, { useState } from 'react';
import {
  Box,
  Button,
  CheckBoxGroup,
  Collapsible,
  Heading,
  Grid,
  PageContent,
  PageHeader,
  Paragraph,
  TextInput,
} from 'grommet';
import { Search, FormDown, FormNext } from 'grommet-icons';
import { CardGrid, Meta } from '../../components';
import { ContentSection, Layout, Subsection } from '../../layouts';
import { getCards, getPageDetails } from '../../utils';

const title = 'Developer';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Developer = () => {
  const [typeOpen, setTypeOpen] = useState(true);
  const [topicOpen, setTopicOpen] = useState(true);

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
        />
        <Grid columns={['medium', 'flex']} gap="large">
          <Box pad={{ top: 'xsmall' }}>
            <TextInput placeholder="Search" icon={<Search />} />
            <Box pad={{ top: 'medium' }}>
              <Button
                justify="start"
                label="Guide type"
                icon={typeOpen ? <FormDown /> : <FormNext />}
                onClick={() => setTypeOpen(!typeOpen)}
              />
              <Collapsible open={typeOpen}>
                <CheckBoxGroup
                  options={[
                    'Tutorials',
                    'How-to guides',
                    'Explanations',
                    'Resources',
                  ]}
                />
              </Collapsible>
            </Box>
            <Box>
              <Button
                justify="start"
                label="Topic"
                icon={topicOpen ? <FormDown /> : <FormNext />}
                onClick={() => setTopicOpen(!topicOpen)}
              />
              <Collapsible open={topicOpen}>
                <CheckBoxGroup
                  options={[
                    'Application setup',
                    'Accessibility',
                    'Layouts',
                    'Performance',
                    'Routing',
                  ]}
                />
              </Collapsible>
            </Box>
          </Box>
          <ContentSection pad={{ top: 'none' }}>
            <Subsection name="Tutorials">
              <Paragraph size="large" margin="none">
                Gain knowledge on the fundamentals of building with Grommet.
              </Paragraph>
              <CardGrid
                cards={cards.filter(
                  card => card.category === 'Tutorials' && !card.parentPage,
                )}
                minimal
                pad={{ bottom: 'large', top: 'medium' }}
              />
            </Subsection>
            <Subsection name="How-to guides">
              <Paragraph size="large" margin="none">
                When you need a recipe for how to build or implement a specific
                concept.
              </Paragraph>
              <CardGrid
                cards={cards.filter(
                  card => card.category === 'Guides' && !card.parentPage,
                )}
                minimal
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
                minimal
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
                minimal
              />
            </Subsection>
          </ContentSection>
        </Grid>
      </PageContent>
    </Layout>
  );
};

export default Developer;
