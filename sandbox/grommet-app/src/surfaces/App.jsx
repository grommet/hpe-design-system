// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Button, Grommet, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import PropTypes from 'prop-types';
import { SurfaceStateContext, TOKENS } from './surfaceState';
import { themes } from './theme';
import { StandardPage } from './pages/StandardPage';
import { FramedShell } from './pages/FramedShell';
import { DialogPage } from './pages/DialogPage';

const PAGES = {
  standard: { label: '1 · Standard page', render: () => <StandardPage /> },
  shell: { label: '2 · Framed shell (A′)', render: () => <FramedShell /> },
  shellAlt: {
    label: '2b · Framed shell (sheet = tone.2)',
    render: () => <FramedShell sheetToken={TOKENS.tone2} />,
  },
  dialog: { label: '3 · Dialog', render: () => <DialogPage /> },
};

// Two frames plus a short settle: Grommet syncs some controlled state
// (DataTable select) in effects that land a tick after mount.
const nextPaint = () =>
  new Promise(resolve =>
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setTimeout(resolve, 150)),
    ),
  );

// Read every annotated surface on the page as the browser painted it, plus
// the DataTable rows on the tone-1 panel (decision 16: selected row).
const readSurfaces = () => [
  ...Array.from(document.querySelectorAll('[data-surface-token]')).map(el => ({
    label: el.getAttribute('data-surface-label'),
    token: el.getAttribute('data-surface-token'),
    painted: getComputedStyle(el).backgroundColor,
  })),
  ...Array.from(
    document.querySelectorAll('[data-surface-token=datatable] tbody tr'),
  ).map((tr, index) => ({
    label: `DataTable row ${index + 1}${
      tr.querySelector('input:checked') ? ' (selected)' : ''
    }`,
    token: 'datatable-row',
    // the HPE theme paints row state on the cells, not the row
    painted: getComputedStyle(tr.querySelector('td')).backgroundColor,
  })),
];

// Grommet derives theme.dark from the root background's brightness
// (decision 25); surface it so the sweep can record it per combination.
const ThemeDarkBadge = () => {
  const theme = useContext(ThemeContext);
  useEffect(() => {
    window.__themeDark = theme.dark;
  }, [theme.dark]);
  return (
    <Text size="xsmall" color="text-weak">
      theme.dark = {String(theme.dark)}
    </Text>
  );
};

const Toggle = ({ value, options, onChange }) => (
  <Box direction="row" gap="xsmall">
    {options.map(option => (
      <Button
        key={option}
        label={option}
        size="small"
        primary={value === option}
        onClick={() => onChange(option)}
      />
    ))}
  </Box>
);

Toggle.propTypes = {
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

const App = () => {
  const [surfaceMode, setSurfaceMode] = useState('default');
  const [colorMode, setColorMode] = useState('light');
  const [page, setPage] = useState('standard');
  const state = useMemo(
    () => ({ surfaceMode, colorMode }),
    [surfaceMode, colorMode],
  );

  // Programmatic controls for the verification sweep (browser automation).
  useEffect(() => {
    window.__surfaceControls = { setSurfaceMode, setColorMode, setPage };
    window.__surfaceReport = () => ({
      env: 'grommet-app',
      page,
      surfaceMode,
      colorMode,
      themeDark: window.__themeDark,
      surfaces: readSurfaces(),
    });
    window.__runSurfaceMatrix = async (pages = Object.keys(PAGES)) => {
      const results = [];
      for (const p of pages) {
        for (const s of ['default', 'toned']) {
          for (const c of ['light', 'dark']) {
            setPage(p);
            setSurfaceMode(s);
            setColorMode(c);
            await nextPaint();
            await nextPaint();
            results.push({
              env: 'grommet-app',
              page: p,
              surfaceMode: s,
              colorMode: c,
              themeDark: window.__themeDark,
              surfaces: readSurfaces(),
            });
          }
        }
      }
      return results;
    };
  }, [page, surfaceMode, colorMode]);

  return (
    <Grommet
      theme={themes[surfaceMode]}
      themeMode={colorMode}
      full
      options={{ box: { cssGap: true } }}
    >
      <SurfaceStateContext.Provider value={state}>
        <Box fill>
          <Box
            direction="row"
            gap="medium"
            pad="small"
            align="center"
            wrap
            flex={false}
            border={{ side: 'bottom', color: 'border-weak' }}
            background="background-contrast"
            data-surface-token="controls"
            data-surface-label="Controls (background-contrast, not a surface)"
          >
            <Text size="small" weight={500}>
              Surface tokens · #6071
            </Text>
            <Toggle
              value={surfaceMode}
              options={['default', 'toned']}
              onChange={setSurfaceMode}
            />
            <Toggle
              value={colorMode}
              options={['light', 'dark']}
              onChange={setColorMode}
            />
            <Toggle
              value={page}
              options={Object.keys(PAGES)}
              onChange={setPage}
            />
            <Text size="xsmall" color="text-weak">
              {PAGES[page].label}
            </Text>
            <ThemeDarkBadge />
          </Box>
          <Box flex overflow="auto">
            {PAGES[page].render()}
          </Box>
        </Box>
      </SurfaceStateContext.Provider>
    </Grommet>
  );
};

export default App;
