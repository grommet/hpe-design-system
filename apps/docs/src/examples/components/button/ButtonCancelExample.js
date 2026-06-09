import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    AnnounceContext,
    Box,
    Button,
    Form,
    FormField,
    Heading,
    Header,
    Text,
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
                        {showLayer ?
                            <EditDevice
                                device={device}
                                setDevice={setDevice} /> : null
                        }
                        {showConfirmation ?
                            <DoubleConfirmation title="device" /> : null
                        }
                    </>
                )}
            </ConfirmationContext.Consumer>
        </ConfirmationProvider>
    );
};

const DeviceOverview = ({ device }) => {
    const { setShowLayer } = useConfirmation();

    return (
        <ContentPane gap="medium" width="medium">
            <Header
                direction="column"
                align="start"
                gap="5xsmall"
                pad={{ horizontal: '5xsmall' }}
            >
                <Heading level={3} margin="none">
                    {device.name}
                </Heading>
                <Text color="text-weak">{device.description}</Text>
            </Header>
            <Button
                alignSelf="start"
                label="Edit device"
                onClick={() => setShowLayer(true)}
                secondary
            />
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
            <LayerForm
                id="edit-device-form"
                device={device}
                setDevice={setDevice}
                onClose={onClose}
            />
        </Sidedrawer>
    );
};

const LayerForm = ({ device, setDevice, onClose, ...rest }) => {
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
            <FormField
                label="Device name"
                contentProps={{ width: 'medium' }}
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
                contentProps={{ width: 'medium' }}
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
            <Box
                direction="row"
                gap="xsmall"
                flex={false}
                margin={{ top: 'medium' }}
            >
                <Button label="Save changes" primary type="submit" />
                <Button label="Cancel" onClick={onClose} />
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

LayerForm.propTypes = {
    device: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
    }).isRequired,
    setDevice: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
