#!/usr/bin/env node
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { searchDesignSystem } from './index.js';
import { runCli } from './cli-adapter.js';

runCli(searchDesignSystem);
