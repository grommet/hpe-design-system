import { readdir, readFile, mkdir, writeFile, access } from 'fs/promises';
import { resolve, sep } from 'path';

const SOURCE_DIRECTORY = `${process.cwd()}/src/pages`;
const OUT_DIRECTORY = `${process.cwd()}/src/data/search`;
const OUT_PATH = `${OUT_DIRECTORY}/contentForSearch.js`;
const NAV_OUT_PATH = `${OUT_DIRECTORY}/contentForNav.js`;

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
      let pathname = file.split('/');
      pathname = pathname
        .slice(pathname.indexOf('pages') + 1)
        .filter(p => !['index.js', 'index.mdx'].includes(p))
        .join('/')
        .replace(/\..*/, ''); // get rid of file extension
      let content = await readFile(file, 'utf-8');

      content = content
        // Tag headings with '~~' markup to indicate end of heading
        .replace(/#{1,} (...+?)(\n){1,}/g, p1 => `${p1}~~ `)
        // Remove line breaks symbols
        .replace(/(\n){1,}/g, ' ')
        // Remove import statements, Examples markup, and other markup
        // Search for "import " instead of "import"
        // so that words like "important" are not flagged
        .replace(
          /(import ...+?(?<=;))|(<[^<>]+>)|<Example(...+?)(?<=Example>)|<!--(...+?)(?<=-->)|<ThemeContext.Extend(...+?)(?<=>)|<\/ThemeContext.Extend>|\[|\]|const(...+?)(?<=;)|<(...+?)(?<=>)|`{3}(...+?)(?<=`{3})/g,
          '',
        );

      return { name, parent, path: filePath, content, pathname };
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
writeFile(
  NAV_OUT_PATH,
  `export const navItems = [${contents
    .map(page =>
      ![
        '404',
        '_app',
        '_document',
        'index',
        'showmore',
        'whats-new',
        'feedback',
        '',
      ].includes(page.pathname)
        ? `"${page.pathname}" `
        : undefined,
    )
    .filter(p => p)}];\n`,
);
