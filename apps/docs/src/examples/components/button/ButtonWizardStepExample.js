import React, { useState } from 'react';
import {
  Box,
  Button,
  FormField,
  RadioButtonGroup,
  Select,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const STEPS = ['General settings', 'Configuration', 'Review'];

const REGIONS = [
  'US East',
  'US West',
  'EU Central',
  'AP Southeast',
];

const TIERS = [
  { label: 'Standard', value: 'standard' },
  { label: 'Premium', value: 'premium' },
  { label: 'Enterprise', value: 'enterprise' },
];

const defaultValues = {
  name: '',
  description: '',
  region: '',
  tier: 'standard',
};

export const ButtonWizardStepExample = () => {
  const [step, setStep] = useState(0);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const isFirst = step === 0;
  const isLast = step === STEPS.length - 1;

  const update = (field, value) =>
    setValues(prev => ({ ...prev, [field]: value }));

  const handleNext = () => {
    const next = {};
    if (step === 0 && !values.name.trim()) {
      next.name = 'Device name is required.';
    }
    if (step === 1 && !values.region) {
      next.region = 'Region is required.';
    }
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    setErrors({});
    if (isLast) setDone(true);
    else setStep(s => s + 1);
  };

  const reset = () => {
    setStep(0);
    setValues(defaultValues);
    setErrors({});
    setDone(false);
  };

  if (done) {
    return (
      <Box
        align="center"
        justify="center"
        fill
        gap="small"
      >
        <Text>{values.name} created successfully.</Text>
        <Button label="Start over" onClick={reset} />
      </Box>
    );
  }

  return (
    <Box
      border
      round="small"
      width={{ max: 'large' }}
      fill="horizontal"
      alignSelf="center"
    >
      <Box
        background="background-contrast"
        pad="small"
        border={{ side: 'bottom' }}
      >
        <Text size="small" color="text-weak">
          Step {step + 1} of {STEPS.length}
        </Text>
        <Text weight="bold">{STEPS[step]}</Text>
      </Box>
      <Box pad="medium">
        {step === 0 && (
          <Box gap="medium">
            <FormField
              label="Device name"
              htmlFor="device-name"
              name="name"
              required
              error={errors.name}
            >
              <TextInput
                id="device-name"
                name="name"
                value={values.name}
                onChange={e => update('name', e.target.value)}
                placeholder="e.g. Device-01"
              />
            </FormField>
            <FormField
              label="Description"
              htmlFor="description"
              name="description"
            >
              <TextArea
                id="description"
                name="description"
                value={values.description}
                onChange={e =>
                  update('description', e.target.value)
                }
                placeholder="Optional description"
                rows={3}
              />
            </FormField>
          </Box>
        )}
        {step === 1 && (
          <Box gap="medium">
            <FormField
              label="Region"
              htmlFor="region"
              name="region"
              required
              error={errors.region}
            >
              <Select
                id="region"
                name="region"
                options={REGIONS}
                value={values.region}
                onChange={({ option }) =>
                  update('region', option)
                }
                placeholder="Select a region"
              />
            </FormField>
            <FormField label="Tier" htmlFor="tier" name="tier">
              <RadioButtonGroup
                id="tier"
                name="tier"
                options={TIERS}
                value={values.tier}
                onChange={e =>
                  update('tier', e.target.value)
                }
              />
            </FormField>
          </Box>
        )}
        {step === 2 && (
          <Box gap="xsmall">
            <Box
              direction="row"
              justify="between"
              border={{ side: 'bottom' }}
              pad={{ vertical: 'xsmall' }}
            >
              <Text color="text-weak" size="small">
                Device name
              </Text>
              <Text>{values.name}</Text>
            </Box>
            <Box
              direction="row"
              justify="between"
              border={{ side: 'bottom' }}
              pad={{ vertical: 'xsmall' }}
            >
              <Text color="text-weak" size="small">
                Description
              </Text>
              <Text>{values.description || '\u2014'}</Text>
            </Box>
            <Box
              direction="row"
              justify="between"
              border={{ side: 'bottom' }}
              pad={{ vertical: 'xsmall' }}
            >
              <Text color="text-weak" size="small">
                Region
              </Text>
              <Text>{values.region}</Text>
            </Box>
            <Box
              direction="row"
              justify="between"
              pad={{ vertical: 'xsmall' }}
            >
              <Text color="text-weak" size="small">
                Tier
              </Text>
              <Text>{values.tier}</Text>
            </Box>
          </Box>
        )}
      </Box>
      <Box
        border={{ side: 'top' }}
        pad="medium"
        direction="row"
        justify="between"
        align="center"
      >
        <Button label="Cancel" onClick={reset} />
        <ButtonGroup>
          {!isFirst && (
            <Button
              label="Back"
              onClick={() => setStep(s => s - 1)}
            />
          )}
          <Button
            label={isLast ? 'Create device' : 'Next'}
            primary={isLast}
            onClick={handleNext}
          />
        </ButtonGroup>
      </Box>
    </Box>
  );
};
