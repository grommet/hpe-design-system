import { structuredTokens } from '../../../docs/src/components/content/designTokenUtils';

// Node type detection
export const isQuestionNode = (node) =>
  node && 'question' in node && 'options' in node;

export const isLeafOption = (option) => 'result' in option;

// String reference resolution
export const buildRefMap = (tree) => ({
  '_semantic': tree.options[1].next,
});

export const resolveNext = (refMap, next) =>
  typeof next === 'string' ? refMap[next] : next;

// Find a node by ID anywhere in the tree (used for seeAlso navigation)
export const findNodeById = (node, id) => {
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

// Token resolution — turns a token name string into display data
// by looking it up in the structuredTokens from designTokenUtils.js
export const resolveToken = (tokenName) => {
  // tokenName e.g. "hpe.color.background.front"
  // Look up in structuredTokens to get type, value, description
  const parts = tokenName.replace(/^hpe\./, '').split('.');
  const category = parts[0]; // e.g. "color"
  const fullKey = `hpe.${parts.join('.')}`;

  // Search across semantic, component, primitives
  for (const level of ['semantic', 'component', 'primitives']) {
    if (structuredTokens[level]?.[category]?.[fullKey]) {
      const entry = structuredTokens[level][category][fullKey];
      const mode =
        entry.modes.light ??
        entry.modes.default ??
        Object.values(entry.modes)[0];
      return {
        token: tokenName,
        type: mode?.$type ?? 'unknown',
        description: mode?.$description ?? '',
        value: mode?.$value ?? '',
      };
    }
  }

  // Fallback: return the token name with unknown type
  return { token: tokenName, type: 'unknown', description: '', value: '' };
};

// Resolve an entire result node's tokens array into display data
export const resolveResultTokens = (result) =>
  result.tokens.map((tokenName) => resolveToken(tokenName));
