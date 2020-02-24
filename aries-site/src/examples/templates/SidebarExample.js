import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ResponsiveContext } from 'grommet';
import {
  Apps,
  Chat,
  Clock,
  Configure,
  Terminal,
  ShieldSecurity,
  StatusUnknown,
} from 'grommet-icons';

export const SidebarExample = ({ direction, ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      background="blue"
      direction={direction}
      pad={{
        horizontal: size !== 'small' ? 'small' : 'medium',
        vertical: size !== 'small' ? 'medium' : 'small',
      }}
      {...rest}
    >
      {size !== 'small' && (
        <Box
          height="xxsmall"
          width="xxsmall"
          round="full"
          margin={{ bottom: 'medium' }}
          // eslint-disable-next-line max-len
          background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
        />
      )}
      <Box
        flex="grow"
        direction={direction}
        justify={size === 'small' ? 'between' : undefined}
      >
        <Button icon={<Clock color="text-xweak" />} />
        <Button icon={<Apps color="text-xweak" />} />
        <Button icon={<Terminal color="text-xweak" />} />
        <Button icon={<ShieldSecurity color="text-xweak" />} />
        <Button icon={<Configure color="text-xweak" />} />
      </Box>

      {size !== 'small' && (
        <Box direction={direction}>
          <Button icon={<Chat color="text-xweak" />} />
          <Button icon={<StatusUnknown color="text-xweak" />} />
        </Box>
      )}
    </Box>
  );
};

SidebarExample.propTypes = {
  direction: PropTypes.string,
  mobile: PropTypes.bool,
};
