// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Collapsible,
  Heading,
  Menu,
  Tag,
  Text,
  TextArea,
  ToggleGroup,
} from 'grommet';
import {
  AIGen,
  Add,
  Ascending as ArrowUp,
  Close,
  Contract,
  Down,
  Expand,
  Microphone,
  More,
  Robot,
  Up,
  User,
} from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { copilotSuggestions, user } from '../../data/copilot';

const SuggestionCard = ({ suggestion, onPrompt }) => {
  const [open, setOpen] = useState(false);
  const Icon = suggestion.icon;
  return (
    <Box background="shell-card" round="medium" flex={false}>
      <Button plain onClick={() => setOpen(!open)} aria-expanded={open}>
        <Box
          direction="row"
          align="center"
          justify="between"
          gap="small"
          pad="small"
        >
          <Box direction="row" gap="small" align="start">
            <Box flex={false} pad={{ top: '5xsmall' }}>
              <Icon aria-hidden="true" />
            </Box>
            <Box>
              <Text weight={500} color="text-strong" size="small">
                {suggestion.title}
              </Text>
              <Text size="xsmall" color="text-weak">
                {suggestion.description}
              </Text>
            </Box>
          </Box>
          {open ? (
            <Up size="small" aria-hidden="true" />
          ) : (
            <Down size="small" aria-hidden="true" />
          )}
        </Box>
      </Button>
      <Collapsible open={open}>
        <Box
          pad={{ horizontal: 'small', bottom: 'small' }}
          gap="xsmall"
          align="start"
        >
          {suggestion.prompts.map(prompt => (
            <Button
              key={prompt}
              label={prompt}
              size="small"
              secondary
              onClick={() => onPrompt(prompt)}
            />
          ))}
        </Box>
      </Collapsible>
    </Box>
  );
};

SuggestionCard.propTypes = {
  suggestion: PropTypes.shape({
    icon: PropTypes.elementType,
    title: PropTypes.string,
    description: PropTypes.string,
    prompts: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onPrompt: PropTypes.func.isRequired,
};

const Welcome = ({ onPrompt }) => (
  <Box gap="medium" flex={false}>
    <Box gap="xsmall">
      <Heading level={2} size="small" margin="none">
        Hello, {user.firstName}!
        <br />
        How can I help you today?
      </Heading>
      <Text size="small">
        Start with a suggested prompt or ask me anything related to GreenLake.
      </Text>
    </Box>
    <Box gap="small">
      {copilotSuggestions.map(suggestion => (
        <SuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onPrompt={onPrompt}
        />
      ))}
    </Box>
  </Box>
);

Welcome.propTypes = {
  onPrompt: PropTypes.func.isRequired,
};

const Message = ({ message }) => {
  if (message.action) {
    return (
      <Button label={message.text} secondary size="small" alignSelf="start" />
    );
  }
  if (message.role === 'user') {
    return (
      <Box
        alignSelf="end"
        background="shell-card"
        round="medium"
        pad={{ horizontal: 'small', vertical: 'xsmall' }}
        width={{ max: '85%' }}
        flex={false}
      >
        <Text size="small" color="text-strong">
          {message.text}
        </Text>
      </Box>
    );
  }
  return (
    <Box alignSelf="start" flex={false} direction="row" gap="small">
      <Box flex={false} pad={{ top: '5xsmall' }}>
        <AIGen size="small" color="brand" aria-hidden="true" />
      </Box>
      <Text size="small">{message.text}</Text>
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string,
    text: PropTypes.string,
    action: PropTypes.bool,
  }).isRequired,
};

const Conversation = ({ conversation }) => {
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [conversation.messages.length]);
  return (
    <Box gap="medium" flex={false}>
      <Text size="xsmall" color="text-weak" alignSelf="center">
        {conversation.when}
      </Text>
      {conversation.messages.map((message, index) => (
        <Message key={`${conversation.id}-${index}`} message={message} />
      ))}
      <Box ref={endRef} />
    </Box>
  );
};

Conversation.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.string,
    when: PropTypes.string,
    messages: PropTypes.array,
  }).isRequired,
};

const agents = [
  { name: 'GLI Orchestrator', detail: 'Coordinating · 2 tasks', icon: Robot },
  { name: 'A2A Planning Agent', detail: 'Idle', icon: Robot },
  { name: 'Human request', detail: 'Speaking with agent', icon: User },
];

const CoWork = () => (
  <Box gap="small" flex={false}>
    <Text size="small">
      Co-work lets GreenLake AI agents carry out multi-step tasks in your
      workspace while you watch and approve each step.
    </Text>
    {agents.map(agent => {
      const Icon = agent.icon;
      return (
        <Box
          key={agent.name}
          direction="row"
          gap="small"
          align="center"
          background="shell-card"
          round="medium"
          pad="small"
        >
          <Icon aria-hidden="true" />
          <Box>
            <Text size="small" weight={500} color="text-strong">
              {agent.name}
            </Text>
            <Text size="xsmall" color="text-weak">
              {agent.detail}
            </Text>
          </Box>
        </Box>
      );
    })}
  </Box>
);

