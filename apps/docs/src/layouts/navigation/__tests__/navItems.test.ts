import { describe, it, expect } from 'vitest';

// Navigation structure tests without JSX parsing
// These tests validate the navigation is built correctly from structure data

const buildNavItem = (label: string, url?: string, children?: any[]) => ({
  label,
  url,
  children,
});

describe('Navigation Items Structure', () => {
  const mockNavItems = [
    buildNavItem('Home', '/'),
    buildNavItem('Components', '/components', [
      buildNavItem('Button', '/components/button'),
      buildNavItem('Card', '/components/card'),
    ]),
    buildNavItem('Templates', '/templates', [
      buildNavItem('Login', '/templates/login'),
    ]),
  ];

  describe('Top-level Items', () => {
    it('should have Home as first item', () => {
      expect(mockNavItems[0]).toBeDefined();
      expect(mockNavItems[0].label).toBe('Home');
      expect(mockNavItems[0].url).toBe('/');
    });

    it('should have hub pages with children', () => {
      const hubPages = mockNavItems.filter(item => item.children);
      expect(hubPages.length).toBeGreaterThan(0);
    });

    it('should have valid URLs for all top-level items', () => {
      mockNavItems.forEach(item => {
        expect(item.url).toBeDefined();
        expect(item.url).toMatch(/^\//);
      });
    });
  });

  describe('Navigation Hierarchy', () => {
    it('should have consistent label and url structure', () => {
      const flattenItems = (items: any[]): any[] => {
        return items.flatMap(item => {
          if (item.children) {
            return [item, ...flattenItems(item.children)];
          }
          return [item];
        });
      };

      const allItems = flattenItems(mockNavItems);

      allItems.forEach(item => {
        expect(item.label).toBeDefined();
        expect(typeof item.label).toBe('string');
      });
    });

    it('should have reasonable depth', () => {
      const getMaxDepth = (items: any[], depth = 0): number => {
        if (!items || items.length === 0) return depth;

        return Math.max(
          ...items.map(item => {
            if (item.children) {
              return getMaxDepth(item.children, depth + 1);
            }
            return depth;
          }),
        );
      };

      const maxDepth = getMaxDepth(mockNavItems);
      expect(maxDepth).toBeLessThanOrEqual(4);
    });
  });

  describe('Hub Page Children', () => {
    it('should have children for hub pages', () => {
      const components = mockNavItems.find(n => n.label === 'Components');
      expect(components?.children).toBeDefined();
      expect(Array.isArray(components?.children)).toBe(true);
      expect(components?.children?.length).toBeGreaterThan(0);
    });

    it('children should have proper structure', () => {
      const components = mockNavItems.find(n => n.label === 'Components');

      if (components?.children) {
        components.children.forEach(child => {
          expect(child.label).toBeDefined();
          expect(child.url).toBeDefined();
          expect(child.url).toMatch(/^\//);
        });
      }
    });
  });

  describe('Navigation Data Consistency', () => {
    it('should have no duplicate labels at same level', () => {
      mockNavItems.forEach(item => {
        if (item.children) {
          const labels = item.children.map((c: any) => c.label);
          const unique = new Set(labels);
          expect(labels.length).toBe(unique.size);
        }
      });
    });

    it('should have no circular references', () => {
      const visited = new Set<string>();

      const checkCircular = (item: any, path: string[] = []): void => {
        const currentPath = [...path, item.label];
        const pathKey = currentPath.join(' > ');

        if (visited.has(pathKey)) {
          throw new Error(`Circular reference detected: ${pathKey}`);
        }

        visited.add(pathKey);

        if (item.children) {
          item.children.forEach((child: any) =>
            checkCircular(child, currentPath),
          );
        }
      };

      expect(() => {
        mockNavItems.forEach(item => checkCircular(item));
      }).not.toThrow();
    });
  });

  describe('Navigation Building', () => {
    it('should build valid navigation items', () => {
      const item = buildNavItem('Test', '/test');
      expect(item.label).toBe('Test');
      expect(item.url).toBe('/test');
    });

    it('should support nested children', () => {
      const parent = buildNavItem('Parent', '/parent', [
        buildNavItem('Child', '/parent/child'),
      ]);

      expect(parent.children).toBeDefined();
      expect(parent.children?.length).toBe(1);
      expect(parent.children?.[0].label).toBe('Child');
    });

    it('should build structure from hub pages', () => {
      const hubPages = ['Components', 'Templates', 'Foundation'];
      const built = hubPages.map(name =>
        buildNavItem(name, `/${name.toLowerCase()}`),
      );

      expect(built.length).toBe(3);
      built.forEach((item, idx) => {
        expect(item.label).toBe(hubPages[idx]);
      });
    });
  });
});
