// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SurfaceStateContext } from '../surfaceState';
import { ShellProvider } from '../shell/contexts/ShellProvider';
import { Shell } from '../shell/components/Shell';
import { SHELL_READINGS, SurfaceContext } from '../shell/surfaces';

/**
 * Pages 4 and 5 — the GreenLake shell designs from #6708 / #6635, ported
 * from sandbox/shell-prototype and painted with the Surface collection
 * through the validation theme (default / toned × light / dark). Every
 * shell area carries a SurfaceTag naming its token, the value the theme
 * resolves it to and the value the browser painted.
 *
 *   framed     A′: chrome tone-1 on the root; sheet and panel base
 *   framedAlt  A:  sheet and panel alternate from the chrome (tone-2)
 *   beside     the overview dashboard: page base, rail and cards tone-1
 */
export const ShellDesign = ({ reading }) => {
  const { colorMode, setColorMode } = useContext(SurfaceStateContext);
  const surfaces = useMemo(() => ({ reading, annotate: true }), [reading]);
  return (
    <SurfaceContext.Provider value={surfaces}>
      <ShellProvider themeMode={colorMode} setThemeMode={setColorMode}>
        <Shell layout={reading === 'beside' ? 'beside' : 'framed'} height="100%" />
      </ShellProvider>
    </SurfaceContext.Provider>
  );
};

ShellDesign.propTypes = {
  reading: PropTypes.oneOf(Object.keys(SHELL_READINGS)).isRequired,
};
