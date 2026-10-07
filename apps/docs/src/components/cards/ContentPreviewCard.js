// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import { LinkCard } from './LinkCard';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => (
  <LinkCard
    align="start"
    fill="horizontal"
    background="background-surface-tone-2"
    // renders on homepages in creative toolkit segment
    pad="xlarge"
    round="medium"
    ref={ref}
    {...rest}
  />
));
