/* eslint-disable */
import React, { useState } from 'react';
import {
  Box,
  Button,
  CheckBox,
  FormField,
  Heading,
  RadioButtonGroup,
  Select,
  SelectMultiple,
  Text,
  TextInput,
} from 'grommet';

const SOURCE_CLUSTERS = [
  'vSphere Cluster A',
  'vSphere Cluster B',
  'vSphere Cluster C',
];
const TARGET_CLUSTERS = ['Target Cluster East', 'Target Cluster West'];
const DATASTORES = [
  'SSD Datastore 01',
  'SSD Datastore 02',
  'HDD Datastore 01',
];
const VMS = [
  'web-server-01',
  'web-server-02',
  'db-primary-01',
  'db-replica-01',
  'kafka-broker-01',
  'kafka-broker-02',
];
const SCHEDULE_OPTIONS = [
  { label: 'Immediate', value: 'immediate' },
  { label: 'Scheduled', value: 'scheduled' },
];
const STEP_LABELS = [
  'Source environment',
  'Target configuration',
  'Migration options',
  'Review',
];
const TOTAL_STEPS = 4;

const StepIndicator = ({ step }) => (
  <Box direction="row" align="center">
    {STEP_LABELS.map((label, i) => {
      const n = i + 1;
      const isActive = n === step;
      const isDone = n < step;
      return (
        <React.Fragment key={n}>
          <Box direction="row" align="center" gap="xsmall" flex={false}>
            <Box
              width="28px"
              height="28px"
              round="full"
              flex={false}
              align="center"
              justify="center"
              background={
                isDone ? 'status-ok' : isActive ? 'brand' : 'background-contrast'
              }
            >
              <Text
                size="xsmall"
                weight="bold"
                color={isActive || isDone ? 'white' : 'text-weak'}
              >
                {n}
              </Text>
            </Box>
            <Text
              size="small"
              color={isActive ? 'text' : 'text-weak'}
              weight={isActive ? 'bold' : 'normal'}
            >
              {label}
            </Text>
          </Box>
          {n < TOTAL_STEPS && (
            <Box
              flex
              height="2px"
              background="border-weak"
              margin={{ horizontal: 'xsmall' }}
            />
          )}
        </React.Fragment>
      );
    })}
  </Box>
);

const ReviewRow = ({ label, value }) => (
  <Box
    direction="row"
    gap="small"
    border={{ side: 'bottom', color: 'border-weak' }}
    pad={{ vertical: 'xsmall' }}
  >
    <Text size="small" color="text-weak" width="160px" flex={false}>
      {label}
    </Text>
    <Text size="small">{value || '\u2014'}</Text>
  </Box>
);

