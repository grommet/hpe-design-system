import figma from '@figma/code-connect';
import { TimeInput } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=42063-13844&m=dev';

figma.connect(TimeInput, FIGMA_URL, {
  props: {
    // prettier-ignore
    format: figma.enum('Format', {
      '12': '12',
      '24': '24',
    }),
    value: figma.enum('has Value', {
      True: '10:30',
      False: undefined,
    }),
    disabled: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: false,
      'focused button': false,
      disabled: true,
      readOnly: false,
    }),
    readOnly: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: false,
      'focused button': false,
      disabled: false,
      readOnly: true,
    }),
    focusIndicator: figma.enum('State', {
      enabled: false,
      hovered: false,
      focused: true,
      'focused button': true,
      disabled: false,
      readOnly: false,
    }),
  },
  example: ({ format, value, disabled, readOnly, focusIndicator }) => (
    <TimeInput
      name="time-input"
      format={format}
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      focusIndicator={focusIndicator}
    />
  ),
});
