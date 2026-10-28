// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React, { useState } from 'react';
import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  CheckBox,
  Heading,
  Paragraph,
  Text,
  TextInput,
} from 'grommet';

const categories = [
  {
    id: 'network',
    name: 'Network',
    groups: [
      {
        id: 'network-medium',
        name: 'Medium',
        models: [
          { id: 'cx6200f-24', name: 'CX 6200F 24G 4SFP+', available: 40 },
          { id: 'cx6200f-48', name: 'CX 6200F 48G 4SFP+', available: 55 },
          { id: 'cx6300m', name: 'CX 6300M 24-PORT', available: 35 },
          { id: 'ap515', name: 'AP-515', available: 60 },
          { id: 'ap635', name: 'AP-635', available: 80 },
          { id: 'gw9004', name: 'Aruba 9004 Gateway', available: 60 },
          { id: 'gw9012', name: 'Aruba 9012 Gateway', available: 95 },
          { id: 'br150', name: 'BR-150 5G Ethernet Bridge', available: 85 },
          { id: 'network-other', name: 'Other devices' },
        ],
      },
    ],
  },
  {
    id: 'storage',
    name: 'Storage',
    groups: [
      {
        id: 'storage-small',
        name: 'Small',
        models: [
          { id: 'alletra-5010', name: 'Alletra 5010', available: 24 },
          { id: 'alletra-6010', name: 'Alletra 6010', available: 36 },
        ],
      },
      {
        id: 'storage-medium',
        name: 'Medium',
        models: [
          { id: 'alletra-6030', name: 'Alletra 6030', available: 70 },
          { id: 'alletra-9060', name: 'Alletra 9060', available: 80 },
          { id: 'storage-other', name: 'Other devices' },
        ],
      },
    ],
  },
  {
    id: 'servers',
    name: 'Servers',
    groups: [
      {
        id: 'servers-small',
        name: 'Small',
        models: [
          { id: 'dl360', name: 'ProLiant DL360 Gen11', available: 64 },
          { id: 'dl380', name: 'ProLiant DL380 Gen11', available: 75 },
        ],
      },
      {
        id: 'servers-large',
        name: 'Large',
        models: [
          { id: 'dl580', name: 'ProLiant DL580 Gen10', available: 40 },
          { id: 'servers-other', name: 'Other devices' },
        ],
      },
    ],
  },
  {
    id: 'general',
    name: 'General devices',
    groups: [
      {
        id: 'general-all',
        models: [
          { id: 'general-laptops', name: 'Laptops' },
          { id: 'general-monitors', name: 'Monitors' },
          { id: 'general-other', name: 'Other devices' },
        ],
      },
    ],
  },
];

const sum = (values) => values.reduce((total, value) => total + value, 0);
const availableOf = (models) => sum(models.map((m) => m.available ?? 0));
const hasAvailable = (model) => typeof model.available === 'number';

const selectionState = (count, available) => {
  if (count <= 0) return 'none';
  if (count >= available) return 'all';
  return 'some';
};

const CountInput = ({ model, value, onChange }) => (
  <Box width="4xsmall" flex={false}>
    <TextInput
      a11yTitle={`${model.name} count`}
      type="number"
      min={0}
      size="small"
      value={value === 0 ? '0' : String(value)}
      onChange={(event) => {
        const next = Number.parseInt(event.target.value, 10);
        onChange(Number.isNaN(next) || next < 0 ? 0 : next);
      }}
    />
  </Box>
);

const ModelRow = ({ model, count, onChange }) => {
  const label = hasAvailable(model) ? (
    <Text>
      {model.name} <Text weight="bold">({model.available})</Text>
    </Text>
  ) : (
    <Text>{model.name}</Text>
  );

  let leading = (
    // Keep rows aligned with checkbox rows when there's nothing to select.
    <Box pad={{ left: 'large' }} flex>
      {label}
    </Box>
  );

  if (hasAvailable(model)) {
    const state = selectionState(count, model.available);
    leading = (
      <Box flex>
        <CheckBox
          label={label}
          checked={state === 'all'}
          indeterminate={state === 'some'}
          onChange={() => onChange(state === 'all' ? 0 : model.available)}
        />
      </Box>
    );
  }

  return (
    <Box
      direction="row"
      align="center"
      justify="between"
      gap="medium"
      pad={{ vertical: 'xsmall' }}
    >
      {leading}
      <CountInput model={model} value={count} onChange={onChange} />
    </Box>
  );
};

