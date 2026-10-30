// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Box, Button, Grommet, Select, Text } from 'grommet';
import PropTypes from 'prop-types';
import { SurfaceStateContext } from '../surfaces/surfaceState';
import { themes } from '../surfaces/theme';
import { slides } from './slideList';

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

const wrap = n => ((n % slides.length) + slides.length) % slides.length;

const fromHash = () => {
  const n = parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isFinite(n) && n >= 1 && n <= slides.length ? n - 1 : 0;
};

/**
 * The deck is itself a grommet-theme-hpe render: the root background is
 * surface.base through the prototype theme, and the surface / colour-mode
 * switches re-theme every slide live.
 */
export const Deck = () => {
  const [surfaceMode, setSurfaceMode] = useState('default');
  const [colorMode, setColorMode] = useState('light');
  const [index, setIndex] = useState(fromHash);
  const state = useMemo(
    () => ({ surfaceMode, colorMode }),
    [surfaceMode, colorMode],
  );
  const go = useCallback(n => setIndex(wrap(n)), []);

  useEffect(() => {
    window.location.hash = `#${index + 1}`;
  }, [index]);

  useEffect(() => {
    const onHash = () => setIndex(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    const onKey = event => {
      if (event.target.closest?.('input, textarea, [role=listbox]')) return;
      if (event.key === 'ArrowRight' || event.key === 'PageDown') go(index + 1);
      else if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(index - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, go]);

  // Programmatic controls (browser automation / verification).
  useEffect(() => {
    window.__presentation = {
      go,
      setSurfaceMode,
      setColorMode,
      index,
      count: slides.length,
      slide: slides[index].id,
    };
  }, [go, index]);

  const current = slides[index];

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
            pad={{ horizontal: 'medium', vertical: 'small' }}
            align="center"
            wrap
            flex={false}
            border={{ side: 'bottom', color: 'border-weak' }}
            background="background-contrast"
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
            <Box flex />
            <Box direction="row" gap="small" align="center">
              <Button
                size="small"
                label="← Previous"
                onClick={() => go(index - 1)}
              />
              <Select
                size="small"
                options={slides.map((s, i) => ({ label: `${i + 1} · ${s.label}`, value: i }))}
                labelKey="label"
                valueKey={{ key: 'value', reduce: true }}
                value={index}
                onChange={({ value }) => go(value)}
              />
              <Text size="small" color="text-weak">
                {index + 1} / {slides.length}
              </Text>
              <Button
                size="small"
                label="Next →"
                onClick={() => go(index + 1)}
              />
            </Box>
          </Box>
          <Box flex overflow="auto">
            <Box width={{ max: '1280px' }} fill="horizontal" alignSelf="center">
              <current.Component />
            </Box>
          </Box>
        </Box>
      </SurfaceStateContext.Provider>
    </Grommet>
  );
};