export const WizardExample = () => {
  const [step, setStep] = useState(1);
  const [sourceCluster, setSourceCluster] = useState('');
  const [selectedVMs, setSelectedVMs] = useState([]);
  const [liveMigration, setLiveMigration] = useState(false);
  const [targetCluster, setTargetCluster] = useState('');
  const [datastore, setDatastore] = useState('');
  const [sourceNetwork, setSourceNetwork] = useState('');
  const [targetNetwork, setTargetNetwork] = useState('');
  const [schedule, setSchedule] = useState('immediate');
  const [bandwidth, setBandwidth] = useState('');
  const [retryOnFailure, setRetryOnFailure] = useState(true);

  const renderStep = () => {
    if (step === 1) {
      return (
        <Box gap="xsmall">
          <FormField name="sourceCluster" htmlFor="sourceCluster" label="Source cluster">
            <Select
              id="sourceCluster"
              name="sourceCluster"
              options={SOURCE_CLUSTERS}
              placeholder="Select cluster..."
              value={sourceCluster}
              onChange={({ value }) => setSourceCluster(value)}
            />
          </FormField>
          <FormField name="selectedVMs" htmlFor="selectedVMs" label="Virtual machines to migrate">
            <SelectMultiple
              id="selectedVMs"
              name="selectedVMs"
              options={VMS}
              placeholder="Select VMs..."
              value={selectedVMs}
              onChange={({ value }) => setSelectedVMs(value)}
            />
          </FormField>
          <FormField>
            <CheckBox
              toggle
              label="Enable live migration (zero downtime)"
              checked={liveMigration}
              onChange={e => setLiveMigration(e.target.checked)}
            />
          </FormField>
        </Box>
      );
    }

    if (step === 2) {
      return (
        <Box gap="xsmall">
          <FormField name="targetCluster" htmlFor="targetCluster" label="Target cluster">
            <Select
              id="targetCluster"
              name="targetCluster"
              options={TARGET_CLUSTERS}
              placeholder="Select cluster..."
              value={targetCluster}
              onChange={({ value }) => setTargetCluster(value)}
            />
          </FormField>
          <FormField name="datastore" htmlFor="datastore" label="Target datastore">
            <Select
              id="datastore"
              name="datastore"
              options={DATASTORES}
              placeholder="Select datastore..."
              value={datastore}
              onChange={({ value }) => setDatastore(value)}
            />
          </FormField>
          <FormField name="sourceNetwork" htmlFor="sourceNetwork" label="Source network">
            <TextInput
              id="sourceNetwork"
              name="sourceNetwork"
              placeholder="e.g. VLAN-100"
              value={sourceNetwork}
              onChange={e => setSourceNetwork(e.target.value)}
            />
          </FormField>
          <FormField name="targetNetwork" htmlFor="targetNetwork" label="Target network">
            <TextInput
              id="targetNetwork"
              name="targetNetwork"
              placeholder="e.g. VLAN-200"
              value={targetNetwork}
              onChange={e => setTargetNetwork(e.target.value)}
            />
          </FormField>
        </Box>
      );
    }

    if (step === 3) {
      return (
        <Box gap="xsmall">
          <FormField name="schedule" label="Migration schedule">
            <RadioButtonGroup
              name="schedule"
              options={SCHEDULE_OPTIONS}
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
            />
          </FormField>
          <FormField name="bandwidth" htmlFor="bandwidth" label="Max bandwidth (Mbps)">
            <TextInput
              id="bandwidth"
              name="bandwidth"
              placeholder="e.g. 500"
              value={bandwidth}
              onChange={e => setBandwidth(e.target.value)}
            />
          </FormField>
          <FormField>
            <CheckBox
              label="Retry on failure"
              checked={retryOnFailure}
              onChange={e => setRetryOnFailure(e.target.checked)}
            />
          </FormField>
        </Box>
      );
    }

    // Step 4 \u2014 Review
    return (
      <Box gap="medium">
        <Box gap="none">
          <Text size="small" weight="bold" color="text-weak" margin={{ bottom: 'xsmall' }}>SOURCE</Text>
          <ReviewRow label="Cluster" value={sourceCluster} />
          <ReviewRow label="Virtual machines" value={selectedVMs.length ? selectedVMs.join(', ') : undefined} />
          <ReviewRow label="Live migration" value={liveMigration ? 'Enabled' : 'Disabled'} />
        </Box>
        <Box gap="none">
          <Text size="small" weight="bold" color="text-weak" margin={{ bottom: 'xsmall' }}>TARGET</Text>
          <ReviewRow label="Cluster" value={targetCluster} />
          <ReviewRow label="Datastore" value={datastore} />
          <ReviewRow
            label="Network mapping"
            value={sourceNetwork && targetNetwork ? `${sourceNetwork} \u2192 ${targetNetwork}` : undefined}
          />
        </Box>
        <Box gap="none">
          <Text size="small" weight="bold" color="text-weak" margin={{ bottom: 'xsmall' }}>OPTIONS</Text>
          <ReviewRow label="Schedule" value={schedule === 'immediate' ? 'Immediate' : 'Scheduled'} />
          <ReviewRow label="Max bandwidth" value={bandwidth ? `${bandwidth} Mbps` : undefined} />
          <ReviewRow label="Retry on failure" value={retryOnFailure ? 'Enabled' : 'Disabled'} />
        </Box>
      </Box>
    );
  };

  return (
    <Box
      fill="horizontal"
      style={{ minHeight: '600px' }}
      border={{ color: 'border-default', side: 'all' }}
      round="small"
      overflow="hidden"
    >
      {/* Step indicator — pinned to top, fully inside the border */}
      <Box
        pad={{ horizontal: 'medium', top: 'medium', bottom: 'small' }}
        flex={false}
      >
        <StepIndicator step={step} />
      </Box>

      {/* Form content — centered in the remaining space */}
      <Box flex align="center" justify="center" pad={{ horizontal: 'medium', bottom: 'medium' }}>
        <Box width={{ max: 'medium' }} fill="horizontal" gap="medium">
          <Heading level={3} margin="none" size="small">
            {STEP_LABELS[step - 1]}
          </Heading>
          {renderStep()}
          <Box direction="row" justify="between" margin={{ top: 'small' }}>
            <Button label="Cancel" onClick={() => setStep(1)} />
            <Box direction="row" gap="small">
              {step > 1 && (
                <Button label="Back" onClick={() => setStep(s => s - 1)} />
              )}
              {step < TOTAL_STEPS ? (
                <Button label="Next" primary onClick={() => setStep(s => s + 1)} />
              ) : (
                <Button label="Start migration" primary />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
