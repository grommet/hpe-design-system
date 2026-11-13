// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Nav } from 'grommet';
import { Add, Chat, Down, Star, Template, Up } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import { copilotFavorites } from '../../data/copilot';
import { NavDivider, NavItem, NavSectionHeading } from './NavItem';
import { NavPanelHeader } from './NavPanelHeader';

const HISTORY_PREVIEW = 5;

// GreenLake AI "nav panel": lives in the navigation slot and holds the
// session history. Selecting a session shows it in the contextual panel.
export const CopilotNav = ({ onClose }) => {
  const { conversations, activeConversationId, dispatch } = useShell();
  const [showAll, setShowAll] = useState(false);
  const visible = showAll
    ? conversations
    : conversations.slice(0, HISTORY_PREVIEW);

  return (
    <>
      <NavPanelHeader
        title="GreenLake AI"
        onClose={onClose}
        menuItems={[
          { label: 'Manage agents' },
          { label: 'Connected MCP servers' },
          { label: 'Clear history' },
        ]}
      />
      <Box direction="row" gap="xsmall" wrap>
        <Button
          label="New chat"
          icon={<Add aria-hidden="true" />}
          primary
          size="xsmall"
          onClick={() => dispatch({ type: 'NEW_CHAT' })}
        />
        <Button
          label="Canvas"
          icon={<Add aria-hidden="true" />}
          secondary
          size="xsmall"
          onClick={() =>
            dispatch({
              type: 'SHOW_TOAST',
              title: 'New canvas',
              message:
                'Canvases open as a full-width workspace in the content area.',
            })
          }
        />
      </Box>
      <Nav gap="none" aria-label="GreenLake AI sessions">
        <NavSectionHeading label="Favorites" />
        <Box>
          {copilotFavorites.map(item => (
            <NavItem
              key={item.id}
              label={item.title}
              icon={<Star size="small" color="icon-weak" aria-hidden="true" />}
              onClick={() =>
                dispatch({
                  type: 'SEND_PROMPT',
                  prompt: item.title,
                })
              }
            />
          ))}
        </Box>
        <NavDivider />
        <NavSectionHeading label="Chats and canvases" />
        <Box>
          {visible.map(conversation => (
            <NavItem
              key={conversation.id}
              label={conversation.title}
              icon={
                conversation.kind === 'canvas' ? (
                  <Template size="small" color="icon-weak" aria-hidden="true" />
                ) : (
                  <Chat size="small" color="icon-weak" aria-hidden="true" />
                )
              }
              active={conversation.id === activeConversationId}
              onClick={() =>
                dispatch({ type: 'SELECT_CONVERSATION', id: conversation.id })
              }
            />
          ))}
        </Box>
        {conversations.length > HISTORY_PREVIEW && (
          <Button
            label={showAll ? 'Show less history' : 'Show more history'}
            icon={
              showAll ? <Up aria-hidden="true" /> : <Down aria-hidden="true" />
            }
            reverse
            size="small"
            alignSelf="start"
            onClick={() => setShowAll(!showAll)}
          />
        )}
      </Nav>
    </>
  );
};

CopilotNav.propTypes = {
  onClose: PropTypes.func,
};
