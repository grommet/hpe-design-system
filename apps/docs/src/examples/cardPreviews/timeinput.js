// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { TimeInput } from 'grommet';
import { useInert } from '@shared/hooks';

export const TimeInputPreview = () => {
  const ref = useInert();

  return <TimeInput ref={ref} aria-label="preview" />;
};