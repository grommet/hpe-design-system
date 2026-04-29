import { describe, it, expect, vi } from 'vitest';
import { buildStructureIndexes } from '../../data/structureIndexes';
import {
  getCards,
  getPageDetails,
  getParentPage,
  getRelatedContent,
  getSearchSuggestions,
  getSectionParent,
  nameToPath,
  nameToSlug,
} from '../search';

vi.mock('../../data', () => {
  const structure = [
    {
      name: 'Home',
      pages: ['Components', 'Foundation', 'Learn'],
      sections: ['Overview'],
      seoDescription: 'Home',
    },
    {
      name: 'Components',
      pages: ['Button', 'Card', 'Layer'],
      seoDescription: 'Components',
    },
    {
      name: 'Foundation',
      pages: [],
      sections: ['Spacing'],
      seoDescription: 'Foundation',
    },
    {
      name: 'Learn',
      pages: ['Tshirt sizing'],
      seoDescription: 'Learn',
    },
    {
      name: 'Tshirt sizing',
      href: '/foundation/tshirt-sizing',
      seoDescription: 'Tshirt sizing',
    },
    {
      name: 'Button',
      relatedContent: ['Card'],
      seoDescription: 'Button',
    },
    {
      name: 'Card',
      pages: ['Call to action card', 'Navigational card'],
      seoDescription: 'Card',
    },
    {
      name: 'Call to action card',
      path: '/components/card/call-to-action-card',
      parentPage: 'Card',
      seoDescription: 'Call to action card',
    },
    {
      name: 'Navigational card',
      path: '/components/card/navigational-card',
      parentPage: 'Card',
      seoDescription: 'Navigational card',
    },
    {
      name: 'Layer',
      seoDescription: 'Layer',
    },
    {
      name: 'Templates',
      pages: ['Forms'],
      seoDescription: 'Templates',
    },
    {
      name: 'Forms',
      pages: ['Managing child objects'],
      seoDescription: 'Forms',
    },
    {
      name: 'Managing child objects',
      path: '/templates/forms/managing-child-objects',
      parentPage: 'Forms',
      seoDescription: 'Managing child objects',
    },
    {
      name: 'External docs',
      url: 'https://example.com/docs',
      seoDescription: 'External',
    },
  ];

  return {
    structure,
    structureIndexes: buildStructureIndexes(structure),
  };
});

describe('nameToSlug', () => {
  it('converts names to slugs', () => {
    expect(nameToSlug('Call to action card')).toBe('call-to-action-card');
    expect(nameToSlug('Button')).toBe('button');
  });
});

describe('getSearchSuggestions', () => {
  it('returns suggestions sorted alphabetically by label', () => {
    const labels = getSearchSuggestions().map(
      (item: { label: string }) => item.label,
    );
    expect(labels).toEqual([...labels].sort((a, b) => a.localeCompare(b)));
    expect(labels).toContain('Button');
    expect(labels).toContain('Foundation');
  });
});

describe('page lookup utilities', () => {
  it('getPageDetails performs case-insensitive lookup', () => {
    const details = getPageDetails('components') as { name: string };
    expect(details).toHaveProperty('name');
    expect(details.name).toBe('Components');
    expect(getPageDetails('missing')).toEqual({});
  });

  it('getParentPage finds the parent page for a child page', () => {
    expect(getParentPage('Button')?.name).toBe('Components');
    expect(getParentPage('Components')?.name).toBe('Home');
    expect(getParentPage('Unknown')).toBeUndefined();
  });

  it('getSectionParent finds section owner page', () => {
    expect(getSectionParent('Spacing')?.name).toBe('Foundation');
    expect(getSectionParent('Overview')?.name).toBe('Home');
    expect(getSectionParent('NotASection')).toBeUndefined();
  });
});

describe('nameToPath', () => {
  it('returns top-level and nested page paths', () => {
    expect(nameToPath('Home')).toBe('/');
    expect(nameToPath('Components')).toBe('/components');
    expect(nameToPath('Button')).toBe('/components/button');
    expect(nameToPath('Card')).toBe('/components/card');
    expect(nameToPath('Forms')).toBe('/templates/forms');
  });

  it('returns section anchor paths', () => {
    expect(nameToPath('Spacing')).toBe('/foundation#spacing');
  });

  it('returns external URL when page has url', () => {
    expect(nameToPath('External docs')).toBe('https://example.com/docs');
  });

  it('prefers internal href override over parent-based slug path', () => {
    expect(nameToPath('Tshirt sizing')).toBe('/foundation/tshirt-sizing');
  });

  it('resolves migrated explicit-path routes from structure data', () => {
    const explicitPathRoutes = [
      {
        name: 'Call to action card',
        path: '/components/card/call-to-action-card',
      },
      { name: 'Navigational card', path: '/components/card/navigational-card' },
      {
        name: 'Managing child objects',
        path: '/templates/forms/managing-child-objects',
      },
    ];

    explicitPathRoutes.forEach(route => {
      expect(nameToPath(route.name)).toBe(route.path);
    });
  });
});

describe('content helpers', () => {
  it('getCards returns descendants and supports category filter', () => {
    const allCards = getCards(undefined);
    const componentCards = getCards('Components');

    expect(allCards.map(card => card.name)).toEqual(
      expect.arrayContaining(['Button', 'Card']),
    );
    expect(componentCards.map(card => card.name)).toEqual(
      expect.arrayContaining(['Button', 'Card']),
    );
  });

  it('getRelatedContent maps related page names to objects', () => {
    const related = getRelatedContent('Button');
    expect(related).toHaveLength(1);
    expect(related[0]?.name).toBe('Card');
    expect(getRelatedContent('Card')).toEqual([]);
  });
});
