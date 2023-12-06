import { Page, PageContent } from 'grommet';

const ComponentLayout = ({ children }: { children: React.ReactNode }) => (
  <Page kind="narrow">
    <PageContent>{children}</PageContent>
  </Page>
);

export default ComponentLayout;