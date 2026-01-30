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
      <Header align="start" pad={{ horizontal: '5xsmall' }}>
        <Box gap="5xsmall">
          <Heading level={2} margin="none" id="layer-title">
            Form header
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
          label="Text area"
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
        {/* https://github.com/grommet/eslint-plugin-grommet/issues/46 */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField label="Select" htmlFor="select-one__input" name="selectOne">
          <Select
            id="select-one"
            name="selectOne"
            options={['Item 1', 'Item 2', 'Item 3']}
            placeholder="Select item"
          />
        </FormField>
        {/* TO DO - enhance formfield-htmlfor-id to support Select */}
        {/* eslint-disable-next-line grommet/formfield-htmlfor-id */}
        <FormField label="Select" htmlFor="select-two__input" name="selectTwo">
          <Select
            id="select-two"
            name="selectTwo"
            options={['Item 1', 'Item 2', 'Item 3']}
            placeholder="Select item"
          />
        </FormField>
        <FormField label="Text input" htmlFor="text-input" name="textInput">
          <TextInput
            id="text-input"
            name="textInput"
            placeholder="Placeholder text"
          />
        </FormField>
        <FormField
          label="Checkbox toggle"
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
          gap="xsmall"
          margin={{ top: 'medium', bottom: 'xsmall' }}
        >
          <Button label="Submit form" primary type="submit" />
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
