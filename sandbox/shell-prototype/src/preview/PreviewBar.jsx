// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, CheckBox, Select, Tab, Tabs } from 'grommet';
import { ARCHITECTURES } from '../surfaces';
import { ExplainArchitecture } from './ExplainArchitecture';
import { PAGES } from './pages';
import { RoleLegend } from './RoleLegend';

// The strip above every preview: which architecture, which page, and the
// annotation, page-theme and colour-mode switches. It is tooling, not part
// of the design under test, so it is painted with the theme's default
// background, which no architecture or page theme re-values.
export const PreviewBar = ({ state, update, hrefFor }) => {
  const toggle = key => event => update({ [key]: event.target.checked });
  const page = PAGES.find(item => item.id === state.page);
  return (
    <Box
      as="header"
      flex={false}
      direction="row"
      align="center"
      gap={{ row: 'xsmall', column: 'medium' }}
      wrap
      pad={{ horizontal: 'small', vertical: 'xsmall' }}
      background="background"
      border={{ side: 'bottom' }}
    >
      <Box
        direction="row"
        align="center"
        gap="medium"
        flex={{ grow: 0, shrink: 1 }}
      >
        <Box direction="row" align="center" gap="xxsmall" flex={false}>
          <Box width="small" flex={false}>
            <Select
              a11yTitle="Architecture"
              options={ARCHITECTURES}
              labelKey="label"
              valueKey={{ key: 'id', reduce: true }}
              value={state.arch}
              onChange={({ value }) => update({ arch: value })}
            />
          </Box>
          <ExplainArchitecture
            arch={state.arch}
            overviewHref={
              state.page === 'overview'
                ? undefined
                : hrefFor({ page: 'overview' })
            }
          />
        </Box>
        <Tabs
          activeIndex={PAGES.findIndex(page => page.id === state.page)}
          onActive={index => update({ page: PAGES[index].id })}
          justify="start"
        >
          {PAGES.map(page => (
            <Tab key={page.id} title={page.label} />
          ))}
        </Tabs>
      </Box>
      {page?.shell && state.notes && <RoleLegend />}
      <Box
        direction="row"
        align="center"
        gap="medium"
        flex={false}
        margin={{ left: 'auto' }}
      >
        <CheckBox
          toggle
          label="Annotations"
          checked={state.notes}
          onChange={toggle('notes')}
        />
        <CheckBox
          toggle
          label="Grey page"
          checked={state.grey}
          onChange={toggle('grey')}
        />
        <CheckBox
          toggle
          label="Dark mode"
          checked={state.dark}
          onChange={toggle('dark')}
        />
      </Box>
    </Box>
  );
};

PreviewBar.propTypes = {
  state: PropTypes.shape({
    arch: PropTypes.string.isRequired,
    page: PropTypes.string.isRequired,
    grey: PropTypes.bool.isRequired,
    dark: PropTypes.bool.isRequired,
    notes: PropTypes.bool.isRequired,
  }).isRequired,
  update: PropTypes.func.isRequired,
  hrefFor: PropTypes.func.isRequired,
};
