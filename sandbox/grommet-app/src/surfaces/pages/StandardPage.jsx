// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  Grid,
  List,
  Text,
} from 'grommet';
import PropTypes from 'prop-types';
import {
  HardCodedHexWidget,
  HardCodedWidget,
  Lines,
  MetricLines,
  Surface,
} from '../Surface';
import { HeaderBar, NavList, PageTitle } from '../Furniture';
import { TOKENS } from '../surfaceState';

const rows = [
  { id: 1, name: 'edge-01', status: 'Online' },
  { id: 2, name: 'edge-02', status: 'Online' },
  { id: 3, name: 'edge-03', status: 'Offline' },
];

/**
 * Page 1 — standard page (#6071 Part 2 shape, decisions 6, 13, 23). The
 * page (base) edge to edge with the header on it, and nav menu /
 * contextual panel as tone-1 containers on the page beside the content,
 * like the cards. No global rail: that belongs to the shell pages.
 *   Page = base · nav, contextual panel, cards = tone.1 · inner = tone.2
 *   Header carries no surface (decision 6 / 23).
 * Also walks Part 4 (self-nesting, tone.2 on base, hard-coded tone) and the
 * decision 16 check (secondary button, selected row on a tone-1 panel).
 */
export const StandardPage = ({ showFailureModes = true }) => {
  const [selected, setSelected] = useState(['edge-02']);
  return (
    <Surface
      token={TOKENS.base}
      label="Page"
      region
      fill
      round={false}
      gap="none"
      pad="none"
    >
      <Box direction="row" flex gap="none">
        <Box flex gap="small" pad={{ horizontal: 'small', bottom: 'small' }}>
          {/* Header carries no surface and reads as the page (decisions 6, 23). */}
          <Box
            pad={{ horizontal: 'small', vertical: 'xsmall' }}
            data-surface-token="none"
            data-surface-label="Header"
          >
            <HeaderBar />
          </Box>

          <Box direction="row" flex gap="small">
            <Surface
              token={TOKENS.tone1}
              label="Nav menu"
              region
              width="small"
              flex={false}
              round="medium"
            >
              <NavList />
              <Button label="Secondary on tone.1" secondary />
              {showFailureModes && (
                <>
                  <HardCodedWidget where="in nav" />
                  <HardCodedHexWidget where="in nav" />
                </>
              )}
            </Surface>

            <Box flex gap="medium" pad={{ horizontal: 'medium' }}>
              <PageTitle />
              <Grid columns={{ count: 'fit', size: 'small' }} gap="medium">
                <Surface token={TOKENS.tone1} label="Card A">
                  <MetricLines />
                </Surface>
                <Surface token={TOKENS.tone1} label="Card B">
                  <Surface token={TOKENS.tone2} label="Panel inside card">
                    <Lines count={2} />
                    <Surface
                      token={TOKENS.tone1}
                      label="Nested region (depth 3)"
                      note="alternation continues"
                    >
                      <Lines count={1} />
                    </Surface>
                  </Surface>
                </Surface>
                <Card
                  data-surface-token="card-component"
                  data-surface-label="Grommet Card (theme)"
                >
                  <CardHeader pad="small">
                    <Text weight={500}>Grommet Card</Text>
                  </CardHeader>
                  <CardBody pad="small" gap="small">
                    <Text size="xsmall" color="text-weak">
                      card.container.background → surface.tone.1 (Part 5)
                    </Text>
                    <Lines count={3} />
                  </CardBody>
                </Card>
                {showFailureModes && (
                  <>
                    <Surface
                      token={TOKENS.tone2}
                      label="tone.2 on base"
                      note="Part 4: white on white in light; border carries the edge"
                      border={{ color: 'border-weak' }}
                    >
                      <Lines count={2} />
                    </Surface>
                    <Surface token={TOKENS.tone1} label="Self-nest outer">
                      <Surface
                        token={TOKENS.tone1}
                        label="Self-nest inner (error)"
                        note="Part 4: tone.1 inside tone.1"
                      >
                        <Lines count={1} />
                      </Surface>
                    </Surface>
                    <HardCodedWidget where="on page" />
                    <HardCodedHexWidget where="on page" />
                  </>
                )}
              </Grid>
            </Box>

            <Surface
              token={TOKENS.tone1}
              label="Contextual panel"
              region
              width="medium"
              flex={false}
              round="medium"
            >
              <Text size="small" weight={500}>
                Selected row on tone.1 (decision 16)
              </Text>
              <Box overflow={{ horizontal: 'auto' }} flex={false}>
                <DataTable
                  columns={[
                    { property: 'name', header: 'Name', primary: true },
                    { property: 'status', header: 'Status' },
                  ]}
                  data={rows}
                  select={selected}
                  onSelect={setSelected}
                  data-surface-token="datatable"
                  data-surface-label="DataTable on tone.1"
                />
              </Box>
              <List
                data={['Hover me', 'And me']}
                onClickItem={() => {}}
                data-surface-token="list"
                data-surface-label="List on tone.1"
              />
              <Button label="Secondary on tone.1" secondary />
              <Button label="Default on tone.1" />
              <Surface token={TOKENS.tone2} label="Card in panel">
                <Lines count={2} />
              </Surface>
            </Surface>
          </Box>
        </Box>
      </Box>
    </Surface>
  );
};

StandardPage.propTypes = { showFailureModes: PropTypes.bool };
