// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from 'node:fs';
import { Ajv } from 'ajv';
import { digestContent } from './knowledge.js';
import type { KnowledgeSnapshot } from './knowledge.js';

export function loadBundledKnowledge(): KnowledgeSnapshot {
  try {
    // Compilation preserves repo-relative type paths inside dist.
    const data: unknown = JSON.parse(
      readFileSync(new URL('../../../knowledge.json', import.meta.url), 'utf8'),
    );
    const schema = JSON.parse(
      readFileSync(
        new URL('../../../knowledge.schema.json', import.meta.url),
        'utf8',
      ),
    );
    const ajv = new Ajv({
      allErrors: true,
      strict: true,
      allowUnionTypes: true,
    });
    const validate = ajv.compile<KnowledgeSnapshot>(schema);
    if (!validate(data)) {
      throw new Error(ajv.errorsText(validate.errors));
    }
    if (data.contentDigest !== digestContent(data.content)) {
      throw new Error('Knowledge content digest does not match.');
    }
    return data;
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(
      `Unable to load bundled HPE design-system knowledge: ${detail}`,
      { cause: error },
    );
  }
}
