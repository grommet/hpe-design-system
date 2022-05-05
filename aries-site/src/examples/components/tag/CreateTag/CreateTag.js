import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Form,
  FormField,
  Keyboard,
  Select,
  Tag,
  Text,
  ResponsiveContext,
} from 'grommet';
import { ThemeContext } from 'styled-components';
import { tagData } from '../data';
import {
  alphabetize,
  getRegExp,
  TagPageHeader,
  prefix,
  TagAppContainer,
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
  const [nameOptions, setNameOptions] = useState(
    alphabetize(defaultNameOptions, 'label'),
  );
  const [name, setName] = useState(defaultName);
  const [nameSearch, setNameSearch] = useState('');

  // value
  const [valueOptions, setValueOptions] = useState(
    alphabetize(
      name
        ? defaultNameOptions.filter(n => n.label === name)[0].values
        : defaultValueOptions,
    ),
  );
  const [value, setValue] = useState(defaultValue);
  const [valueSearch, setValueSearch] = useState('');
  const [nameOpen, setNameOpen] = useState('');
  const [valueOpen, setValueOpen] = useState('');

  // tags
  const [currentTags, setCurrentTags] = useState(defaultTags);

  const onEnterName = () => {
    if (nameSearch.length) {
      defaultNameOptions.pop(); // remove create options
      defaultNameOptions.push({ label: nameSearch, values: [] });
      setNameOptions(alphabetize(defaultNameOptions, 'label'));
      setName(nameSearch);
      setNameOpen(false);
    }
  };

  const onEnterValue = () => {
    if (valueSearch.length) {
      defaultValueOptions.pop();
      defaultValueOptions.push(valueSearch);
      setValueOptions(
        alphabetize(
          name
            ? defaultNameOptions.filter(n => n.label === name)[0].values
            : defaultValueOptions,
        ),
      );
      setValue(valueSearch);
      setValuesOpen(false);
    }
  };

  useEffect(() => {
    const nextValueOptions = name
      ? defaultNameOptions.filter(n => n.label === name)[0].values
      : defaultValueOptions;
    setValueOptions(nextValueOptions);
  }, [name]);

  return (
    <TagAppContainer>
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
            !['xsmall', 'small'].includes(size)
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
            <Keyboard onEnter={onEnterName}>
              <Select
                name="tag-name"
                id="tag-name"
                placeholder="Select or create a name"
                value={name}
                options={nameOptions}
                open={nameOpen}
                onChange={({ option, value: val }) => {
                  if (option.label.includes(prefix)) {
                    defaultNameOptions.pop(); // remove Create option
                    defaultNameOptions.push({ label: nameSearch, values: [] });
                    setNameOptions(alphabetize(defaultNameOptions, 'label'));
                    setName(nameSearch);
                  } else {
                    setName(val);
                  }
                }}
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
            </Keyboard>
          </FormField>
          <FormField
            name="tag-value"
            htmlFor="tag-value"
            label="Value"
            required={{ indicator: false }}
          >
            <Keyboard onEnter={onEnterValue}>
              <Select
                name="tag-value"
                id="tag-value"
                placeholder="Select or create a value"
                value={value}
                options={valueOptions}
                open={valueOpen}
                onChange={({ option }) => {
                  if (option.includes(prefix)) {
                    if (name.length) {
                      const { values } = defaultNameOptions.filter(
                        n => n.label === name,
                      )[0];
                      values.pop(); // remove Create option
                      values.push(valueSearch);
                      setValueOptions(
                        alphabetize(
                          name
                            ? defaultNameOptions.filter(
                                n => n.label === name,
                              )[0].values
                            : defaultValueOptions,
                        ),
                      );
                      setValue(valueSearch);
                    } else {
                      defaultValueOptions.pop();
                      defaultValueOptions.push(valueSearch);
                      setValueOptions(
                        alphabetize(
                          name
                            ? defaultNameOptions.filter(
                                n => n.label === name,
                              )[0].values
                            : defaultValueOptions,
                        ),
                      );
                      setValue(valueSearch);
                    }
                  } else {
                    setValue(option);
                  }
                }}
                onSearch={text => {
                  const nextValueOptions =
                    defaultNameOptions.filter(n => n.label === name)[0]
                      ?.values || defaultValueOptions;
                  updateCreateOption(text, nextValueOptions);
                  const exp = getRegExp(text);
                  setValueOptions(nextValueOptions.filter(o => exp.test(o)));
                  setValueSearch(text);
                }}
              />
            </Keyboard>
          </FormField>
          <Box
            justify="start"
            // use theme style values to align Button with FormField input
            pad={
              !['xsmall', 'small'].includes(size)
                ? {
                    top: `${parseInt(theme.text.xsmall.height, 10) +
                      parseInt(
                        theme.global.edgeSize[theme.formField.label.margin.top],
                        10,
                      ) +
                      parseInt(
                        theme.global.edgeSize[
                          theme.formField.content.margin.vertical
                        ],
                        10,
                      )}px`,
                  }
                : undefined
            }
          >
            <Button
              alignSelf="start"
              label="Assign"
              type="submit"
              fill={
                ['xsmall', 'small'].includes(size) ? 'horizontal' : undefined
              }
              secondary
            />
          </Box>
        </Grid>
      </Form>
      <TagResults>
        {currentTags.length === 0 ? (
          <Text margin="xsmall">No tags have been assigned.</Text>
        ) : (
          currentTags.map((t, index) => (
            <Tag
              key={index}
              alignSelf="start"
              name={t.name}
              value={t.value}
              margin="xsmall"
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
    </TagAppContainer>
  );
};
