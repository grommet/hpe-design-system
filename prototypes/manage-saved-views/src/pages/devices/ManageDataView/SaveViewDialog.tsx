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
  // const inputRef = useRef<HTMLInputElement>();

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
            setSelected(newView);
            setView(newView);
            setViews([...views, newView]);
            onClose();
            setShow(false);
            setFormValue(defaultFormValue);
          }}>
          <Box gap="medium">
            <FormField
              label="View name"
              htmlFor="viewName"
              name="viewName"
            >
              <TextInput
                // ref={inputRef} 
                id="viewName" name="viewName" />
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
  );
}