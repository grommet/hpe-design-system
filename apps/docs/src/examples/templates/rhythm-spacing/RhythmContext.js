// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { ToggleGroup } from 'grommet';

// The two page spacing rhythms under comparison. Each names the gap used at
// every level of a page: between the page's main columns, between content
// sections, between a section's heading and its body, and between peers
// (such as cards in a grid) inside a section.
export const rhythms = {
  rhythm1: {
    label: 'Rhythm 1',
    tip: 'Sections xlarge, peers medium',
    gaps: {
      column: 'xxlarge',
      section: 'xlarge',
      heading: 'small',
      peer: 'medium',
    },
  },
  rhythm2: {
    label: 'Rhythm 2',
    tip: 'Sections large, peers small',
    gaps: {
      column: 'xxlarge',
      section: 'large',
      heading: 'small',
      peer: 'small',
    },
  },
};

const options = Object.entries(rhythms).map(([value, { label, tip }]) => ({
  label,
  tip,
  value,
}));

// Without a provider, designs render Rhythm 1 and show no toggle.
const RhythmContext = createContext({
  rhythm: 'rhythm1',
  gaps: rhythms.rhythm1.gaps,
  setRhythm: undefined,
});

export const RhythmProvider = ({ children, defaultRhythm = 'rhythm1' }) => {
  const [rhythm, setRhythm] = useState(defaultRhythm);
  const value = useMemo(
    () => ({ rhythm, gaps: rhythms[rhythm].gaps, setRhythm }),
    [rhythm],
  );
  return (
    <RhythmContext.Provider value={value}>{children}</RhythmContext.Provider>
  );
};

RhythmProvider.propTypes = {
  children: PropTypes.node,
  defaultRhythm: PropTypes.oneOf(Object.keys(rhythms)),
};

export const useRhythm = () => useContext(RhythmContext);

// Switches the rhythm applied to the whole page. Intended for the page
// header's actions so it can be flipped on the fly to compare.
export const RhythmToggle = () => {
  const { rhythm, setRhythm } = useRhythm();
  if (!setRhythm) return null;
  return (
    <ToggleGroup
      a11yTitle="Spacing rhythm"
      options={options}
      value={rhythm}
      onToggle={({ value }) => value && setRhythm(value)}
    />
  );
};
