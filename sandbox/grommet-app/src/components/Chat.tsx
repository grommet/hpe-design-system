import React, { useContext } from 'react';
import { Box, Button, Spinner, Text, TextArea } from 'grommet';
import {
  Add,
  Close,
  Configure,
  Expand,
  GenAIFill,
  History,
  Microphone,
  NewWindow,
} from 'grommet-icons';
import { SupportingContext } from '../contexts/SupportingContext';

const UserMessage = ({ message }) => (
  <Box alignSelf="end" background="background-front" round="small" pad="small">
    <Text>{message}</Text>
  </Box>
);

const ResponseMessage = ({ message }) => (
  <Box alignSelf="start">
    <Text>{message}</Text>
  </Box>
);

const Solution = ({ title, description, count = 1 }) => (
  <Box gap="xsmall">
    <Text size="xsmall">Solution {count}</Text>
    <Box
      alignSelf="start"
      background="background-info"
      round="small"
      pad="small"
    >
      <Text weight={500} color="text-strong" size="small">
        {title}
      </Text>
      <Text size="small">{description}</Text>
    </Box>
  </Box>
);

const AgentWorking = () => (
  <Box
    alignSelf="start"
    align="center"
    direction="row"
    gap="small"
    round
    pad={{ vertical: 'small', horizontal: 'medium' }}
    background="background-info"
    flex={false}
  >
    <Text weight={500} color="text-strong">
      Agents working...
    </Text>
    <Spinner size="small" color="icon-info" />
  </Box>
);
export const Chat = () => {
  const { setShowSupporting } = useContext(SupportingContext);

  return (
    <Box
      background="background-back"
      width="medium"
      flex={false}
      fill="vertical"
    >
      <Box
        direction="row"
        justify="between"
        pad={{ start: 'medium', vertical: 'small', end: 'xsmall' }}
        flex={false}
      >
        <Box direction="row" align="center" gap="small">
          <GenAIFill />
          <Text size="large" weight={500} color="text-strong">
            GreenLake Intelligence
          </Text>
        </Box>
        <Box direction="row" align="center">
          <Button icon={<History />} />
          <Button icon={<Expand />} />
          <Button icon={<Close />} onClick={() => setShowSupporting(false)} />
        </Box>
      </Box>
      <Box
        overflow={{ vertical: 'scroll' }}
        pad={{ horizontal: 'small' }}
        gap="medium"
        flex
      >
        <UserMessage message="Can you move the workload to an HPE VM on my Houston site? Can you give me a couple solutions that will scale to accommodate more headroom?" />
        <ResponseMessage message="I can get that started for you. Let's take a look at what I've pulled together before we get started..." />
        <Solution
          title="Business critical"
          description="More headroom for AI intensive tasks, increased vCPU and vGPU, better memory allocation, and expanded attached storage capacity for consistent uptime."
        />
        <Solution
          title="Cost optimized"
          description="Aligned performance of the HPE VM to the AWS EC2 instance characteristics and made some modifications to the workload to thin some of the backups."
          count={2}
        />
        <ResponseMessage message="Do these options resonate? Let me know if you have other areas you want me to explore in the migration." />
        <AgentWorking />
      </Box>
      <Box flex={false} pad="small">
        <Box
          background="background-front"
          round="small"
          pad="xsmall"
          elevation="small"
        >
          <TextArea
            plain
            resize={false}
            placeholder="Ask GreenLake how to move workloads to private cloud"
          />
          <Box direction="row" justify="between">
            <Button icon={<Add />} />
            <Box direction="row">
              <Button icon={<NewWindow />} />
              <Button icon={<Configure />} />
              <Button icon={<Microphone />} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
