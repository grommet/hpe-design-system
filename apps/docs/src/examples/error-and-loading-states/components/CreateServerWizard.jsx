// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AnnounceContext,
  Box,
  Button,
  Footer,
  Form,
  FormField,
  Header,
  Heading,
  Layer,
  NameValueList,
  NameValuePair,
  Notification,
  Paragraph,
  ResponsiveContext,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { Close, LinkNext, LinkPrev } from '@hpe-design/icons-grommet';
import { request } from '../api';

const WIZARD_TITLE = 'Create server';
const CONFLICTING_SUBNET = '10.0.0.0/24';
const regions = ['US West', 'US East', 'EU Central'];

const defaultValues = {
  name: '',
  region: '',
  email: '',
  subnet: CONFLICTING_SUBNET,
  gateway: '10.0.0.1',
};

// ---------------------------------------------------------------------------
// Simulated backend. Each step may validate server-side; errors are returned
// targeted at either a specific field or the whole step.
// ---------------------------------------------------------------------------
const api = {
  // Step 2: the API rejects the subnet. The error names the field, so it is
  // displayed on that field.
  validateNetwork: values =>
    request({
      delay: 1200,
      outcome: values.subnet === CONFLICTING_SUBNET ? 'error' : 'success',
      error: {
        status: 409,
        field: 'subnet',
        message: `${CONFLICTING_SUBNET} overlaps with the existing network 
          "prod-network". Enter a subnet that is not already in use.`,
      },
    }),
  // Step 3: the first attempt times out. Nothing about the user's input is
  // wrong, so the error is displayed at step level.
  createServer: (() => {
    let attempts = 0;
    return () => {
      attempts += 1;
      return request({
        delay: 1600,
        outcome: attempts % 2 === 1 ? 'error' : 'success',
        error: {
          status: 504,
          title: 'Unable to create server',
          message: `The request timed out before the server could be 
            created. No changes were made. Try again, and if the problem 
            persists, contact support.`,
        },
      });
    };
  })(),
};

