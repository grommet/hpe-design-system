import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormField,
  Notification,
  Paragraph,
  TextInput,
} from 'grommet';
import { Copy } from '@hpe-design/icons-grommet';
import {
  ButtonGroup,
  ModalBody,
  ModalDialog,
  ModalFooter,
  TextEmphasis,
} from 'aries-core';

const credentialName = 'fleetscale-qa-credentials';
const DEMO_API_TOKEN =
  // eslint-disable-next-line max-len
  '.eyJjbGllbnRfaWQiOiJlMDIyN2FjMi05M2M2LTQyMTUtYWRkZS03YTNhMDYwMzA3YzYiLCJpc3MiOiJodHRwczovL3Nzby5jb21tb24uY2xvdWQuaHBlLmNvbSIsImF1ZCI6ImV4dGVybmFsX2FwaSIsInN1YiI6Im1hdHRoZXcuZ2xpc3NtYW5uQGhwZS5jb20iLCJ1c2VyX2N0eCI6IjE0NDFkMmJhMTI1MzExZWQ4YzY5ZWExNWMyNDcwYzczIiwiYXV0aF9zb3VyY2UiOiJjY3NfdG9rZW5fbWFuYWdlbWVudCIsInBsYXRmb3JtX2N1c3RvbWVyX2lkIjoiNDI3Mjc1ZmNkZGVmMTFlYmFlYWVhMjViMjA0ZTk0MzYiLCJpYXQiOjE2ODA1NTg3MDQsImFwcGxpY2F0aW9uX2luc3RhbmNlX2lkIjoiOTBjYTg5MjMtZjI4YS00OTkxLTg4NmItMTgyOWRhYWU4YWFjIiwiZXhwIjoxNjgwNTY1OTA0fQ.gvtafE--9t00JVBK7h-tsimNJIkzXhFa7uBarCOTF6djmxaqfNcQS5LT03WrWbFR9dOgnUao47m5kW9JyO1uNlE4QqeQ0-pJ8GU6pTB_h9rJlqotUl6aGa9omQNGbBDVZrwHrFvv_MYardKtYbq6E2NEP-ct01AV9RCHqHCq-_p_AXLbwY21dW2rS6_v91BonJqiz2nxA4JKgndxngy-dCUiQVRnerjIicJhtwnutLXtuNTdcZENTHmedK1HKBKRtftXPLz42GT6b3Zzui9Q6nMSW-SZood488uXXROQst8kx-mho9xeuxcvUbxuNG2mlGs4GlXmq_WY1ZnWN1Q6_w';
const defaultCopyTip = 'Copy to clipboard';

export const InlineNotificationExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);
  const [accessToken, setAccessToken] = useState(DEMO_API_TOKEN);
  const [copyTip, setCopyTip] = useState(defaultCopyTip);

  const onOpen = () => {
    setAccessToken(DEMO_API_TOKEN);
    setShowModal(true);
  };

  const onClose = () => {
    setAccessToken('');
    setShowModal(false);
  };

  const onCopy = () => {
    const duration = 2000;
    navigator.clipboard.writeText(accessToken);
    setCopyTip('Copied!');
    const timer = setTimeout(() => {
      setCopyTip(defaultCopyTip);
    }, duration);
    return () => clearTimeout(timer);
  };

  return (
    <Box align="center" justify="center" fill>
      <Button primary label="Display example" onClick={onOpen} />
      {showModal ? (
        <ModalDialog
          target={containerRef && containerRef.current}
          title="Access token created"
        >
          <ModalBody gap="xsmall">
            <Paragraph margin="none">
              You successfully created an access token for{' '}
              <TextEmphasis>{credentialName}</TextEmphasis>.
            </Paragraph>
            <Notification
              status="warning"
              message={`Note: We do not store your access token. 
              Copy this to a safe location.`}
            />
            <Box direction="row" align="end">
              <FormField
                htmlFor="access-token"
                name="access-token"
                label="Access token"
                contentProps={{
                  // border: false,
                  background: 'background-contrast',
                }}
                flex
              >
                <TextInput
                  name="access-token"
                  id="access-token"
                  readOnly
                  value={accessToken}
                />
              </FormField>
              <Button
                a11yTitle={copyTip}
                icon={<Copy />}
                kind="toolbar"
                onClick={onCopy}
                tip={{
                  content: copyTip,
                }}
                // margin aligns button with form fields bottom margin
                margin={{ bottom: '3xsmall' }}
              />
            </Box>
          </ModalBody>
          <ModalFooter justify="end">
            <ButtonGroup>
              <Button label="Close" secondary onClick={onClose} />
            </ButtonGroup>
          </ModalFooter>
        </ModalDialog>
      ) : null}
    </Box>
  );
};

InlineNotificationExample.propTypes = {
  containerRef: PropTypes.shape({ current: PropTypes.any }),
};
