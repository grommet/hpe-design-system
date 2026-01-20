import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import {
  Main,
  Page,
  ResponsiveContext,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Stack,
  Grid,
} from 'grommet';
import { AppHeader, DocsLayout } from '..';
import { Meta, PageBackground } from '../../components';
import { Config } from '../../../config';
import { getRelatedContent, getPageDetails } from '../../utils';
import { siteContents } from '../../data/search/contentForSearch';
import { ViewContext } from '../../pages/_app';
import { UserFeedback } from './UserFeedback';
import { Navigation } from '../navigation';

const gridAreas = [
  ['nav', 'header', 'context-pane'],
  ['nav', 'main', 'context-pane'],
];
const gridColumns = ['auto', 'flex', 'auto'];
const gridRows = ['auto', 'flex'];

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
  const relatedContent = titleProp && getRelatedContent(titleProp);
  // Allow proper capitalization to be used
  const {
    name: title,
    seoDescription,
    pageLayout,
    render,
  } = getPageDetails(titleProp);
  const layout = isLanding ? 'plain' : pageLayout;
  const breakpoint = useContext(ResponsiveContext);

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
      <Meta
        title={title}
        render={render}
        description={seoDescription}
        canonicalUrl={`https://design-system.hpe.design${router.route}`}
      />
      <SkipLinks id="skip-links">
        {skiplinks.map(({ id, label }) => (
          <SkipLink key={id} id={id} label={label} />
        ))}
      </SkipLinks>
      {/* When a backgroundImage is present, the main page content becomes 
      the `last` child. We want this content to drive the layout.
      For details on this prop, see here: https://v2.grommet.io/stack#guidingChild */}
      <Stack fill guidingChild={backgroundImage && 'last'}>
        {backgroundImage && (
          <PageBackground backgroundImage={backgroundImage} />
        )}
        <Grid areas={gridAreas} columns={gridColumns} rows={gridRows}>
          {/* Only render Header for non-home pages.
              Homepage header is rendered in index.js
              to have the same background as the hero. */}
          {title && title.toLowerCase() !== 'home' && (
            <AppHeader gridArea="header" background="decorative-blue" />
          )}
          <Navigation gridArea="nav" as="aside" background="decorative-cyan" />
          <Main overflow="visible" gridArea="main">
            <Page>
              {layout !== 'plain' ? (
                <DocsLayout
                  title={title}
                  topic={topic}
                  render={render}
                  headings={headings}
                  relatedContent={relatedContent}
                  showInPageNav={showInPageNav}
                  pageUpdateReady={pageUpdateReady}
                  contentHistory={contentHistory}
                >
                  {children}
                </DocsLayout>
              ) : (
                <>
                  <SkipLinkTarget id="main" label="Main content" />
                  {children}
                </>
              )}
            </Page>
          </Main>
          <UserFeedback />
        </Grid>
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
