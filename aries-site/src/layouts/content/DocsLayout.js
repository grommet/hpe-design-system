import PropTypes from 'prop-types';
import {
  Box,
  SkipLinkTarget,
} from 'grommet';
import {
  ContentSection,
  DocsPageHeader,
  InPageNavigation,
  RelatedContent,
  FeedbackSection,
  UpdateNotification,
} from '..';

export const DocsLayout = ({
  title,
  topic,
  render,
  headings,
  relatedContent,
  children,
  pageUpdateReady,
  showInPageNav,
  contentHistory,
  // ...rest
}) => {
  return (
    /* row-reverse direction, tab through ToC first */
    <Box direction="row-reverse">
      {showInPageNav && (
        <Box pad={{ left: 'xlarge' }}>
          <SkipLinkTarget id="toc" label="Table of Contents" />
          <InPageNavigation title={title} headings={headings} />
        </Box>
      )}
      <Box
        fill="horizontal"
      >
        <SkipLinkTarget id="main" label="Main content" />
        <ContentSection pad={{ top: 'none' }}>
          <DocsPageHeader title={title} topic={topic} render={render} />
          {pageUpdateReady && contentHistory[title]?.update && (
            <UpdateNotification name={title} />
          )}
          {children}
        </ContentSection>
        {relatedContent && relatedContent.length > 0 && (
          <RelatedContent relatedContent={relatedContent} title={title} />
        )}
        <FeedbackSection />
      </Box>
    </Box>
  );
};

DocsLayout.propTypes = {
  children: PropTypes.node,
  contentHistory: PropTypes.objectOf(PropTypes.object),
  headings: PropTypes.arrayOf(PropTypes.array),
  pageUpdateReady: PropTypes.bool,
  relatedContent: PropTypes.arrayOf(PropTypes.object),
  render: PropTypes.bool,
  showInPageNav: PropTypes.bool,
  title: PropTypes.string.isRequired,
  topic: PropTypes.string,
};
