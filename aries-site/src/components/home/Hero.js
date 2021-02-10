import React, { useContext } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Box, ResponsiveContext, ThemeContext } from 'grommet';
import { normalizeColor } from 'grommet/utils';
import { useDarkMode } from '../../utils';

const floatAnimation = css`
  ${props => keyframes`
    0% {
      transform: ${props.reversed ? 'translateY(5%)' : 'none'};
    }
    100% {
      transform: ${props.reversed ? 'none' : 'translateY(5%)'};
    }
  `} 3s 6s infinite alternate forwards
`;

const textFillAnimation = css`
  ${props => keyframes`
    0% {
      fill: ${props.fill[0]};
    }
    50% {
      fill: ${props.fill[1]};
    }
    100% {
      fill: ${props.fill[2]};
    }
  `} 3s 0s infinite alternate forwards
`;

const moveAnimation = css`
  ${props => keyframes`
    0% {
      y: ${props.y};
    }
    100% {
      y: ${Number(props.y) + Number(props.offset)};
    }
  `} 0.5s 2s 1 forwards
`;

const popAnimation = css`
  ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `} 0s ${props => props.duration || 0}s infinite forwards`;

const roundAnimation = css`
  ${keyframes`
    0% {
      rx: 14.439;
    }
    100% {
      rx: 0;
    }
  `} 3s 2s infinite alternate forwards
`;

const StyledLines = styled.g`
  stroke-width: 4;
  stroke-linecap: round;
  animation: ${floatAnimation};
`;

const StyledType = styled.g`
  fill: ${props => props.fill[1]};
  animation: ${textFillAnimation};
`;

const PoppingRect = styled.rect`
  opacity: 0;
  animation: ${popAnimation};
`;

const PoppingRoundRect = styled.rect`
  opacity: 0;
  rx: 14.439;
  animation: ${popAnimation}, ${roundAnimation};
`;

const MovingRect = styled.rect`
  y: ${props => props.y};
  rx: 14.439;
  animation: ${moveAnimation}, ${roundAnimation};
`;

const StyledCircle = styled.circle`
  opacity: 0;
  animation: ${popAnimation};
`;

export const Hero = props => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);
  const darkMode = useDarkMode();
  const purple = normalizeColor('purple', theme, false);

  return (
    <Box fill {...props}>
      <svg
        viewBox="0 0 786 514"
        fill="none"
        preserveAspectRatio={
          size === 'small' ? 'xMidYMin meet' : 'xMaxYMin meet'
        }
        xmlns="http://www.w3.org/2000/svg"
      >
        <StyledLines
          stroke={normalizeColor('status-unknown', theme, darkMode.value)}
        >
          <path d="M587 385.724H649.076" />
          <path d="M680.725 385.724H708.314" />
          <path d="M587 418.266H747.502" />
          <path d="M587 447.518H667.893" />
          <path d="M693.723 447.521H707.517" />
          <path d="M614.322 479.283L746.648 479.283" />
          <path d="M646.074 511.033L714.884 511.033" />
        </StyledLines>
        <StyledLines
          reversed
          stroke={normalizeColor('status-unknown', theme, darkMode.value)}
        >
          <path d="M2 2.72432H64.0756" />
          <path d="M95.7246 2.72432H123.314" />
          <path d="M2 35.2656H162.502" />
          <path d="M2 64.5176H82.893" />
          <path d="M108.723 64.5215H122.517" />
          <path d="M29.3223 96.2832L161.648 96.2832" />
          <path d="M61.0742 128.033L129.884 128.033" />
        </StyledLines>
        <MovingRect
          x="125"
          y="186"
          width="121"
          height="119"
          rx="14.439"
          fill={normalizeColor('orange!', theme, darkMode.value)}
          offset={-142}
        />
        <MovingRect
          x="125"
          y="44"
          width="121"
          height="121"
          rx="14.439"
          fill={purple}
          offset={142}
        />
        <PoppingRect
          x="289.78"
          y="36.7805"
          width="279.439"
          height="278.439"
          rx="21.6585"
          stroke={normalizeColor('blue!', theme, darkMode.value)}
          strokeWidth="14.439"
          duration={1}
        />
        <StyledCircle
          cx="417"
          cy="269.5"
          r="12"
          fill={purple}
          duration={1.25}
        />
        <StyledCircle cx="453" cy="269.5" r="12" fill={purple} duration={1.5} />
        <StyledCircle cx="489" cy="269.5" r="12" fill={purple} duration={2} />
        <PoppingRoundRect
          opacity="0"
          x="417"
          y="68"
          width="121"
          height="121"
          rx="14.439"
          fill={normalizeColor('blue', theme, false)}
          duration={2.5}
        />
        <PoppingRoundRect
          opacity="0"
          x="601"
          y="190"
          width="77"
          height="115"
          rx="14.439"
          fill="#FFD63E"
          duration={3}
        />
        <PoppingRoundRect
          opacity="0"
          x="601"
          y="44"
          width="185"
          height="115"
          rx="14.439"
          fill={normalizeColor('green', theme, false)}
          duration={3.5}
        />
        <StyledType
          fill={[
            normalizeColor('text-weak', theme, darkMode.value),
            normalizeColor('text', theme, darkMode.value),
            normalizeColor('text-strong', theme, darkMode.value),
          ]}
        >
          <path d="M549.623 271.426H515.188L466.057 399.973H499.441L508.47 375.059H555.292L564.53 399.973H598.754L549.623 271.426ZM518.758 347.423L531.986 311.204L545.213 347.423H518.758Z" />
          <path d="M666.255 338.212V350.354C662.266 346.795 652.607 342.817 642.949 342.817C623.002 342.817 607.465 354.542 607.465 371.918C607.465 390.342 623.002 401.648 642.109 401.648C653.027 401.648 662.685 396.832 666.255 393.064V399.973H681.582V336.955C681.582 317.276 668.565 305.133 646.518 305.133C634.97 305.133 623.842 308.482 617.543 312.879V327.744C625.312 322.719 633.71 319.579 643.999 319.579C657.646 319.579 666.255 326.697 666.255 338.212ZM666.255 367.313V376.943C663.735 383.852 654.497 388.458 644.629 388.458C633.29 388.458 622.372 383.224 622.372 371.918C622.372 360.822 633.29 355.798 644.629 355.798C654.497 355.798 663.735 360.404 666.255 367.313Z" />
        </StyledType>
      </svg>
    </Box>
  );
};
