import { renderHook, act } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { AnnounceContext } from 'grommet';
import { ConfirmationProvider, useConfirmation } from '../src/useConfirmation';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const renderWithProviders =
  (mockAnnounce: Mock) =>
  ({ children }: { children: ReactNode }) =>
    (
      <AnnounceContext.Provider value={mockAnnounce}>
        <ConfirmationProvider>{children}</ConfirmationProvider>
      </AnnounceContext.Provider>
    );

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('useConfirmation', () => {
  describe('when used outside ConfirmationProvider', () => {
    it('throws a descriptive error', () => {
      // Suppress React's own console.error noise for expected throws
      const consoleError = vi
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      expect(() => renderHook(() => useConfirmation())).toThrow(
        'useConfirmation must be used within a ConfirmationProvider',
      );

      consoleError.mockRestore();
    });
  });

  describe('within ConfirmationProvider', () => {
    let mockAnnounce: ReturnType<typeof vi.fn>;

    beforeEach(() => {
      mockAnnounce = vi.fn();
    });

    // -----------------------------------------------------------------------
    // Initial state
    // -----------------------------------------------------------------------

    it('initialises with all state values set to false', () => {
      const { result } = renderHook(() => useConfirmation(), {
        wrapper: renderWithProviders(mockAnnounce),
      });

      expect(result.current.touched).toBe(false);
      expect(result.current.showConfirmation).toBe(false);
      expect(result.current.showLayer).toBe(false);
    });

    // -----------------------------------------------------------------------
    // Direct state setters
    // -----------------------------------------------------------------------

    it('updates touched via setTouched', () => {
      const { result } = renderHook(() => useConfirmation(), {
        wrapper: renderWithProviders(mockAnnounce),
      });

      act(() => {
        result.current.setTouched(true);
      });

      expect(result.current.touched).toBe(true);
    });

    it('updates showLayer via setShowLayer', () => {
      const { result } = renderHook(() => useConfirmation(), {
        wrapper: renderWithProviders(mockAnnounce),
      });

      act(() => {
        result.current.setShowLayer(true);
      });

      expect(result.current.showLayer).toBe(true);
    });

    it('updates showConfirmation via setShowConfirmation', () => {
      const { result } = renderHook(() => useConfirmation(), {
        wrapper: renderWithProviders(mockAnnounce),
      });

      act(() => {
        result.current.setShowConfirmation(true);
      });

      expect(result.current.showConfirmation).toBe(true);
    });

    // -----------------------------------------------------------------------
    // cancelConfirmation
    // -----------------------------------------------------------------------

    describe('cancelConfirmation', () => {
      it('sets showConfirmation to false', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setShowConfirmation(true);
        });

        expect(result.current.showConfirmation).toBe(true);

        act(() => {
          result.current.cancelConfirmation();
        });

        expect(result.current.showConfirmation).toBe(false);
      });

      it('does not change showLayer or touched', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setTouched(true);
          result.current.setShowLayer(true);
          result.current.setShowConfirmation(true);
        });

        act(() => {
          result.current.cancelConfirmation();
        });

        // showLayer and touched should be unaffected by cancel
        expect(result.current.showLayer).toBe(true);
        expect(result.current.touched).toBe(true);
      });
    });

    // -----------------------------------------------------------------------
    // acceptConfirmation
    // -----------------------------------------------------------------------

    describe('acceptConfirmation', () => {
      it('sets both showConfirmation and showLayer to false', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setShowConfirmation(true);
          result.current.setShowLayer(true);
        });

        act(() => {
          result.current.acceptConfirmation();
        });

        expect(result.current.showConfirmation).toBe(false);
        expect(result.current.showLayer).toBe(false);
      });
    });

    // -----------------------------------------------------------------------
    // onClose
    // -----------------------------------------------------------------------

    describe('onClose', () => {
      it('shows the confirmation dialog and announces when the form is touched', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setTouched(true);
          result.current.setShowLayer(true);
        });

        act(() => {
          result.current.onClose();
        });

        expect(result.current.showConfirmation).toBe(true);
        expect(mockAnnounce).toHaveBeenCalledOnce();
        expect(mockAnnounce).toHaveBeenCalledWith(
          'Discard changes confirmation modal opened.',
          'assertive',
          500,
        );
      });

      it('does not change showLayer when the form is touched', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setTouched(true);
          result.current.setShowLayer(true);
        });

        act(() => {
          result.current.onClose();
        });

        expect(result.current.showLayer).toBe(true);
      });

      it('closes the layer and announces when the form is not touched', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setShowLayer(true);
        });

        act(() => {
          result.current.onClose();
        });

        expect(result.current.showLayer).toBe(false);
        expect(mockAnnounce).toHaveBeenCalledOnce();
        expect(mockAnnounce).toHaveBeenCalledWith(
          'Modal closed.',
          'assertive',
          500,
        );
      });

      it('does not open the confirmation dialog when the form is not touched', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setShowLayer(true);
        });

        act(() => {
          result.current.onClose();
        });

        expect(result.current.showConfirmation).toBe(false);
      });
    });

    // -----------------------------------------------------------------------
    // Effect: reset touched when both dialogs are dismissed
    // -----------------------------------------------------------------------

    describe('effect: resets touched when both dialogs are dismissed', () => {
      it('resets touched to false once showConfirmation and showLayer are both false', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        // Simulate an open layer that has been interacted with
        act(() => {
          result.current.setTouched(true);
          result.current.setShowLayer(true);
          result.current.setShowConfirmation(true);
        });

        expect(result.current.touched).toBe(true);

        // User accepts the discard confirmation — both dialogs close
        act(() => {
          result.current.acceptConfirmation();
        });

        expect(result.current.showConfirmation).toBe(false);
        expect(result.current.showLayer).toBe(false);
        expect(result.current.touched).toBe(false);
      });

      it('does not reset touched while showConfirmation is still true', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setTouched(true);
          result.current.setShowConfirmation(true);
          // showLayer remains false
        });

        // showConfirmation is true so the condition is not met
        expect(result.current.touched).toBe(true);
      });

      it('does not reset touched while showLayer is still true', () => {
        const { result } = renderHook(() => useConfirmation(), {
          wrapper: renderWithProviders(mockAnnounce),
        });

        act(() => {
          result.current.setTouched(true);
          result.current.setShowLayer(true);
          // showConfirmation remains false
        });

        // showLayer is true so the condition is not met
        expect(result.current.touched).toBe(true);
      });
    });
  });
});
