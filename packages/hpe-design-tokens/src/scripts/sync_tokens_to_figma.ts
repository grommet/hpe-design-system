import 'dotenv/config';
import * as fs from 'fs';

import FigmaApi from '../figma_api.js';
import { resolveFigmaSyncConfig } from '../figma_sync_config.js';

import { green, verifyReferences } from '../utils.js';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';

// This script pushes design tokens from JSON files to Figma design files

const FILE_TIERS = ['primitive', 'semantic', 'component'] as const;

async function main() {
  const config = resolveFigmaSyncConfig();
  const fileKeys = config.fileKeys;

  console.log(`Running sync-tokens-to-figma for env: ${config.env}`);

  const TOKENS_DIR = 'tokens';
  const tokenDirs = fs
    .readdirSync(TOKENS_DIR, { withFileTypes: true })
    .filter(
      (dir): dir is fs.Dirent & { name: (typeof FILE_TIERS)[number] } =>
        dir.isDirectory() &&
        dir.name !== '.tmp' &&
        FILE_TIERS.includes(dir.name as (typeof FILE_TIERS)[number]),
    )
    .map(dir => dir.name);

  const api = new FigmaApi(config.personalAccessToken);
  const componentTokens = await api.getLocalVariables(fileKeys.component);
  const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
  verifyReferences(
    [componentTokens, semanticTokens],
    config.expectedCollectionKeys,
  );

  tokenDirs.forEach(async dir => {
    const tokensFiles = fs
      .readdirSync(`${TOKENS_DIR}/${dir}`)
      .map((file: string) => `${TOKENS_DIR}/${dir}/${file}`)
      .filter(file => file);

    const tokensByFile = readJsonFiles(tokensFiles);

    console.log('Read tokens files:', Object.keys(tokensByFile));

    const api = new FigmaApi(config.personalAccessToken);
    const localVariables = await api.getLocalVariables(fileKeys[dir]);

    const postVariablesPayload = generatePostVariablesPayload(
      tokensByFile,
      localVariables,
    );

    if (
      Object.values(postVariablesPayload).every(value => value.length === 0)
    ) {
      console.log(
        green(`✅ "${dir}" tokens are already up to date with the Figma file`),
      );
      return;
    }

    const apiResp = await api.postVariables(
      fileKeys[dir],
      postVariablesPayload,
    );

    console.log(`"${dir}" POST variables API response:`, apiResp);

    if (
      postVariablesPayload.variableCollections &&
      postVariablesPayload.variableCollections.length
    ) {
      console.log(
        `Updated "${dir}" variable collections`,
        postVariablesPayload.variableCollections,
      );
    }

    if (
      postVariablesPayload.variableModes &&
      postVariablesPayload.variableModes.length
    ) {
      console.log(
        `Updated "${dir}" variable modes`,
        postVariablesPayload.variableModes,
      );
    }

    if (
      postVariablesPayload.variables &&
      postVariablesPayload.variables.length
    ) {
      console.log(`Updated "${dir}" variables`, postVariablesPayload.variables);
    }

    if (
      postVariablesPayload.variableModeValues &&
      postVariablesPayload.variableModeValues.length
    ) {
      console.log(
        `Updated "${dir}" variable mode values`,
        postVariablesPayload.variableModeValues,
      );
    }
    console.log(
      green(`✅ Figma files have been updated with the new ${dir} tokens`),
    );
  });
}

main();
