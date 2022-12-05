import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  FormField,
  Notification,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';

import { ModalBody, ModalDialog, ModalFooter } from '../ModalDialog';

const defaultValues = { deletionPath: '' };

export const DestructiveConfirmation = ({
  message,
  onSubmit: onSubmitProp,
  path,
  setShowModal,
  setToast,
  title,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValues);
  const onClose = () => {
    setShowModal(false);
    setValue(defaultValues);
  };
  const onChange = nextValue => {
    setValue(nextValue);
  };

  const parts = path.split('/').map(part => `/${part}`);
  parts.splice(0, 1);
  const matchPath = [
    ...parts.map(part => ({
      regexp: new RegExp(part),
      message: `Location paths do not match. Missing '${part}'.`,
      status: 'error',
    })),
    function validate(val) {
      if (val !== path) {
        return {
          message: `Location paths do not match. 
  Expected: ${path}
  Received: ${val}`,
          status: 'error',
        };
      }
      return undefined;
    },
  ];

  return (
    <ModalDialog title={title} onEsc={onClose} {...rest}>
      <Form
        value={value}
        onChange={onChange}
        validate="blur"
        // eslint-disable-next-line no-unused-vars
        onSubmit={({ value: formValue, touched }) => {
          if (onSubmitProp) onSubmitProp(formValue, touched);
          onClose();
          if (setToast) setToast(true);
        }}
      >
        <Box gap="medium">
          <ModalBody gap="small">
            <Notification
              status="critical"
              message="This action cannot be undone."
            />
            <>
              <Paragraph margin="none">{message}</Paragraph>
              <Text weight="bold">{path}</Text>
            </>
            <FormField
              htmlFor="deletionPath"
              name="deletionPath"
              label={
                <Text>
                  To confirm, please type: <br />
                  {path}
                </Text>
              }
              validate={matchPath}
            >
              <TextInput id="deletionPath" name="deletionPath" />
            </FormField>
          </ModalBody>
          <ModalFooter justify="end">
            <Box direction="row" gap="small">
              <Button label="Cancel" onClick={onClose} />
              <Button primary label="Delete" type="submit" />
            </Box>
          </ModalFooter>
        </Box>
      </Form>
    </ModalDialog>
  );
};

DestructiveConfirmation.propTypes = {
  message: PropTypes.string,
  onSubmit: PropTypes.func,
  path: PropTypes.string,
  setShowModal: PropTypes.func,
  setToast: PropTypes.func,
  title: PropTypes.string,
};
