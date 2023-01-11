import React from 'react';
import { Box, Button, Spinner, Text } from 'grommet';
import { ModalBody, ModalFooter } from '../ModalDialog';
import { StatusGoodSmall } from 'grommet-icons';

export const PowerOnBodyExample = ({
  onClose,
  onDismiss,
  powerOnLoading,
  isLoading,
  isSuccessful,
}) => (
  <Box gap="medium">
    <ModalBody gap="medium">
      {!isSuccessful ? (
        <Text size="large">You are powering on 1 device</Text>
      ) : (
        <Box align="center" gap="xsmall" direction="row">
          <StatusGoodSmall color="green" />
          <Text size="large">Power On initiated for 1 device.</Text>
        </Box>
      )}
      {!isLoading && !isSuccessful && (
        <Text size="large">FTCUSAMountain_ML350Gen10_testcluster</Text>
      )}
      {isLoading && (
        <Spinner
          alignSelf="center"
          size="medium"
          message={{
            start: 'Loading more data.',
            end: 'Data has been loaded.',
          }}
        />
      )}
    </ModalBody>
    <ModalFooter justify="end">
      {!isSuccessful && !isLoading ? (
        <Box justify="end" gap="medium" direction="row">
          <Button onClick={onDismiss} label="Dismiss" />
          <Button
            label="Power on 1 Device"
            onClick={powerOnLoading}
            primary
            type="submit"
          />
        </Box>
      ) : (
        <Box justify="end">
          <Button
            label="Close"
            disabled={isLoading ? true : false}
            onClick={onClose}
            primary
          />
        </Box>
      )}
    </ModalFooter>
  </Box>
);
