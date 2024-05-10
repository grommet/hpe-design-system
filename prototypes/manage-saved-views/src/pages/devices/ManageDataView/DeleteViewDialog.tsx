import {
  Box,
  Button,
  Heading,
  Layer,
  Paragraph,
  Footer,
  Text,
  View
} from 'grommet';

export const DeleteViewDialog = (
  {
    onClose,
    setSelected,
    setShow,
    setLastView,
    view,
    setView,
    views,
    setViews
  }: {
    onClose: () => void,
    setSelected: (nextView: View) => void,
    setShow: (nextValue: boolean) => void,
    setLastView: (nextView: View) => void,
    view: View,
    setView: (nextView: View) => void,
    views: View[],
    setViews: (nextViews: View[]) => void
  }) => {

  return (
    <Layer position='center'>
      <Box pad='medium' width={{ min: 'medium', max: 'large' }}>
        <Heading level={2} margin='none'>Delete "{view.name}"</Heading>
        <Box gap="small">
          <Paragraph>Delete the <Text color="text-strong" weight={500}>{view.name}</Text> view?</Paragraph>
          <Footer justify='end' gap="xsmall">
            <Button
              label='Cancel'
              onClick={() => {
                setSelected(view);
                onClose();
                setShow(false);
              }}
            />
            <Button
              label='Delete view'
              primary
              onClick={() => {
                const nextViews = views.filter((v) => v.name !== view.name);
                const nextView = { ...view };
                delete nextView.name;
                delete nextView.default;
                delete nextView.custom;
                setViews(nextViews);
                setLastView(nextView);
                setView(nextView);
                onClose();
                setShow(false);
              }}
            />
          </Footer>
        </Box>
      </Box>
    </Layer >
  );
}