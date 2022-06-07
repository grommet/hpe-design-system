import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Form,
  FormField,
  Menu,
  Notification,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';

import { useState } from 'react';
import {
  ModalDialog,
  ModalBody,
  ModalFooter,
} from '../../templates/ModalDialog';

export const MenuDangerousExample = ({ bestPractice = true }) => {
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(false);

  const items = [
    { label: 'View details', onClick: () => {} },
    { label: 'Edit profile', onClick: () => {} },
    { label: 'Apply blueprint', onClick: () => {} },
    {
      label: 'Delete',
      onClick: () => {
        if (bestPractice) setShowModal(true);
        else setToast(true);
      },
    },
  ];

  return (
    <>
      <Menu
        label="Actions"
        open
        items={
          bestPractice
            ? [items.slice(0, items.length - 1), items.slice(-1)]
            : items
        }
      />
      {showModal && (
        <DestructiveConfirmation
          setShowModal={setShowModal}
          setToast={setToast}
        />
      )}
      {toast && (
        <Notification
          toast
          status="normal"
          message="Profile deleted."
          onClose={() => setToast(false)}
        />
      )}
    </>
  );
};

MenuDangerousExample.propTypes = {
  bestPractice: PropTypes.bool,
};

const path = '/servers/profiles/KCHDvfcByKvvjymNheg';
const parts = path.split('/').map(part => `/${part}`);
parts.splice(0, 1);
const matchPath = [
  ...parts.map(part => ({
    regexp: new RegExp(part),
    message: `Location paths do not match. Missing '${part}'.`,
    status: 'error',
  })),
  function validate(value) {
    if (value !== path) {
      return {
        message: `Location paths do not match. 
Expected: ${path}
Received: ${value}`,
        status: 'error',
      };
    }
    return undefined;
  },
];

const defaultValues = { deletionPath: '' };

const DestructiveConfirmation = ({ setShowModal, setToast }) => {
  const [value, setValue] = useState(defaultValues);
  const onClose = () => {
    setShowModal(false);
    setValue(defaultValues);
  };
  const onChange = nextValue => {
    setValue(nextValue);
  };

  return (
    <ModalDialog title="Delete profile" onEsc={onClose}>
      <Form
        value={value}
        onChange={onChange}
        validate="blur"
        // eslint-disable-next-line no-unused-vars
        onSubmit={({ value: formValue, touched }) => {
          // Your submission logic here
          onClose();
          setToast(true);
        }}
      >
        <Box gap="medium">
          <ModalBody gap="small">
            <Notification
              status="critical"
              message="This action cannot be undone."
            />
            <>
              <Paragraph margin="none">
                This will permanently delete this profile, including all
                history, located at:
              </Paragraph>
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
            <Box direction="row" gap="xsmall">
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
  setShowModal: PropTypes.func,
  setToast: PropTypes.func,
};
