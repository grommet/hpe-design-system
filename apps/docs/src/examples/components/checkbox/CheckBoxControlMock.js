import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

const CheckBoxControl = styled(Box)`
  ${({ theme }) =>
    theme.checkBox.check.extend({
      theme,
      checked: true,
      indeterminate: false,
      disabled: false,
    })}
  width: ${({ theme }) => theme.checkBox.size};
  height: ${({ theme }) => theme.checkBox.size};
`;

const CheckmarkIcon = styled.svg`
  width: ${({ theme }) => theme.checkBox.icon?.size};
  height: ${({ theme }) => theme.checkBox.icon?.size};
  & path {
    fill: none;
    stroke-width: ${({ theme }) => theme.checkBox.check.thickness};
  }
  ${({ theme }) => theme && theme.checkBox.icon.extend}
`;

export const CheckBoxControlMock = ({
  checkBoxTheme,
  controlId,
  indicatorId,
}) => {
  const iconSize = checkBoxTheme.icon.size || checkBoxTheme.size;

  return (
    <CheckBoxControl
      id={controlId}
      align="center"
      justify="center"
      round={checkBoxTheme.check.radius}
    >
      <Box id={indicatorId} width={iconSize} height={iconSize}>
        <CheckmarkIcon
          aria-hidden="true"
          viewBox="0 0 24 24"
          preserveAspectRatio="xMidYMid meet"
        >
          <path d="M6,11.3 L10.3,16 L18,6.2" />
        </CheckmarkIcon>
      </Box>
    </CheckBoxControl>
  );
};

CheckBoxControlMock.propTypes = {
  checkBoxTheme: PropTypes.shape({
    size: PropTypes.string.isRequired,
    icon: PropTypes.shape({
      size: PropTypes.string,
    }).isRequired,
    check: PropTypes.shape({
      radius: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
      thickness: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  controlId: PropTypes.string.isRequired,
  indicatorId: PropTypes.string.isRequired,
};
