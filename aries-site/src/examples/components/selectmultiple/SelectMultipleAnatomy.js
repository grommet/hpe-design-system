import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Form,
  FormField,
  Grid,
  Text,
  TextInput,
} from 'grommet';
import { Up } from 'grommet-icons';

const options = [];
for (let i = 1; i <= 10; i += 1) options.push(`User ${i}`);

const selected = options.slice(0, 3);
const highlightedOption = options[5];

const rows = ['auto', 'auto', 'auto', 'auto', 'auto'];

const areas = [
  { name: 'select', start: [1, 0], end: [1, 0] },
  { name: 'selected', start: [1, 1], end: [1, 1] },
  { name: 'search', start: [1, 2], end: [1, 2] },
  { name: 'limit', start: [1, 3], end: [1, 3] },
  { name: 'list', start: [1, 4], end: [1, 4] },
  { name: 'a1', start: [0, 0], end: [0, 0] },
  { name: 'a2', start: [0, 1], end: [0, 1] },
  { name: 'a3', start: [2, 2], end: [2, 2] },
  { name: 'a4', start: [0, 3], end: [0, 3] },
  { name: 'a5', start: [2, 4], end: [2, 4] },
  { name: 'a6', start: [0, 4], end: [0, 4] },
];

export const AnatomyGrid = ({ ...rest }) => (
  <Grid
    columns={['3xsmall', 'medium', '3xsmall']}
    rows={rows}
    areas={areas}
    justify="center"
    align="center"
    {...rest}
  />
);

export const SelectMultipleInput = ({ id, ...rest }) => (
  <Box width="medium" {...rest}>
    <Form>
      {/* Disbable for anatomy diagram */}
      {/* eslint-disable-next-line grommet/formfield-name, 
      grommet/formfield-htmlfor-id */}
      <FormField
        htmlFor="multi-select-anayomy-example__input"
        name="multi-select-anatomy-example"
        label="Users"
      >
        <Box
          id={id}
          background="background-front"
          direction="row"
          pad={{ horizontal: 'xsmall', vertical: '3xsmall' }}
          justify="between"
          round="xxsmall"
        >
          <Text>{`${selected.length} selected`}</Text>
          <Up />
        </Box>
      </FormField>
    </Form>
  </Box>
);

SelectMultipleInput.propTypes = {
  id: PropTypes.string,
};

const Highlight = ({ ...rest }) => (
  <Box pad={{ horizontal: '3xsmall' }} border={{ style: 'dashed' }} {...rest} />
);

const DropElement = ({ ...rest }) => (
  <Box
    width="medium"
    background="background-front"
    elevation="medium"
    pad='3xsmall'
    round="xxsmall"
    {...rest}
  />
);

export const SelectMultipleSelected = ({ id, ...rest }) => (
  <DropElement {...rest}>
    <Highlight
      id={id}
      background="validation-ok"
      direction="row"
      justify="between"
      align="center"
    >
      {/* eslint-disable-next-line max-len */}
      <Text size="small">{`${selected.length} of ${options.length} selected`}</Text>
      <Button label="Clear All" size="small" />
    </Highlight>
  </DropElement>
);

SelectMultipleSelected.propTypes = {
  id: PropTypes.string,
};

export const SelectMultipleSearch = ({ id, ...rest }) => (
  <DropElement pad={{ horizontal: '3xsmall' }} {...rest}>
    <Highlight id={id} background="teal" pad="none">
      <TextInput placeholder="Search" />
    </Highlight>
  </DropElement>
);

SelectMultipleSearch.propTypes = {
  id: PropTypes.string,
};

export const SelectMultipleLimit = ({ id, limit, ...rest }) => (
  <DropElement pad={{ horizontal: '3xsmall', top: '3xsmall' }} {...rest}>
    <Highlight id={id} background="validation-warning">
      <Text size="small">{`Select up to ${limit}`}</Text>
    </Highlight>
  </DropElement>
);

SelectMultipleLimit.propTypes = {
  id: PropTypes.string,
  limit: PropTypes.number,
};

export const SelectMultipleOptions = ({ id, ...rest }) => (
  <DropElement {...rest}>
    <Highlight id={id} background="background-back" pad='3xsmall'>
      {options.map(label => (
        <Highlight
          id={label === highlightedOption ? 'listItem' : undefined}
          background={label === highlightedOption ? 'yellow' : undefined}
          pad="none"
          key={label}
        >
          <CheckBox
            label={label}
            checked={selected.includes(label)}
            pad='3xsmall'
          />
        </Highlight>
      ))}
    </Highlight>
  </DropElement>
);

SelectMultipleOptions.propTypes = {
  id: PropTypes.string,
};
