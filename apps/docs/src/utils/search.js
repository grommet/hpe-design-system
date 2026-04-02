import * as data from '../data';
import {
  buildStructureIndexes,
  getPathOverride,
  getPrimaryPageByName,
  nameToSlug,
} from '../data/structureIndexes';

let cachedStructureIndexes;
let cachedSearchSuggestions;

const getStructure = () => data.structure || [];

const getStructureIndexes = () => {
  if (!cachedStructureIndexes) {
    cachedStructureIndexes =
      data.structureIndexes || buildStructureIndexes(getStructure());
  }

  return cachedStructureIndexes;
};

const buildSearchSuggestions = () =>
  getStructure()
    .map(page => ({
      label: page.name,
      value: { ...page, title: page.name },
    }))
    .sort((a, b) => {
      const aLabel = a.label.toLowerCase();
      const bLabel = b.label.toLowerCase();
      if (aLabel < bLabel) return -1;
      if (aLabel > bLabel) return 1;
      return 0;
    });

// With content search, sections are already included,
// so we don't need to double search them.
export const getSearchSuggestions = () => {
  if (!cachedSearchSuggestions) {
    cachedSearchSuggestions = buildSearchSuggestions();
  }

  return cachedSearchSuggestions;
};

export { nameToSlug };

export const getPageDetails = pageName =>
  getPrimaryPageByName(pageName, getStructureIndexes()) || {};

export const getParentPage = currentPage =>
  getStructureIndexes().parentByChild[currentPage];

export const getSectionParent = section =>
  getStructureIndexes().bySection[section];

export const nameToPath = name => {
  const page = getPageDetails(name);
  const parent = getParentPage(name);

  const pathOverride = getPathOverride(page);
  if (pathOverride) return pathOverride;

  // Item selected is a main topic
  if (page.pages) {
    if (page.name === 'Home') {
      return '/';
    }
    if (typeof parent !== 'undefined' && parent.name !== 'Home') {
      return `/${nameToSlug(parent.name)}/${nameToSlug(name)}`;
    }
    return `/${nameToSlug(page.name)}`;
  }

  // Item selected is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  if (typeof parent !== 'undefined') {
    if (parent.name === 'Home') {
      return `/${nameToSlug(name)}`;
    }
    return `/${nameToSlug(parent.name)}/${nameToSlug(name)}`;
  }

  // Item selected is a deeplink section, so need to get parent page
  // and parent page's path
  const sectionParent = getSectionParent(name);
  if (typeof sectionParent !== 'undefined') {
    return `${nameToPath(sectionParent.name)}#${nameToSlug(name)}`;
  }

  return undefined;
};

/*
 * Returns an array of page objects which are decendents of the
 * provided cardCategory. Where cardCategory is a string.
 */
export const getCards = cardCategory =>
  getStructure()
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

/*
 * Returns an array of page objects which are members of the
 * provided pageName object's relatedContent property. Where
 * pageName is a string.
 */
export const getRelatedContent = pageName => {
  const structure = getStructure();
  const relatedContent = structure.find(
    page => page.name.toLowerCase() === pageName.toLowerCase(),
  )?.relatedContent;
  return typeof relatedContent !== 'undefined'
    ? relatedContent.map(page => structure.find(obj => obj.name === page))
    : [];
};
