/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';

export const DashboardsPreview = ({ theme, themeMode }) => (
  <svg
    style={{ position: 'absolute' }}
    // width="100%"
    // height="auto"
    viewBox="0 0 288 212"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 8C0 3.58172 3.58172 0 8 0H280C284.418 0 288 3.58172 288 8V48H0V8Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <rect
      x="24"
      y="72"
      width="96"
      height="72"
      rx="4"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M24 172C24 169.791 25.7909 168 28 168H116C118.209 168 120 169.791 120 172V212H24V172Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <rect
      x="144"
      y="72"
      width="96"
      height="72"
      rx="4"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M144 172C144 169.791 145.791 168 148 168H236C238.209 168 240 169.791 240 172V212H144V172Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M264 76C264 73.7909 265.791 72 268 72H288V144H268C265.791 144 264 142.209 264 140V76Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
    <path
      d="M264 172C264 169.791 265.791 168 268 168H288V208C288 210.209 286.209 212 284 212H264V172Z"
      fill={theme.global.colors['active-background'][themeMode]}
    />
  </svg>
);
