import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Footer,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  Notification,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';
import { FormClose } from 'grommet-icons';

const path = '/products/data/47287498729/collections/KCHDvfcByKvvjymNheg';
const parts = path.split('/').map(part => `/${part}`);
const matchPath = [
  ...parts.map(part => ({
    regexp: new RegExp(part),
    message: `Location paths do not match. Expecting ${part}.`,
    status: 'error',
  })),
  {
    regexp: new RegExp(path),
    message: 'Location paths do not match.',
    status: 'error',
  },
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

export const ContentDrivenLayout = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [value, setValue] = useState({ deletionPath: '' });
  const onClose = () => setShowModal(false);
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
          onClose={onClose}
          onEsc={onClose}
          target={containerRef && containerRef.current}
        >
          <Form value={value} onChange={onChange} validate="blur">
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
                  <Button primary label="Delete" onClick={() => {}} />
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

const ModalDialog = ({ children, title, subtitle, onClose, ...layerProps }) => (
  <Layer position="center" {...layerProps}>
    <Box gap="medium" pad="medium" width={{ min: 'medium' }} flex="grow">
      <Header align="start">
        <Box>
          <Heading level={2} size="small" margin="none">
            {title}
          </Heading>
          <Paragraph margin="none">{subtitle}</Paragraph>
        </Box>
        <Button
          a11yTitle="Close modal"
          icon={<FormClose />}
          onClick={onClose}
        />
      </Header>
      {children}
    </Box>
  </Layer>
);

ModalDialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
  title: PropTypes.string,
  subtitle: PropTypes.string,
  onClose: PropTypes.func,
};

const ModalBody = ({ children, ...boxProps }) => (
  <Box {...boxProps}>{children}</Box>
);

ModalBody.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};

const ModalFooter = ({ children, ...boxProps }) => (
  <Footer {...boxProps}>{children}</Footer>
);

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.object,
  ]),
};
