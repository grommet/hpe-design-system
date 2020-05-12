const matter = require('gray-matter');

const emptyRegExp = /^\s*$/;
const exampleRegexp = /^"example": "(.*)"/;

function getContents(m) {
  return m
    .split(/^{{("example":[^}]*)}}$/gm) // Split markdown into an array, separating examples
    .filter(c => !emptyRegExp.test(c)); // Remove empty lines
}

export const prepareMarkdown = fileContent => {
  const { content, data } = matter(fileContent.default);
  const filteredContent = getContents(content);
  const examples = {};
  const rendered = filteredContent.map(item => {
    if (examples && exampleRegexp.test(item)) {
      try {
        return JSON.parse(`{${item}}`);
      } catch (err) {
        console.error('JSON.parse fails with: ', `{${item}}`);
        console.error(err);
        return null;
      }
    }
    return item;
  });

  return { data, docs: rendered };
};
