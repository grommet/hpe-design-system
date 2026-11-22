// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { LAYOUTS } from '../layouts/catalog';

// The tabs in the preview bar: the overview, the shell prototype in both
// arrangements (chrome around the page, and chrome sitting on it), then one
// tab per stress-test layout.
export const PAGES = [
  { id: 'overview', label: 'Overview' },
  { id: 'shell', label: 'Framed shell', shell: 'framed' },
  { id: 'beside', label: 'Beside shell', shell: 'beside' },
  ...LAYOUTS.map(layout => ({ id: layout.id, label: layout.tab, layout })),
];
