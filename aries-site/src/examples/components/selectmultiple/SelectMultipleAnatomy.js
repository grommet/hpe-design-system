import { Box, Button, CheckBox, Form, FormField, Grid, Text, TextInput } from "grommet";
import { FormUp } from 'grommet-icons';

const options = [];
for (let i = 1; i<= 10; i += 1) options.push(`User ${i}`);

const selected = options.slice(0, 3);
const highlightedOption = options[5];

const rows = ['32px','38px', '50px', '36px', '44px', ...options.map(() => "38px"), '36px'];

export const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['xsmall', 'medium', 'xsmall']}
    rows={rows}
    areas={[
      { name: 'component', start: [1, 0], end: [1, 15]},
      { name: 'a1', start: [0, 1], end: [0, 1]},
      { name: 'a2', start: [0, 2], end: [0, 2] },
      { name: 'a3', start: [2, 3], end: [2, 3] },
      { name: 'a4', start: [0, 4], end: [0, 4] },
      { name: 'a5', start: [2, 9], end: [2, 9] },
      { name: 'a6', start: [0, 10], end: [0, 10] },
    ]}
    justify="center"
    align="center"
    {...rest}
  />
);

export const SelectMultipleAnatomy = ({ ...rest }) => (
  <Box width="medium" flex="grow" {...rest}>
    <Form>
      <FormField
        htmlFor="multi-select-anayomy-example__input"
        name="multi-select-anatomy-example"
        label="Users"
      >
        <Box
          id="select"
          background="background-front"
          direction="row"
          pad={{ horizontal: 'small', vertical: 'xsmall' }}
          justify="between"
        >
          <Text>{`${selected.length} selected`}</Text>
          <FormUp />
        </Box>
      </FormField>
    </Form>
    <Box background="background-front" elevation="medium" pad="xsmall" gap="xsmall">
      <Box
        id="selected"
        direction="row"
        justify="between"
        align="center"
        pad={{ horizontal: 'xsmall' }}
        background="validation-ok"
        border={{ style: 'dashed' }}
      >
        <Text size="small">{`${selected.length} of ${options.length} selected`}</Text>
        <Button label="Clear All" size="small"/>
      </Box>
      <Box id="search" background="teal" border={{ style: 'dashed' }}>
        <TextInput />
      </Box>
      <Box
        id="limit"
        pad={{ horizontal: 'xsmall' }}
        background="validation-warning"
        border={{ style: 'dashed' }}
      >
        <Text size="small">Select up to 6</Text>
      </Box>
      <Box
        id="list"
        border={{ style: 'dashed' }}
        pad='xsmall'
        background="background-back"
      >
        {options.map((label) => (
          <Box
            id={(label === highlightedOption) ? "listItem" : undefined}
            border={{ style: 'dashed' }}
            background={label === highlightedOption ? "yellow" : undefined}>
            <CheckBox 
              label={label}
              checked={selected.includes(label)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  </Box>
);