const GroupSection = ({ group, counts, setCount, setMany }) => {
  const selectable = group.models.filter(hasAvailable);
  const available = availableOf(selectable);
  const selected = sum(
    selectable.map((m) => Math.min(counts[m.id] ?? 0, m.available)),
  );
  const allChecked =
    selectable.length > 0 &&
    selectable.every((m) => (counts[m.id] ?? 0) >= m.available);
  const someChecked = !allChecked && selected > 0;

  return (
    <Box gap="xsmall">
      {group.name && (
        <Box direction="row" align="center" justify="between" gap="medium">
          {selectable.length > 0 ? (
            <CheckBox
              label={
                <Text weight="bold">
                  {group.name} ({available})
                </Text>
              }
              checked={allChecked}
              indeterminate={someChecked}
              onChange={() =>
                setMany(
                  Object.fromEntries(
                    selectable.map((m) => [m.id, allChecked ? 0 : m.available]),
                  ),
                )
              }
            />
          ) : (
            <Text weight="bold">{group.name}</Text>
          )}
          {selectable.length > 0 && (
            <Text size="small" color="text-weak">
              {selected} of {available} selected
            </Text>
          )}
        </Box>
      )}
      <Box pad={{ left: group.name ? 'medium' : undefined }}>
        {group.models.map((model) => (
          <ModelRow
            key={model.id}
            model={model}
            count={counts[model.id] ?? 0}
            onChange={(value) => setCount(model.id, value)}
          />
        ))}
      </Box>
    </Box>
  );
};

const CategoryLabel = ({ category, counts }) => {
  const models = category.groups.flatMap((g) => g.models);
  const available = availableOf(models);
  const entered = sum(models.map((m) => counts[m.id] ?? 0));

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
  const [counts, setCounts] = useState({});
  const setCount = (id, value) =>
    setCounts((prev) => ({ ...prev, [id]: value }));
  const setMany = (updates) => setCounts((prev) => ({ ...prev, ...updates }));

  const populateAll = () =>
    setCounts(
      Object.fromEntries(
        categories
          .flatMap((c) => c.groups.flatMap((g) => g.models))
          .filter(hasAvailable)
          .map((m) => [m.id, m.available]),
      ),
    );

  const total = sum(Object.values(counts));

  return (
    <Box
      background="background-front"
      round="medium"
      pad="large"
      gap="medium"
      width="large"
    >
      <Box gap="small">
        <Heading level={2} margin="none">
          Assets
        </Heading>
        <Paragraph margin="none">
          Enter the device counts you plan to return or populate them from your
          environment and adjust as needed. Select a model to include all of its
          devices, then adjust the count if needed. Count can exceed the devices
          currently in your environment.
        </Paragraph>
        <Box direction="row" gap="small" wrap>
          <Button
            label="Populate assets from my environment"
            onClick={populateAll}
          />
          <Button label="Clear all" onClick={() => setCounts({})} />
        </Box>
      </Box>

      <Accordion multiple>
        {categories.map((category) => (
          <AccordionPanel
            key={category.id}
            label={<CategoryLabel category={category} counts={counts} />}
          >
            <Box pad={{ vertical: 'small' }} gap="medium">
              {category.groups.map((group) => (
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

      <Box
        direction="row"
        justify="between"
        align="center"
        pad={{ top: 'small' }}
      >
        <Text weight="bold">Total devices to return</Text>
        <Text weight="bold" size="large">
          {total}
        </Text>
      </Box>
    </Box>
  );
};
