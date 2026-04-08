import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useInert } from '../src/useInert';

describe('useInert', () => {
  const createContainer = (innerHTML: string): HTMLDivElement => {
    const container = document.createElement('div');
    container.innerHTML = innerHTML;
    document.body.appendChild(container);
    return container;
  };

  const cleanup = (container: HTMLDivElement) => {
    document.body.removeChild(container);
  };

  it('returns a ref object', () => {
    const { result } = renderHook(() => useInert());
    expect(result.current).toHaveProperty('current');
  });

  it('sets tabindex="-1" on button elements', () => {
    const container = createContainer('<button>Click me</button>');
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(container.querySelector('button')?.getAttribute('tabindex')).toBe(
      '-1',
    );
    cleanup(container);
  });

  it('sets tabindex="-1" on input elements', () => {
    const container = createContainer('<input type="text" />');
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(container.querySelector('input')?.getAttribute('tabindex')).toBe(
      '-1',
    );
    cleanup(container);
  });

  it('sets tabindex="-1" on anchor elements', () => {
    const container = createContainer('<a href="#">Link</a>');
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(container.querySelector('a')?.getAttribute('tabindex')).toBe('-1');
    cleanup(container);
  });

  it('sets tabindex="-1" on select elements', () => {
    const container = createContainer(
      '<select><option>Option 1</option></select>',
    );
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(container.querySelector('select')?.getAttribute('tabindex')).toBe(
      '-1',
    );
    cleanup(container);
  });

  it('sets tabindex="-1" on textarea elements', () => {
    const container = createContainer('<textarea></textarea>');
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(container.querySelector('textarea')?.getAttribute('tabindex')).toBe(
      '-1',
    );
    cleanup(container);
  });

  it('sets tabindex="-1" on all focusable elements in a mixed container', () => {
    const container = createContainer(
      '<button>Btn</button><input /><a href="#">Link</a><select><option>O</option></select><textarea></textarea>',
    );
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    container
      .querySelectorAll('button, input, a, select, textarea')
      .forEach(el => {
        expect(el.getAttribute('tabindex')).toBe('-1');
      });
    cleanup(container);
  });

  it('does nothing when ref.current is null (initial state)', () => {
    expect(() => {
      renderHook(() => useInert());
    }).not.toThrow();
  });

  it('does not affect non-focusable elements', () => {
    const container = createContainer(
      '<div><span>Text</span><p>Para</p></div>',
    );
    renderHook(() => {
      const ref = useInert();
      (ref as React.MutableRefObject<HTMLDivElement>).current =
        container as unknown as HTMLDivElement;
      return ref;
    });
    expect(
      container.querySelector('span')?.getAttribute('tabindex'),
    ).toBeNull();
    expect(container.querySelector('p')?.getAttribute('tabindex')).toBeNull();
    cleanup(container);
  });
});
