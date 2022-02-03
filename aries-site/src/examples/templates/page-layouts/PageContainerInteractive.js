import { useContext } from 'react';
import { Header, Main } from 'grommet';

import {
  AppContainer,
  PageContainer,
  PageContainerContext,
} from './components';
import { ContentArea } from './anatomy/components';

// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
const demoStyle = {
  border: { style: 'dashed' },
  flex: true,
  gap: 'small',
  pad: 'small',
  round: { size: 'xsmall' },
};

export const PageContainerInteractive = () => (
  <AppContainer
    /* `as`, `title`, and `demoStyle` for Design System site demonstration.
         Remove from your implementation */
    as={ContentArea}
    title="AppContainer"
    {...demoStyle}
  >
    {/* ContentArea is specific for the Design System site and is used
     * as a visual aid to help present layout concepts. Remove from your
     * implementation.
     */}
    <ContentArea title="Global Header" background="status-unknown" />
    <PageContainer kind="wide" fill>
      {/* Children of PageContainer should maintain horizontal whitespace on
       * each side of the child so that the content has room to breathe and
       * is not tightly condensed against the browser window's edge.
       *
       * Spacing is executed as the padding on each child to allow background
       * colors and scroll regions to behave properly.
       */}
      <PageChildren />
    </PageContainer>
    <ContentArea title="Global Footer" background="status-unknown" />
  </AppContainer>
);

const PageChildren = () => {
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <ContentArea title="PageContainer" {...pageContainer} {...demoStyle}>
      <PageHeader />
      <PageContent />
    </ContentArea>
  );
};

const PageHeader = () => {
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <>
      <Header {...pageContainer}>
        {/* Typically, the Header will contain elements such as the page's
         * h1, any "ascending a.k.a. back to parent" navigation, and/or
         * page-level menu, action buttons, etc.
         */}
        <ContentArea title="Page Header" background="purple!" fill />
      </Header>
    </>
  );
};

const PageContent = () => {
  const { ...pageContainer } = useContext(PageContainerContext);

  return (
    <Main {...pageContainer}>
      <ContentArea title="Page Content" background="orange" border fill />
    </Main>
  );
};
