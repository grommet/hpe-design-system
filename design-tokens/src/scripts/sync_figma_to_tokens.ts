import 'dotenv/config';
import * as fs from 'fs';

import FigmaApi from '../figma_api.js';

import { green, verifyReferences } from '../utils.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';

/**
 * Usage:
 *
 * // Defaults to writing to the tokens_new directory
 * npm run sync-figma-to-tokens
 *
 * // Writes to the specified directory
 * npm run sync-figma-to-tokens -- --output directory_name
 */

async function main() {
  if (
    !process.env.PERSONAL_ACCESS_TOKEN ||
    !process.env.FILE_KEY_PRIMITIVE ||
    !process.env.FILE_KEY_SEMANTIC ||
    !process.env.FILE_KEY_COMPONENT
  ) {
    throw new Error(
      'PERSONAL_ACCESS_TOKEN, FILE_KEY_PRIMITIVE, FILE_KEY_SEMANTIC, and FILE_KEY_COMPONENT environment variables are required',
    );
  }
  const fileKeys: { [key: string]: string } = {
    primitive: process.env.FILE_KEY_PRIMITIVE,
    semantic: process.env.FILE_KEY_SEMANTIC,
    component: process.env.FILE_KEY_COMPONENT,
  };

  const TOKENS_DIR = 'tokens';
  const tokenDirs = fs
    .readdirSync(TOKENS_DIR, { withFileTypes: true })
    .filter(dir => dir.isDirectory())
    .map(dir => dir.name);

  let outputDir = 'tokens_new';

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN || '');
  const componentTokens = await api.getLocalVariables(fileKeys.component);
  const semanticTokens = await api.getLocalVariables(fileKeys.semantic);
  verifyReferences([componentTokens, semanticTokens]);

  tokenDirs.forEach(async dir => {
    const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN || '');
    const localVariables = await api.getLocalVariables(fileKeys[dir]);
    const tokensFiles = tokenFilesFromLocalVariables(localVariables);

    const outputArgIdx = process.argv.indexOf('--output');
    if (outputArgIdx !== -1) {
      outputDir = process.argv[outputArgIdx + 1];
    }

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
    if (!fs.existsSync(`${outputDir}/${dir}`)) {
      fs.mkdirSync(`${outputDir}/${dir}`);
    }

    Object.entries(tokensFiles).forEach(([fileName, fileContent]) => {
      fs.writeFileSync(
        `${outputDir}/${dir}/${fileName}`,
        `${JSON.stringify(fileContent, null, 2)}\n`,
      );
      console.log(`Wrote ${fileName}`);
    });
  });

  console.log(
    green(`✅ Tokens files have been written to the ${outputDir} directory`),
  );
}

main();
