import { structure } from '../data';

const allPages = structure.map(p => p.name);
const allPageSections = structure
  .map(p => p.sections)
  .filter(Boolean)
  .reduce((acc, val) => acc.concat(val), []);

export const getSearchSuggestions = allPages.concat(allPageSections).sort();

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

export const getSectionParent = section =>
  structure.find(page =>
    page.sections ? page.sections.includes(section) : null,
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
  // Item selected is a main topic
  const [page] = structure.filter(p => p.name === name);
  if (typeof page !== 'undefined' && page.pages) {
    if (page.name === 'Home') {
      return '/';
    }
    return `/${formatName(page.name)}`;
  }

  // Item selected is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  const parent = getParentPage(name);
  if (typeof parent !== 'undefined') {
    return `/${formatName(parent.name)}/${formatName(name)}`;
  }

  // Item selected is a deeplink section, so need to get parent page
  // and parent page's path
  const sectionParent = getSectionParent(name);
  if (typeof sectionParent !== 'undefined') {
    return `${nameToPath(sectionParent.name)}#${formatName(name)}`;
  }

  return undefined;
};

export const getCards = cardCategory => {
  return structure
    .map(obj => {
      const page = obj;
      const parent = getParentPage(page.name);
      page.parent = parent;
      return page;
    })
    .filter(page => page.parent !== undefined)
    .filter(page =>
      cardCategory === undefined
        ? page.parent.name !== 'Home'
        : page.parent.name === cardCategory,
    );
};
