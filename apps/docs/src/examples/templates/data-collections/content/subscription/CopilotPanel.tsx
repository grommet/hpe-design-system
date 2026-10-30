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
import { Add, Close, More, Send } from '@hpe-design/icons-grommet';
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

type ComposerAction = { label: string };

// Match the focus indicator's rounding to the prompt's container.
type RadiusTheme = ThemeType & { global: { radius: Record<string, string> } };

// Match the focus indicator's rounding to the prompt's container.
const PromptButton = styled(Button)`
  border-radius: ${({ theme }) => (theme as RadiusTheme).global.radius.xsmall};
`;

type FollowUpPromptProps = {
  label: string;
  onClick?: () => void;
};

// A suggested follow-up the user can send with one click.
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
  actions?: ComposerAction[];
  placeholder?: string;
  productName: string;
};

// Where the user types the next prompt. The Act menu offers the
// assistant's ready-made tasks for this page.
const Composer = ({ actions, placeholder, productName }: ComposerProps) => {
  const { raisedBackground } = useCopilotPanel();
  const [draft, setDraft] = useState('');
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
        onChange={event => setDraft(event.target.value)}
      />
      <Box direction="row" align="center" justify="between" gap="xsmall">
        <Box direction="row" align="center" gap="3xsmall">
          <Button icon={<Add />} size="small" a11yTitle="Add attachment" />
          <Menu
            label="Act"
            a11yTitle="Act"
            size="small"
            items={actions ?? []}
            dropAlign={{ bottom: 'top', left: 'left' }}
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
  composerActions?: ComposerAction[];
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
  composerActions,
  disclaimer,
  onClose,
  onPrompt,
  placeholder = 'Ask anything…',
  prompts = [],
  raisedBackground = 'background-back',
  title,
  ...rest
}: CopilotPanelProps) => {
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
          {/* The pane's medium padding exceeds the small gap between
              messages; the follow-up prompts sit a step further away. */}
          <Box gap="medium" flex={false}>
            <Box role="log" aria-label="Conversation" gap="small">
              {children}
            </Box>
            {prompts.length > 0 && (
              <Box gap="xxsmall" flex={false}>
                {prompts.map(prompt => (
                  <FollowUpPrompt
                    key={prompt}
                    label={prompt}
                    onClick={onPrompt && (() => onPrompt(prompt))}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>
        <Box pad="small" gap="xsmall" flex={false}>
          <Composer
            actions={composerActions}
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
