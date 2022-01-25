import { useContext } from 'react';
import { Header, Main, ResponsiveContext } from 'grommet';

import { AppContainer, PageContainer, pageContainer } from './components';
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

export const PageContainerInteractive = () => {
  const size = useContext(ResponsiveContext);
  /* Children of PageContainer should maintain horizontal whitespace on
   * each side of the child so that the content has room to breathe and
   * is not tightly condensed against the browser window's edge.
   *
   * Spacing is executed as the padding on each child to allow background
   * colors and scroll regions to behave properly.
   */
  const containerPad = pageContainer.pad[size];

  return (
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
      <PageContainer
        kind="wide"
        /* `as`, `title`, and `demoStyle` for Design System site demonstration.
           Remove from your implementation */
        as={ContentArea}
        title="PageContainer"
        {...demoStyle}
      >
        <Header pad={containerPad}>
          {/* Typically, the Header will contain elements such as the page's
           * h1, any "ascending a.k.a. back to parent" navigation, and/or
           * page-level menu, action buttons, etc.
           */}
          <ContentArea title="Page Header" background="purple!" fill />
        </Header>
        <Main flex pad={containerPad}>
          <ContentArea title="Page Content" background="orange" border fill />
        </Main>
      </PageContainer>
      <ContentArea title="Global Footer" background="status-unknown" />
    </AppContainer>
  );
};
