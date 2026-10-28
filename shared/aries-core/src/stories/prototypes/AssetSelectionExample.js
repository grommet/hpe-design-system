// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Accordion, AccordionPanel, Box, Heading, Text } from 'grommet';
import {
  AssetsHeader,
  AssetsPanel,
  AssetsTotal,
  GroupSection,
  availableOf,
  categories,
  sum,
  useAssetCounts,
} from './shared';

const CategoryLabel = ({ category, counts }) => {
  const models = category.groups.flatMap(g => g.models);
  const available = availableOf(models);
  const entered = sum(models.map(m => counts[m.id] ?? 0));

  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      flex
      gap="medium"
      pad={{ vertical: 'xsmall' }}
    >
      <Heading level={3} margin="none">
        {category.name}
        {available > 0 ? ` (${available})` : ''}
      </Heading>
      {entered > 0 && (
        <Text size="small" color="text-weak">
          {entered} entered
        </Text>
      )}
    </Box>
  );
};

export const AssetSelectionExample = () => {
  const { counts, setCount, setMany, populateAll, clearAll, total } =
    useAssetCounts();

  return (
    <AssetsPanel>
      <AssetsHeader onPopulate={populateAll} onClear={clearAll} />
      <Accordion multiple>
        {categories.map(category => (
          <AccordionPanel
            key={category.id}
            label={<CategoryLabel category={category} counts={counts} />}
          >
            <Box pad={{ vertical: 'small' }} gap="medium">
              {category.groups.map(group => (
                <GroupSection
                  key={group.id}
                  group={group}
                  counts={counts}
                  setCount={setCount}
                  setMany={setMany}
                />
              ))}
            </Box>
          </AccordionPanel>
        ))}
      </Accordion>
      <AssetsTotal total={total} />
    </AssetsPanel>
  );
};
