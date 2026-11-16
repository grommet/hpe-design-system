// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { runCli } from './cli-adapter.js';
import { searchKnowledge } from './context-generator.js';
import { loadSourceKnowledge } from './source-knowledge.js';

runCli((query, framework) =>
  searchKnowledge(loadSourceKnowledge(), 'source', query, framework),
);
