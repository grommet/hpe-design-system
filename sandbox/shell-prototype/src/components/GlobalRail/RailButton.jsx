// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, DropButton, Tip } from 'grommet';

// Rail icons use the largest regular icon token so the rail reads as the
// primary way around the platform; with 8px padding tiles are 36px, the
// same as the medium avatar at the bottom of the rail.
export const RAIL_ICON_SIZE = 'xlarge';

// Rounded-square target shared by every rail entry.
export const RailTarget = ({ active, hover, elevated, children }) => (
  <Box
    pad="xxsmall"
    round="medium"
    flex={false}
    background={
      (elevated && 'shell-page') ||
      (active && 'background-contrast') ||
      (hover && 'background-hover') ||
      undefined
    }
    elevation={elevated ? 'small' : undefined}
  >
    {children}
  </Box>
);

RailTarget.propTypes = {
  active: PropTypes.bool,
  hover: PropTypes.bool,
  elevated: PropTypes.bool,
  children: PropTypes.node,
};

const withTip = (tip, element) =>
  tip ? (
    <Tip content={tip} dropProps={{ align: { left: 'right' } }}>
      {element}
    </Tip>
  ) : (
    element
  );

export const RailButton = forwardRef(
  ({ icon, label, tip = label, active, elevated, disabled, onClick }, ref) =>
    withTip(
      tip,
      <Button
        ref={ref}
        plain
        a11yTitle={label}
        aria-pressed={active}
        disabled={disabled}
        onClick={onClick}
      >
        {({ hover }) => (
          <RailTarget
            active={active}
            hover={hover && !disabled}
            elevated={elevated}
          >
            {icon}
          </RailTarget>
        )}
      </Button>,
    ),
);

RailButton.displayName = 'RailButton';
RailButton.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  tip: PropTypes.string,
  active: PropTypes.bool,
  elevated: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

// Rail entry that opens a popover (help, notifications, account). `badge`
// is passed straight to Grommet's Button badge so the theme positions it.
export const RailDropButton = ({
  badge,
  icon,
  label,
  dropContent,
  tip = label,
}) => {
  const [open, setOpen] = useState(false);
  return withTip(
    open ? undefined : tip,
    <DropButton
      plain
      a11yTitle={label}
      badge={badge}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      dropAlign={{ bottom: 'bottom', left: 'right' }}
      dropProps={{ margin: { left: 'xsmall' }, round: 'small' }}
      dropContent={dropContent}
    >
      {({ hover }) => (
        <RailTarget active={open} hover={hover}>
          {icon}
        </RailTarget>
      )}
    </DropButton>,
  );
};

RailDropButton.propTypes = {
  badge: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.number,
    PropTypes.object,
  ]),
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  tip: PropTypes.string,
  dropContent: PropTypes.node.isRequired,
};

export const RailDivider = () => (
  <Box
    flex={false}
    width="100%"
    border={{ side: 'top', color: 'border-weak' }}
    margin={{ vertical: '4xsmall' }}
  />
);
