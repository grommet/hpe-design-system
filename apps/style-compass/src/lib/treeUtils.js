// Tree traversal, node type detection, string reference resolution, and token resolution.
// All rendering components stay stateless — this module owns all data logic.

import { structuredTokens } from '@docs/components/content/designTokenUtils';

// ---------------------------------------------------------------------------
// Node type detection (structural — the JSON has no explicit 'type' field)
// ---------------------------------------------------------------------------

/** A question node has both a 'question' string and an 'options' array. */
export const isQuestionNode = (node) =>
  node != null && 'question' in node && 'options' in node;

/** An option is a leaf when it has a 'result' property (tokens or guidance). */
export const isLeafOption = (option) => 'result' in option;

/** An option leads to another question when 'next' is an object question node. */
export const isNavigationOption = (option) =>
  'next' in option && isQuestionNode(option.next);

// ---------------------------------------------------------------------------
// String reference resolution
// ---------------------------------------------------------------------------

/**
 * Build the reference map from the tree root.
 * '_semantic' resolves to the "A general design token" subtree.
 */
export const buildRefMap = (tree) => ({
  _semantic: tree.options[1].next,
});

/** Resolve a 'next' value — returns the node object whether it's already an
 *  object or a string reference key. */
export const resolveNext = (refMap, next) =>
  typeof next === 'string' ? refMap[next] : next;

// ---------------------------------------------------------------------------
// Node lookup by ID (used for seeAlso navigation)
// ---------------------------------------------------------------------------

/** Depth-first search for a node by its 'id' property anywhere in the tree. */
export const findNodeById = (node, id) => {
  if (!node) return null;
  if (node.id === id) return node;
  if (node.options) {
    for (const option of node.options) {
      if (option.next && typeof option.next === 'object') {
        const found = findNodeById(option.next, id);
        if (found) return found;
      }
    }
  }
  return null;
};

// ---------------------------------------------------------------------------
// Token resolution
// ---------------------------------------------------------------------------

/**
 * Resolve a single token name string into display data by looking it up in
 * structuredTokens from designTokenUtils. Returns a flat object suitable for
 * rendering in ResultCard's DataTable.
 *
 * @param {string} tokenName - e.g. "hpe.color.background.front"
 * @returns {{ token: string, type: string, value: string, description: string }}
 */
export const resolveToken = (tokenName) => {
  const withoutPrefix = tokenName.replace(/^hpe\./, '');
  const category = withoutPrefix.split('.')[0]; // e.g. "color"

  for (const level of ['semantic', 'component', 'primitives']) {
    const entry = structuredTokens[level]?.[category]?.[tokenName];
    if (entry) {
      const mode =
        entry.modes?.light ??
        entry.modes?.default ??
        Object.values(entry.modes ?? {})[0];
      return {
        token: tokenName,
        type: mode?.$type ?? 'unknown',
        description: mode?.$description ?? '',
        value: mode?.$value ?? '',
      };
    }
  }

  // Fallback when token is not found in structuredTokens
  return { token: tokenName, type: 'unknown', description: '', value: '' };
};

/**
 * Resolve all tokens in a result node into display data for the DataTable.
 *
 * @param {{ tokens: string[] }} result
 * @returns {Array<{ token: string, type: string, value: string, description: string }>}
 */
export const resolveResultTokens = (result) =>
  result.tokens.map((name) => resolveToken(name));
