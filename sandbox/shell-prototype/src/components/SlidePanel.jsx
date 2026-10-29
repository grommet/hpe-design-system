// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, ThemeContext } from 'grommet';
import { PANEL_MOTION } from '../theme';

// Slides a fixed-width panel in and out of the shell, the way Layer slides
// in: a CSS transition on width (so neighbours reflow) plus a translate on
// the content (so the sheet appears to move rather than unmask). Pure CSS,
// so it does not depend on animation frames the way Collapsible does.
// `visibility` flips after the close so hidden content leaves the tab order.
// Transitions pause while the user drags the resize handle.
const Track = styled(Box)`
  width: ${props => (props.$open ? `${props.$width}px` : '0px')};
  visibility: ${props => (props.$open ? 'visible' : 'hidden')};
  position: relative;
  ${props =>
    !props.$dragging &&
    `transition:
      width ${PANEL_MOTION.duration}ms ${PANEL_MOTION.easing},
      visibility 0s linear ${props.$open ? 0 : PANEL_MOTION.duration}ms;`}
`;

// min-width beats Box's default max-width: 100%, so the sheet keeps its
// size (and its content its layout) while the track clips it.
const Sheet = styled(Box)`
  width: ${props => `${props.$width}px`};
  min-width: ${props => `${props.$width}px`};
  transform: translateX(
    ${props => (props.$open ? '0' : props.$side === 'left' ? '-100%' : '100%')}
  );
  ${props =>
    !props.$dragging &&
    `transition: transform ${PANEL_MOTION.duration}ms ${PANEL_MOTION.easing};`}
`;

// Hit area straddling the panel's inner edge. cursor has no Grommet prop.
const Handle = styled(Box)`
  position: absolute;
  top: 0;
  bottom: 0;
  ${props => (props.$side === 'left' ? 'right' : 'left')}: ${props =>
    props.$offset};
  width: ${props => props.theme.global.edgeSize.xxsmall};
  min-width: ${props => props.theme.global.edgeSize.xxsmall};
  cursor: col-resize;
  touch-action: none;
  z-index: 1;
`;

// The visible line. It fades in after a short hover-intent delay so simply
// crossing the edge does not flash it, and fades straight out on leave.
// round="full" would be 100% (an ellipse on a tall thin box), so a small
// radius token keeps it a line.
const Indicator = styled(Box)`
  width: ${props => props.theme.global.edgeSize['4xsmall']};
  min-width: ${props => props.theme.global.edgeSize['4xsmall']};
  opacity: ${props => (props.$visible ? 1 : 0)};
  transition:
    opacity ${PANEL_MOTION.duration}ms ${PANEL_MOTION.easing}
      ${props => (props.$visible ? 150 : 0)}ms,
    background-color ${PANEL_MOTION.duration}ms ${PANEL_MOTION.easing};
`;

const KEY_STEP = 16;

// Vertical separator the user can drag or move with the arrow keys.
const ResizeHandle = ({
  side,
  width,
  bounds,
  gapWidth,
  onResize,
  onReset,
  label,
}) => {
  const theme = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const start = useRef(null);

  const onPointerDown = event => {
    event.currentTarget.setPointerCapture(event.pointerId);
    start.current = { x: event.clientX, width };
    setActive(true);
    onResize(width, true);
  };
  const onPointerMove = event => {
    if (!start.current) return;
    const delta = event.clientX - start.current.x;
    onResize(start.current.width + (side === 'left' ? delta : -delta), true);
  };
  const onPointerUp = () => {
    if (!start.current) return;
    start.current = null;
    setActive(false);
    onResize(width, false);
  };
  const onKeyDown = event => {
    const grow = side === 'left' ? 'ArrowRight' : 'ArrowLeft';
    const shrink = side === 'left' ? 'ArrowLeft' : 'ArrowRight';
    if (event.key === grow) onResize(width + KEY_STEP, false);
    else if (event.key === shrink) onResize(width - KEY_STEP, false);
    else if (event.key === 'Home') onResize(bounds.min, false);
    else if (event.key === 'End') onResize(bounds.max, false);
    else return;
    event.preventDefault();
  };

  // The track clips its contents, so the hit area sits just inside the
  // panel's edge; with a gap it can straddle the edge within the track.
  const handleWidth = parseInt(theme.global.edgeSize.xxsmall, 10);
  const offset = `${Math.max(0, gapWidth - handleWidth / 2)}px`;

  const visible = active || hover;
  return (
    <Handle
      role="separator"
      aria-label={label}
      aria-orientation="vertical"
      aria-valuemin={bounds.min}
      aria-valuemax={bounds.max}
      aria-valuenow={width}
      tabIndex={0}
      $side={side}
      $offset={offset}
      align="center"
      justify="center"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onDoubleClick={onReset}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Indicator
        $visible={visible}
        fill="vertical"
        round="xxsmall"
        background={active ? 'border-selected' : 'border-strong'}
      />
    </Handle>
  );
};

ResizeHandle.propTypes = {
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  width: PropTypes.number.isRequired,
  bounds: PropTypes.shape({
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
  }).isRequired,
  gapWidth: PropTypes.number.isRequired,
  onResize: PropTypes.func.isRequired,
  onReset: PropTypes.func,
  label: PropTypes.string.isRequired,
};

export const SlidePanel = ({
  open,
  side,
  width,
  gap,
  bounds,
  onResize,
  onReset,
  resizeLabel,
  children,
}) => {
  const theme = useContext(ThemeContext);
  const [dragging, setDragging] = useState(false);
  const gapWidth = gap ? parseInt(theme.global.edgeSize[gap], 10) : 0;
  const total = width + gapWidth;

  const resize = (next, isDragging) => {
    setDragging(isDragging);
    onResize(next);
  };

  return (
    <Track
      $open={open}
      $width={total}
      $dragging={dragging}
      flex={false}
      overflow="hidden"
      aria-hidden={!open}
    >
      {/* A row so the panel stretches to full height on the cross axis. */}
      <Sheet
        $open={open}
        $side={side}
        $width={total}
        $dragging={dragging}
        direction="row"
        fill="vertical"
        pad={gap ? { [side === 'left' ? 'right' : 'left']: gap } : undefined}
      >
        {children}
      </Sheet>
      {onResize && open && (
        <ResizeHandle
          side={side}
          width={width}
          bounds={bounds}
          gapWidth={gapWidth}
          onResize={resize}
          onReset={onReset}
          label={resizeLabel}
        />
      )}
    </Track>
  );
};

SlidePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  side: PropTypes.oneOf(['left', 'right']).isRequired,
  // Panel width in px (excluding `gap`).
  width: PropTypes.number.isRequired,
  // Optional theme edge size kept clear between the panel and the sheet.
  gap: PropTypes.string,
  bounds: ResizeHandle.propTypes.bounds,
  onResize: PropTypes.func,
  onReset: PropTypes.func,
  resizeLabel: PropTypes.string,
  children: PropTypes.node,
};
