import React, { useEffect, useState } from 'react';
import { Box, Button, Form, FormField, RadioButtonGroup } from 'grommet';
import { ButtonGroup, ModalBody, ModalDialog, ModalFooter } from 'aries-core';

import PropTypes from 'prop-types';

const defaultFormats = ['CSV', 'JSON', 'PDF'];

export const ExportDataContainer = ({
  onClose: onCloseProp,
  title,
  announce,
  formats,
}) => {
  // announce when the layer opens
  useEffect(() => {
    announce(`${title} modal opened.`, 'assertive');
  }, [announce, title]);

  const [value, setValue] = useState('');
  const onChange = nextValue => {
    setValue(nextValue);
  };

  return (
    <ModalDialog
      title={title}
      onEsc={() => {
        announce(`${title} modal cancelled and closed.`, 'assertive');
        onCloseProp();
      }}
    >
      <Form
        value={value}
        onChange={onChange}
        validate="blur"
        // eslint-disable-next-line no-unused-vars
        onSubmit={({ value: formValue }) => {
          // your submission logic here
          onCloseProp();
        }}
      >
        <Box gap="medium">
          <ModalBody gap="xsmall">
            <FormField
              htmlFor="exportFormat"
              name="exportFormat"
              label="File type"
              required
            >
              <RadioButtonGroup
                id="exportFormat"
                name="exportFormat"
                options={formats || defaultFormats}
              />
            </FormField>
          </ModalBody>
          <ModalFooter justify="end">
            <ButtonGroup>
              <Button
                label="Cancel"
                onClick={() => {
                  announce(`${title} modal cancelled and closed.`, 'assertive');
                  onCloseProp();
                }}
              />
              <Button primary label={title} type="submit" />
            </ButtonGroup>
          </ModalFooter>
        </Box>
      </Form>
    </ModalDialog>
  );
};

ExportDataContainer.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string,
  announce: PropTypes.object,
  formats: PropTypes.array,
};
