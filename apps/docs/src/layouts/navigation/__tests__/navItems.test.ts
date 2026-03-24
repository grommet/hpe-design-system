import { describe, it, expect, vi } from 'vitest';

vi.mock('../../../components', () => ({
  IconCircle: () => null,
  IconDiamond: () => null,
  IconSquare: () => null,
  IconExtend: () => null,
  IconTriangle: () => null,
}));

vi.mock('../../../examples', () => ({}));

import { structure } from '../../../data';
import { getPageDetails, nameToPath } from '../../../utils/search';

type NavPage = {
  name: string;
  pages?: string[];
  href?: string;
};

const realStructure = structure as NavPage[];

describe('Navigation Data Integration', () => {
  it('Home should define all primary hub pages', () => {
    const home = getPageDetails('Home') as NavPage;

    expect(home.pages).toBeDefined();
    expect(home.pages?.length).toBeGreaterThan(0);

    home.pages?.forEach(pageName => {
      const page = getPageDetails(pageName) as NavPage;
      expect(page.name, `Home page reference not found: ${pageName}`).toBe(
        pageName,
      );
    });
  });

  it('hub pages should resolve to valid top-level paths', () => {
    const home = getPageDetails('Home') as NavPage;

    home.pages?.forEach(hubPageName => {
      const path = nameToPath(hubPageName);
      expect(path, `${hubPageName} should resolve a path`).toBeDefined();
      expect(path).toMatch(/^\//);
      expect(path).not.toContain('#');
    });
  });

  it('hub page child pages should resolve to valid links', () => {
    const home = getPageDetails('Home') as NavPage;

    home.pages?.forEach(hubPageName => {
      const hubPage = getPageDetails(hubPageName) as NavPage;
      expect(hubPage.pages).toBeDefined();

      hubPage.pages?.forEach(childName => {
        const child = getPageDetails(childName) as NavPage;
        expect(child.name, `${hubPageName} child not found: ${childName}`).toBe(
          childName,
        );

        const childPath = child.href || nameToPath(child.name);
        expect(
          childPath,
          `${hubPageName} > ${childName} should resolve a link`,
        ).toBeDefined();
        expect(childPath).toMatch(/^(\/|https?:\/\/)/);
      });
    });
  });

  it('should not duplicate child page names within a hub page', () => {
    const home = getPageDetails('Home') as NavPage;

    home.pages?.forEach(hubPageName => {
      const hubPage = getPageDetails(hubPageName) as NavPage;
      const childNames = hubPage.pages || [];
      const uniqueChildNames = new Set(childNames);
      expect(
        childNames.length,
        `${hubPageName} contains duplicate child page references`,
      ).toBe(uniqueChildNames.size);
    });
  });

  it('should have no duplicate primary page names', () => {
    const primaryPages = realStructure.filter(page => !page.href);
    const names = primaryPages.map(page => page.name);
    const uniqueNames = new Set(names);

    expect(
      names.length,
      `Duplicate primary page names: ${names
        .filter((name, index) => names.indexOf(name) !== index)
        .join(', ')}`,
    ).toBe(uniqueNames.size);
  });
});
