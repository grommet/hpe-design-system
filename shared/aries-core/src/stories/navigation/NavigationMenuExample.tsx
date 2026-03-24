import { Page, PageContent, PageHeader } from 'grommet';
import { useSessionStorage } from '@shared/hooks';
import { AppShell, NavigationPanel, navItems } from './content';

export const NavigationMenuExample = () => {
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
