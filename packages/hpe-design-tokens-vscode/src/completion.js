// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const { valuesFor } = require('./grommetAdapter');
const { findJsxValueContextAtOffset } = require('./jsxResolver');

const completionLabel = (value, token) => ({
  label: value,
  detail: ` = ${token.value}`,
});

const completionsAtOffset = (text, offset, languageId, tokenIndex) => {
  const context = findJsxValueContextAtOffset(text, offset, languageId);
  if (!context) return undefined;

  const values = valuesFor(context.componentName, context.propName, tokenIndex);
  if (!values.length) return undefined;

  return {
    context,
    values,
  };
};

module.exports = { completionLabel, completionsAtOffset };
