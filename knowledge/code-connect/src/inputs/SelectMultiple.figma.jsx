import figma from '@figma/code-connect';
import { SelectMultiple } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=4377-3922&m=dev';

const options = [
  'Azure ISO27001:2013',
  'Azure MAS-TRM:v2019.03',
  'Azure NIST800-53:R4',
  'Azure NZISM:v3.2',
  'Azure Security Health Check',
  'Butterfly:v1.0',
];

figma.connect(SelectMultiple, FIGMA_URL, {
  props: {
    value: figma.enum('has Value', {
      false: undefined,
      true: [
        'Azure ISO27001:2013',
        'Azure MAS-TRM:v2019.03',
        'Azure NIST800-53:R4',
      ],
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
    showSelectedInline: figma.enum('Selected Inline', {
      false: false,
      true: true,
    }),
  },
  example: ({ value, disabled, open, focusIndicator, showSelectedInline }) => (
    <SelectMultiple
      name="select-multiple"
      placeholder="Select multiple items"
      searchPlaceholder="Search Frameworks"
      options={options}
      value={value}
      disabled={disabled}
      open={open}
      focusIndicator={focusIndicator}
      showSelectedInline={showSelectedInline}
    />
  ),
});
