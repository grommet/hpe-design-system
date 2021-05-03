import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import {
  Box,
  Main,
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
  RelatedContent,
} from '..';
import { Meta, PageBackground } from '../../components';
import { Config } from '../../../config';
import { getRelatedContent, getPageDetails } from '../../utils';

const calcPad = size => {
  const val = size !== 'small' ? 'xlarge' : 'large';
  return val;
};

export const Layout = ({
  backgroundImage,
  children,
  title: titleProp,
  topic,
  isLanding,
  pad,
  width,
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
  const { name: title, seoDescription, pageLayout } = getPageDetails(titleProp);
  const layout = isLanding ? 'plain' : pageLayout;

  return (
    <>
      <ResponsiveContext.Consumer>
        {size => (
          // When a backgroundImage is present, the main page content becomes
          // the `last` child. We want this content to drive the layout.
          // For details on this prop, see here: https://v2.grommet.io/stack#guidingChild
          <Stack fill guidingChild={backgroundImage && 'last'}>
            {backgroundImage && (
              <PageBackground backgroundImage={backgroundImage} />
            )}
            <Box
              height={{ min: '100vh' }}
              margin="auto"
              width={width || { max: 'xxlarge' }}
            >
              {/* I think Head is redundant at this point, 
              but left it as is for now */}
              <Head title={title} />
              <Meta
                title={title}
                description={seoDescription}
                canonicalUrl={`https://design-system.hpe.design${router.route}`}
              />
              <>
                <SkipLinks>
                  <SkipLink id="main" label="Main Content" />
                </SkipLinks>
                <Header
                  fill="horizontal"
                  alignSelf="center"
                  width={{ max: 'xxlarge' }}
                />
                <Main overflow="visible">
                  <SkipLinkTarget id="main" />
                  {/* aligns with responsive padding for aries-core Nav */}
                  <Box
                    pad={
                      pad || {
                        horizontal: calcPad(size),
                        bottom: calcPad(size),
                        top: 'medium',
                      }
                    }
                  >
                    {layout !== 'plain' ? (
                      <>
                        <ContentSection>
                          <DocsPageHeader title={title} topic={topic} />
                          {children}
                        </ContentSection>
                        {relatedContent.length > 0 && (
                          <RelatedContent
                            relatedContent={relatedContent}
                            title={title}
                          />
                        )}
                        <FeedbackSection />
                      </>
                    ) : (
                      children
                    )}
                  </Box>
                </Main>
              </>
            </Box>
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
  pad: PropTypes.object,
  width: PropTypes.object,
};

Layout.defaultProps = {
  isLanding: false,
};
