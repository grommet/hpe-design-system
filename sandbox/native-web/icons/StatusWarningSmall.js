// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const StatusWarningSmall = ({ color = '#000', size = 'medium' }) => `<svg
viewBox="0 0 12 12"
a11yTitle="Status is warning"
class="icon 
${color} icon-${size}"
>
<path
  fillRule="evenodd"
  fill="#000"
  stroke="#000"
  strokeLinejoin="round"
  d="m6 1 5 9H1z"
/>
</svg>`;
