import { Page, PageContent, PageHeader } from 'grommet';
import { useSessionStorage } from '@shared/hooks';
import { AppShell, NavigationPanel, navItems } from './content';

const NavigationMenuExample = () => {
  const [activeItem, setActiveItem] = useSessionStorage<string | undefined>(
    'activeItem-1',
    'Home',
  );
  const [expanded] = useSessionStorage<boolean>('expanded-1', true);
  const [contextContent, setContextContent] = useSessionStorage(
    'contextContent-1',
    '',
  );

  return (
    <AppShell
      navigationMenu={
        <NavigationPanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          items={navItems}
          expanded={expanded}
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

const NavigationMenuSubheadings = () => {
  const [activeItem, setActiveItem] = useSessionStorage<string | undefined>(
    'activeItem-2',
    'Home',
  );
  const [expanded] = useSessionStorage<boolean>('expanded-2', true);
  const [contextContent, setContextContent] = useSessionStorage(
    'contextContent-2',
    '',
  );

  return (
    <AppShell
      navigationMenu={
        <NavigationPanel
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          items={navItems}
          expanded={expanded}
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

export const NavigationWithSubheadings = {
  render: () => <NavigationMenuSubheadings />,
};
