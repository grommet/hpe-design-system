import { structure } from '../data';

const allPages = structure.map(page => ({
  label: page.name,
  value: { ...page, title: page.name },
}));

// With content search, sections are already included,
// so we don't need to double search them.
export const getSearchSuggestions = allPages.sort((a, b) => {
  const aLabel = a.label.toLowerCase();
  const bLabel = b.label.toLowerCase();
  if (aLabel < bLabel) return -1;
  if (aLabel > bLabel) return 1;
  return 0;
});

// String to slug from https://gist.github.com/hagemann/382adfc57adbd5af078dc93feef01fe1#file-slugify-js
export const nameToSlug = name => {
  const a = `àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűų
  ẃẍÿýžźż·/_,:;`;
  const b = `aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuu
  wxyyzzz------`;
  const p = new RegExp(a.split('').join('|'), 'g');

  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w-]+/g, '') // Remove all non-word characters
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

export const getPageDetails = pageName =>
  structure.find(
    page =>
      page.name &&
      pageName &&
      page.name.toLowerCase() === pageName.toLowerCase(),
  ) || {
    name: 'Page Not Found', // necessary for 404
  };

export const getParentPage = currentPage =>
  structure.find(page =>
    page.pages ? page.pages.includes(currentPage) : null,
  );

export const getSectionParent = section =>
  structure.find(page =>
    page.sections ? page.sections.includes(section) : null,
  );

export const nameToPath = name => {
  // if a page defines its own url, then it is an external link
  const external = structure.filter(
    e => e.name.toLowerCase() === name.toLowerCase() && e.url,
  )[0];
  if (external) {
    return external.url;
  }

  // Item selected is a main topic
  const [page] = structure.filter(
    p => p.name.toLowerCase() === name.toLowerCase(),
  );
  if (typeof page !== 'undefined' && page.pages) {
    if (page.name === 'Home') {
      return '/';
    }
    return `/${nameToSlug(page.name)}`;
  }

  // Item selected is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  const parent = getParentPage(name);
  if (typeof parent !== 'undefined') {
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
  structure
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
  const relatedContent = structure.find(
    page => page.name.toLowerCase() === pageName.toLowerCase(),
  )?.relatedContent;
  return typeof relatedContent !== 'undefined'
    ? relatedContent.map(page => structure.find(obj => obj.name === page))
    : [];
};
