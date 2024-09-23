import React from 'react';
import {
  Box,
  Data,
  DataContext,
  DataSearch,
  DataSummary,
  Heading,
  Grid,
  PageContent,
  Paragraph,
} from 'grommet';
import { Meta, ContentCard } from '../../components';
import { getCards, getPageDetails, nameToPath } from '../../utils';
import { PageIntro } from '../../layouts';

const title = 'Learn';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Learn = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/learn"
    />
    <PageContent>
      <PageIntro>
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </PageIntro>
      <Data data={cards} pad={{ bottom: 'large' }}>
        <DataSearch width={{ max: 'medium', width: '100%' }} />
        <DataSummary />
        <DataContext.Consumer>
          {({ data }) => {
            const gettingStarted = data.filter(
              datum => datum.type === 'Getting started',
            );
            const howTo = data.filter(datum => datum.type === 'How-to guides');
            const explanations = data.filter(
              datum => datum.type === 'Explanations',
            );
            const references = data.filter(
              datum => datum.type === 'References',
            );

            const results = [
              {
                heading: 'Getting started',
                data: gettingStarted,
              },
              {
                heading: 'How-to guides',
                data: howTo,
              },
              {
                heading: 'Explanations',
                data: explanations,
              },
              {
                heading: 'References',
                data: references,
              },
            ];

            return (
              <Box gap="large" pad={{ top: 'medium' }}>
                {results.map((type, index) =>
                  type.data?.length ? (
                    <Box gap="medium" key={index}>
                      <Heading level={2} margin="none">
                        {type.heading}
                      </Heading>
                      <Grid
                        columns="medium"
                        gap="medium"
                        rows={[['auto', 'full']]}
                      >
                        {type.data.map(item => (
                          <ContentCard
                            key={item.name}
                            pad="small"
                            topic={item}
                            href={item.href || nameToPath(item.name)}
                            level={3}
                          />
                        ))}
                      </Grid>
                    </Box>
                  ) : null,
                )}
              </Box>
            );
          }}
        </DataContext.Consumer>
      </Data>
    </PageContent>
  </>
);

export default Learn;
