// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { ComponentProps, ComponentType } from 'react';

// aries-core components are authored in JS, so TS reads their destructured
// props as required. Loosen them to optional for use from TSX stories.
export type Loose<T extends ComponentType<any>> = ComponentType<
  Partial<ComponentProps<T>>
>;
