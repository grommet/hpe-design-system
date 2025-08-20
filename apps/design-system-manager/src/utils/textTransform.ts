const sentenceCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};

const kebabCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};

const pascalCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match) => match.toUpperCase())
    .replace(/\s+/g, "");
};

const snakeCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^a-z0-9_]/g, "");
};

const titleCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/\b\w/g, (match) => match.toUpperCase())
    .replace(/_/g, " ")
    .replace(/-/g, " ");
};

const upperCase = (str: string): string => {
  return str.toUpperCase();
};

const lowerCase = (str: string): string => {
  return str.toLowerCase();
};

export {
  sentenceCase,
  kebabCase,
  pascalCase,
  snakeCase,
  titleCase,
  upperCase,
  lowerCase,
};
