import {
  Page,
  PageContent,
  PageHeader,
} from 'grommet';
import { useSessionStorage } from '@shared/hooks';
import { AppShell, NavigationPanel } from './content';

const NavigationMenuExample = () => {
  const [activeItem, setActiveItem] = useSessionStorage<string | undefined>(
    'activeItem',
    'Home',
  );
  const [contextContent, setContextContent] = useSessionStorage(
    'contextContent',
    '',
  );

  return (
    <AppShell
      navigationMenu={
        <NavigationPanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      }
      mainContent={
        <Page>
          <PageContent pad="medium" gap="medium">
            <PageHeader title={activeItem} />
          </PageContent>
        </Page>
      }
      contextContent={contextContent}
      setContextContent={setContextContent}
      setActiveItem={setActiveItem}
    />
  );
};

const meta = {
  title: 'Navigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Navigation = {
  render: () => <NavigationMenuExample />,
};
