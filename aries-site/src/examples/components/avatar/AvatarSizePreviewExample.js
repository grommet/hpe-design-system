import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text } from 'grommet';

export const AvatarSizePreviewExample = () => (
  <Box direction="row-responsive" gap="xlarge">
    <AvatarContainer
      alt="Eric Soderberg image"
      size="small"
      src="//s.gravatar.com/avatar/99020cae7ff399a4fbea19c0634f77c3?s=80"
      title="Small avatar with profile picture"
    />
    <AvatarContainer
      background="green"
      alt="Avatar containing initial letters J and S"
      title="Medium avatar with initials"
    >
      JS
    </AvatarContainer>
    <AvatarContainer
      round="xlarge"
      alt="shape logo"
      size="large"
      src="/Shape.svg"
      title="Large avatar with logo"
    />
  </Box>
);

const AvatarContainer = ({
  alt,
  background,
  children,
  round,
  size,
  src,
  title,
}) => (
  <Box direction="column" align="center" gap="xsmall" width="xsmall">
    <Avatar
      round={round}
      a11yTitle={alt}
      size={size}
      src={src}
      background={background}
      flex={false}
    >
      {children}
    </Avatar>
    <Text size="small">{title}</Text>
  </Box>
);

AvatarContainer.propTypes = {
  alt: PropTypes.string,
  background: PropTypes.string,
  children: PropTypes.node,
  round: PropTypes.string,
  size: PropTypes.string,
  src: PropTypes.string,
  title: PropTypes.string,
};
