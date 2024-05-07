import { Box, Button, Heading, Layer, Paragraph, Footer, View } from 'grommet';

export const DeleteViewDialog = (
  {
    onClose,
    setSelected,
    setShow,
    view,
    views,
    setViews
  }: {
    onClose: () => void,
    setSelected: (nextView: View) => void,
    setShow: (nextValue: boolean) => void,
    view: View,
    views: View[],
    setViews: (nextViews: View[]) => void
  }) => {

  return (
    <Layer position='center'>
      <Box pad='medium' width={{ min: 'medium', max: 'large' }}>
        <Heading level={2} margin='none'>Delete "{view.name}"</Heading>
        <Box gap="small">
          <Paragraph>Delete the "{view.name}" view?</Paragraph>
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
                setViews(nextViews);
                setSelected({});
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