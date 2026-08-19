// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { readFileSync } from 'fs';

export function stripJsonComments(jsonText: string): string {
  let result = '';
  let i = 0;
  const len = jsonText.length;
  let inString = false;

  while (i < len) {
    const ch = jsonText[i];

    if (inString) {
      if (ch === '\\') {
        // Escape sequence: copy both characters and skip
        result += ch + (jsonText[i + 1] ?? '');
        i += 2;
      } else {
        if (ch === '"') {
          inString = false;
        }
        result += ch;
        i += 1;
      }
    } else {
      if (ch === '"') {
        inString = true;
        result += ch;
        i += 1;
      } else if (ch === '/' && jsonText[i + 1] === '/') {
        // Line comment: skip until end of line
        i += 2;
        while (i < len && jsonText[i] !== '\n') {
          i += 1;
        }
      } else if (ch === '/' && jsonText[i + 1] === '*') {
        // Block comment: skip until */
        i += 2;
        while (i < len && !(jsonText[i] === '*' && jsonText[i + 1] === '/')) {
          i += 1;
        }
        i += 2; // skip closing */
      } else {
        result += ch;
        i += 1;
      }
    }
  }

  return result;
}

export function parseJsonc<T>(jsonText: string): T {
  return JSON.parse(stripJsonComments(jsonText)) as T;
}

export function readJsoncFile<T>(filePath: string): T {
  const fileContents = readFileSync(filePath, 'utf8');
  return parseJsonc<T>(fileContents);
}
