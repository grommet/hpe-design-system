import figma from '@figma/code-connect';
import { Select } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3237-3363&m=dev';

const options = [
  'Item one',
  'Item two',
  'Item three',
  'Item four',
  'Item five',
  'Item six',
];

figma.connect(Select, FIGMA_URL, {
  props: {
    value: figma.enum('is Value', {
      false: undefined,
      true: 'Item three',
    }),
    disabled: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: false,
      disabled: true,
    }),
    open: figma.enum('is Drop Open', {
      false: false,
      true: true,
    }),
    focusIndicator: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: true,
      disabled: false,
    }),
  },
  example: ({ value, disabled, open, focusIndicator }) => (
    <Select
      name="select"
      placeholder="Select item"
      options={options}
      value={value}
      disabled={disabled}
      open={open}
      focusIndicator={focusIndicator}
    />
  ),
});