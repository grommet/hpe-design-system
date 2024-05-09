import { Box, Button, Header, Heading, Layer, List, Paragraph, View } from 'grommet';
import { Close } from 'grommet-icons';

export const ManageViewsLayer = (
  {
    onClose,
    views,
    setViews
  }: {
    onClose: () => void,
    views: View[],
    setViews: (nextViews: View[]) => void
  }
) => {
  const presetViews = views.filter((view) => !view.custom);
  const customViews = views.filter((view) => view.custom);

  return (
    <Layer position="right" full="vertical">
      <Box pad="medium">
        <Header>
          <Heading level={2}>Manage views</Heading>
          <Button a11yTitle='Close manage views' icon={<Close aria-hidden="true" />} onClick={onClose} />
        </Header>
        <Box>
          <Paragraph margin="none">
            Update, rename, set as default, or delete views.
          </Paragraph>
          <Heading level={3} margin="none">Preset views</Heading>
          <List data={presetViews} >
            {(datum) => {
              return (
                datum.name
              );
            }}
          </List>
          <List data={customViews} >
            {(datum) => {
              return (
                datum.name
              );
            }}
          </List>
          <Heading level={3} margin="none">Custom views</Heading>
        </Box>
      </Box>
    </Layer >
  );
}