import PropTypes from 'prop-types';
import { Box, Button, Form, FormField, Heading, Layer, Select } from 'grommet';
export const ResizeDialog = ({ onCancel = () => { }, onSubmit = () => { }, resizeOptions, defaultValue }) => {
  console.log('rendering ResizeDialog', defaultValue);
  return (
    <Layer
      onEsc={onCancel}
      modal
    >
      <Form onSubmit={({ value }) => {
        onSubmit(value);
      }}>
        <Box pad="medium" gap="medium">
          <Heading level={2} margin="none">Resize</Heading>
          <FormField name="size" label="Size">
            <Select
              name="size"
              defaultValue={defaultValue || (resizeOptions ? resizeOptions[0] : undefined)}
              options={resizeOptions}
            />
          </FormField>
          <Box direction="row" gap="small" justify="end">
            <Button label="Close" onClick={onCancel} />
            <Button label="Save" primary type="submit" />
          </Box>
        </Box>
      </Form>
    </Layer>
  );
};

ResizeDialog.propTypes = {
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  resizeOptions: PropTypes.arrayOf(PropTypes.string),
  defaultValue: PropTypes.string,
};
