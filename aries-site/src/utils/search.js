import { structure } from '../data';

export const formatName = name => {
  return name
    .split(' ')
    .join('-')
    .toLowerCase();
};

const getTopicName = itemName => {
  let topic;
  let item;
  let pageArray;
  structure.forEach(p => {
    if (p.pages) {
      pageArray = p.pages;
    }
    [item] = pageArray.filter(s => s === itemName);
    if (item) {
      topic = p.name;
    }
  });
  return topic;
};

export const nameToPath = name => {
  const [page] = structure.filter(p => p.name === name);
  if (page.pages) {
    return `/${formatName(page.name)}`;
  }
  // Item clicked is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  const topicName = getTopicName(name);
  if (topicName) {
    return `/${formatName(topicName)}/${formatName(name)}`;
  }
  return undefined;
};
