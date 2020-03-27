/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

export const ColorPreview = ({ theme, themeMode }) => (
  <svg
    style={{ position: 'absolute' }}
    viewBox="0 0 288 212"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="288"
      height="212"
    >
      <path
        d="M0 7.99999C0 3.58172 3.58172 0 8 0H280C284.418 0 288 3.58172 288 8V204C288 208.418 284.418 212 280 212H8C3.58173 212 0 208.418 0 204V7.99999Z"
        fill="#EEEEEE"
      />
    </mask>
    <g mask="url(#mask0)">
      <circle
        cx="32.0385"
        cy="7.69231"
        r="43.6923"
        fill={theme.global.colors['green!']}
      />
      <circle
        cx="32.0385"
        cy="204.308"
        r="43.6923"
        fill={theme.global.colors['red!']}
      />
      <circle
        cx="-19.8463"
        cy="106"
        r="43.6923"
        fill={theme.global.colors.text[themeMode]}
      />
      <circle
        cx="307.846"
        cy="106"
        r="43.6923"
        fill={theme.global.colors.orange[themeMode]}
      />
      <circle
        cx="250.5"
        cy="7.69231"
        r="43.6923"
        fill={theme.global.colors.purple[themeMode]}
      />
      <circle
        cx="250.5"
        cy="204.308"
        r="43.6923"
        fill={theme.global.colors.blue[themeMode]}
      />
      <circle
        cx="198.616"
        cy="106"
        r="43.6923"
        fill={theme.global.colors.teal[themeMode]}
      />
      <circle
        cx="141.269"
        cy="7.69231"
        r="43.6923"
        fill={theme.global.colors.orange[themeMode]}
      />
      <circle
        cx="141.269"
        cy="204.308"
        r="43.6923"
        fill={theme.global.colors.purple[themeMode]}
      />
      <circle
        cx="89.3847"
        cy="106"
        r="43.6923"
        fill={theme.global.colors.yellow[themeMode]}
      />
    </g>
  </svg>
);
