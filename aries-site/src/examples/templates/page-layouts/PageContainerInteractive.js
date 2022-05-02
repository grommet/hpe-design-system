import { Header, Main, Page, PageContent } from 'grommet';
import { AppContainer } from './components';
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

export function PageContainerInteractive() {
  return <AppContainer
    // `as`, `title`, and `demoStyle` for Design System site demonstration.
    //  Remove from your implementation.
    as={ContentArea}
    title="AppContainer"
    {...demoStyle}
  >
    {/* ContentArea is specific for the Design System site and is used
     as a visual aid to help present layout concepts. Remove ContentAreas from
     your implementation. */}
    <ContentArea title="Global Header" background="status-unknown" />
    {/* PageContainer is a context provider which specifies the page's 
      max-width, margins, and horizontal alignment for its children. 
      Possible values for `kind` are wide, narrow, and full. This implementation
      will be replaced by a Page component in Grommet which provides this 
      behavior without the need for implementing your own context nor values
      which will be specified by the HPE theme. 
      Follow Grommet Page PR: https://github.com/grommet/grommet/pull/5960 */}
    <Page flex>
      <ContentArea title="Page" border flex>
        <PageChildren />
      </ContentArea>
    </Page>
    <ContentArea title="Global Footer" background="status-unknown" />
  </AppContainer>;
}

function PageChildren() {
  return <PageContent flex>
    <ContentArea title="PageContent" {...demoStyle}>
      <Header
        // `as`, `title`, `background`, and `border` for Design System site
        //  demonstration. Remove from your implementation.
        as={ContentArea}
        title="Page Header"
        background="purple!"
        border
      >
        {/* Typically, the Header will contain elements such as the page's h1,
         contextual navigation, and page-level menu, action buttons, etc. */}
      </Header>
      <Main
        as={ContentArea}
        title="Other Content"
        background="orange"
        border
        fill={false}
      >
        {/* All of the page's content */}
      </Main>
    </ContentArea>
  </PageContent>;
}
