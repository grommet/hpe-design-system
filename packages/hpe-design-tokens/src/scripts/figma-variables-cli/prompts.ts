import { type Interface } from 'readline/promises';

import { roleToFileKeyEnv } from './env.js';
import type { FileKeySelection, SourceType, Role } from './types.js';

export type ReadlineInterface = Interface;

export async function ask(rl: ReadlineInterface, prompt: string) {
  return rl.question(prompt);
}

export async function askMenuOption(rl: ReadlineInterface, maxOption: number) {
  while (true) {
    const answer = (await ask(rl, '\nSelect option: ')).trim();
    const parsed = Number(answer);
    if (Number.isInteger(parsed) && parsed >= 1 && parsed <= maxOption) {
      return parsed;
    }
    console.log(`Please enter a number between 1 and ${maxOption}.`);
  }
}

export async function chooseSourceType(
  rl: ReadlineInterface,
): Promise<SourceType> {
  console.log('\nChoose variable source:');
  console.log('1. local');
  console.log('2. published');

  const choice = await askMenuOption(rl, 2);
  return choice === 1 ? 'local' : 'published';
}

export async function chooseFileKey(
  rl: ReadlineInterface,
): Promise<FileKeySelection> {
  console.log('\nChoose target file key source:');
  console.log(
    '1. role env var (FILE_KEY_PRIMITIVE | FILE_KEY_SEMANTIC | FILE_KEY_COMPONENT)',
  );
  console.log('2. raw file key input');

  const choice = await askMenuOption(rl, 2);

  if (choice === 1) {
    console.log('\nSelect role:');
    console.log('1. primitive');
    console.log('2. semantic');
    console.log('3. component');
    const roleChoice = await askMenuOption(rl, 3);
    const role = (['primitive', 'semantic', 'component'][roleChoice - 1] ||
      'primitive') as Role;
    const envVar = roleToFileKeyEnv[role];
    const fileKey = process.env[envVar];

    if (!fileKey) {
      throw new Error(`${envVar} is required to use role-based selection.`);
    }

    return { fileKey, source: `${role} (${envVar})` };
  }

  const rawFileKey = (await ask(rl, '\nEnter raw Figma file key: ')).trim();
  if (!rawFileKey) {
    throw new Error('A file key is required.');
  }

  return { fileKey: rawFileKey, source: 'manual input' };
}

export async function confirm(
  rl: ReadlineInterface,
  prompt = 'Type YES to continue: ',
) {
  const answer = (await ask(rl, prompt)).trim();
  return answer === 'YES';
}

export function printMenu() {
  console.log('\nFigma Variables CLI');
  console.log('1. Get variable collections');
  console.log('2. Get variable modes');
  console.log('3. Get variables');
  console.log('4. Get variable by ID');
  console.log('5. Post variables');
  console.log('6. Get collection by ID');
  console.log('7. None (exit)');
}
