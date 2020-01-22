import { structure } from '../data';

export const formatName = name => {
  return name
    .split(' ')
    .join('-')
    .toLowerCase();
};

export const getPageDetails = pageName =>
  structure.find(page => page.name === pageName);

export const getParentPage = currentPage =>
  structure.find(page =>
    page.pages ? page.pages.includes(currentPage) : null,
  );

export const getNextContent = current => {
  // Returns next sibling, parent's next sibling, or self if page has no parent
  const parent = getParentPage(current);

  if (typeof parent === 'undefined') {
    return current;
  }

  const { pages } = parent;
  const currentIndex = pages.indexOf(current);

  return currentIndex + 1 < pages.length
    ? pages[currentIndex + 1]
    : getNextContent(parent.name);
};

export const nameToPath = name => {
  const [page] = structure.filter(p => p.name === name);

  if (typeof page === 'undefined') {
    return undefined;
  }

  if (page.pages) {
    return `/${formatName(page.name)}`;
  }

  // Item clicked is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  const parent = getParentPage(name);

  if (typeof parent === 'undefined') {
    return undefined;
  }

  const topicName = parent.name;

  if (topicName) {
    return `/${formatName(topicName)}/${formatName(name)}`;
  }
  return undefined;
};
