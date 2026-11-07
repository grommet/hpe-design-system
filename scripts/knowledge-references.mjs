// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const INTERNAL_REFERENCE_KINDS = [
  'glossary',
  'rule',
  'component',
  'pattern',
];

const FOUNDATIONS_PATH = 'knowledge/core/data/foundations';

const isNonEmptyString = value =>
  typeof value === 'string' && value.trim().length > 0;

const describeReference = reference => {
  try {
    return JSON.stringify(reference);
  } catch {
    return String(reference);
  }
};

/**
 * Validates foundation rule ids and relatedTo references.
 *
 * Rule ids are collected across every foundation before references are
 * checked, so duplicates are detected globally and rule references may point
 * to rules in other files or later in the same file.
 *
 * @param {Array<{ file: string, foundation: { rules?: Array<object> } }>}
 *   foundationsByFile Parsed foundation files.
 * @param {{ glossary: Set<string>, component: Set<string>,
 *   pattern: Set<string> }} knownIds Ids that internal references may target.
 * @returns {string[]} Human-readable violations; empty when valid.
 */
export function validateFoundationReferences(foundationsByFile, knownIds) {
  const violations = [];
  const ruleLocations = new Map();

  foundationsByFile.forEach(({ file, foundation }) => {
    const location = `${FOUNDATIONS_PATH}/${file}`;
    (foundation?.rules ?? []).forEach(rule => {
      if (ruleLocations.has(rule.id)) {
        const firstLocation = ruleLocations.get(rule.id);
        violations.push(
          `${location}: duplicate rule id "${rule.id}" ` +
            `(first defined in ${firstLocation})`,
        );
        return;
      }
      ruleLocations.set(rule.id, location);
    });
  });

  const idsByKind = {
    glossary: knownIds.glossary,
    rule: new Set(ruleLocations.keys()),
    component: knownIds.component,
    pattern: knownIds.pattern,
  };

  foundationsByFile.forEach(({ file, foundation }) => {
    const location = `${FOUNDATIONS_PATH}/${file}`;
    (foundation?.rules ?? []).forEach(rule => {
      const relatedTo = rule.relatedTo ?? [];
      if (!Array.isArray(relatedTo)) {
        violations.push(
          `${location}: rule "${rule.id}" has a relatedTo value ` +
            'that is not a list',
        );
        return;
      }

      relatedTo.forEach(reference => {
        const ruleLabel = `${location}: rule "${rule.id}"`;
        const description = describeReference(reference);
        const prefix = `${ruleLabel} has relatedTo reference ${description}`;

        if (reference === null || typeof reference !== 'object') {
          violations.push(`${prefix} that is not an object`);
          return;
        }

        if (reference.kind === 'external') {
          if (!isNonEmptyString(reference.label)) {
            violations.push(`${prefix} without a label`);
          }
          if (!isNonEmptyString(reference.url)) {
            violations.push(`${prefix} without a url`);
          }
          return;
        }

        if (!INTERNAL_REFERENCE_KINDS.includes(reference.kind)) {
          violations.push(
            `${prefix} with unknown kind; expected one of ${[
              ...INTERNAL_REFERENCE_KINDS,
              'external',
            ].join(', ')}`,
          );
          return;
        }

        if (!isNonEmptyString(reference.id)) {
          violations.push(`${prefix} without an id`);
          return;
        }

        if (!idsByKind[reference.kind].has(reference.id)) {
          violations.push(`${prefix} to unknown ${reference.kind} id`);
        }
      });
    });
  });

  return violations;
}
