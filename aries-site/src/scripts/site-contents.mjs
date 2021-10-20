import { readdir, readFile, mkdir, writeFile, access } from 'fs/promises';
import { resolve, sep } from 'path';

const SOURCE_DIRECTORY = 'src/pages';
const OUT_DIRECTORY = 'src/data/search';
const OUT_PATH = `${OUT_DIRECTORY}/contentForSearch.js`;

const toTitleCase = str =>
  str
    .toLowerCase()
    .split(' ')
    .map(word => word.replace(word[0], word[0].toUpperCase()))
    .join(' ');

const getFiles = async dir => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const result = resolve(dir, entry.name);
      return entry.isDirectory() ? getFiles(result) : result;
    }),
  );
  return Array.prototype.concat(...files);
};

const mapContent = async files => {
  const contents = await Promise.all(
    files.map(async file => {
      const pathParts = file.split(sep);
      const name = toTitleCase(
        pathParts
          .pop()
          .replace(/.mdx|.js/, '')
          .replace('-', ' '),
      );
      const parent = pathParts.pop();
      const filePath = file;
      let content = await readFile(file, 'utf-8');
      // Tag headings with '////' markup to indicate end of heading
      // Remove line breaks symbols
      // Remove import statements and Examples markup
      content = content
        .replace(/#{1,} (...+?)(\n){2}/g, p1 => `${p1}////`)
        .replace(/(\n){1,}/g, ' ')
        .replace(/import(...+?)(?<=;)|<Example(...+?)(?<=Example>)/g, '');

      return { name, parent, path: filePath, content };
    }),
  );
  return contents;
};

const contents = await getFiles(SOURCE_DIRECTORY).then(files =>
  mapContent(files),
);

try {
  await access(OUT_DIRECTORY);
} catch {
  console.log('Directory does not exist. Making it now.');
  mkdir(OUT_DIRECTORY);
}

writeFile(OUT_PATH, `export const siteContents = ${JSON.stringify(contents)};`);
