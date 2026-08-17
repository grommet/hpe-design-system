// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { StarRating } from 'grommet';
import { useInert } from '@shared/hooks';

export const FeedbackPreview = () => {
  const ref = useInert();

  return (
    <StarRating ref={ref} name="preview-card-example" aria-label="preview" />
  );
};
