/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

export const CardsPreview = ({ theme, themeMode }) => (
  <svg
    style={{ position: 'absolute' }}
    viewBox="0 0 288 212"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="93"
      y="36"
      width="102"
      height="140"
      rx="4"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M217 39C217 36.7909 218.791 35 221 35H288V175H221C218.791 175 217 173.209 217 171V39Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M71 39C71 36.7909 69.2091 35 67 35H0V175H67C69.2091 175 71 173.209 71 171V39Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
  </svg>
);
