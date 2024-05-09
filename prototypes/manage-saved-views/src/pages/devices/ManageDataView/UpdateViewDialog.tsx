import { useState } from 'react';
import { Box, Button, Form, FormField, Heading, Layer, Paragraph, Text, TextInput, Footer, View } from 'grommet';

export const UpdateViewDialog = (
  {
    value,
    lastView,
    onClose,
    setShow,
    setSelected,
    view,
    setView,
    views,
    setViews,
  }: {
    value: View,
    lastView: View,
    onClose: () => void,
    setShow: (nextValue: boolean) => void,
    setSelected: (nextView: View) => void,
    view: View,
    setView: (nextView: View) => void,
    views: View[],
    setViews: (nextViews: View[]) => void
  }) => {
  const [formValue, setFormValue] = useState<View>(value);

  return (
    <Layer position='center'>
      <Box pad='medium' width={{ min: 'medium', max: 'large' }}>
        <Heading level={2} margin='none'>Update "{lastView.name}"</Heading>
        <Paragraph>Name and apply the current sort, search, and filter settings to <Text color="text-strong" weight={500}>{lastView.name}</Text>.</Paragraph>
        <Form
          value={formValue}
          onChange={(nextValue) => {
            setFormValue(nextValue);
          }}
          onReset={() => {
            onClose();
            setShow(false);
            setFormValue(lastView);
          }}
          onSubmit={() => {
            const adjustedView = { ...formValue, custom: true };
            setSelected(adjustedView);
            setView(adjustedView);
            const nextViews = views.filter((v) => v.name !== lastView.name);
            setViews([...nextViews, adjustedView]);
            onClose();
            setShow(false);
            setFormValue(view);
          }}>
          <Box gap="medium">
            <FormField
              label="View name"
              htmlFor="name"
              name="name"
            >
              <TextInput id="name" name="name" />
            </FormField>
            <Footer justify='end' gap="xsmall">
              <Button
                type='reset'
                label='Cancel'
              />
              <Button
                type="submit"
                label='Save'
                primary
              />
            </Footer>
          </Box>
        </Form>
      </Box>
    </Layer >
  )
}