// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext, useMemo, useState } from 'react';
import type { ComponentProps, ReactNode } from 'react';
import styled from 'styled-components';
import {
  Box,
  Button,
  Header,
  Menu,
  Paragraph,
  Text,
  TextArea,
  type ThemeType,
} from 'grommet';
import { Add, Close, Down, More, Send } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';

type CopilotPanelContextValue = {
  raisedBackground?: string;
};

// Lets transcript content (bubbles, cards) pick up the panel's raised
// surface without each message needing to be told.
const CopilotPanelContext = createContext<CopilotPanelContextValue>({
  raisedBackground: undefined,
});

export const useCopilotPanel = () => useContext(CopilotPanelContext);

// Match the focus indicator's rounding to the prompt's container.
type RadiusTheme = ThemeType & { global: { radius: Record<string, string> } };

const PromptButton = styled(Button)`
  border-radius: ${({ theme }) => (theme as RadiusTheme).global.radius.xsmall};
`;

type FollowUpPromptProps = {
  label: string;
  onClick?: () => void;
};

// A suggested follow-up that fills the composer, ready to send.
const FollowUpPrompt = ({ label, onClick }: FollowUpPromptProps) => (
  <PromptButton plain hoverIndicator onClick={onClick} alignSelf="start">
    <Box
      border={{ color: 'border' }}
      round="xsmall"
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
    >
      <Text>{label}</Text>
    </Box>
  </PromptButton>
);

type MessageProps = {
  children: ReactNode;
};

// Message authored by the user, shown as a bubble aligned to the end.
export const UserMessage = ({ children }: MessageProps) => {
  const { raisedBackground } = useCopilotPanel();
  return (
    <Box pad={{ left: 'medium' }}>
      <Box
        alignSelf="end"
        background={raisedBackground}
        round="medium"
        pad="xsmall"
      >
        <Paragraph margin="none">{children}</Paragraph>
      </Box>
    </Box>
  );
};

// Reply from the assistant. Flows as plain text with room on the end for
// the user's bubbles to sit against; rich content such as cards is passed
// as further children.
export const AssistantMessage = ({ children }: MessageProps) => (
  <Box pad={{ right: 'medium' }} gap="small">
    {children}
  </Box>
);

type ComposerProps = {
  draft: string;
  onDraftChange: (draft: string) => void;
  placeholder?: string;
  productName: string;
};

const Composer = ({
  draft,
  onDraftChange,
  placeholder,
  productName,
}: ComposerProps) => {
  const { raisedBackground } = useCopilotPanel();
  return (
    <Box
      background={raisedBackground}
      border={{ color: 'border-weak' }}
      round="small"
      pad="xsmall"
      gap="xsmall"
    >
      <TextArea
        a11yTitle={`Ask ${productName}`}
        placeholder={placeholder}
        plain
        resize={false}
        rows={1}
        value={draft}
        onChange={event => onDraftChange(event.target.value)}
      />
      <Box direction="row" align="center" justify="between" gap="xsmall">
        <Box direction="row" align="center" gap="3xsmall">
          <Button icon={<Add />} size="small" a11yTitle="Add attachment" />
          <Button
            label="Act"
            icon={<Down aria-hidden="true" />}
            reverse
            size="small"
          />
        </Box>
        <Button
          icon={<Send />}
          primary
          size="small"
          a11yTitle="Send"
          disabled={!draft.trim()}
        />
      </Box>
    </Box>
  );
};

type CopilotPanelProps = Omit<
  ComponentProps<typeof Box>,
  'background' | 'children' | 'title'
> & {
  background?: string;
  children?: ReactNode;
  disclaimer?: string;
  onClose: () => void;
  onPrompt?: (prompt: string) => void;
  placeholder?: string;
  prompts?: string[];
  raisedBackground?: string;
  title: string;
};

// Context pane for the AI assistant: a titled header, a scrolling
// transcript, optional follow-up prompts, and a composer pinned to the end.
// `background` is the pane surface; `raisedBackground` is used for anything
// sitting on it, such as the user's bubbles and the composer.
export const CopilotPanel = ({
  background = 'background-front',
  children,
  disclaimer,
  onClose,
  onPrompt,
  placeholder = 'Ask anything…',
  prompts = [],
  raisedBackground = 'background-back',
  title,
  ...rest
}: CopilotPanelProps) => {
  const [draft, setDraft] = useState('');
  const contextValue = useMemo(
    () => ({ raisedBackground }),
    [raisedBackground],
  );
  return (
    <CopilotPanelContext.Provider value={contextValue}>
      <Box
        as="aside"
        aria-label={title}
        background={background}
        round="large"
        fill="vertical"
        overflow="hidden"
        {...rest}
      >
        <Header
          pad={{ horizontal: '3xsmall', vertical: 'xxsmall' }}
          gap="xsmall"
          flex={false}
        >
          <Menu
            icon={<More />}
            a11yTitle={`${title} options`}
            dropAlign={{ top: 'bottom', left: 'left' }}
            items={[
              { label: 'New conversation' },
              { label: 'Conversation history' },
              { label: 'Clear conversation' },
            ]}
          />
          <TextEmphasis truncate>{title}</TextEmphasis>
          <Button
            icon={<Close />}
            a11yTitle={`Close ${title}`}
            onClick={onClose}
          />
        </Header>
        <Box
          flex
          overflow="auto"
          pad={{ horizontal: 'medium', bottom: 'small' }}
        >
          <Box gap="medium" flex={false}>
            <Box role="log" aria-label="Conversation">
              {children}
            </Box>
            {prompts.length > 0 && (
              <Box gap="xxsmall" flex={false}>
                {prompts.map(prompt => (
                  <FollowUpPrompt
                    key={prompt}
                    label={prompt}
                    onClick={() => {
                      setDraft(prompt);
                      onPrompt?.(prompt);
                    }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box pad="small" gap="xsmall" flex={false}>
          <Composer
            draft={draft}
            onDraftChange={setDraft}
            placeholder={placeholder}
            productName={title}
          />
          {disclaimer && (
            <Text size="xsmall" textAlign="center">
              {disclaimer}
            </Text>
          )}
        </Box>
      </Box>
    </CopilotPanelContext.Provider>
  );
};
