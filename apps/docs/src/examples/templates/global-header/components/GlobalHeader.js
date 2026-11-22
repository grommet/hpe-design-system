// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Header, ResponsiveContext } from 'grommet';
import { AppIdentity, HeaderNav, UserContext } from '.';

// `assistant` adds the AI assistant toggle to the header's global services.
// Omit it for applications without an assistant.
/**
 * @param {{ assistant?: {
 *   id?: string, label?: string, open?: boolean,
 *   controls?: string, onToggle: () => void
 * }, onHome?: () => void }} props
 */
export const GlobalHeader = ({ assistant, onHome }) => {
  const size = useContext(ResponsiveContext);
  const { user } = useContext(UserContext);
  return (
    <Header
      align="center"
      background="background"
      justify="between"
      fill="horizontal"
      pad={{
        horizontal: !['xsmall', 'small'].includes(size) ? 'medium' : 'xsmall',
        vertical: 'xsmall',
      }}
    >
      <AppIdentity title="Service Name" />
      {user && <HeaderNav assistant={assistant} onHome={onHome} />}
    </Header>
  );
};

GlobalHeader.propTypes = {
  onHome: PropTypes.func,
  assistant: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    open: PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
    controls: PropTypes.string,
  }),
};
