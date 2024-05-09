import { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Layer,
  Paragraph,
  TextInput,
  Footer,
  View
} from 'grommet';

const defaultFormValue = { viewName: '' }

export const SaveViewDialog = (
  {
    onClose,
    setShow,
    setSelected,
    view,
    setView,
    views,
    setViews
  }: {
    onClose: () => void,
    setShow: (nextValue: boolean) => void,
    setSelected: (nextView: View) => void,
    view: View,
    setView: (nextView: View) => void,
    views: View[],
    setViews: (nextViews: View[]) => void
  }) => {
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);

  return (
    <Layer position='center'>
      <Box pad='medium' width={{ min: 'medium', max: 'large' }}>
        <Heading level={2} margin='none'>Save as new view</Heading>
        <Paragraph>Your current sort, search, and filter settings will be
          saved for quick access in the future.</Paragraph>
        <Form
          value={formValue}
          onChange={(nextValue) => {
            setFormValue(nextValue);
          }}
          onReset={() => {
            onClose();
            setShow(false);
            setFormValue(defaultFormValue);
          }}
          onSubmit={() => {
            const newView = { ...view, name: formValue.viewName, custom: true };
            // May be cloning a view object which is set as default. Need to remove.
            delete newView.default;
            setBusy(true);
            setSelected(newView);
            setView(newView);
            setViews([...views, newView]);
            setTimeout(() => {
              setBusy(false);
              setSuccess(true);
            }, 500);
            setTimeout(() => {
              setSuccess(false);
            }, 1500);
            setTimeout(() => {
              onClose();
              setShow(false);
              setFormValue(defaultFormValue);
            }, 1600);
          }}>
          <Box gap="medium">
            <FormField
              label="View name"
              htmlFor="viewName"
              name="viewName"
            >
              <TextInput id="viewName" name="viewName" />
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
                busy={busy}
                success={success}
              />
            </Footer>
          </Box>
        </Form>
      </Box>
    </Layer >
  );
}