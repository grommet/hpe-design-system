// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { forwardRef } from 'react';
import { LinkCard } from './LinkCard';

export const ContentPreviewCard = forwardRef(({ ...rest }, ref) => (
  <LinkCard
    align="start"
    fill="horizontal"
    background="background-front"
    pad="xlarge"
    round="medium"
    ref={ref}
    {...rest}
  />
));
