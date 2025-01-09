export function green(msg: string) {
  return `\x1b[32m${msg}\x1b[0m`;
}

export function brightRed(msg: string) {
  return `\x1b[1;31m${msg}\x1b[0m`;
}

export function areSetsEqual<T>(a: Set<T>, b: Set<T>) {
  return a.size === b.size && [...a].every(item => b.has(item));
}

export const getThemeAndMode = (file: string) => {
  const parts = file.split('.');
  const themeAndMode = parts[parts.length - 2];
  let theme;
  let mode;
  if (themeAndMode.includes('-')) [theme, mode] = themeAndMode.split('-');
  else mode = themeAndMode;

  return [theme, mode];
};

export const access = (path: string, object: { [key: string]: any }) => {
  return path.split('.').reduce((o, i) => o?.[i], object);
};

export const isReference = (value: string) => /{.*}/.test(value);

export const nonComponentTokens: string[] = [
  'static',
  'base',
  'color',
  'TBD',
  'spacing',
  'radius',
  'borderWidth',
  'content',
  'text',
  'heading',
  'display',
  'paragraph',
  'shadow',
  'size',
  'fontStack',
  'breakpoint',
  'fontWeight',
  'focusIndicator',
];

export const numberToPixel = (value: number): string => `${value}px`;

/**
 * DEFAULT and REST are special terms to allow us to store design tokens
 * according to the Design Token spec. They should not be included in outputs.
 */
export const excludedNameParts = ['DEFAULT', 'REST'];

export const deepMerge = (
  obj1: { [x: string]: any },
  obj2: { [x: string]: any; hasOwnProperty: (arg0: string) => any },
) => {
  for (let key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (obj2[key] instanceof Object && obj1[key] instanceof Object) {
        obj1[key] = deepMerge(obj1[key], obj2[key]);
      } else {
        obj1[key] = obj2[key];
      }
    }
  }
  return obj1;
};
