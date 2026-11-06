// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import type { Box } from 'grommet';

// Theme-like object specifying alignment, width, and spacing for
// an AppContainer.
export const appContainer = {
  gap: 'none',
  width: {
    min: 'medium',
  },
} satisfies Pick<ComponentProps<typeof Box>, 'gap' | 'width'>;