import React, { Fragment, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import {
  Box,
  Main,
  Page,
  PageContent,
  ResponsiveContext,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Stack,
} from 'grommet';
import {
  ContentSection,
  DocsPageHeader,
  Header,
  Head,
  FeedbackSection,
  InPageNavigation,
  RelatedContent,
} from '..';
import { Meta, PageBackground } from '../../components';
import { Config } from '../../../config';
import { getRelatedContent, getPageDetails } from '../../utils';

export const Layout = ({
  backgroundImage,
  children,
  title: titleProp,
  topic,
  isLanding,
}) => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  const router = useRouter();
  const relatedContent = getRelatedContent(titleProp);
  // Allow proper capitalization to be used
  const {
    name: title,
    seoDescription,
    pageLayout,
    render,
  } = getPageDetails(titleProp);
  const layout = isLanding ? 'plain' : pageLayout;

  const MainContentWrapper = isLanding ? Fragment : PageContent;

  return (
    <>
      {/* When a backgroundImage is present, the main page content becomes 
      the `last` child. We want this content to drive the layout.
      For details on this prop, see here: https://v2.grommet.io/stack#guidingChild */}
      <ResponsiveContext.Consumer>
        {size => (
          <Stack fill guidingChild={backgroundImage && 'last'}>
            {backgroundImage && (
              <PageBackground backgroundImage={backgroundImage} />
            )}
            <Page>
              {/* I think Head is redundant at this point, 
              but left it as is for now */}
              <Head title={title} />
              <Meta
                title={title}
                render={render}
                description={seoDescription}
                canonicalUrl={`https://design-system.hpe.design${router.route}`}
              />
              <>
                <SkipLinks id="skip-links">
                  <SkipLink id="main" label="Main Content" />
                </SkipLinks>
                <PageContent>
                  <Header fill="horizontal" alignSelf="center" />
                </PageContent>
                <MainContentWrapper>
                  <Main overflow="visible">
                    <SkipLinkTarget id="main" />
                    <Box direction={layout !== 'plain' ? 'row' : 'column'}>
                      {layout !== 'plain' ? (
                        <>
                          <Box
                            width={
                              !['xsmall', 'small'].includes(size)
                                ? 'calc(100% - 192px)'
                                : undefined
                            }
                            pad={
                              !['xsmall', 'small'].includes(size)
                                ? { right: 'medium' }
                                : undefined
                            }
                            margin={
                              !['xsmall', 'small'].includes(size)
                                ? { right: 'large' }
                                : undefined
                            }
                          >
                            <ContentSection>
                              <DocsPageHeader
                                title={title}
                                topic={topic}
                                render={render}
                              />
                              {children}
                            </ContentSection>
                            {relatedContent.length > 0 && (
                              <RelatedContent
                                relatedContent={relatedContent}
                                title={title}
                              />
                            )}
                            <FeedbackSection />
                          </Box>
                          <Box pad="small">
                            {!['xsmall', 'small'].includes(size) ? (
                              <InPageNavigation title={title} />
                            ) : undefined}
                          </Box>
                        </>
                      ) : (
                        children
                      )}
                    </Box>
                  </Main>
                </MainContentWrapper>
              </>
            </Page>
          </Stack>
        )}
      </ResponsiveContext.Consumer>
    </>
  );
};

Layout.propTypes = {
  backgroundImage: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  isLanding: PropTypes.bool,
  title: PropTypes.string,
  topic: PropTypes.string,
};

Layout.defaultProps = {
  isLanding: false,
};
