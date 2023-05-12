import React, { useEffect, useState, useContext } from 'react';
import {
  AnnounceContext,
  Box,
  Button,
  Form,
  FormField,
  RadioButtonGroup,
  Paragraph,
} from 'grommet';
import { ModalBody, ModalDialog, ModalFooter } from 'aries-core';

import PropTypes from 'prop-types';

export const ExportDataContainer = ({
  onSubmit: onSubmitProp,
  setShowModal,
  title,
}) => {
  // announce when the layer opens
  const announce = useContext(AnnounceContext);
  useEffect(() => {
    announce(`${title} modal opened.`, 'assertive');
  }, [announce, title]);

  const [value, setValue] = useState('');
  const onClose = () => {
    setShowModal(false);
    setValue('');
  };
  const onChange = nextValue => {
    setValue(nextValue);
  };

  return (
    <ModalDialog
      title={title}
      onEsc={() => {
        announce(`${title} modal cancelled and closed.`, 'assertive');
        onClose();
      }}
    >
      <Form
        value={value}
        onChange={onChange}
        validate="blur"
        // eslint-disable-next-line no-unused-vars
        onSubmit={({ value: formValue, touched }) => {
          if (onSubmitProp) onSubmitProp(formValue, touched);
          onClose();
        }}
      >
        <Box gap="medium">
          <ModalBody gap="small">
            <Paragraph margin="none">Select file type.</Paragraph>
            <FormField htmlFor="exportData" name="exportData">
              <RadioButtonGroup
                id="exportData"
                name="exportData"
                options={['CSV', 'JSON', 'PDF']}
              />
            </FormField>
          </ModalBody>
          <ModalFooter justify="end">
            <Box direction="row" gap="small">
              <Button
                label="Cancel"
                onClick={() => {
                  announce(`${title} modal cancelled and closed.`, 'assertive');
                  onClose();
                }}
              />
              <Button primary label={title} type="submit" />
            </Box>
          </ModalFooter>
        </Box>
      </Form>
    </ModalDialog>
  );
};

ExportDataContainer.propTypes = {
  onSubmit: PropTypes.func,
  setShowModal: PropTypes.func,
  title: PropTypes.string,
};
