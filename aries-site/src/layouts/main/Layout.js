import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import { ActiveHeadingContext } from '../content/ActiveHeadingContext';

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
import { siteContents } from '../../data/search/contentForSearch';

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
  const { name: title, seoDescription, pageLayout, render } = getPageDetails(
    titleProp,
  );
  const layout = isLanding ? 'plain' : pageLayout;

  const MainContentWrapper = isLanding ? Fragment : PageContent;
  const size = useContext(ResponsiveContext);

  const match = siteContents.find(
    item => item?.name?.toLowerCase() === title?.toLowerCase(),
  );
  const regexp = new RegExp(/#{1,} (...+?) ?~{2}/, 'g');
  const headings = match && [...match.content.matchAll(regexp)];
  const showInPageNav =
    !['xsmall', 'small'].includes(size) && headings?.length > 0;

  const [activeHeading, setActiveHeading] = useState();
  const activeHeadingContextValue = { activeHeading, setActiveHeading };

  // useEffect finds which page heading is on screen as the user scrolls
  useEffect(() => {
    // if at top of page, do not show active heading on ToC
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        setActiveHeading(null);
      }
    };
  }, [headings]);

  return (
    <>
      {/* When a backgroundImage is present, the main page content becomes 
      the `last` child. We want this content to drive the layout.
      For details on this prop, see here: https://v2.grommet.io/stack#guidingChild */}
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
                <ActiveHeadingContext.Provider
                  value={activeHeadingContextValue}
                >
                  <SkipLinkTarget id="main" />
                  {/* row-reverse direction to tab through ToC first */}
                  <Box
                    direction={layout !== 'plain' ? 'row-reverse' : 'column'}
                  >
                    {layout !== 'plain' ? (
                      <>
                        {showInPageNav ? (
                          <Box pad={{ left: 'large' }}>
                            <InPageNavigation headings={headings} />
                          </Box>
                        ) : (
                          undefined
                        )}
                        <Box
                          width={
                            showInPageNav
                              ? 'calc(100% - 192px)' // 192px = small t-shirt size
                              : '100%'
                          }
                        >
                          {/* top pad handled by PageHeader */}

                          <ContentSection pad={{ top: 'none' }}>
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
                      </>
                    ) : (
                      children
                    )}
                  </Box>
                </ActiveHeadingContext.Provider>
              </Main>
            </MainContentWrapper>
          </>
        </Page>
      </Stack>
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
