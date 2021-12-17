import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Grid,
  Form,
  FormField,
  Select,
  Tag,
  Text,
  ResponsiveContext,
} from 'grommet';
import { tagData } from './data';

// the prefix name of the Create option entry
const prefix = 'Create';

const defaultNameOptions = [];
const defaultValueOptions = [];
const defaultName = '';
const defaultValue = '';
const defaultTags = [];

Object.entries(tagData).forEach(([, value]) => {
  defaultNameOptions.push({
    label: value.displayName,
    values: value.options,
  });
});

const updateCreateOption = (text, dataVal) => {
  const len = dataVal.length;
  console.log(dataVal);
  const d =
    dataVal[len - 1] && typeof dataVal[len - 1] === 'object'
      ? dataVal[len - 1].label
      : dataVal[len - 1];

  if (d && d.includes(prefix)) {
    // remove Create option before adding an updated one
    dataVal.pop();
  }
  const res = `${prefix} '${text}'`;
  dataVal.push(
    dataVal[dataVal.length - 1] &&
      typeof dataVal[dataVal.length - 1] === 'object'
      ? { label: res, values: [] }
      : res,
  );
};

// improving Search support of special characters
const getRegExp = text => {
  // The line below escapes regular expression special characters:
  // [ \ ^ $ . | ? * + ( )
  const escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

  // Create the regular expression with modified value which
  // handles escaping special characters. Without escaping special
  // characters, errors will appear in the console
  return new RegExp(escapedText, 'i');
};

export const CreateNameValuePair = () => {
  const size = useContext(ResponsiveContext);
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
    <Box gap="large" overflow="auto">
      <Box gap="large" flex={false}>
        <Box gap="xsmall" flex={false}>
          <Heading level={2} margin="none">
            Create and Assign Tags
          </Heading>
          <Text size="large">
            Tags are name-value pairs that can be assigned to resources.
          </Text>
        </Box>
        <Text size="large">
          Tags will be assigned to <Text weight="bold">1</Text> device.
        </Text>
      </Box>
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
                console.log(defaultNameOptions, name);
                const nextValueOptions = defaultNameOptions.filter(
                  n => n.label === name,
                )[0].values;
                updateCreateOption(text, nextValueOptions);
                const exp = getRegExp(text);
                setValueOptions(nextValueOptions.filter(o => exp.test(o)));
                setValueSearch(text);
              }}
            />
          </FormField>
          <Box justify="end" pad={{ bottom: 'xsmall' }}>
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
      <Box flex={false}>
        <Box border="bottom" pad={{ horizontal: 'small', vertical: 'xsmall' }}>
          <Text color="text-strong" weight="bold">
            Tags to be assigned
          </Text>
        </Box>
        <Box
          direction="row"
          gap="small"
          pad={{ horizontal: 'small', vertical: 'small' }}
        >
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
        </Box>
      </Box>
    </Box>
  );
};
