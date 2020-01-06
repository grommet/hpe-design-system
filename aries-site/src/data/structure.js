export const structure = {
  topics: [
    {
      name: 'Guidelines',
      pages: ['Principles', 'Human Centered', 'Philosophy'],
    },
    {
      name: 'Foundation',
      pages: [
        'Branding',
        'Color',
        'Typography',
        'Layout',
        'Iconography',
        'Tokens',
      ],
    },
    {
      name: 'Components',
      pages: [],
    },
    {
      name: 'Develop',
      pages: ['Code'],
    },
    {
      name: 'Design',
      pages: [],
    },
    {
      name: 'Resources',
      pages: ['Examples', 'Videos', 'Designer', 'Themer', 'Grommet'],
    },
  ],
};

export const formatName = name => {
  return name
    .split(' ')
    .join('-')
    .toLowerCase();
};

const gettopicName = itemName => {
  let topic;
  let item;
  structure.topics.forEach(s => {
    const { pages } = s;
    [item] = pages.filter(p => p === itemName);
    if (item) {
      topic = s.name;
    }
  });
  return topic;
};

export const nameToPath = name => {
  const topic = structure.topics.filter(s => s.name === name)[0];
  if (topic) {
    return `/${formatName(topic.name)}`;
  }
  // Item clicked is a sub-topic of a main topic, so we need to find
  // what topic it falls under
  const topicName = gettopicName(name);
  if (topicName) {
    return `/${formatName(topicName)}/${formatName(name)}`;
  }
  return undefined;
};
