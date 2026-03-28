import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useLocalStorage } from '../src/useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    let store: Record<string, string> = {};

    const mockLocalStorage: Storage = {
      getItem(key: string): string | null {
        return Object.prototype.hasOwnProperty.call(store, key) ? store[key] : null;
      },
      setItem(key: string, value: string): void {
        store[key] = String(value);
      },
      removeItem(key: string): void {
        delete store[key];
      },
      clear(): void {
        store = {};
      },
      key(index: number): string | null {
        const keys = Object.keys(store);
        return index >= 0 && index < keys.length ? keys[index] : null;
      },
      get length(): number {
        return Object.keys(store).length;
      },
    };

    Object.defineProperty(window, 'localStorage', {
      value: mockLocalStorage,
      writable: true,
      configurable: true,
    });
    localStorage.clear();
  });

  it('should initialize with the initial value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    expect(result.current[0]).toBe('initialValue');
  });

  it('should set and get a value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(localStorage.getItem('key')).toBe(JSON.stringify('newValue'));
  });

  it('should return the stored value if it exists in localStorage', () => {
    localStorage.setItem('key', JSON.stringify('storedValue'));
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    expect(result.current[0]).toBe('storedValue');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useLocalStorage('key', 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(localStorage.getItem('key')).toBe(JSON.stringify(1));
  });

  it('should handle multiple functional updates in a single act', () => {
    const { result } = renderHook(() => useLocalStorage('key', 0));

    act(() => {
      result.current[1](prev => prev + 1);
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(2);
    expect(localStorage.getItem('key')).toBe(JSON.stringify(2));
  });
  it('should handle storage events', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'key',
          newValue: JSON.stringify('eventValue'),
        }),
      );
    });

    expect(result.current[0]).toBe('eventValue');
  });

  it('should reset to initial value if storage event newValue is null', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'key', newValue: null }),
      );
    });

    expect(result.current[0]).toBe('initialValue');
  });

  it('should not update if the key of the storage event does not match', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initialValue'));

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', {
          key: 'otherKey',
          newValue: JSON.stringify('eventValue'),
        }),
      );
    });

    expect(result.current[0]).toBe('initialValue');
  });
});
