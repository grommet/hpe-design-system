// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const formatTime = (time?: string, format: '12' | '24' = '12') => {
  if (!time) return '';

  const match = time
    .trim()
    .match(/^([0-9]{1,2}):([0-9]{2})(?::[0-9]{2})?(?:\s*(AM|PM))?$/i);
  if (!match) return time;

  const [, hours, minutes, meridiem] = match;
  const hour = Number(hours);
  const hour24 = meridiem
    ? (hour % 12) + (meridiem.toUpperCase() === 'PM' ? 12 : 0)
    : hour;

  if (format === '24') {
    return `${String(hour24).padStart(2, '0')}:${minutes}`;
  }

  return `${hour24 % 12 || 12}:${minutes} ${hour24 < 12 ? 'AM' : 'PM'}`;
};
