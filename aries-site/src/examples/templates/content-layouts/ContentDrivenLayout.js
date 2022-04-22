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

const path = '/products/data/47287498729/collections/KCHDvfcByKvvjymNheg';
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

export const ContentDrivenLayout = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [value, setValue] = useState(defaultValues);
  const onClose = () => {
    setShowModal(false);
    setValue(defaultValues);
  };
  const onChange = nextValue => {
    setValue(nextValue);
  };

  return (
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Display Modal"
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <ModalDialog
          title="Delete Data"
          onEsc={onClose}
          target={containerRef && containerRef.current}
        >
          <Form
            value={value}
            onChange={onChange}
            validate="blur"
            // eslint-disable-next-line no-unused-vars
            onSubmit={({ value: formValue, touched }) => {
              // Your submission logic here
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
                    This will permanently delete all data, including nested
                    data, located at:
                  </Paragraph>
                  <Text weight="bold">{path}</Text>
                </>
                <FormField
                  htmlFor="deletionPath"
                  name="deletionPath"
                  label={
                    <>
                      <Text>
                        To confirm, please type: <br />
                        {path}
                      </Text>
                    </>
                  }
                  validate={matchPath}
                >
                  <TextInput id="deletionPath" name="deletionPath" />
                </FormField>
              </ModalBody>
              <ModalFooter>
                <></>
                <Box direction="row" gap="xsmall">
                  <Button label="Cancel" onClick={onClose} />
                  <Button primary label="Delete" type="submit" />
                </Box>
              </ModalFooter>
            </Box>
          </Form>
        </ModalDialog>
      ) : null}
    </Box>
  );
};

ContentDrivenLayout.propTypes = { containerRef: PropTypes.object };
