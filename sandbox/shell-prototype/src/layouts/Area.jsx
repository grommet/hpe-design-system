// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { SurfaceContext } from '../surfaces';
import { effectiveBackground } from './measure';
import { resolveRole, root } from './roles';
import { stepName } from './steps';

const MONO = { fontFamily: 'ui-monospace, Menlo, monospace' };

// What is painted behind an area: the page, or the nearest ancestor area
// with a surface or fill of its own. An area that takes no surface shows
// it, and its chip says which.
const BehindContext = createContext({ display: undefined, page: true });

// Annotation chip: area name, token, and the colour actually painted
// (measured from the element, compositing translucent ancestors). For an
// area with no surface, `behind` names the surface that shows through.
export const Tag = ({ label, resolved, behind, hex }) => (
  <Box direction="row" gap="xsmall" align="center" wrap flex={false}>
    <Text size="xsmall" weight={600}>
      {label}
    </Text>
    <Text size="xsmall" style={MONO}>
      {resolved.display}
    </Text>
    {behind && (
      <Text size="xsmall">
        {behind.page ? 'shows the page: ' : 'shows its parent: '}
        <Text size="xsmall" style={MONO}>
          {behind.display}
        </Text>
      </Text>
    )}
    {hex && (
      <Text size="xsmall" style={MONO} color="text-weak">
        {stepName(hex)}
      </Text>
    )}
  </Box>
);

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  resolved: PropTypes.object.isRequired,
  behind: PropTypes.shape({
    display: PropTypes.string,
    page: PropTypes.bool,
  }),
  hex: PropTypes.string,
};

// Measures the painted background of `ref` after layout, re-measuring when
// the architecture, mode or page theme changes.
const useMeasured = (ref, enabled, deps) => {
  const [hex, setHex] = useState();
  useEffect(() => {
    if (!enabled || !ref.current) return undefined;
    // Two frames: Grommet's styled-components inject after commit.
    const id = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (ref.current) setHex(effectiveBackground(ref.current));
      }),
    );
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, ...deps]);
  return hex;
};

// A region of a layout, painted with whatever the selected architecture
// gives its role. Layout props for the children (direction, gap, align,
// justify, wrap) go on an inner box so the chip never takes a slot in a
// row.
export const Area = ({
  role,
  label,
  pinMode = false,
  children,
  direction,
  gap,
  align,
  justify,
  wrap,
  ...rest
}) => {
  const { arch, mode, grey, annotate } = useContext(SurfaceContext);
  const behind = useContext(BehindContext);
  const resolved = resolveRole(arch, role);
  // What this area's own children sit on, when it paints anything.
  const own = useMemo(
    () => ({ display: resolved.display, page: false }),
    [resolved.display],
  );
  const ref = useRef();
  const showTag = annotate && Boolean(label);
  const measured = useMeasured(ref, showTag, [arch, mode, grey]);
  const tag = showTag ? (
    <Tag
      label={label}
      resolved={resolved}
      behind={resolved.token ? undefined : behind}
      hex={measured}
    />
  ) : null;
  // Grommet resolves descendants of a coloured band by the band's own
  // brightness, not the page's mode: on a strong accent in light mode a
  // surface token takes its dark value, and on the accent's lighter dark
  // value it flips back to light. `pinMode` ties the surface to the page's
  // mode, which is what a design on an accent band expects.
  const background =
    resolved.token && pinMode
      ? { color: resolved.token, dark: mode === 'dark' }
      : resolved.token || undefined;
  const box = (
    <Box
      ref={ref}
      background={background}
      gap={tag ? 'xsmall' : undefined}
      {...rest}
    >
      {tag}
      <Box
        direction={direction}
        gap={gap}
        align={align}
        justify={justify}
        wrap={wrap}
        flex={{ grow: 1, shrink: 0 }}
      >
        {children}
      </Box>
    </Box>
  );
  return resolved.token ? (
    <BehindContext.Provider value={own}>{box}</BehindContext.Provider>
  ) : (
    box
  );
};

Area.propTypes = {
  role: PropTypes.shape({
    kind: PropTypes.oneOf([
      'root',
      'frame',
      'framedRoot',
      'container',
      'floating',
      'fixed',
      'none',
    ]).isRequired,
    depth: PropTypes.number,
    token: PropTypes.string,
  }).isRequired,
  label: PropTypes.string,
  pinMode: PropTypes.bool,
  children: PropTypes.node,
  direction: PropTypes.string,
  gap: PropTypes.string,
  align: PropTypes.string,
  justify: PropTypes.string,
  wrap: PropTypes.bool,
};

// The bordered canvas a layout is drawn in. It stands in for the app: it
// paints the architecture's page root once, as the Grommet root does, so
// areas with no surface show the page through. `height` is a minimum: the
// canvas takes the spare viewport height so annotation chips have room, and
// scrolls if they still do not fit.
export const LayoutFrame = ({ height, children }) => {
  const { arch } = useContext(SurfaceContext);
  const page = resolveRole(arch, root);
  const behind = useMemo(
    () => ({ display: page.display, page: true }),
    [page.display],
  );
  return (
    <BehindContext.Provider value={behind}>
      <Box
        background={page.token}
        overflow="auto"
        round="small"
        border={{ color: 'border-strong' }}
        style={{
          position: 'relative',
          height: `max(${height}, calc(100vh - 480px))`,
        }}
        flex={false}
      >
        {children}
      </Box>
    </BehindContext.Provider>
  );
};

LayoutFrame.propTypes = {
  height: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Placeholder text lines (a border colour as a fill, so they read as
// content, not as a surface).
export const Lines = ({ n = 2, width = '90%' }) => (
  <Box gap="xxsmall" flex={false}>
    {Array.from({ length: n }, (_, i) => (
      <Box
        key={i}
        height="5px"
        width={i === n - 1 ? '60%' : width}
        round="xsmall"
        background="border-weak"
        style={{ opacity: 0.7 }}
      />
    ))}
  </Box>
);

Lines.propTypes = {
  n: PropTypes.number,
  width: PropTypes.string,
};
