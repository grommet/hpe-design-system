import 'dotenv/config';
import * as fs from 'fs';

import FigmaApi from '../figma_api.js';

import { green } from '../utils.js';
import {
  generatePostVariablesPayload,
  readJsonFiles,
} from '../token_import.js';

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

  tokenDirs.forEach(async dir => {
    const tokensFiles = fs
      .readdirSync(`${TOKENS_DIR}/${dir}`)
      .map((file: string) => `${TOKENS_DIR}/${dir}/${file}`)
      .filter(file => file);

    const tokensByFile = readJsonFiles(tokensFiles);

    console.log('Read tokens files:', Object.keys(tokensByFile));

    const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN || '');
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
