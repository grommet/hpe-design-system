/* eslint-disable react/prop-types */
import React, {
  Fragment,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import { ThemeContext } from 'styled-components';
import {
  Box,
  Button,
  Collapsible,
  Main,
  Page,
  PageContent,
  ResponsiveContext,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Anchor,
  Layer,
} from 'grommet';
import { Close, Down, Next, ShareRounded, Sidebar } from 'grommet-icons';
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
  // PageBackground,
  // FeedbackButton,
  Feedback,
  Question,
} from '../../components';
import { Config } from '../../../config';
import { getRelatedContent, getPageDetails, nameToPath } from '../../utils';
import { siteContents } from '../../data/search/contentForSearch';
import { UpdateNotification } from '../content/UpdateNotification';
import { ViewContext } from '../../pages/_app';
import { Login } from '../../components/Login';
import { navItems } from '../../data/search/contentForNav';
import { structure } from '../../data';

const sortNavItems = items =>
  items.sort((a, b) => {
    const firstPage = a
      .split('/')
      [a.split('/').length - 1].replaceAll('-', ' ');
    const secondPage = b
      .split('/')
      [b.split('/').length - 1].replaceAll('-', ' ');
    const firstIndex = structure
      .map(page => page.name.toLowerCase())
      .indexOf(firstPage);
    const secondIndex = structure
      .map(page => page.name.toLowerCase())
      .indexOf(secondPage);

    if (/^components|templates/.test(a) && /^components|templates/.test(b)) {
      if (a.includes('all-components')) return 1;
      if (b.includes('all-components')) return -1;
      if (a < b) return -1;
      if (b > a) return 1;
      return 0;
    }
    if (firstIndex < secondIndex) return -1;
    if (firstIndex > secondIndex) return 1;
    return 0;
  });

const sorted = sortNavItems(navItems);

// const pageDetails = getPageDetails('Home');

const createNestedObject = (path, obj) => {
  path.split('/').reduce((r, a) => {
    // eslint-disable-next-line no-param-reassign
    r[a] = r[a] || {};
    return r[a];
  }, obj);
};

const buildNav = items => {
  const result = {};
  items.forEach(item => {
    createNestedObject(item, result);
  });
  return result;
};

const sortOrder = [
  'foundation',
  'design-tokens',
  'components',
  'templates',
  'learn',
];

const navTree = buildNav(sorted);

const OptionsList = ({ options, open, setOpen }) => {
  const router = useRouter();

  const handleCollapsible = option => {
    if (open.includes(option)) {
      setOpen(open.filter(a => a !== option));
    } else setOpen([...open, option]);
  };

  return (
    <Box gap="xsmall">
      {Object.keys(options).map(option => {
        const subPages = Object.keys(options[option]).length > 0;
        const pageDetails = getPageDetails(option.replaceAll('-', ' '));

        return pageDetails.sideNav !== false ? (
          <Box gap="xsmall">
            <Link
              key={option}
              href={nameToPath(
                getPageDetails(option.replaceAll('-', ' ')).name,
              )}
              passHref
              legacyBehavior
            >
              <Button
                justify="start"
                align="start"
                label={
                  getPageDetails(option.replaceAll('-', ' ')).render ||
                  getPageDetails(option.replaceAll('-', ' ')).name
                }
                active={
                  router.pathname ===
                  nameToPath(getPageDetails(option.replaceAll('-', ' ')).name)
                }
                icon={
                  // eslint-disable-next-line no-nested-ternary
                  Object.keys(options[option]).length &&
                  sortOrder.includes(option) ? (
                    open.includes(option) ? (
                      <Down color="icon-primary" />
                    ) : (
                      <Next color="icon-primary" />
                    )
                  ) : undefined
                }
                onClick={() => {
                  handleCollapsible(option);
                }}
                // reverse
              />
            </Link>
            {/* Base Case */}
            {subPages && (
              <Collapsible open={open.includes(option)}>
                <Box pad={{ left: 'medium' }}>
                  <OptionsList
                    options={options[option]}
                    open={open}
                    setOpen={setOpen}
                  />
                </Box>
              </Collapsible>
            )}
          </Box>
        ) : undefined;
      })}
    </Box>
  );
};

