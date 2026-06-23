import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AnnounceContext,
  Box,
  Button,
  Form,
  FormField,
  Heading,
  Paragraph,
  ResponsiveContext,
  TextArea,
  TextInput,
} from 'grommet';
import { LayerHeader } from '@shared/aries-core';
import { ContentPane } from '../../../layouts/content/ContentPane';
import {
  ConfirmationContext,
  ConfirmationProvider,
  DoubleConfirmation,
  Sidedrawer,
  useConfirmation,
} from '../layer/components';

const initialDevice = {
  name: 'web-server-01',
  description: 'Primary web server for the US East region.',
};

export const ButtonCancelExample = () => {
  const [device, setDevice] = useState(initialDevice);

  return (
    <ConfirmationProvider>
      <ConfirmationContext.Consumer>
        {({ showLayer, showConfirmation }) => (
          <>
            <DeviceOverview device={device} />
            {showLayer ? (
              <EditDevice device={device} setDevice={setDevice} />
            ) : null}
            {showConfirmation ? (
              <DoubleConfirmation title="device edits" />
            ) : null}
          </>
        )}
      </ConfirmationContext.Consumer>
    </ConfirmationProvider>
  );
};

const DeviceOverview = ({ device }) => {
  const { setShowLayer } = useConfirmation();
  const size = useContext(ResponsiveContext);

  return (
    <ContentPane>
      {/* using content-driven container 
        https://design-system.hpe.design/templates/content-layouts?q=content#content-driven-layouts */}
      <Box gap="medium" width="medium">
        <Box gap="5xsmall">
          <Heading level={2} margin="none">
            {device.name}
          </Heading>
          <Paragraph margin="none" color="text-weak">
            {device.description}
          </Paragraph>
        </Box>
        <Button
          alignSelf={!['xsmall', 'small'].includes(size) ? 'start' : undefined}
          label="Edit device"
          onClick={() => setShowLayer(true)}
          secondary
        />
      </Box>
    </ContentPane>
  );
};

const EditDevice = ({ device, setDevice, ...rest }) => {
  const { onClose } = useConfirmation();
  const announce = useContext(AnnounceContext);

  useEffect(() => {
    announce('Edit devices modal opened', 'assertive');
  }, [announce]);

  return (
    <Sidedrawer onEsc={onClose} {...rest}>
      <LayerHeader title="Edit device" onClose={onClose} />
      <EditDeviceForm
        id="edit-device-form"
        device={device}
        setDevice={setDevice}
        onClose={onClose}
      />
    </Sidedrawer>
  );
};

const EditDeviceForm = ({ device, setDevice, onClose, ...rest }) => {
  const [draft, setDraft] = useState(device);
  const { setShowLayer, setTouched } = useConfirmation();

  useEffect(() => {
    setDraft(device);
  }, [device]);

  useEffect(() => () => setTouched(false), [setTouched]);

  const handleSave = () => {
    setDevice(draft);
    setShowLayer(false);
  };

  return (
    <Form
      onSubmit={handleSave}
      messages={{
        required: 'This is a required field.',
      }}
      value={draft}
      onChange={(nextValue, { touched }) => {
        setDraft(nextValue);
        setTouched(Object.keys(touched).length);
      }}
      {...rest}
    >
      <Box gap="medium" width="medium">
        <>
          <FormField
            label="Device name"
            htmlFor="device-name"
            name="device-name"
            required
          >
            <TextInput
              id="device-name"
              name="device-name"
              onChange={event =>
                setDraft(prev => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              value={draft.name}
            />
          </FormField>
          <FormField
            htmlFor="device-description"
            label="Description"
            name="device-description"
          >
            <TextArea
              id="device-description"
              name="device-description"
              onChange={event =>
                setDraft(prev => ({
                  ...prev,
                  description: event.target.value,
                }))
              }
              value={draft.description}
            />
          </FormField>
        </>
        <Box direction="row" gap="xsmall" flex={false}>
          <Button label="Save changes" primary type="submit" />
          <Button label="Cancel" onClick={onClose} />
        </Box>
      </Box>
    </Form>
  );
};

DeviceOverview.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};

EditDevice.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  setDevice: PropTypes.func.isRequired,
};

EditDeviceForm.propTypes = {
  device: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  setDevice: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
