/* eslint-disable */
import React, { useState } from 'react';
import {
  Anchor,
  Box,
  Button,
  CheckBox,
  FormField,
  Heading,
  PageHeader,
  RadioButtonGroup,
  Select,
  Tab,
  Tabs,
  Text,
  TextInput,
  ToggleGroup,
} from 'grommet';

const CPU_CORE_OPTIONS = [
  { label: '4 Core', value: '4' },
  { label: '16 Cores', value: '16' },
  { label: '32 Cores', value: '32' },
  { label: '48 Cores', value: '48' },
  { label: '64 Cores', value: '64' },
];

const ARCH_OPTIONS = ['x86_64 (Intel/AMD)', 'ARM (Ampere)'];

const MESSAGES = [
  {
    role: 'assistant',
    text: 'Adjusting your CPU configuration, particularly the number of cores, can enhance performance. Would you like assistance with this?',
  },
  {
    role: 'user',
    text: 'Yes please. Could you recommend the core count and CPU architecture?',
  },
  {
    role: 'assistant',
    text: 'To suggest the right number of cores and best architecture, could you share more about your workloads? Are these primarily hypervisors (VMware/Hyper-V), container orchestration (Kubernetes), databases, analytics, or HPC? Do you have a budget range and any licensing considerations?',
  },
  {
    role: 'user',
    text: 'Primary workload is VMware vSphere hosting mixed Linux/Windows VMs, some line-of-business apps, a couple of medium SQL Server instances, and a small Kafka cluster. Prefer 2 sockets for resiliency.',
  },
  {
    role: 'assistant',
    text: "Got it. For dual-socket hosts running mixed virtualization and moderate DB workloads, I'd suggest:\n\nArchitecture: x86_64 (Intel Xeon or AMD EPYC). EPYC offers strong memory bandwidth and high core density\u2014good for consolidation and Kafka.\n\nCores per socket: Aim for 24\u201332 cores/socket.",
  },
];

const NavIcon = ({ active }) => (
  <Box
    width="36px"
    height="36px"
    round="xsmall"
    align="center"
    justify="center"
    background={active ? 'background-contrast' : undefined}
  >
    <Box
      width="18px"
      height="18px"
      round="xxsmall"
      border={{ color: 'border', side: 'all' }}
    />
  </Box>
);

const LeftNav = () => (
  <Box
    width="52px"
    flex={false}
    background="background-back"
    round="small"
    pad={{ vertical: 'small', horizontal: 'xsmall' }}
    gap="xsmall"
    align="center"
  >
    <Box
      width="36px"
      height="36px"
      round="xsmall"
      align="center"
      justify="center"
      gap="3px"
      pad="xsmall"
    >
      <Box width="18px" height="2px" background="text-weak" />
      <Box width="18px" height="2px" background="text-weak" />
      <Box width="18px" height="2px" background="text-weak" />
    </Box>
    <Box
      width="32px"
      height="1px"
      background="border-weak"
      margin={{ vertical: 'xsmall' }}
    />
    <NavIcon />
    <NavIcon active />
    <NavIcon />
    <NavIcon />
    <NavIcon />
    <NavIcon />
    <NavIcon />
  </Box>
);

const ChatMessage = ({ role, text }) => (
  <Box align={role === 'user' ? 'end' : 'start'} pad={{ horizontal: 'small' }}>
    <Box
      background={role === 'user' ? 'background-default' : undefined}
      pad={role === 'user' ? { horizontal: 'small', vertical: 'xsmall' } : undefined}
      round={role === 'user' ? 'small' : undefined}
      width={{ max: '88%' }}
    >
      <Text size="small">{text}</Text>
    </Box>
  </Box>
);

const CopilotPanel = () => (
  <Box
    width="300px"
    flex={false}
    background="background-back"
    round="small"
    style={{ minHeight: '540px' }}
  >
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'medium', vertical: 'small' }}
      border={{ color: 'border-weak', side: 'bottom' }}
      flex={false}
    >
      <Text weight="bold" size="small">
        ✦ GreenLake Copilot
      </Text>
      <Button plain label="&times;" />
    </Box>
    <Box flex overflow="auto" gap="small" pad={{ vertical: 'small' }}>
      {MESSAGES.map((msg, i) => (
        <ChatMessage key={i} role={msg.role} text={msg.text} />
      ))}
    </Box>
    <Box
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      border={{ color: 'border-weak', side: 'top' }}
      flex={false}
    >
      <TextInput plain placeholder="Ask anything about HPE GreenLake..." />
    </Box>
  </Box>
);

