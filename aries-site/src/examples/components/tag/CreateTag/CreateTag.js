import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Form,
  FormField,
  Select,
  Tag,
  Text,
  ResponsiveContext,
} from 'grommet';
import { ThemeContext } from 'styled-components';
import { tagData } from '../data';
import {
  AppContainer,
  getRegExp,
  TagPageHeader,
  prefix,
  TagResults,
  updateCreateOption,
} from '.';

const defaultNameOptions = [];
const defaultValueOptions = [];
const defaultName = '';
const defaultValue = '';
const defaultTags = [];

tagData.forEach(datum => {
  const [name] = Object.keys(datum);
  const [values] = Object.values(datum);
  defaultNameOptions.push({
    label: name,
    values,
  });
});

export const CreateTag = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  // name
  const [nameOptions, setNameOptions] = useState(defaultNameOptions);
  const [name, setName] = useState(defaultName);
  const [nameSearch, setNameSearch] = useState('');

  // value
  const [valueOptions, setValueOptions] = useState(defaultValueOptions);
  const [value, setValue] = useState(defaultValue);
  const [valueSearch, setValueSearch] = useState('');

  // tags
  const [currentTags, setCurrentTags] = useState(defaultTags);

  useEffect(() => {
    const nextValueOptions = name
      ? defaultNameOptions.filter(n => n.label === name)[0].values
      : defaultValueOptions;
    setValueOptions(nextValueOptions);
  }, [name]);

  return (
    <AppContainer>
      <TagPageHeader />
      <Form
        messages={{ required: 'This is a required field.' }}
        onSubmit={() => {
          const exists = currentTags.filter(
            t => t.name === name && t.value === value,
          );
          if (!exists.length) setCurrentTags([...currentTags, { name, value }]);
          setName(defaultName);
          setValue(defaultValue);
        }}
      >
        <Grid
          columns={
            size !== 'small'
              ? [['auto', 'medium'], ['auto', 'medium'], 'auto']
              : '100%'
          }
          gap={{ column: 'medium', row: 'small' }}
        >
          <FormField
            label="Name"
            name="tag-name"
            htmlFor="tag-name"
            required={{ indicator: false }}
          >
            <Select
              name="tag-name"
              id="tag-name"
              placeholder="Select or create a name"
              value={name}
              options={nameOptions}
              onChange={({ option, value: val }) => {
                if (option.label.includes(prefix)) {
                  defaultNameOptions.pop(); // remove Create option
                  defaultNameOptions.push({ label: nameSearch, values: [] });
                  setName(nameSearch);
                } else {
                  setName(val);
                }
              }}
              onClose={() => setNameOptions(defaultNameOptions)}
              onSearch={text => {
                updateCreateOption(text, defaultNameOptions);
                const exp = getRegExp(text);
                setNameOptions(
                  defaultNameOptions.filter(o => exp.test(o.label)),
                );
                setNameSearch(text);
              }}
              labelKey="label"
              valueKey={{ key: 'label', reduce: true }}
            />
          </FormField>
          <FormField
            name="tag-value"
            htmlFor="tag-value"
            label="Value"
            required={{ indicator: false }}
          >
            <Select
              name="tag-value"
              htmlFor="tag-value"
              placeholder="Select or create a value"
              value={value}
              options={valueOptions}
              onChange={({ option }) => {
                if (option.includes(prefix)) {
                  const { values } = defaultNameOptions.filter(
                    n => n.label === name,
                  )[0];
                  values.pop(); // remove Create option
                  values.push(valueSearch);
                  setValue(valueSearch);
                } else {
                  setValue(option);
                }
              }}
              onClose={() =>
                setValueOptions(
                  name
                    ? defaultNameOptions.filter(n => n.label === name)[0].values
                    : defaultValueOptions,
                )
              }
              onSearch={text => {
                const nextValueOptions =
                  defaultNameOptions.filter(n => n.label === name)[0]?.values ||
                  defaultValueOptions;
                updateCreateOption(text, nextValueOptions);
                const exp = getRegExp(text);
                setValueOptions(nextValueOptions.filter(o => exp.test(o)));
                setValueSearch(text);
              }}
            />
          </FormField>
          <Box
            justify="start"
            pad={{
              top: `${parseInt(theme.global.edgeSize.medium, 10) +
                parseInt(theme.global.edgeSize.xsmall, 10) +
                2 * parseInt(theme.global.edgeSize.hair, 10)}px`,
            }}
          >
            <Button
              alignSelf="start"
              label="Assign"
              type="submit"
              fill={size === 'small' ? 'horizontal' : undefined}
              secondary
            />
          </Box>
        </Grid>
      </Form>
      <TagResults>
        {currentTags.length === 0 ? (
          <Text>No tags have been assigned.</Text>
        ) : (
          currentTags.map((t, index) => (
            <Tag
              key={index}
              alignSelf="start"
              name={t.name}
              value={t.value}
              onRemove={() => {
                setCurrentTags(
                  currentTags.filter(
                    s => !(t.name === s.name && t.value === s.value),
                  ),
                );
              }}
            />
          ))
        )}
      </TagResults>
    </AppContainer>
  );
};
