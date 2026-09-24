// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const requireExtensionApi = moduleName => require(moduleName);
const vscode = requireExtensionApi('vscode');

const dimensionTokens = require('./dimension-tokens');
const { createTokenIndex, findTokenAtPosition } = require('./resolver');

const selector = [
  { language: 'css' },
  { language: 'javascript' },
  { language: 'javascriptreact' },
  { language: 'less' },
  { language: 'scss' },
  { language: 'typescriptreact' },
];

const createHover = match => {
  const { name, token } = match;
  const content = new vscode.MarkdownString();
  content.appendMarkdown(`**HPE Design Token**\n\n\`${name}\`\n\n`);
  content.appendMarkdown(`Resolved value: **${token.$value}**`);
  if (token.$description) content.appendMarkdown(`\n\n${token.$description}`);
  return content;
};

function activate(context) {
  const tokenIndex = createTokenIndex([dimensionTokens]);
  const provider = vscode.languages.registerHoverProvider(selector, {
    provideHover(document, position) {
      const line = document.lineAt(position.line).text;
      const match = findTokenAtPosition(line, position.character, tokenIndex);
      if (!match) return undefined;

      return new vscode.Hover(
        createHover(match),
        new vscode.Range(position.line, match.start, position.line, match.end),
      );
    },
  });

  context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = { activate, deactivate };
