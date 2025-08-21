import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStorage } from '@shared/hooks/useSessionStorage';

describe('useSessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('should initialize with the initial value', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

    expect(result.current[0]).toBe('initialValue');
  });

  it('should set and get a value from sessionStorage', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

    act(() => {
      result.current[1]('newValue');
    });

    expect(result.current[0]).toBe('newValue');
    expect(sessionStorage.getItem('key')).toBe(JSON.stringify('newValue'));
  });

  it('should return the stored value if it exists in sessionStorage', () => {
    sessionStorage.setItem('key', JSON.stringify('storedValue'));
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

    expect(result.current[0]).toBe('storedValue');
  });

  it('should handle function updates', () => {
    const { result } = renderHook(() => useSessionStorage('key', 0));

    act(() => {
      result.current[1](prev => prev + 1);
    });

    expect(result.current[0]).toBe(1);
    expect(sessionStorage.getItem('key')).toBe(JSON.stringify(1));
  });

  it('should handle storage events', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

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
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'key', newValue: null }),
      );
    });

    expect(result.current[0]).toBe('initialValue');
  });

  it('should not update if the key of the storage event does not match', () => {
    const { result } = renderHook(() =>
      useSessionStorage('key', 'initialValue'),
    );

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
