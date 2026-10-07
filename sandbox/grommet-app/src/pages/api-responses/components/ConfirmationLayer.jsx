// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AnnounceContext,
  Box,
  Button,
  Footer,
  Form,
  FormField,
  Heading,
  Layer,
  Notification,
  Paragraph,
  ResponsiveContext,
  Text,
  TextInput,
} from 'grommet';

// Center layer used to confirm a costly action. Displaying the layer *is*
// the warning; no extra warning icon or styling is added. If the request
// fails after the user confirms, the layer stays open and the error is
// shown inline so the user can retry or cancel.
export const ConfirmationLayer = ({
  children,
  confirmLabel,
  destructive,
  onClose,
  onConfirm,
  subtitle,
  title,
}) => {
  const size = useContext(ResponsiveContext);
  const announce = useContext(AnnounceContext);
  const compact = ['xsmall', 'small'].includes(size);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState();
  const [typed, setTyped] = useState({ confirmation: '' });

  useEffect(() => {
    announce(`${title} dialog opened.`, 'assertive');
  }, [announce, title]);

  const close = () => {
    if (busy) return;
    onClose();
  };

  const confirm = async () => {
    setBusy(true);
    setError(undefined);
    try {
      await onConfirm();
      onClose();
    } catch (err) {
      setError(err);
      announce(`${err.title}. ${err.message}`, 'assertive');
      setBusy(false);
    }
  };

  const footer = (
    <Footer justify="end" gap="xsmall">
      <Button label="Cancel" onClick={close} disabled={busy} />
      <Button
        label={confirmLabel}
        primary
        busy={busy}
        type={destructive ? 'submit' : 'button'}
        onClick={destructive ? undefined : confirm}
      />
    </Footer>
  );

  const errorNotification = error && (
    <Notification
      status="critical"
      title={error.title}
      message={error.message}
    />
  );

  return (
    <Layer
      position="center"
      full={compact}
      onEsc={close}
      onClickOutside={close}
    >
      <Box pad="medium" gap="medium" width="medium">
        <Box gap="xsmall">
          <Heading level={2} margin="none">
            {title}
          </Heading>
          {subtitle && <Text>{subtitle}</Text>}
        </Box>

        {destructive ? (
          <Form
            value={typed}
            onChange={setTyped}
            validate="blur"
            onSubmit={confirm}
          >
            <Box gap="medium">
              <Box gap="xsmall">
                <Notification
                  status="critical"
                  message="This action cannot be undone."
                />
                {children}
                <FormField
                  htmlFor="confirmation"
                  name="confirmation"
                  label={`To confirm, type: ${destructive.match}`}
                  validate={value =>
                    value !== destructive.match
                      ? {
                          message: `Enter "${destructive.match}" exactly to continue.`,
                          status: 'error',
                        }
                      : undefined
                  }
                >
                  <TextInput id="confirmation" name="confirmation" />
                </FormField>
              </Box>
              {errorNotification}
              {footer}
            </Box>
          </Form>
        ) : (
          <>
            {children}
            {errorNotification}
            {footer}
          </>
        )}
      </Box>
    </Layer>
  );
};

ConfirmationLayer.propTypes = {
  children: PropTypes.node,
  confirmLabel: PropTypes.string.isRequired,
  destructive: PropTypes.shape({ match: PropTypes.string.isRequired }),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export const ConfirmationBody = ({ children }) => (
  <Paragraph margin="none">{children}</Paragraph>
);

ConfirmationBody.propTypes = { children: PropTypes.node };
