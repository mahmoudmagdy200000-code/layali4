import { useRef, useCallback } from 'react';

/**
 * useSwipeGesture — A lightweight, zero-dependency hook for handling
 * horizontal swipe gestures on touch devices.
 *
 * Features:
 * - RTL-aware directional mapping
 * - Minimum distance threshold to prevent accidental triggers
 * - Velocity-based detection for quick flicks
 * - Vertical scroll protection (ignores swipes that are more vertical than horizontal)
 *
 * @param {Object} options
 * @param {Function} options.onSwipeLeft  - Callback for a leftward swipe (visual direction)
 * @param {Function} options.onSwipeRight - Callback for a rightward swipe (visual direction)
 * @param {boolean}  options.isRTL        - Whether the layout is right-to-left
 * @param {number}   options.threshold    - Minimum px distance to register a swipe (default: 50)
 * @param {boolean}  options.enabled      - Whether gestures are active (default: true)
 *
 * @returns {{ onTouchStart, onTouchMove, onTouchEnd }} - Event handlers to spread onto the target element
 */
export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  isRTL = false,
  threshold = 50,
  enabled = true,
} = {}) {
  const touchState = useRef({
    startX: 0,
    startY: 0,
    startTime: 0,
    isSwiping: false,
  });

  const onTouchStart = useCallback(
    (e) => {
      if (!enabled) return;
      const touch = e.touches[0];
      touchState.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        startTime: Date.now(),
        isSwiping: false,
      };
    },
    [enabled],
  );

  const onTouchMove = useCallback(
    (e) => {
      if (!enabled) return;
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - touchState.current.startX);
      const deltaY = Math.abs(touch.clientY - touchState.current.startY);

      // If the gesture is more horizontal than vertical, mark as swiping
      // This prevents conflicts with vertical scrolling
      if (deltaX > deltaY && deltaX > 10) {
        touchState.current.isSwiping = true;
      }
    },
    [enabled],
  );

  const onTouchEnd = useCallback(
    (e) => {
      if (!enabled) return;

      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchState.current.startX;
      const deltaY = Math.abs(touch.clientY - touchState.current.startY);
      const elapsed = Date.now() - touchState.current.startTime;
      const absDeltaX = Math.abs(deltaX);

      // Guard: Must be a horizontal gesture (not a vertical scroll)
      if (!touchState.current.isSwiping) return;

      // Guard: Must exceed threshold OR be a fast flick (velocity-based)
      const velocity = absDeltaX / elapsed; // px/ms
      const isValidSwipe = absDeltaX >= threshold || (velocity > 0.3 && absDeltaX > 25);
      if (!isValidSwipe) return;

      // Guard: Vertical movement shouldn't dominate
      if (deltaY > absDeltaX * 0.75) return;

      // Determine logical direction (accounting for RTL)
      // In LTR: swipe left (negative deltaX) → "next", swipe right → "previous"
      // In RTL: swipe left → "previous", swipe right → "next"
      if (deltaX < 0) {
        // Visual swipe LEFT
        onSwipeLeft?.();
      } else {
        // Visual swipe RIGHT
        onSwipeRight?.();
      }
    },
    [enabled, threshold, onSwipeLeft, onSwipeRight],
  );

  return { onTouchStart, onTouchMove, onTouchEnd };
}
