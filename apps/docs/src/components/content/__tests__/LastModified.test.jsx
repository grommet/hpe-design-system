// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Grommet } from 'grommet';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LastModified } from '../LastModified';
import { SubsectionText } from '../SubsectionText';

const router = vi.hoisted(() => ({
  pathname: '/components/button',
  query: {},
}));

vi.mock('../../../layouts', () => ({
  TEXT_SIZE: { 2: 'medium' },
}));

vi.mock('next/router', () => ({
  useRouter: () => router,
}));

vi.mock('../../../data/generated/mdxLastModified.json', () => ({
  default: {
    '/components/button': '2026-10-22T23:30:00.000Z',
    '/components/card': '2025-01-01T00:30:00.000Z',
    '/whats-new': '2024-06-10T12:00:00.000Z',
  },
}));

const renderDate = (themeMode = 'light') => {
  const container = document.createElement('div');
  container.innerHTML = renderToStaticMarkup(
    <Grommet themeMode={themeMode}>
      <LastModified />
    </Grommet>,
  );
  return container;
};

beforeEach(() => {
  router.pathname = '/components/button';
});

describe('LastModified', () => {
  it.each(['light', 'dark'])(
    'renders a readable date and semantic timestamp in %s mode',
    themeMode => {
      const container = renderDate(themeMode);
      expect(container.textContent).toBe('Last modified: October 22, 2026');
      expect(container.querySelector('time')?.getAttribute('datetime')).toBe(
        '2026-10-22T23:30:00.000Z',
      );
      expect(container.querySelectorAll('time')).toHaveLength(1);
    },
  );

  it('uses the correct date when navigating to a nested index route', () => {
    expect(renderDate().textContent).toContain('October 22, 2026');
    router.pathname = '/components/card';
    expect(renderDate().textContent).toBe('Last modified: January 1, 2025');
  });

  it('supports the custom MDX Whats New page', () => {
    router.pathname = '/whats-new';
    expect(renderDate().textContent).toBe('Last modified: June 10, 2024');
  });

  it.each([undefined, 'Passed WCAG 2.2 AA'])(
    'places the date after the description and optional WCAG tag (%s)',
    accessibility => {
      const container = document.createElement('div');
      container.innerHTML = renderToStaticMarkup(
        <Grommet>
          <SubsectionText
            accessibility={accessibility}
            footer={<LastModified margin="none" />}
          >
            Page description
          </SubsectionText>
        </Grommet>,
      );

      const date = container.querySelector('time').parentElement;
      const content = Array.from(date.parentElement.children)
        .map(child => child.textContent)
        .filter(Boolean);
      expect(content).toEqual([
        'Page description',
        ...(accessibility ? [accessibility] : []),
        'Last modified: October 22, 2026',
      ]);
      expect(date.parentElement.lastElementChild).toBe(date);
      expect(container.querySelectorAll('time')).toHaveLength(1);
    },
  );

  it.each(['/', '/components', '/design-tokens/all-design-tokens', '/404'])(
    'does not render a timestamp for non-MDX route %s',
    pathname => {
      router.pathname = pathname;
      expect(renderDate().querySelector('time')).toBeNull();
      expect(renderDate().textContent).toBe('');
    },
  );
});
