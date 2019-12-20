export const structure = {
  sections: [
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

const getSectionName = itemName => {
  let section;
  let item;
  structure.sections.forEach(s => {
    const { pages } = s;
    [item] = pages.filter(p => p === itemName);
    if (item) {
      section = s.name;
    }
  });
  return section;
};

export const nameToPath = name => {
  const section = structure.sections.filter(s => s.name === name)[0];
  if (section) {
    return `/${formatName(section.name)}`;
  }
  // Item clicked is a sub-topic of a main section, so we need to find
  // what section it falls under
  const sectionName = getSectionName(name);
  if (sectionName) {
    return `/${formatName(sectionName)}/${formatName(name)}`;
  }
  return undefined;
};
