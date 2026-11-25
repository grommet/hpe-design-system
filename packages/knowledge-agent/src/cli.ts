// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { runCli } from './cli-adapter.js';
import { loadSourceCapabilityCatalog } from './source-capabilities.js';
import { loadSourceKnowledge } from './source-knowledge.js';

runCli(loadSourceKnowledge, 'source', loadSourceCapabilityCatalog);
