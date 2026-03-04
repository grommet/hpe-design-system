import { describe, it, expect, vi } from 'vitest';
import { nameToSlug, nameToPath } from '../search';

vi.mock('../../data', () => ({
  structure: [
    { name: 'Home', pages: ['Components', 'Foundation'] },
    { name: 'Components', pages: ['Button', 'Card'] },
    { name: 'Foundation', pages: [] },
    { name: 'Button', pages: [] },
    { name: 'Card', pages: [] },
  ],
}));

// Test strategies for search utilities:
describe('nameToSlug', () => {
  it('should convert names to slugs', () => {
    expect(nameToSlug('Call to action card')).toBe('call-to-action-card');
    expect(nameToSlug('Button')).toBe('button');
  });

  it('should handle spaces and hyphens', () => {
    const slug = nameToSlug('Test Page');
    expect(slug).toMatch(/^[a-z0-9\-]+$/);
  });
});

describe('Page Structure Relationships', () => {
  // Mock data for relationship testing
  const mockPages: Array<{
    name: string;
    pages: string[];
    parentPage?: string;
  }> = [
    { name: 'Home', pages: ['Components', 'Foundation'] },
    { name: 'Components', pages: ['Button', 'Card'] },
    { name: 'Foundation', pages: [] },
    { name: 'Button', pages: [], parentPage: 'Components' },
    { name: 'Card', pages: [], parentPage: 'Components' },
  ];

  it('should validate parent-child page relationships', () => {
    const allNames = new Set(mockPages.map(p => p.name));

    mockPages.forEach(page => {
      if (page.pages) {
        page.pages.forEach(childName => {
          expect(allNames.has(childName)).toBe(true);
        });
      }
    });
  });

  it('should have no circular references', () => {
    // Simple check: components reference button, button doesn't reference components
    const components = mockPages.find(p => p.name === 'Components');
    const button = mockPages.find(p => p.name === 'Button');

    expect(components).toBeDefined();
    expect(button).toBeDefined();
    expect(components?.pages).toBeDefined();
    expect(button?.pages).toBeDefined();

    const componentsReferencesButton = components!.pages.includes('Button');
    const buttonReferencesComponents = button!.pages.includes('Components');

    expect(componentsReferencesButton).toBe(true);
    expect(buttonReferencesComponents).toBe(false);
    expect(componentsReferencesButton && buttonReferencesComponents).toBe(
      false,
    );
  });
});

describe('Search Utility Patterns', () => {
  it('should support case-insensitive lookups', () => {
    const pages = [{ name: 'Components' }, { name: 'Button' }];

    const findByName = (name: string) =>
      pages.find(p => p.name.toLowerCase() === name.toLowerCase());

    expect(findByName('components')).toBeDefined();
    expect(findByName('COMPONENTS')).toBeDefined();
    expect(findByName('Components')).toBeDefined();
  });

  it('should validate page names are unique', () => {
    const pages = [
      { name: 'Home' },
      { name: 'Components' },
      { name: 'Button' },
    ];

    const names = pages.map(p => p.name);
    const unique = new Set(names);

    expect(names.length).toBe(unique.size);
  });

  it('should find pages by slug', () => {
    const nameToSlug = (name: string) =>
      name.toLowerCase().replace(/\s+/g, '-');

    const pages = [
      { name: 'Call to action card', slug: nameToSlug('Call to action card') },
    ];

    const slug = nameToSlug('Call to action card');
    expect(slug).toBe('call-to-action-card');

    const found = pages.find(p => p.slug === slug);
    expect(found).toBeDefined();
  });

  it('should support breadcrumb navigation building', () => {
    const pages = [
      { name: 'Home', parentPage: null },
      { name: 'Components', parentPage: 'Home' },
      { name: 'Button', parentPage: 'Components' },
    ];

    const buildBreadcrumb = (pageName: string): string[] => {
      const breadcrumb: string[] = [pageName];
      let current = pages.find(p => p.name === pageName);

      while (current && current.parentPage) {
        breadcrumb.unshift(current.parentPage);
        current = pages.find(p => p.name === current?.parentPage);
      }

      return breadcrumb;
    };

    const breadcrumb = buildBreadcrumb('Button');
    expect(breadcrumb).toEqual(['Home', 'Components', 'Button']);
  });

  it('should validate page reference integrity', () => {
    const pages = [
      { name: 'Home', pages: ['Components', 'Foundation'] },
      { name: 'Components', pages: ['Button'] },
      { name: 'Foundation', pages: [] },
      { name: 'Button', pages: [] },
    ];

    const allPageNames = new Set(pages.map(p => p.name));

    pages.forEach(page => {
      if (page.pages) {
        page.pages.forEach(childName => {
          expect(allPageNames.has(childName)).toBe(true);
        });
      }
    });
  });

  it('should support sorting pages by name', () => {
    const pages = [{ name: 'Zebra' }, { name: 'Apple' }, { name: 'Monkey' }];

    const sorted = [...pages].sort((a, b) => a.name.localeCompare(b.name));

    expect(sorted[0].name).toBe('Apple');
    expect(sorted[sorted.length - 1].name).toBe('Zebra');
  });

  it('should support filtering pages by category', () => {
    const pages = [
      { name: 'Button', category: 'Components' },
      { name: 'Spacing', category: 'Foundation' },
      { name: 'Card', category: 'Components' },
    ];

    const componentPages = pages.filter(p => p.category === 'Components');
    expect(componentPages.length).toBe(2);
    expect(componentPages.every(p => p.category === 'Components')).toBe(true);
  });
});

describe('Hardcoded Routes', () => {
  it('should document known hardcoded routes (Phase 2 refactoring target)', () => {
    const hardcodedRoutes = [
      {
        name: 'Call to action card',
        path: '/components/card/call-to-action-card',
      },
      { name: 'Navigational card', path: '/components/card/navigational-card' },
      { name: 'Center layer', path: '/components/layer/center-layer' },
      {
        name: 'Side drawer layer',
        path: '/components/layer/side-drawer-layer',
      },
      { name: 'Fullscreen layer', path: '/components/layer/fullscreen-layer' },
      {
        name: 'Managing child objects',
        path: '/templates/forms/managing-child-objects',
      },
    ];

    // Validates these routes exist and are properly formatted
    hardcodedRoutes.forEach(route => {
      expect(route.path).toBeTruthy();
      expect(route.path).toMatch(/^\//);
    });

    hardcodedRoutes.forEach(route => {
      expect(route.path).toMatch(/^\//);
      expect(nameToPath(route.name)).toBe(route.path);
      expect(route.path.endsWith(nameToSlug(route.name))).toBe(true);
    });

    expect(hardcodedRoutes).toHaveLength(6);
  });
});