// ---------------------------------------------------------------------------
// Steps
// ---------------------------------------------------------------------------
const DetailsStep = () => (
  <Box width="medium">
    <FormField
      label="Server name"
      htmlFor="name"
      name="name"
      help="Lowercase letters, numbers, and hyphens."
      required
      validate={{
        regexp: /^[a-z0-9-]*$/,
        message: 'Use only lowercase letters, numbers, and hyphens.',
        status: 'error',
      }}
    >
      <TextInput id="name" name="name" placeholder="web-prod-03" />
    </FormField>
    <FormField label="Region" htmlFor="region" name="region" required>
      <Select
        id="region"
        a11yTitle="Region"
        name="region"
        options={regions}
        placeholder="Select a region"
      />
    </FormField>
    <FormField
      label="Notification email"
      htmlFor="email"
      name="email"
      help="Optional. We'll email you when the server is ready."
      validate={{
        regexp: /(^$)|([^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+)/,
        message: 'Enter a valid email address.',
        status: 'error',
      }}
    >
      <TextInput id="email" name="email" placeholder="jane.smith@hpe.com" />
    </FormField>
  </Box>
);

const NetworkStep = ({ fieldErrors }) => (
  <Box width="medium">
    <FormField
      label="Subnet"
      htmlFor="subnet"
      name="subnet"
      help="CIDR notation, for example 10.0.1.0/24."
      required
      // API-returned error for this field. Takes precedence over
      // client-side validation while present.
      error={fieldErrors.subnet}
    >
      <TextInput id="subnet" name="subnet" />
    </FormField>
    <FormField label="Gateway" htmlFor="gateway" name="gateway" required>
      <TextInput id="gateway" name="gateway" />
    </FormField>
  </Box>
);

NetworkStep.propTypes = {
  fieldErrors: PropTypes.objectOf(PropTypes.string).isRequired,
};

const ReviewStep = ({ values }) => (
  <Box gap="medium" width={{ max: 'large' }}>
    <NameValueList>
      <NameValuePair name="Server name">{values.name}</NameValuePair>
      <NameValuePair name="Region">{values.region}</NameValuePair>
      <NameValuePair name="Notification email">
        {values.email || '--'}
      </NameValuePair>
      <NameValuePair name="Subnet">{values.subnet}</NameValuePair>
      <NameValuePair name="Gateway">{values.gateway}</NameValuePair>
    </NameValueList>
    <Text>
      When you click &ldquo;Create server&rdquo;, provisioning starts
      immediately. You can monitor progress from the Servers page.
    </Text>
  </Box>
);

ReviewStep.propTypes = {
  values: PropTypes.shape({
    name: PropTypes.string,
    region: PropTypes.string,
    email: PropTypes.string,
    subnet: PropTypes.string,
    gateway: PropTypes.string,
  }).isRequired,
};

const steps = [
  {
    title: 'Server details',
    description: 'Name the server and choose where it will run.',
    render: () => <DetailsStep />,
  },
  {
    title: 'Network',
    description: 'Configure how the server connects to your network.',
    render: props => <NetworkStep {...props} />,
    submit: api.validateNetwork,
  },
  {
    title: 'Review & create',
    description: 'Check the configuration before creating the server.',
    render: props => <ReviewStep {...props} />,
    submit: api.createServer,
    submitLabel: 'Create server',
  },
];

// ---------------------------------------------------------------------------
// Cancellation double confirmation
// ---------------------------------------------------------------------------
const DiscardLayer = ({ onCancel, onDiscard, target }) => {
  const size = useContext(ResponsiveContext);
  const compact = ['xsmall', 'small'].includes(size);
  return (
    <Layer
      position="center"
      full={compact}
      onEsc={onCancel}
      onClickOutside={onCancel}
      target={target}
    >
      <Box pad="medium" gap="medium" width="medium">
        <Box gap="xsmall">
          <Heading level={2} margin="none">
            Discard &ldquo;{WIZARD_TITLE}&rdquo;?
          </Heading>
          <Text>Your changes will not be applied.</Text>
        </Box>
        <Footer justify="end" gap="xsmall">
          <Button label="Cancel" onClick={onCancel} />
          <Button label="Discard" primary onClick={onDiscard} />
        </Footer>
      </Box>
    </Layer>
  );
};

DiscardLayer.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  target: PropTypes.object,
};

