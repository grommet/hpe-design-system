#!/usr/bin/env node
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { loadBundledKnowledge } from './bundled-knowledge.js';
import { runCli } from './cli-adapter.js';

runCli(loadBundledKnowledge, 'bundled');