export const Layout = ({
  // backgroundImage,
  children,
  title: titleProp,
  topic,
  isLanding = false,
}) => {
  const [authenticated, setAuthenticated] = useState(true);
  useEffect(() => {
    if (localStorage.getItem('theme-update-demo')) setAuthenticated(true);
  }, []);

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

  const [showSidebar, setShowSidebar] = useState(true);
  const [showSidebarLayer, setShowSidebarLayer] = useState(false);
  const theme = useContext(ThemeContext);

  // if the clientWidth > theme breakpoint value, it's because
  // on first render, breakpoint comes back as "medium" because
  // ResponsiveContext hasn't updated to actual window width
  const sidebarLayout = useMemo(
    () =>
      !(
        !['xlarge', 'large'].includes(breakpoint) &&
        document.documentElement.clientWidth <=
          theme.global.breakpoints[breakpoint].value
      ),
    [breakpoint, theme.global.breakpoints],
  );

  useEffect(() => {
    if (sidebarLayout) setShowSidebarLayer(false);
  }, [sidebarLayout]);

  const [openTopics, setOpenTopics] = useState([]);
  const navContent = (
    <Box gap="medium" flex={false}>
      <Box as="nav" gap="small">
        <OptionsList
          options={navTree}
          open={openTopics}
          setOpen={setOpenTopics}
        />
      </Box>
      <Box border={{ side: 'bottom', color: 'border-weak' }} />
      <Box gap="medium" pad={{ horizontal: 'small' }}>
        <Anchor
          icon={<ShareRounded />}
          label="Github"
          href="https://github.com/grommet/hpe-design-system"
          rel="noopener noreferrer"
          target="_blank"
        />
        <Button
          label="Give feedback"
          secondary
          alignSelf="start"
          size="small"
          onClick={onOpen}
        />
      </Box>
    </Box>
  );

  let nav;
  if (sidebarLayout) {
    nav = (
      <Collapsible open={showSidebar} direction="horizontal">
        <Box
          width="medium"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          gap="medium"
          height="100vh"
          overflow="auto"
          style={{ position: 'sticky', top: 0, bottom: 0 }}
        >
          <Button
            a11yTitle="Hide sidebar"
            alignSelf="start"
            icon={<Sidebar color="icon-primary" />}
            onClick={() => setShowSidebar(false)}
          />
          {navContent}
        </Box>
      </Collapsible>
    );
  } else if (showSidebarLayer) {
    nav = (
      <Layer animation="fadeIn" full>
        <Box pad="medium">
          <Button
            a11yTitle="Close navigation dialog"
            icon={<Close />}
            alignSelf="end"
            onClick={() => setShowSidebarLayer(false)}
          />
          {navContent}
        </Box>
      </Layer>
    );
  }
  return authenticated ? (
    <Box direction="row">
      {nav}
      <Page background="background-front" round="small">
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
          <Header
            fill="horizontal"
            alignSelf="center"
            sidebarLayout={sidebarLayout}
            onToggleNav={sidebarLayout ? setShowSidebar : setShowSidebarLayer}
            showNavControl={sidebarLayout ? !showSidebar : true}
          />
          <MainContentWrapper>
            <Main overflow="visible">
              {/* row-reverse direction, tab through ToC first */}
              <Box direction={layout !== 'plain' ? 'row-reverse' : 'column'}>
                {layout !== 'plain' ? (
                  <>
                    {showInPageNav ? (
                      <Box pad={{ left: 'large' }}>
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
    </Box>
  ) : (
    <Login />
  );
};

Layout.propTypes = {
  backgroundImage: PropTypes.shape({}),
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  isLanding: PropTypes.bool,
  title: PropTypes.string,
  topic: PropTypes.string,
};
