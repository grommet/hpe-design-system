import { Page, PageContent } from 'grommet';

const ComponentsLayout = ({ children }: { children: React.ReactNode }) => (
  <Page>
    <PageContent>{children}</PageContent>
  </Page>
);

export default ComponentsLayout;