// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Box, Heading, Text } from 'grommet';
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

const CategorySection = ({ category, counts, setCount, setMany }) => {
  const models = category.groups.flatMap(g => g.models);
  const available = availableOf(models);
  const entered = sum(models.map(m => counts[m.id] ?? 0));

  return (
    <Box gap="small" pad={{ vertical: 'medium' }} border="bottom">
      <Box direction="row" align="center" justify="between" gap="medium">
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
      <Box gap="medium">
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
    </Box>
  );
};

export const AssetSelectionSectionsExample = () => {
  const { counts, setCount, setMany, populateAll, clearAll, total } =
    useAssetCounts();

  return (
    <AssetsPanel>
      <AssetsHeader onPopulate={populateAll} onClear={clearAll} />
      <Box border="top">
        {categories.map(category => (
          <CategorySection
            key={category.id}
            category={category}
            counts={counts}
            setCount={setCount}
            setMany={setMany}
          />
        ))}
      </Box>
      <AssetsTotal total={total} />
    </AssetsPanel>
  );
};
