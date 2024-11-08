import React from 'react';
import {
  Box,
  Data,
  DataContext,
  Heading,
  Grid,
  PageContent,
  Paragraph,
  Notification,
} from 'grommet';
import { Meta, ContentCard } from '../../components';
import { getCards, getPageDetails, nameToPath } from '../../utils';
import { PageIntro } from '../../layouts';

const title = 'Design tokens';
const pageDetails = getPageDetails(title);
const cards = getCards(title);

const Tokens = () => (
  <>
    <Meta
      title={title}
      description={pageDetails.seoDescription}
      canonicalUrl="https://design-system.hpe.design/design-tokens"
    />
    <PageContent>
      <PageIntro>
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
      </PageIntro>
      <Notification
        message={`Design tokens are in a beta phase. Accordingly, 
          this documentation is a work in progress and will be 
          updated as needed during this phase.`}
        width="large"
        margin={{ bottom: 'large' }}
      />
      <Data data={cards} pad={{ bottom: 'large' }}>
        <DataContext.Consumer>
          {({ data }) => {
            const gettingStarted = data.filter(
              datum => datum.type === 'Getting started',
            );
            const building = data.filter(
              datum => datum.type === 'Building with tokens',
            );

            const results = [
              {
                heading: 'Getting started',
                data: gettingStarted,
              },
              {
                heading: 'Building with design tokens',
                data: building,
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
                        rows={[['auto', 'full']]}
                        gap="medium"
                      >
                        {type.data.map(item => (
                          <ContentCard
                            key={item.name}
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

export default Tokens;
