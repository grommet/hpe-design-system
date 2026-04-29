// The decision tree JSON is the single source of truth.
// This module exports the tree object so it can be imported by treeUtils and StyleCompass.
import data from '../../docs/hpe-token-decision.json';

export const styleCompassTree = data.tree;
