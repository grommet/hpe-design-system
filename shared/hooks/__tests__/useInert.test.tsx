import { cleanup, render, screen, renderHook } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, describe, it, expect } from 'vitest';
import type { MutableRefObject } from 'react';
import { useInert } from '../src/useInert';

let originalInertDescriptor: PropertyDescriptor | undefined;

// Vitest runs this file in jsdom, and jsdom does not implement inert natively, 
// so tests need a minimal polyfill.
beforeAll(() => {
  originalInertDescriptor = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'inert');

  Object.defineProperty(HTMLElement.prototype, 'inert', {
    get() {
      return this.hasAttribute('inert');
    },
    set(value: boolean) {
      if (value) {
        this.setAttribute('inert', '');
      } else {
        this.removeAttribute('inert');
      }
    },
    configurable: true,
  });
});

// Restore the prototype to avoid leaking test-specific behavior to other files.
afterAll(() => {
  if (originalInertDescriptor) {
    Object.defineProperty(HTMLElement.prototype, 'inert', originalInertDescriptor);
  } else {
    Reflect.deleteProperty(
      HTMLElement.prototype as HTMLElement & { inert?: boolean },
      'inert',
    );
  }
});

afterEach(cleanup);


// Test components
const TestComponent = () => {
  const ref = useInert();
  return (
    <div ref={ref} data-testid="container">
      <button>Click me</button>
      <input type="text" placeholder="Type here" />
      <a href="/">Link</a>
      <select>
        <option>Option</option>
      </select>
      <textarea />
    </div>
  );
};

// Simulates a container that was already inert before the hook ran.
// Verifies the hook restores previous state rather than hardcoding false on cleanup.
const PreInertComponent = () => {
  const ref = useInert<HTMLDivElement>();
  return (
    <div
      ref={node => {
        if (node) node.inert = true;
        if (ref && typeof ref === 'object') {
          (ref as MutableRefObject<HTMLDivElement | null>).current = node;
        }
      }}
      data-testid="pre-inert-container"
    >
      <button>Pre-inert button</button>
    </div>
  );
};

const getContainer = () => screen.getByTestId('container');

// Tests
describe('useInert', () => {
  describe('return value', () => {
    it('returns a ref object with a current property', () => {
      const { result } = renderHook(() => useInert());
      expect(result.current).toHaveProperty('current');
    });

    it('returns null current before the ref attaches to a node', () => {
      const { result } = renderHook(() => useInert());
      expect(result.current.current).toBeNull();
    });
  });

  describe('inert behaviour on mount', () => {
    it('sets inert on the container after mount', () => {
      render(<TestComponent />);
      expect(getContainer().inert).toBe(true);
    });

    it('sets the inert attribute on the container element', () => {
      render(<TestComponent />);
      expect(getContainer().hasAttribute('inert')).toBe(true);
    });

    it('covers all descendants without setting tabindex on any of them', () => {
      render(<TestComponent />);
      const container = getContainer();

      // `inert` applies at the container level; descendants do not need tabindex changes.
      container
        .querySelectorAll('button, input, a, select, textarea')
        .forEach(el => {
          expect(el.hasAttribute('tabindex')).toBe(false);
        });
    });
  });

  describe('cleanup on unmount', () => {
    it('removes inert when the component unmounts', () => {
      const { unmount } = render(<TestComponent />);
      const container = getContainer();

      expect(container.inert).toBe(true);
      unmount();
      expect(container.inert).toBe(false);
    });

    it('restores a previously-true inert state on unmount rather than hardcoding false', () => {
      // Directly tests the `previous` snapshot logic in the hook.
      // If the container was already inert before the hook ran,
      // cleanup should restore true — not clear it to false.
      const { unmount } = render(<PreInertComponent />);
      const container = screen.getByTestId('pre-inert-container');

      expect(container.inert).toBe(true);
      unmount();
      expect(container.inert).toBe(true);
    });
  });

  describe('null ref guard', () => {
    it('does not throw when the ref is never attached to a DOM node', () => {
      expect(() => renderHook(() => useInert())).not.toThrow();
    });
  });
});