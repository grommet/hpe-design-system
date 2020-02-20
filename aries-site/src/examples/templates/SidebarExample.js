import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import {
  Apps,
  Chat,
  Clock,
  Configure,
  Terminal,
  ShieldSecurity,
  StatusUnknown,
} from 'grommet-icons';

export const SidebarExample = ({ direction, mobile, ...rest }) => {
  // placeholder for responsive context
  const size = mobile && 'small';
  return (
    <Box
      direction={direction}
      background="blue"
      align="center"
      pad={{ horizontal: 'small', vertical: 'medium' }}
      {...rest}
    >
      <Box
        height="xxsmall"
        width="xxsmall"
        round="full"
        margin={size !== 'small' ? { right: 'small' } : { bottom: 'medium' }}
        // eslint-disable-next-line max-len
        background="url(//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80)"
      />

      <Box flex="grow" direction={direction}>
        <Button icon={<Clock color="text-xweak" />} />
        <Button icon={<Apps color="text-xweak" />} />
        <Button icon={<Terminal color="text-xweak" />} />
        <Button icon={<ShieldSecurity color="text-xweak" />} />
        <Button icon={<Configure color="text-xweak" />} />
      </Box>

      <Box direction={direction}>
        <Button icon={<Chat color="text-xweak" />} />
        <Button icon={<StatusUnknown color="text-xweak" />} />
      </Box>
    </Box>
  );
};

SidebarExample.propTypes = {
  direction: PropTypes.string,
  mobile: PropTypes.bool,
};
