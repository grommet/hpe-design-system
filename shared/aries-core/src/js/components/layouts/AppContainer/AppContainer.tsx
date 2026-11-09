// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps } from 'react';
import { Box } from 'grommet';
import { appContainer } from './config';

export type AppContainerProps = ComponentProps<typeof Box>;

export const AppContainer = ({ ...rest }: AppContainerProps) => (
  <Box
    gap={appContainer.gap}
    height={{ min: '100%' }}
    width={appContainer.width}
    flex={false}
    {...rest}
  />
);
