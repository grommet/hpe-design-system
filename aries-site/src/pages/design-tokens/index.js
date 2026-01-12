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
import { ContentSection } from '../../layouts';

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
    <PageContent gap="medium">
      <Box pad={{ vertical: 'medium' }} justify="center" width="xlarge">
        <Heading margin="none">{title}</Heading>
        <Paragraph size="large">{pageDetails.description}</Paragraph>
        <Notification
          status="normal"
          message="hpe-design-tokens are production ready."
          actions={[
            {
              label: 'See which version is right for your team',
              href: '/design-tokens/versioning',
            },
          ]}
        />
      </Box>
      <Data data={cards} pad={{ bottom: 'xlarge' }}>
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
              <ContentSection>
                <Box gap="xlarge">
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
                              pad="xsmall"
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
              </ContentSection>
            );
          }}
        </DataContext.Consumer>
      </Data>
    </PageContent>
  </>
);

export default Tokens;
