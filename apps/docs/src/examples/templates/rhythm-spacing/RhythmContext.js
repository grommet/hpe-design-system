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

// The horizontal page padding values under comparison.
export const pagePads = {
  large: { label: 'Large', tip: 'Page padding large' },
  xlarge: { label: 'XLarge', tip: 'Page padding xlarge' },
};

const toOptions = map =>
  Object.entries(map).map(([value, { label, tip }]) => ({
    label,
    tip,
    value,
  }));

const options = toOptions(rhythms);
const pagePadOptions = toOptions(pagePads);

// Without a provider, designs render Rhythm 1 with the theme's page padding
// and show no toggles.
const RhythmContext = createContext({
  rhythm: 'rhythm1',
  gaps: rhythms.rhythm1.gaps,
  setRhythm: undefined,
  pagePad: undefined,
  pageContentProps: {},
  setPagePad: undefined,
});

export const RhythmProvider = ({
  children,
  defaultRhythm = 'rhythm1',
  defaultPagePad = 'xlarge',
}) => {
  const [rhythm, setRhythm] = useState(defaultRhythm);
  const [pagePad, setPagePad] = useState(defaultPagePad);
  const value = useMemo(
    () => ({
      rhythm,
      gaps: rhythms[rhythm].gaps,
      setRhythm,
      pagePad,
      // Overrides the theme's responsive page gutters at every breakpoint.
      pageContentProps: { pad: { horizontal: pagePad } },
      setPagePad,
    }),
    [rhythm, pagePad],
  );
  return (
    <RhythmContext.Provider value={value}>{children}</RhythmContext.Provider>
  );
};

RhythmProvider.propTypes = {
  children: PropTypes.node,
  defaultRhythm: PropTypes.oneOf(Object.keys(rhythms)),
  defaultPagePad: PropTypes.oneOf(Object.keys(pagePads)),
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

// Switches the left and right padding of the page content.
export const PagePaddingToggle = () => {
  const { pagePad, setPagePad } = useRhythm();
  if (!setPagePad) return null;
  return (
    <ToggleGroup
      a11yTitle="Page padding"
      options={pagePadOptions}
      value={pagePad}
      onToggle={({ value }) => value && setPagePad(value)}
    />
  );
};
