import { useState } from 'react';
import { Box, Button, Spinner, Text } from 'grommet';
import { StatusGoodSmall } from 'grommet-icons';
import { ButtonGroup, ModalBody, ModalFooter } from 'aries-core';

const steps = {
  'confirm-power-on': {
    body: (
      <Box gap="small">
        <Text size="large">You are powering on 1 device:</Text>
        <Text size="large">FTCUSAMountain_ML350Gen10_testcluster</Text>
      </Box>
    ),
    footer: ({ onCancel, onConfirm }) => (
      <ButtonGroup>
        <Button onClick={onCancel} label="Cancel" />
        <Button
          label="Power on 1 device"
          onClick={onConfirm}
          primary
          type="submit"
        />
      </ButtonGroup>
    ),
  },
  'powering-on': {
    body: (
      <Box gap="small">
        <Text size="large">You are powering on 1 device:</Text>
        <Spinner
          alignSelf="center"
          size="small"
          message={{
            start: 'Powering on devices.',
            end: 'Power on attempt complete.',
          }}
        />
      </Box>
    ),
    footer: ({ onClose }) => (
      <ButtonGroup>
        <Button label="Close" disabled={true} onClick={onClose} primary />
      </ButtonGroup>
    ),
  },
  'power-on-success': {
    body: (
      <Box align="center" gap="xsmall" direction="row">
        <StatusGoodSmall color="green" size="small" />
        <Text size="large">Power on initiated for 1 device.</Text>
      </Box>
    ),
    footer: ({ onClose }) => (
      <ButtonGroup>
        <Button label="Close" onClick={onClose} primary />
      </ButtonGroup>
    ),
  },
};

export const PowerOnFlow = ({ onCancel, onClose }) => {
  const [step, setStep] = useState(steps['confirm-power-on']);

  const onConfirm = () => {
    setStep(steps['powering-on']);
    // for demo purposes, simulating call to power on API
    setTimeout(() => {
      setStep(steps['power-on-success']);
    }, 3000);
  };

  return (
    <Box gap="medium">
      <ModalBody>{step.body}</ModalBody>
      <ModalFooter justify="end">
        {step.footer({ onCancel, onConfirm, onClose })}
      </ModalFooter>
    </Box>
  );
};

export const config = {
  title: 'Power on',
};
