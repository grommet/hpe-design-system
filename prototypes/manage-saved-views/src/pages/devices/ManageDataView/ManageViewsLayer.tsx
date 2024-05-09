import { useState } from 'react';
import { Box, Button, Header, Heading, Layer, List, Menu, Paragraph, Text, View } from 'grommet';
import { Close, More } from 'grommet-icons';
import { UpdateViewDialog } from './UpdateViewDialog';
import { vi } from '@faker-js/faker';

export const ManageViewsLayer = (
  {
    onClose,
    lastView,
    setSelected,
    view,
    setView,
    views,
    setViews
  }: {
    onClose: () => void,
    lastView: View,
    setSelected: (nextView: View) => void,
    view: View,
    setView: (nextView: View) => void,
    views: View[],
    setViews: (nextViews: View[]) => void
  }
) => {
  const [activeItem, setActiveItem] = useState<View>({});
  const [updateViewDialog, setUpdateViewDialog] = useState(false);

  const presetViews = views.filter((view) => !view.custom);
  const customViews = views.filter((view) => view.custom);

  return (
    <Layer position="right" full="vertical">
      <Box pad="medium">
        <Box width={{ min: 'medium' }}>
          <Header>
            <Heading level={2}>Manage views</Heading>
            <Button a11yTitle='Close manage views' icon={<Close aria-hidden="true" />} onClick={onClose} />
          </Header>
          <Box gap="medium">
            <Paragraph margin="none">
              Update, rename, set default, or delete views.
            </Paragraph>
            <>
              <Heading level={3} margin={{ bottom: 'xsmall', top: 'none' }}>Preset views</Heading>
              <ViewList data={presetViews} >
                {(datum: View) => <ListItem view={datum} />}
              </ViewList>
            </>
            <>
              <Heading level={3} margin={{ bottom: 'xsmall', top: 'none' }}>Custom views</Heading>
              <ViewList data={customViews}>
                {(datum: View) => <ListItem
                  view={datum}
                  menuItems={[
                    {
                      label: 'Update',
                      onClick: () => {
                        setActiveItem(datum);
                        setUpdateViewDialog(true);
                      }
                    },
                    {
                      label: datum.default ? 'Remove default' : 'Set as default',
                      onClick: () => { }
                    },
                    {
                      label: 'Rename',
                      onClick: () => { }
                    },
                    {
                      label: 'Delete',
                      onClick: () => { }
                    }
                  ]}
                />}
              </ViewList>
            </>
          </Box>
        </Box>
      </Box>
      {updateViewDialog && <UpdateViewDialog
        value={activeItem}
        lastView={activeItem}
        onClose={() => setUpdateViewDialog(false)}
        setShow={setUpdateViewDialog}
        setSelected={setSelected}
        view={view}
        setView={setView}
        views={views}
        setViews={setViews}
      />}
    </Layer >
  );
}

const ViewList = ({ ...rest }) => <List pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }} {...rest} />;

const ListItem = (
  {
    menuItems,
    view
  }: {
    menuItems: { label: string, onClick: () => void }[],
    view: View
  }) => {
  return (
    <Box direction="row" align="center" gap="medium">
      <Box direction="row" justify='between' flex="grow">
        <Text color="text-strong" weight={500} margin="none">{view.name}</Text>
        <Text margin="none">{view.default && 'Default'}</Text>
      </Box>
      <Menu
        a11yTitle={`Manage ${view.name} options`}
        dropAlign={{ top: 'bottom', right: 'right' }}
        icon={<More aria-hidden="true" />}
        items={menuItems}
      />
    </Box>
  );
}