const Composer = ({ onSend }) => {
  const [value, setValue] = useState('');
  const submit = () => {
    const prompt = value.trim();
    if (!prompt) return;
    onSend(prompt);
    setValue('');
  };
  return (
    <Box flex={false} gap="xsmall">
      <Box
        border={{ color: 'border-weak' }}
        round="medium"
        pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
        background="shell-page"
      >
        <TextArea
          plain
          resize={false}
          rows={1}
          size="small"
          placeholder="Ask GreenLake AI"
          a11yTitle="Ask GreenLake AI"
          value={value}
          onChange={event => setValue(event.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
        <Box direction="row" justify="between" align="center">
          <Button
            icon={<Add aria-hidden="true" />}
            a11yTitle="Attach context"
            tip="Attach"
            size="small"
          />
          <Box direction="row" gap="3xsmall" align="center">
            <Button
              icon={<Microphone aria-hidden="true" />}
              a11yTitle="Voice input"
              tip="Voice"
              size="small"
            />
            <Button
              icon={<ArrowUp aria-hidden="true" />}
              a11yTitle="Send"
              primary
              size="small"
              onClick={submit}
            />
          </Box>
        </Box>
      </Box>
      <Text size="xsmall" color="text-weak" textAlign="center">
        This content is AI generated. Double-check and share any feedback on
        inconsistencies.
      </Text>
    </Box>
  );
};

Composer.propTypes = {
  onSend: PropTypes.func.isRequired,
};

// GreenLake AI conversation, shown in the contextual panel. Transient and
// dismissible; the page works without it.
// `fullscreen` renders the same conversation in the primary content area,
// centred and capped at a readable width, with controls to return it to
// the panel.
export const CopilotPanel = ({ fullscreen = false }) => {
  const { copilotMode, activeConversation, dispatch } = useShell();
  const send = prompt => dispatch({ type: 'SEND_PROMPT', prompt });
  const toggleFullscreen = () =>
    dispatch({ type: 'TOGGLE_COPILOT_FULLSCREEN' });

  return (
    <Box
      fill
      width={fullscreen ? { max: 'xlarge' } : undefined}
      alignSelf={fullscreen ? 'center' : undefined}
      pad={fullscreen ? { vertical: 'small' } : undefined}
    >
      <Box
        direction="row"
        justify="between"
        align="center"
        pad={{ left: 'medium', right: 'small', vertical: 'small' }}
        flex={false}
      >
        <Box direction="row" gap="xsmall" align="center">
          <AIGen aria-hidden="true" />
          <Text weight={500} color="text-strong">
            GreenLake AI
          </Text>
          <Tag
            value="Beta"
            size="xsmall"
            background="background-accent-cyan-weak"
            border={false}
          />
        </Box>
        <Box direction="row">
          <Menu
            icon={<More aria-hidden="true" />}
            a11yTitle="GreenLake AI options"
            dropAlign={{ top: 'bottom', right: 'right' }}
            items={[
              {
                label: 'New chat',
                onClick: () => dispatch({ type: 'NEW_CHAT' }),
              },
              {
                label: fullscreen ? 'Exit full screen' : 'Open in full screen',
                onClick: toggleFullscreen,
              },
              { label: 'Settings' },
            ]}
          />
          <Button
            icon={
              fullscreen ? (
                <Contract aria-hidden="true" />
              ) : (
                <Expand aria-hidden="true" />
              )
            }
            a11yTitle={fullscreen ? 'Exit full screen' : 'Open in full screen'}
            tip={fullscreen ? 'Exit full screen' : 'Full screen'}
            onClick={toggleFullscreen}
          />
          <Button
            icon={<Close aria-hidden="true" />}
            a11yTitle="Close GreenLake AI"
            onClick={() => dispatch({ type: 'CLOSE_COPILOT' })}
          />
        </Box>
      </Box>
      <Box pad={{ horizontal: 'medium' }} flex={false}>
        <ToggleGroup
          a11yTitle="GreenLake AI mode"
          options={[
            { label: 'Chat', value: 'chat' },
            { label: 'Co-work', value: 'cowork' },
          ]}
          value={copilotMode}
          onToggle={({ value }) =>
            value && dispatch({ type: 'SET_COPILOT_MODE', mode: value })
          }
          justify="stretch"
        />
      </Box>
      <Box flex overflow={{ vertical: 'auto' }} pad="medium">
        {copilotMode === 'cowork' ? (
          <CoWork />
        ) : activeConversation ? (
          <Conversation conversation={activeConversation} />
        ) : (
          <Welcome onPrompt={send} />
        )}
      </Box>
      <Box pad={{ horizontal: 'medium', bottom: 'medium' }} flex={false}>
        <Composer onSend={send} />
      </Box>
    </Box>
  );
};

CopilotPanel.propTypes = {
  fullscreen: PropTypes.bool,
};
