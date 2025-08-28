import React, {
  Fragment,
  useEffect,
  useContext,
  useCallback,
  useState,
} from 'react';
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
import { UpdateNotification } from '../content/UpdateNotification';
import { ViewContext } from '../../pages/_app';

export const Layout = ({
  backgroundImage,
  children,
  title: titleProp,
  topic,
  isLanding = false,
}) => {
  useEffect(() => {
    if (Config.gaId) {
      initialize(Config.gaId);
      pageview(document.location.pathname);
    }
  }, []);

  const router = useRouter();
  // const announce = useContext(AnnounceContext);
  const relatedContent = titleProp && getRelatedContent(titleProp);
  // Allow proper capitalization to be used
  const {
    name: title,
    seoDescription,
    pageLayout,
    render,
  } = getPageDetails(titleProp);
  const layout = isLanding ? 'plain' : pageLayout;

  const MainContentWrapper = isLanding ? Fragment : PageContent;
  const breakpoint = useContext(ResponsiveContext);
  const [open, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  // Want to show Thank you message so close the modal after 2 seconds
  const closeFeedbackModal = () => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  const onSubmit = useCallback(
    value => {
      const data = {
        values: {
          QID1: value.value['like-rating'] === 'like' ? 1 : 2,
          QID2_TEXT: value.value['text-area'],
          Q_URL: `https://design-system.hpe.design${router.route}`,
        },
      };
      // using next js env variables for url & api token
      // https://nextjs.org/docs/basic-features/environment-variables
      fetch(`${process.env.NEXT_PUBLIC_FEEDBACK_API_POST}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'X-API-TOKEN': process.env.NEXT_PUBLIC_FEEDBACK_APP_API_TOKEN,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(() => {
          closeFeedbackModal();
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },
    [router.route],
  );

  const match = siteContents.find(item =>
    item?.name === 'Index'
      ? item?.parent?.toLowerCase() === title?.toLowerCase()
      : item?.name?.toLowerCase() === title?.toLowerCase(),
  );
  const regexp = new RegExp(/ #{1,3} (...+?) ?~{2}/, 'g');
  const headings = match && [...match.content.matchAll(regexp)];
  const showInPageNav =
    !['xsmall', 'small'].includes(breakpoint) && headings?.length > 0;

  /* If no headings are found, do not show Table of Contents link, 
     instead set ToC skiplink as undefined and filter it out.
     Logic to be removed in future by: https://github.com/grommet/grommet/issues/6266  */
  const skiplinks = [
    showInPageNav ? { id: 'toc', label: 'Table of Contents' } : undefined,
    { id: 'main', label: 'Main Content' },
  ].filter(link => link !== undefined);

  const { contentHistory, pageUpdateReady, setPageUpdateReady } =
    useContext(ViewContext);

  // every time a new page loads, initalize ready
  // state to false, until app.js declares otherwise
  useEffect(() => {
    setPageUpdateReady(false);
  }, [setPageUpdateReady, title]);

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
              {skiplinks.map(({ id, label }) => (
                <SkipLink key={id} id={id} label={label} />
              ))}
            </SkipLinks>
            <PageContent>
              <Header fill="horizontal" alignSelf="center" />
            </PageContent>
            <MainContentWrapper>
              <Main overflow="visible">
                {/* row-reverse direction, tab through ToC first */}
                <Box direction={layout !== 'plain' ? 'row-reverse' : 'column'}>
                  {layout !== 'plain' ? (
                    <>
                      {showInPageNav ? (
                        <Box pad={{ left: 'xlarge' }}>
                          <SkipLinkTarget id="toc" />
                          <InPageNavigation title={title} headings={headings} />
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
                          {pageUpdateReady && contentHistory[title]?.update && (
                            <UpdateNotification name={title} />
                          )}
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
                    <>
                      <SkipLinkTarget id="main" />
                      {children}
                    </>
                  )}
                </Box>
              </Main>
            </MainContentWrapper>
            <FeedbackButton
              margin={{ vertical: 'medium', horizontal: 'medium' }}
              elevation="large"
              onClick={onOpen}
              label="Feedback"
              primary
              a11yTitle="This button launches a modal to give feedback."
            />
            <Feedback
              show={open}
              messages={{
                submit: 'Submit feedback',
                cancel: 'No thanks',
                successful: 'Thank you!',
              }}
              modal
              onClose={onClose}
              title="We’d love your feedback"
              onSubmit={onSubmit}
            >
              <Question
                label="Was this page helpful?"
                kind="thumbs"
                name="like-rating"
              />
              <Question
                name="text-area"
                kind="textArea"
                label="Any additional comments?"
                formProps={{
                  help: `Here's your chance to tell us your thoughts 
                  about this page.`,
                }}
              />
            </Feedback>
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
