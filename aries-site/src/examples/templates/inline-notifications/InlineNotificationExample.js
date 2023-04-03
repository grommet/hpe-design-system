import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  FormField,
  Notification,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';
import { Copy } from 'grommet-icons';

import { ModalDialog, ModalBody, ModalFooter } from '../ModalDialog';
import { ButtonGroup } from '../ButtonGroup';

const credentialName = 'fleetscale-qa-credentials';
const DEMO_API_TOKEN =
  // eslint-disable-next-line max-len
  '.eyJjbGllbnRfaWQiOiJlMDIyN2FjMi05M2M2LTQyMTUtYWRkZS03YTNhMDYwMzA3YzYiLCJpc3MiOiJodHRwczovL3Nzby5jb21tb24uY2xvdWQuaHBlLmNvbSIsImF1ZCI6ImV4dGVybmFsX2FwaSIsInN1YiI6Im1hdHRoZXcuZ2xpc3NtYW5uQGhwZS5jb20iLCJ1c2VyX2N0eCI6IjE0NDFkMmJhMTI1MzExZWQ4YzY5ZWExNWMyNDcwYzczIiwiYXV0aF9zb3VyY2UiOiJjY3NfdG9rZW5fbWFuYWdlbWVudCIsInBsYXRmb3JtX2N1c3RvbWVyX2lkIjoiNDI3Mjc1ZmNkZGVmMTFlYmFlYWVhMjViMjA0ZTk0MzYiLCJpYXQiOjE2ODA1NTg3MDQsImFwcGxpY2F0aW9uX2luc3RhbmNlX2lkIjoiOTBjYTg5MjMtZjI4YS00OTkxLTg4NmItMTgyOWRhYWU4YWFjIiwiZXhwIjoxNjgwNTY1OTA0fQ.gvtafE--9t00JVBK7h-tsimNJIkzXhFa7uBarCOTF6djmxaqfNcQS5LT03WrWbFR9dOgnUao47m5kW9JyO1uNlE4QqeQ0-pJ8GU6pTB_h9rJlqotUl6aGa9omQNGbBDVZrwHrFvv_MYardKtYbq6E2NEP-ct01AV9RCHqHCq-_p_AXLbwY21dW2rS6_v91BonJqiz2nxA4JKgndxngy-dCUiQVRnerjIicJhtwnutLXtuNTdcZENTHmedK1HKBKRtftXPLz42GT6b3Zzui9Q6nMSW-SZood488uXXROQst8kx-mho9xeuxcvUbxuNG2mlGs4GlXmq_WY1ZnWN1Q6_w';

export const InlineNotificationExample = ({ containerRef }) => {
  // containerRef is for demonstration purposes on this site. Most
  // implementations should likely remove.
  const [showModal, setShowModal] = useState(true);

  return (
    <Box align="center" justify="center" fill>
      <Button
        primary
        label="Display example"
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal ? (
        <ModalDialog
          target={containerRef && containerRef.current}
          title="Access token created"
        >
          <ModalBody gap="small">
            <Paragraph margin="none">
              You successfully created an access token for{' '}
              <Text weight={500}>{credentialName}</Text>. Please copy the access
              token to a safe place.
            </Paragraph>
            <FormField
              htmlFor="access-token"
              label="Access token"
              contentProps={{ border: false }}
            >
              <Box direction="row">
                <TextInput
                  id="access-token"
                  fill
                  readOnly
                  value={DEMO_API_TOKEN}
                />
                <Button label={<Copy />} kind="toolbar" onClick={() => {}} />
              </Box>
            </FormField>
            <Notification
              status="warning"
              message={`Note: We do not store your access token. 
              Copy this to a safe location.`}
            />
          </ModalBody>
          <ModalFooter justify="end">
            <ButtonGroup>
              <Button
                label="Close"
                secondary
                onClick={() => setShowModal(false)}
              />
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
