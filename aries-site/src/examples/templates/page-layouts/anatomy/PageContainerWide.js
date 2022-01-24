import { useContext } from 'react';
import { Header, Main, ResponsiveContext } from 'grommet';

import { AppContainer, PageContainer } from '../components';
import { ContentArea } from './components';

// `demoStyle` is specific for the Design System site and is used
// as a visual aid to help present layout concepts. Remove from
// your implementation.
const demoStyle = {
  border: { style: 'dashed' },
  gap: 'small',
  pad: 'small',
  round: { size: 'xsmall' },
};

export const PageContainerWide = () => {
  const size = useContext(ResponsiveContext);
  return (
    <AppContainer {...demoStyle}>
      <ContentArea title="Global Header" background="status-unknown" />
      <PageContainer {...demoStyle}>
        <Header>
          {/* ContentArea is specific for the Design System site and is used
           * as a visual aid to help present layout concepts. Remove from your
           * implementation.
           * Typically, the Header will contain elements such as the page's
           * h1, any "ascending / back to parent" navigation, and/or page-level
           * menu, action buttons, etc.
           */}
          <ContentArea title="Page Header" background="purple!" fill />
        </Header>
        <Main flex>
          <ContentArea title="Page Content" background="orange" border fill />
        </Main>
      </PageContainer>
      <ContentArea title="Global Footer" background="status-unknown" />
    </AppContainer>
  );
};
