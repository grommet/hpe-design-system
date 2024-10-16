import { readFileSync, readdirSync } from 'fs';
import { access, isReference } from '../utils.js';

const getValue = (valueArg: any, tokens: { [key: string]: any }) => {
  let value = valueArg;
  if (typeof value === 'string') {
    value = value.slice(1, -1);
    const a = access(value, tokens).$value;
    value = getValue(a, tokens);
    if (value === 'full') value = '2em';
  }

  return value;
};

export const descend = (
  node: { [key: string]: any },
  tokens: { [key: string]: any },
  path: string[] = [],
) => {
  Object.keys(node).forEach(key => {
    const value = node[key];
    const keyPath = [...path, key];
    if (
      typeof value === 'object' &&
      ('minHeight' in value ||
        'borderWidth' in value ||
        'lineHeight' in value ||
        'paddingY' in value)
    ) {
      let contentHeight = value?.lineHeight;
      // this is special use case for `iconOnly` buttons
      // could be improved in future if needed to be more dynamic
      if (key === 'iconOnly') {
        // [component, size, kind...]
        const size = keyPath[1];
        contentHeight = tokens.size?.icon?.[size];
      }
      if (
        value?.minHeight?.$value &&
        contentHeight?.$value &&
        value?.borderWidth?.$value !== undefined
      ) {
        if (
          value?.paddingY?.$value &&
          (!isReference(value?.paddingY?.$value) ||
            value?.paddingY?.$value.includes('base'))
        ) {
          let minHeight = value?.minHeight?.$value;
          let lineHeight = contentHeight?.$value;
          let borderWidth = value?.borderWidth?.$value;

          if (isReference(minHeight)) {
            minHeight = getValue(minHeight, tokens);
          }
          if (isReference(lineHeight)) {
            lineHeight = getValue(lineHeight, tokens);
          }
          if (isReference(borderWidth)) {
            borderWidth = getValue(borderWidth, tokens);
          }

          const paddingY = (minHeight - lineHeight - 2 * borderWidth) / 2;
          if (paddingY !== value.paddingY.$value)
            console.error(
              `🛑 ${keyPath.join('.')}: ${paddingY} does not match ${
                value.paddingY.$value
              }. Run paddingY:update if this change is expected.`,
            );
        }
      }
    }
    if (typeof value === 'object') return descend(value, tokens, keyPath);
  });
};

const TOKENS_DIR = 'tokens';
const tokenDirs = readdirSync(TOKENS_DIR, { withFileTypes: true })
  .filter((dir: any) => dir.isDirectory())
  .map((dir: any) => dir.name);

const tokens = tokenDirs
  .map(dir =>
    readdirSync(`${TOKENS_DIR}/${dir}`).map(
      file => `${TOKENS_DIR}/${dir}/${file}`,
    ),
  )
  .flat();

let allTokens = {};
tokens.forEach(file => {
  const raw = readFileSync(file.toString());
  const parsed = JSON.parse(raw.toString());
  allTokens = { ...allTokens, ...parsed };
});

const verifyPaddingY = (tokens: { [key: string]: any }) => {
  const allTokens = tokens;
  descend(tokens, allTokens);
};

const originalTokens = { ...allTokens };
verifyPaddingY(originalTokens);
