import 'dotenv/config';
import * as fs from 'fs';

import FigmaApi from '../figma_api.js';
import {
  getCliArgValue,
  resolveFigmaSyncConfig,
} from '../figma_sync_config.js';

import { green, verifyReferences } from '../utils.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';

/**
 * Usage:
 * This script pulls design tokens from Figma and writes
 * them to JSON files.
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

/**
 * Recursively sorts object keys alphabetically
 */

const FILE_TIERS = ['primitive', 'semantic', 'component'] as const;

function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  } else if (obj !== null && typeof obj === 'object') {
    const sortedObj: any = {};
    Object.keys(obj)
      .sort()
      .forEach(key => {
        sortedObj[key] = sortObjectKeys(obj[key]);
      });
    return sortedObj;
  }
  return obj;
}

async function main() {
  const config = resolveFigmaSyncConfig();
  const fileKeys = config.fileKeys;

  const TOKENS_DIR = 'tokens';
  const tokenDirs = fs
    .readdirSync(TOKENS_DIR, { withFileTypes: true })
    .filter(
      (dir): dir is fs.Dirent & { name: (typeof FILE_TIERS)[number] } =>
        dir.isDirectory() &&
        FILE_TIERS.includes(dir.name as (typeof FILE_TIERS)[number]),
    )
    .map(dir => dir.name);

  const outputDir =
    getCliArgValue(process.argv.slice(2), '--output') || 'tokens_new';

  console.log(`Running sync-figma-to-tokens for env: ${config.env}`);

  const api = new FigmaApi(config.personalAccessToken);
  const componentTokens = await api.getLocalVariables(fileKeys.component);
  const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
  verifyReferences(
    [componentTokens, semanticTokens],
    config.expectedCollectionKeys,
  );

  tokenDirs.forEach(async dir => {
    const api = new FigmaApi(config.personalAccessToken);
    const localVariables = await api.getLocalVariables(fileKeys[dir]);
    const tokensFiles = tokenFilesFromLocalVariables(localVariables);

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    if (!fs.existsSync(`${outputDir}/${dir}`)) {
      fs.mkdirSync(`${outputDir}/${dir}`);
    }

    Object.entries(tokensFiles).forEach(([fileName, fileContent]) => {
      const sortedContent = sortObjectKeys(fileContent);
      fs.writeFileSync(
        `${outputDir}/${dir}/${fileName}`,
        `${JSON.stringify(sortedContent, null, 2)}\n`,
      );
      console.log(`Wrote ${fileName}`);
    });
  });

  console.log(
    green(`✅ Tokens files have been written to the ${outputDir} directory`),
  );
}

main();
