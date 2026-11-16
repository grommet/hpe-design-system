#!/usr/bin/env node
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
await import(
  new URL('../dist/packages/knowledge-agent/src/bin.js', import.meta.url).href
);
