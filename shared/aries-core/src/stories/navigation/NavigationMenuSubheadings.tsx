import { Page, PageContent, PageHeader } from 'grommet';
import { useSessionStorage } from '@shared/hooks';
import { AppShell, NavigationPanel, navItemsSubheadings } from './content';

export const NavigationMenuSubheadings = () => {
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
          items={navItemsSubheadings}
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
