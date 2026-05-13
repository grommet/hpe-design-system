import React, { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { initialize, pageview } from 'react-ga';
import {
  Grid,
  Main,
  Page,
  ResponsiveContext,
  SkipLinkTarget,
  SkipLink,
  SkipLinks,
  Stack,
} from 'grommet';
import { DocsLayout } from '..';
import { Meta, PageBackground } from '../../components';
import { Config } from '../../../config';
import { getPrimaryPageByName, structureIndexes } from '../../data';
import { getRelatedContent } from '../../utils';
// eslint-disable-next-line import/no-unresolved, import/extensions
import { siteContents } from '../../data/search/contentForSearch';
import { ViewContext } from '../../pages/_app';
import { UserFeedback } from './UserFeedback';
import { AppHeader } from './AppHeader';
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
  } = getPrimaryPageByName(titleProp, structureIndexes) || {};
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

  const mainContent = (
    <Stack
      fill
      guidingChild={backgroundImage && 'last'}
    >
      {backgroundImage && (
        <PageBackground
          backgroundImage={backgroundImage}
        />
      )}
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
            <SkipLinkTarget
              id="main"
              label="Main content"
            />
            {children}
          </>
        )}
      </Page>
      <UserFeedback />
    </Stack>
  );

  return (
    <>
      <Meta
        title={title}
        render={render}
        description={seoDescription}
        canonicalUrl={
          `https://design-system.hpe.design${router.route}`
        }
      />
      <SkipLinks id="skip-links">
        {skiplinks.map(({ id, label }) => (
          <SkipLink key={id} id={id} label={label} />
        ))}
      </SkipLinks>
      <Grid
        areas={gridAreas}
        columns={gridColumns}
        rows={gridRows}
        height="100vh"
      >

        <Navigation
          gridArea="nav"
          as="aside"
          aria-label="navigation"
          background="background-front" />
        <AppHeader
          gridArea="header"
          background="background-back"
        />
        <Main
          gridArea="main"
          background="background-back"
        >
          {mainContent}
        </Main>
      </Grid>
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
