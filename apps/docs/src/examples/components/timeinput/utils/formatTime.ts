// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const formatTime = (time?: string, format: '12' | '24' = '12') => {
  const normalizedTime = time?.trim();
  if (!normalizedTime) return '';

  const date = new Date(`1970-01-01T${normalizedTime}Z`);

  return new Intl.DateTimeFormat(undefined, {
    hour: format === '24' ? '2-digit' : 'numeric',
    minute: '2-digit',
    hourCycle: format === '24' ? 'h23' : 'h12',
    // Preserve the time-of-day value without
    // host time-zone conversion.
    timeZone: 'UTC',
  }).format(date);
};
