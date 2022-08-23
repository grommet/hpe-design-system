import React, { Fragment, useEffect, useContext, useState } from 'react';
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
import {
  Meta,
  PageBackground,
  FeedbackButton,
  Feedback,
  Question,
} from '../../components';
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
  const {
    name: title,
    seoDescription,
    pageLayout,
    render,
  } = getPageDetails(titleProp);
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

  /* If no headings are found, do not show Table of Contents link, 
     instead set ToC skiplink as undefined and filter it out.
     Logic to be removed in future by: https://github.com/grommet/grommet/issues/6266  */
  const skiplinks = [
    showInPageNav ? { id: 'toc', label: 'Table of Contents' } : undefined,
    { id: 'main', label: 'Main Content' },
  ].filter(link => link !== undefined);

  return (
    <>
      <PageFeedback />
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
              {skiplinks.map(({ id, label }) => (
                <SkipLink key={id} id={id} label={label} />
              ))}
            </SkipLinks>
            <PageContent>
              <Header fill="horizontal" alignSelf="center" />
            </PageContent>
            <MainContentWrapper>
              <Main overflow="visible">
                {/* row-reverse direction to tab through ToC first */}
                <Box direction={layout !== 'plain' ? 'row-reverse' : 'column'}>
                  {layout !== 'plain' ? (
                    <>
                      {showInPageNav ? (
                        <Box pad={{ left: 'large' }}>
                          <SkipLinkTarget id="toc" />
                          <InPageNavigation headings={headings} />
                        </Box>
                      ) : undefined}
                      <Box
                        width={
                          showInPageNav
                            ? 'calc(100% - 192px)' // 192px = small t-shirt size
                            : '100%'
                        }
                      >
                        {/* top pad handled by PageHeader */}
                        <SkipLinkTarget id="main" />
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
              </Main>
            </MainContentWrapper>
          </>
        </Page>
      </Stack>
    </>
  );
};

const defaultFeedback = {
  'like-rating': '',
  'star-rating': 0,
  'text-area': '',
};

const PageFeedback = () => {
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);
  const [value, setValue] = useState(defaultFeedback);

  return (
    <>
      <FeedbackButton
        onClick={onOpen}
        color="purple!"
        label="Feedback"
        primary
      />
      <Feedback
        title="We’d love your feedback"
        show={open}
        modal
        onClickOutside={onClose}
        onEsc={onClose}
        value={value}
        onChange={nextValue => setValue(nextValue)}
        onReset={() => setValue(defaultFeedback)}
        onSubmit={({ value: submitVal }) => console.log(submitVal)}
      >
        {/* <Question
    label="Was this page helpful to you?"
    kind="star"
    name="star-rating"
    primary
  /> */}
        <Question
          label="What this page helpful to you?"
          kind="thumbs"
          name="like-rating"
          primary
        />
        <Question
          name="text-area"
          kind="textArea"
          label="Want to tell us anything else about this page?"
          inputProps={{
            placeholder: 'Tell us more!',
          }}
        />
      </Feedback>
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
