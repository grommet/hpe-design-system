import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CheckBox,
  Form,
  FormField,
  TextInput,
  Page,
  PageContent,
} from 'grommet';
import { ButtonGroup, ModalDialog } from '@shared/aries-core';

export const ButtonBusyExample = ({ containerRef }) => {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showLayer, setShowLayer] = useState(false);

  const onClose = () => {
    setShowLayer(false);
    setSuccess(false);
  };

  return (
    <Page fill>
      <PageContent align="center" justify="center" fill>
        <Button
          alignSelf="center"
          label="View example"
          onClick={() => setShowLayer(true)}
          secondary
        />
        {showLayer && (
          <ModalDialog
            title="Create cluster"
            position="right"
            full="vertical"
            onClose={onClose}
            onEsc={onClose}
            target={containerRef?.current}
          >
            <Form
              onValidate={() => {
                // in production, replace timeout with
                // conditionals based on API responses
                if (success === false) {
                  setBusy(true);
                  setTimeout(() => {
                    setBusy(false);
                    setSuccess(true);
                  }, 2000);
                  setTimeout(() => {
                    onClose();
                  }, 3000);
                }
              }}
            >
              <FormField label="Name" name="Name" htmlFor="name" required>
                <TextInput value="Cluster 1" name="Name" id="name" />
              </FormField>
              <FormField
                label="Cluster resource manager"
                name="resource-manager"
                htmlFor="resource-manager"
              >
                <CheckBox
                  label="Use manager"
                  name="resource-manager"
                  id="resource-manager"
                />
              </FormField>
              <ButtonGroup pad={{ top: 'medium' }}>
                <Button
                  label="Create cluster"
                  primary
                  type="submit"
                  busy={busy}
                  success={success}
                />
                <Button label="Cancel" onClick={onClose} />
              </ButtonGroup>
            </Form>
          </ModalDialog>
        )}
      </PageContent>
    </Page>
  );
};

ButtonBusyExample.propTypes = {
  containerRef: PropTypes.object,
};
