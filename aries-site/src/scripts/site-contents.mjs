import { readdir, readFile, mkdir, writeFile, access } from 'fs/promises';
import { resolve, sep } from 'path';

const SOURCE_DIRECTORY = `${process.cwd()}/src/pages`;
const OUT_DIRECTORY = `${process.cwd()}/src/data/search`;
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
          .replace(/-/g, ' '),
      );
      const parent = pathParts.pop();
      const filePath = file;
      let content = await readFile(file, 'utf-8');

      content = content
        // Tag headings with '~~' markup to indicate end of heading
        .replace(/#{1,} (...+?)(\n){1,}/g, p1 => `${p1}~~ `)
        // Remove line breaks symbols
        .replace(/(\n){1,}/g, ' ')
        // Remove import statements, Examples markup, and other markup
        // Search for "import " instead of "import"
        // so that words like "important" are not flagged
        // https://github.com/antonkc/MOR/blob/main/matchJsImports.md
        .replace(
          /(?:import[\s\n]*((?:([\s\n])type)?)(?=[\n\s*{])[\s\n]*)((?:(?:[_$\w][_$\w0-9]*)(?:[\s\n]+(?:as[\s\n]+(?:[_$\w][_$\w0-9]*)))?(?=(?:[\n\s]*,[\n\s]*[{*])|(?:[\n\s]+from)))?)[\s\n,]*((?:\*[\n\s]*(?:as[\s\n]+(?:[_$\w][_$\w0-9]*))(?=[\n\s]+from))?)[\s\n,]*((?:\{[n\s]*(?:(?:[_$\w][_$\w0-9]*)(?:[\s\n]+(?:as[\s\n]+(?:[_$\w][_$\w0-9]*)))?[\s\n]*,?[\s\n]*)*\}(?=[\n\s]*from))?)(?:[\s\n]*((?:from)?))[\s\n]*(?:["']([^"']*)(["']))[\s\n]*?;?|(<[^<>]+>)|<Example(...+?)(?<=Example>)|<!--(...+?)(?<=-->)|<ThemeContext.Extend(...+?)(?<=>)|<\/ThemeContext.Extend>|\[|\]|const(...+?)(?<=;)|<(...+?)(?<=>)|`{3}(...+?)(?<=`{3})/g,
          '',
        );

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
  console.log(
    `Directory named ${OUT_DIRECTORY} does not exist. Making it now.`,
  );
  mkdir(OUT_DIRECTORY);
}

writeFile(OUT_PATH, `export const siteContents = ${JSON.stringify(contents)};`);