export const InstanceConfigExample = () => {
  const [cores, setCores] = useState('16');
  const [arch, setArch] = useState('x86_64 (Intel/AMD)');
  const [perfTier, setPerfTier] = useState('Standard');
  const [memory, setMemory] = useState('8');
  const [autoScaling, setAutoScaling] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Box
      direction="row"
      border={{ color: 'border', side: 'all' }}
      round="small"
      pad="small"
      gap="small"
      style={{ minHeight: '600px' }}
    >
      <LeftNav />

      {/* Main content */}
      <Box flex overflow="auto">
        <Box pad={{ top: 'small', horizontal: 'xsmall' }}>
          <PageHeader
            title="Instances"
            subtitle="Production web server 01"
            parent={<Anchor label="&#8249; Resources" />}
            actions={
              <Box direction="row" gap="xsmall">
                <Button label="Cancel" />
                <Button label="Save configuration" primary />
              </Box>
            }
          />
        </Box>

        <Tabs activeIndex={activeTab} onActive={setActiveTab}>
          <Tab title="General settings">
            <Box pad="medium">
              <Text color="text-weak" size="small">General settings content</Text>
            </Box>
          </Tab>

          <Tab title="Compute and RAM">
            <Box pad="small" gap="small">
              {/* CPU Configuration */}
              <Box background="background-back" pad="medium" round="small" gap="small">
                <Heading level={3} margin="none" size="small">
                  CPU configuration
                </Heading>
                <FormField name="cores" label="Virtual CPUs (vCPUs)">
                  <RadioButtonGroup
                    name="cores"
                    options={CPU_CORE_OPTIONS}
                    value={cores}
                    onChange={e => setCores(e.target.value)}
                  />
                </FormField>
                <Box direction="row" gap="medium" wrap align="start">
                  <Box width={{ min: '200px', max: 'medium' }} flex>
                    <FormField name="arch" htmlFor="arch" label="CPU Architecture*">
                      <Select
                        id="arch"
                        name="arch"
                        options={ARCH_OPTIONS}
                        value={arch}
                        onChange={({ value }) => setArch(value)}
                      />
                    </FormField>
                  </Box>
                  <Box gap="xsmall">
                    <Text size="small" weight="bold">Performance tier</Text>
                    <ToggleGroup
                      options={['Standard', 'Premium']}
                      value={perfTier}
                      onToggle={({ value }) => setPerfTier(value)}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Memory */}
              <Box background="background-back" pad="medium" round="small" gap="small">
                <Heading level={3} margin="none" size="small">
                  Memory (RAM)
                </Heading>
                <Box width={{ max: 'small' }}>
                  <FormField
                    name="memory"
                    htmlFor="memory"
                    label="Label"
                    help="Minimum recommended: 2gb"
                  >
                    <TextInput
                      id="memory"
                      name="memory"
                      value={memory}
                      onChange={e => setMemory(e.target.value)}
                    />
                  </FormField>
                </Box>
                <FormField>
                  <CheckBox
                    toggle
                    label="Enable auto-scaling"
                    checked={autoScaling}
                    onChange={e => setAutoScaling(e.target.checked)}
                  />
                </FormField>
              </Box>
            </Box>
          </Tab>

          <Tab title="Storage disks">
            <Box pad="medium">
              <Text color="text-weak" size="small">Storage disks content</Text>
            </Box>
          </Tab>
          <Tab title="Networking">
            <Box pad="medium">
              <Text color="text-weak" size="small">Networking content</Text>
            </Box>
          </Tab>
          <Tab title="Security policies">
            <Box pad="medium">
              <Text color="text-weak" size="small">Security policies content</Text>
            </Box>
          </Tab>
        </Tabs>
      </Box>

      <CopilotPanel />
    </Box>
  );
};
