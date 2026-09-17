import figma from '@figma/code-connect';
import { TextInput } from 'grommet';

const FIGMA_URL =
  'https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3235-4678&m=dev';

const sharedProps = {
  value: figma.enum('Value', {
    false: undefined,
    true: 'Text input value',
  }),
  disabled: figma.enum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
    readOnly: false,
  }),
  readOnly: figma.enum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: false,
    readOnly: true,
  }),
  focusIndicator: figma.enum('State', {
    enabled: false,
    hovered: false,
    focused: true,
    disabled: false,
    readOnly: false,
  }),
  readOnlyCopy: figma.boolean('show ReadOnlyCopy', {
    true: true,
    false: false,
  }),
  a11yTitle: figma.boolean('show ReadOnlyCopy', {
    true: 'Text input with copy action',
    false: 'Text input',
  }),
};

figma.connect(TextInput, FIGMA_URL, {
  variant: { 'has Icon': 'none' },
  props: sharedProps,
  example: ({
    value,
    disabled,
    readOnly,
    focusIndicator,
    readOnlyCopy,
    a11yTitle,
  }) => (
    <TextInput
      name="text-input"
      a11yTitle={a11yTitle}
      placeholder="Placeholder text"
      value={value}
      disabled={disabled}
      readOnly={readOnly}
      readOnlyCopy={readOnlyCopy}
      focusIndicator={focusIndicator}
    />
  ),
});

figma.connect(TextInput, FIGMA_URL, {
  variant: { 'has Icon': 'left' },
  props: {
    ...sharedProps,
    iconSwap: figma.instance('Icon swap'),
  },
  example: ({
    value,
    disabled,
    readOnly,
    focusIndicator,
    readOnlyCopy,
    a11yTitle,
    iconSwap,
  }) => (
    <TextInput
      name="text-input"
      a11yTitle={a11yTitle}
      placeholder="Placeholder text"
      value={value}
      icon={iconSwap}
      disabled={disabled}
      readOnly={readOnly}
      readOnlyCopy={readOnlyCopy}
      focusIndicator={focusIndicator}
    />
  ),
});

figma.connect(TextInput, FIGMA_URL, {
  variant: { 'has Icon': 'right' },
  props: {
    ...sharedProps,
    iconSwap: figma.instance('Icon swap'),
  },
  example: ({
    value,
    disabled,
    readOnly,
    focusIndicator,
    readOnlyCopy,
    a11yTitle,
    iconSwap,
  }) => (
    <TextInput
      name="text-input"
      a11yTitle={a11yTitle}
      placeholder="Placeholder text"
      value={value}
      icon={iconSwap}
      reverse
      disabled={disabled}
      readOnly={readOnly}
      readOnlyCopy={readOnlyCopy}
      focusIndicator={focusIndicator}
    />
  ),
});