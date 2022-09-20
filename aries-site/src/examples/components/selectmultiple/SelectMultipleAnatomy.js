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
      { name: 'a1', start: [0, 1], end: [0, 1] },
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

export const SelectMultipleInput = ({ id, ...rest }) => (
  <Form { ...rest }>
    <FormField
      htmlFor="multi-select-anayomy-example__input"
      name="multi-select-anatomy-example"
      label="Users"
    >
      <Box
        id={id}
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
);

const Highlight = ({ ...rest }) => (
  <Box
    pad={{ horizontal: 'xsmall' }}
    border={{ style: 'dashed' }}
    {...rest}
  />
);

const DropElement = ({ ...rest }) => (
  <Box
    background="background-front"
    elevation="medium"
    pad="xsmall"
    {...rest}
  />
);

export const SelectMultipleSelected = ({ id, ...rest }) => (
  <DropElement { ...rest }>
    <Highlight
      id={id}
      background="validation-ok"
      direction="row"
      justify="between"
      align="center"
    >
      <Text size="small">{`${selected.length} of ${options.length} selected`}</Text>
      <Button label="Clear All" size="small"/>
    </Highlight>
  </DropElement>
)
export const SelectMultipleSearch = ({ id, ...rest }) => (
  <DropElement { ...rest }>
    <Highlight id={id} background="teal" pad="none">
      <TextInput />
    </Highlight>
  </DropElement>
);

export const SelectMultipleLimit = ({ id, limit, ...rest }) => (
  <DropElement { ...rest }>
    <Highlight id={id} background="validation-warning">
      <Text size="small">{`Select up to ${limit}`}</Text>
    </Highlight>
  </DropElement>
)

export const SelectMultipleOptions = ({ id, ...rest }) => (
  <DropElement { ...rest }>
    <Highlight id={id} background="background-back" pad='xsmall'>
      {options.map((label) => (
        <Highlight
        id={(label === highlightedOption) ? "listItem" : undefined}
        background={label === highlightedOption ? "yellow" : undefined}>
          <CheckBox 
            label={label}
            checked={selected.includes(label)}
          />
        </Highlight>
      ))}
    </Highlight>
  </DropElement>
);

export const SelectMultipleDrop = () => (
  <>
    <SelectMultipleSelected id="selected" />
    <SelectMultipleSearch id="search" />
    <SelectMultipleLimit id="limit" limit={6} />
    <SelectMultipleOptions id="list" />
  </>
);

export const SelectMultipleAnatomy = ({ ...rest }) => (
  <Box width="medium" flex="grow" {...rest}>
    <SelectMultipleInput id="select" />
    <SelectMultipleDrop />
  </Box>
);
