import React, { useContext, useState } from 'react';
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
import { simpleTags } from './data';
import {
  alphabetize,
  getRegExp,
  TagPageHeader,
  prefix,
  TagAppContainer,
  TagResults,
  updateCreateOption,
} from './CreateTag';
import { ContentPane } from '../../../layouts';

const defaultValueOptions = [];
const defaultValue = '';
const defaultTags = [];

simpleTags.forEach(datum => {
  defaultValueOptions.push(datum);
});

export const CreateTagSimple = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  // value
  const [valueOptions, setValueOptions] = useState(
    alphabetize(defaultValueOptions),
  );
  const [value, setValue] = useState(defaultValue);
  const [valueSearch, setValueSearch] = useState('');

  // tags
  const [currentTags, setCurrentTags] = useState(defaultTags);

  return (
    <TagAppContainer>
      <ContentPane gap="medium">
        <TagPageHeader
          description={`Tags are values that can be assigned to 
      resources.`}
          pad="none"
        />
        <Form
          messages={{ required: 'This is a required field.' }}
          onSubmit={() => {
            const exists = currentTags.filter(t => t === value);
            if (!exists.length) setCurrentTags([...currentTags, value]);
            setValue(defaultValue);
          }}
        >
          <Grid
            columns={
              !['xsmall', 'small'].includes(size)
                ? [['auto', 'medium'], 'auto']
                : '100%'
            }
            gap={{ column: 'medium', row: 'small' }}
          >
            <FormField
              name="tag-value-simple"
              htmlFor="tag-value-simple"
              label="Tags"
              required={{ indicator: false }}
            >
              <Select
                name="tag-value-simple"
                id="tag-value-simple"
                placeholder="Select or create a tag"
                value={value}
                options={valueOptions}
                onChange={({ option }) => {
                  if (option.includes(prefix)) {
                    defaultValueOptions.pop(); // remove Create option
                    defaultValueOptions.push(valueSearch);
                    setValueOptions(alphabetize(defaultValueOptions));
                    setValue(valueSearch);
                  } else {
                    setValue(option);
                  }
                }}
                onSearch={text => {
                  const nextValueOptions = defaultValueOptions;
                  updateCreateOption(text, nextValueOptions);
                  const exp = getRegExp(text);
                  setValueOptions(
                    alphabetize(nextValueOptions.filter(o => exp.test(o))),
                  );
                  setValueSearch(text);
                }}
                searchPlaceholder="Search"
              />
            </FormField>
            <Box
              justify="start"
              // use theme style values to align Button with FormField input
              pad={
                !['xsmall', 'small'].includes(size)
                  ? {
                      top: `${
                        parseInt(theme.text.xsmall.height, 10) * 16 +
                        parseInt(
                          theme.global.edgeSize[
                            theme.formField.label.margin.top
                          ],
                          10,
                        ) +
                        parseInt(
                          theme.global.edgeSize[
                            theme.formField.content.margin.vertical
                          ],
                          10,
                        )
                      }px`,
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
                value={t}
                margin="xsmall"
                onRemove={() => {
                  setCurrentTags(currentTags.filter(s => t !== s));
                }}
              />
            ))
          )}
        </TagResults>
      </ContentPane>
    </TagAppContainer>
  );
};
