// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const requireExtensionApi = moduleName => require(moduleName);
const vscode = requireExtensionApi('vscode');

const { completionLabel, completionsAtOffset } = require('./completion');
const dimensionTokens = require('./dimension-tokens');
const { tokenDocumentationMarkdown } = require('./hover');
const { findJsxTokenAtOffset } = require('./jsxResolver');
const { getColorShard, getDimensionShard, getTokens } = require('./manifest');
const { createTokenIndex, findTokenAtPosition } = require('./resolver');

const selector = [
  { language: 'css' },
  { language: 'javascript' },
  { language: 'javascriptreact' },
  { language: 'less' },
  { language: 'scss' },
  { language: 'typescript' },
  { language: 'typescriptreact' },
];

const jsxLanguages = new Set([
  'javascript',
  'javascriptreact',
  'typescript',
  'typescriptreact',
]);

const decode = value => new TextDecoder().decode(value);

const readJson = async uri =>
  JSON.parse(decode(await vscode.workspace.fs.readFile(uri)));

const manifestDirectory = uri =>
  uri.with({ path: uri.path.slice(0, uri.path.lastIndexOf('/')) });

const configuredManifestUris = folder => {
  const manifestPath = vscode.workspace
    .getConfiguration('hpeDesignTokens', folder.uri)
    .get('manifestPath');
  if (!manifestPath) return [];

  if (manifestPath.startsWith('/')) return [vscode.Uri.file(manifestPath)];
  return [vscode.Uri.joinPath(folder.uri, manifestPath)];
};

const manifestUris = folder => [
  ...configuredManifestUris(folder),
  vscode.Uri.joinPath(
    folder.uri,
    'node_modules',
    'hpe-design-tokens',
    'dist',
    'ide',
    'manifest.json',
  ),
  vscode.Uri.joinPath(
    folder.uri,
    'packages',
    'hpe-design-tokens',
    'dist',
    'ide',
    'manifest.json',
  ),
];

const shardTokens = async (manifestUri, shardPath) => {
  if (!shardPath) return undefined;

  const shard = await readJson(
    vscode.Uri.joinPath(
      manifestDirectory(manifestUri),
      shardPath.replace(/^\.\//, ''),
    ),
  );
  return getTokens(shard);
};

const loadManifestIndex = async (uri, dimensionMode, colorMode) => {
  try {
    const manifest = await readJson(uri);
    const dimensionShard = getDimensionShard(manifest, dimensionMode);
    if (!dimensionShard) return undefined;

    const collections = await Promise.all(
      [dimensionShard, getColorShard(manifest, colorMode)].map(shardPath =>
        shardTokens(uri, shardPath),
      ),
    );
    const tokens = collections.filter(collection => collection);
    return tokens.length && createTokenIndex(tokens);
  } catch {
    return undefined;
  }
};

const loadWorkspaceManifestIndex = async (folder, dimensionMode, colorMode) => {
  const indexes = await Promise.all(
    manifestUris(folder).map(uri =>
      loadManifestIndex(uri, dimensionMode, colorMode),
    ),
  );

  return indexes.find(index => index);
};

const loadTokenIndexes = async () => {
  const folders = vscode.workspace.workspaceFolders || [];
  const dimensionMode = vscode.workspace
    .getConfiguration('hpeDesignTokens')
    .get('dimensionMode');
  const colorMode = vscode.workspace
    .getConfiguration('hpeDesignTokens')
    .get('colorMode');
  const entries = await Promise.all(
    folders.map(async folder => [
      folder.uri.toString(),
      await loadWorkspaceManifestIndex(folder, dimensionMode, colorMode),
    ]),
  );

  return new Map(entries.filter(([, index]) => index));
};

const loadBundledTokenIndex = async (extensionUri, colorMode) =>
  loadManifestIndex(
    vscode.Uri.joinPath(extensionUri, 'tokens', 'manifest.json'),
    'default',
    colorMode,
  );

const createHover = match => {
  const { name, token } = match;
  const content = new vscode.MarkdownString();
  content.appendMarkdown(tokenDocumentationMarkdown(name, token.value));
  if (token.description) content.appendMarkdown(`\n\n${token.description}`);
  return content;
};

async function activate(context) {
  const colorMode = vscode.workspace
    .getConfiguration('hpeDesignTokens')
    .get('colorMode');
  const fallbackIndex =
    (await loadBundledTokenIndex(context.extensionUri, colorMode)) ||
    createTokenIndex([dimensionTokens]);
  let tokenIndexes = await loadTokenIndexes();
  const reloadIndexes = async () => {
    tokenIndexes = await loadTokenIndexes();
  };
  const provider = vscode.languages.registerHoverProvider(selector, {
    provideHover(document, position) {
      const line = document.lineAt(position.line).text;
      const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
      const tokenIndex =
        tokenIndexes.get(workspaceFolder?.uri.toString()) || fallbackIndex;
      const match = jsxLanguages.has(document.languageId)
        ? findJsxTokenAtOffset(
            document.getText(),
            document.offsetAt(position),
            document.languageId,
            tokenIndex,
          )
        : findTokenAtPosition(line, position.character, tokenIndex);
      if (!match) return undefined;

      const range = jsxLanguages.has(document.languageId)
        ? new vscode.Range(
            document.positionAt(match.start),
            document.positionAt(match.end),
          )
        : new vscode.Range(
            position.line,
            match.start,
            position.line,
            match.end,
          );

      return new vscode.Hover(createHover(match), range);
    },
  });
  const completionProvider = vscode.languages.registerCompletionItemProvider(
    selector.filter(({ language }) => jsxLanguages.has(language)),
    {
      provideCompletionItems(document, position) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(
          document.uri,
        );
        const tokenIndex =
          tokenIndexes.get(workspaceFolder?.uri.toString()) || fallbackIndex;
        const result = completionsAtOffset(
          document.getText(),
          document.offsetAt(position),
          document.languageId,
          tokenIndex,
        );
        if (!result) return undefined;

        const range = new vscode.Range(
          document.positionAt(result.context.start),
          document.positionAt(result.context.end),
        );
        return result.values.map(({ name, token, value }) => {
          const item = new vscode.CompletionItem(
            completionLabel(value, token),
            vscode.CompletionItemKind.Value,
          );
          item.detail = `${name} = ${token.value}`;
          item.documentation = new vscode.MarkdownString(
            tokenDocumentationMarkdown(name, token.value),
          );
          item.range = range;
          return item;
        });
      },
    },
    '"',
    "'",
  );

  const configurationListener = vscode.workspace.onDidChangeConfiguration(
    event => {
      if (event.affectsConfiguration('hpeDesignTokens')) reloadIndexes();
    },
  );

  context.subscriptions.push(
    provider,
    completionProvider,
    configurationListener,
  );
}

function deactivate() {}

module.exports = { activate, deactivate };
