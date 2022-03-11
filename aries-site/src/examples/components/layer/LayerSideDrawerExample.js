import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  CheckBox,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  ResponsiveContext,
  Select,
  TextArea,
  TextInput,
  Text,
} from 'grommet';

const LayerForm = ({ setOpen }) => {
  // eslint-disable-next-line no-unused-vars
  const onSubmit = ({ value, touched }) => {
    // Your submission logic here
    setOpen(false);
  };

  return (
    <Box gap="medium">
      <Header align="start" pad={{ horizontal: 'xxsmall' }}>
        <Box gap="xxsmall">
          <Heading level={2} margin="none" id="layer-title">
            Form Header
          </Heading>
          <Text id="layer-desc">a subtitle if needed</Text>
        </Box>
      </Header>

      <Form
        validate="blur"
        method="post"
        onSubmit={({ value, touched }) => onSubmit({ value, touched })}
      >
        <FormField
          label="Text Area"
          htmlFor="text-area-input"
          name="textAreaInput"
          tabIndex={-1}
          a11yTitle={`You are on a Text Area in a layer containing
          a form. To close the layer 
          and return to the primary content, press Escape.`}
        >
          <TextArea
            id="text-area-input"
            name="textAreaInput"
            resize="vertical"
          />
        </FormField>
        <FormField
          label="Select Component"
          htmlFor="select-one__input"
          name="selectOne"
        >
          <Select
            id="select-one"
            name="selectOne"
            options={['Item 1', 'Item 2', 'Item 3']}
            placeholder="Select item"
          />
        </FormField>
        <FormField
          label="Select Component"
          htmlFor="select-two__input"
          name="selectTwo"
        >
          <Select
            id="select-two"
            name="selectTwo"
            options={['Item 1', 'Item 2', 'Item 3']}
            placeholder="Select item"
          />
        </FormField>
        <FormField label="Text Input" htmlFor="text-input" name="textInput">
          <TextInput
            id="text-input"
            name="textInput"
            placeholder="Placeholder text"
          />
        </FormField>
        <FormField
          label="Checkbox Toggle"
          htmlFor="checkbox-toggle"
          name="checkboxToggle"
          help="Description of how to use this field"
        >
          <CheckBox
            id="checkbox-toggle"
            name="checkboxToggle"
            label="Toggle me"
            toggle
          />
        </FormField>
        <Box
          direction="row"
          gap="small"
          margin={{ top: 'medium', bottom: 'small' }}
        >
          <Button label="Submit Form" primary type="submit" />
          <Button label="Cancel" onClick={() => setOpen(false)} />
        </Box>
      </Form>
    </Box>
  );
};

LayerForm.propTypes = {
  setOpen: PropTypes.func.isRequired,
};

export const LayerSideDrawerExample = () => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(undefined);

  return (
    <>
      <Box align="start">
        <Button label="Show me the side drawer" onClick={onOpen} primary />
      </Box>
      {open && (
        <Layer
          position="right"
          full={!['xsmall', 'small'].includes(size) ? 'vertical' : true}
          onEsc={onClose}
        >
          <Box
            fill="vertical"
            overflow="auto"
            width={!['xsmall', 'small'].includes(size) ? 'medium' : undefined}
            pad="medium"
          >
            <LayerForm setOpen={value => setOpen(value)} />
          </Box>
        </Layer>
      )}
    </>
  );
};
