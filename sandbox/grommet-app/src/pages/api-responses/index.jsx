// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Anchor, Box, Page, PageContent, PageHeader, Text } from 'grommet';
import { TableScenarios } from './components/TableScenarios';
import { WizardScenario } from './components/WizardScenario';
import { LayerScenario } from './components/LayerScenario';

const sections = [
  { label: 'DataTable: loading, error, and no data', href: '#table-loading' },
  { label: 'Wizard: step-level errors', href: '#wizard' },
  { label: 'Layer with action: confirmation', href: '#layer' },
];

const ApiResponses = () => (
  <Page pad={{ bottom: 'xlarge' }}>
    <PageContent gap="large">
      <PageHeader
        title="Handling API responses"
        subtitle={`Mockups showing how to represent waiting, success, 
          empty, and error responses across common patterns.`}
        actions={
          <Box direction="row" gap="small" wrap align="center">
            <Text size="small" color="text-weak">
              Jump to
            </Text>
            {sections.map(section => (
              <Anchor
                key={section.href}
                label={section.label}
                href={section.href}
                size="small"
              />
            ))}
          </Box>
        }
      />
      <TableScenarios />
      <WizardScenario />
      <LayerScenario />
    </PageContent>
  </Page>
);

export default ApiResponses;