// ---------------------------------------------------------------------------
// Wizard
// ---------------------------------------------------------------------------
export const CreateServerWizard = ({ onClose, onComplete }) => {
  const size = useContext(ResponsiveContext);
  const announce = useContext(AnnounceContext);
  const compact = ['xsmall', 'small'].includes(size);

  const [activeIndex, setActiveIndex] = useState(0);
  const [values, setValues] = useState(defaultValues);
  // client-side validation summary for the current step
  const [valid, setValid] = useState(true);
  // API errors targeted at a field, keyed by field name
  const [fieldErrors, setFieldErrors] = useState({});
  // API error that applies to the whole step
  const [stepError, setStepError] = useState();
  const [busy, setBusy] = useState(false);
  const [showDiscard, setShowDiscard] = useState(false);

  const containerRef = useRef();
  const contentRef = useRef();
  const step = steps[activeIndex];
  const formId = 'create-server-form';

  // scroll to the top of the step as the user advances
  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeIndex]);

  const resetErrors = () => {
    setValid(true);
    setFieldErrors({});
    setStepError(undefined);
  };

  const goTo = index => {
    resetErrors();
    setActiveIndex(index);
  };

  const onValidate = ({ errors, infos }) => {
    const names = [...Object.keys(errors), ...Object.keys(infos)];
    if (names.length > 0) {
      const selector = names.map(name => `[name=${name}]`).join(',');
      const firstInvalid = document.querySelectorAll(selector)[0];
      if (firstInvalid) setTimeout(() => firstInvalid.focus(), 0);
    }
    setTimeout(() => setValid(names.length === 0), 0);
  };

  // Client-side validation passed; now ask the API.
  const onSubmit = async ({ value }) => {
    setValid(true);
    if (!step.submit) {
      goTo(activeIndex + 1);
      return;
    }
    setBusy(true);
    setStepError(undefined);
    try {
      await step.submit(value);
      if (activeIndex < steps.length - 1) {
        goTo(activeIndex + 1);
      } else {
        onComplete(value);
      }
    } catch (error) {
      if (error.field) {
        // most specific target: the field the API complained about
        setFieldErrors({ [error.field]: error.message });
        announce(`${error.field}: ${error.message}`, 'assertive');
        setTimeout(
          () => document.querySelector(`[name=${error.field}]`)?.focus(),
          0,
        );
      } else {
        // nothing field-specific: show the error at step level
        setStepError(error);
        announce(`${error.title}. ${error.message}`, 'assertive');
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Layer full animation="fadeIn" onEsc={() => setShowDiscard(true)}>
      <Box fill ref={containerRef} background="background">
        <Header
          background="background-contrast"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          flex={false}
        >
          <Box direction="row" flex>
            {activeIndex > 0 && (
              <Button
                label={!compact ? steps[activeIndex - 1].title : undefined}
                a11yTitle={`Back to ${steps[activeIndex - 1].title}`}
                icon={<LinkPrev />}
                onClick={() => goTo(activeIndex - 1)}
                disabled={busy}
              />
            )}
          </Box>
          <Text color="text-strong" weight={500}>
            {WIZARD_TITLE}
          </Text>
          <Box direction="row" flex justify="end">
            <Button
              label={!compact ? 'Cancel' : undefined}
              a11yTitle="Cancel"
              icon={<Close />}
              reverse
              onClick={() => setShowDiscard(true)}
            />
          </Box>
        </Header>

        <Box
          flex
          overflow="auto"
          ref={contentRef}
          align="center"
          pad={
            compact ? 'medium' : { vertical: 'xlarge', horizontal: 'medium' }
          }
        >
          <Box width={{ width: '100%', max: 'large' }} gap="medium">
            <Box gap="3xsmall">
              <Text>
                Step {activeIndex + 1} of {steps.length}
              </Text>
              <Heading level={1} margin="none">
                {step.title}
              </Heading>
              <Paragraph size="large" margin="none">
                {step.description}
              </Paragraph>
            </Box>

            <Form
              id={formId}
              value={values}
              onChange={nextValues => {
                setValues(nextValues);
                // the user is addressing the problem; clear API errors
                if (Object.keys(fieldErrors).length) setFieldErrors({});
                if (stepError) setStepError(undefined);
              }}
              onValidate={onValidate}
              onSubmit={onSubmit}
              validate="submit"
              messages={{ required: 'This is a required field.' }}
            >
              <Box gap="medium">
                {step.render({ fieldErrors, values })}

                {/* Step-level summary of client-side validation errors */}
                {!valid && (
                  <Notification
                    status="critical"
                    message={`There is a problem with one or more fields.
                      Fix the highlighted fields to continue.`}
                  />
                )}

                {/* Step-level error returned by the API */}
                {stepError && (
                  <Notification
                    status="critical"
                    title={stepError.title}
                    message={stepError.message}
                  />
                )}
              </Box>
            </Form>
          </Box>
        </Box>

        <Box flex={false} pad={{ horizontal: 'medium' }}>
          <Footer
            border={{ side: 'top', color: 'border' }}
            justify="end"
            pad={{ vertical: 'small' }}
            alignSelf="center"
            width={{ width: '100%', max: 'large' }}
          >
            <Button
              primary
              reverse
              icon={<LinkNext />}
              label={
                step.submitLabel ||
                (activeIndex === steps.length - 1 ? 'Finish' : 'Next')
              }
              form={formId}
              type="submit"
              busy={busy}
            />
          </Footer>
        </Box>
      </Box>

      {showDiscard && (
        <DiscardLayer
          target={containerRef.current}
          onCancel={() => setShowDiscard(false)}
          onDiscard={() => {
            setShowDiscard(false);
            onClose();
          }}
        />
      )}
    </Layer>
  );
};

CreateServerWizard.propTypes = {
  onClose: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};
