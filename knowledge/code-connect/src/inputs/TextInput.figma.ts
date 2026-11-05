// url=https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=3235-4678&m=dev
// source=https://github.com/grommet/grommet/blob/master/src/js/components/TextInput/TextInput.js
// component=TextInput

import figma from 'figma';

// Branch per variant; no default, else first.

let template;
if (figma.selectedInstance.getPropertyValue('has Icon') === 'none') {
  const value = figma.selectedInstance.getEnum('Value', {
    false: undefined,
    true: 'Text input value',
  });
  const disabled = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
    readOnly: false,
  });
  const readOnly = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: false,
    readOnly: true,
  });
  const focusIndicator = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: true,
    disabled: false,
    readOnly: false,
  });
  const readOnlyCopy = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: true,
    false: false,
  });
  const a11yTitle = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: 'Text input with copy action',
    false: 'Text input',
  });

  template = {
    id: 'TextInput',
    imports: ["import { TextInput } from 'grommet';"],
    example: figma.code`<TextInput name="text-input"${figma.helpers.react.renderProp(
      'a11yTitle',
      a11yTitle,
    )} placeholder="Placeholder text"${figma.helpers.react.renderProp(
      'value',
      value,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly,
    )}${figma.helpers.react.renderProp(
      'readOnlyCopy',
      readOnlyCopy,
    )}${figma.helpers.react.renderProp('focusIndicator', focusIndicator)}/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue('has Icon') === 'left') {
  const iconSwap = figma.selectedInstance
    .getInstanceSwap('Icon swap')
    ?.executeTemplate().example;
  const value = figma.selectedInstance.getEnum('Value', {
    false: undefined,
    true: 'Text input value',
  });
  const disabled = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
    readOnly: false,
  });
  const readOnly = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: false,
    readOnly: true,
  });
  const focusIndicator = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: true,
    disabled: false,
    readOnly: false,
  });
  const readOnlyCopy = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: true,
    false: false,
  });
  const a11yTitle = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: 'Text input with copy action',
    false: 'Text input',
  });

  template = {
    id: 'TextInput',
    imports: ["import { TextInput } from 'grommet';"],
    example: figma.code`<TextInput name="text-input"${figma.helpers.react.renderProp(
      'a11yTitle',
      a11yTitle,
    )} placeholder="Placeholder text"${figma.helpers.react.renderProp(
      'value',
      value,
    )}${figma.helpers.react.renderProp(
      'icon',
      iconSwap,
    )}${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly,
    )}${figma.helpers.react.renderProp(
      'readOnlyCopy',
      readOnlyCopy,
    )}${figma.helpers.react.renderProp('focusIndicator', focusIndicator)}/>`,
    metadata: { nestable: true },
  };
} else if (figma.selectedInstance.getPropertyValue('has Icon') === 'right') {
  const iconSwap = figma.selectedInstance
    .getInstanceSwap('Icon swap')
    ?.executeTemplate().example;
  const value = figma.selectedInstance.getEnum('Value', {
    false: undefined,
    true: 'Text input value',
  });
  const disabled = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
    readOnly: false,
  });
  const readOnly = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: false,
    readOnly: true,
  });
  const focusIndicator = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: true,
    disabled: false,
    readOnly: false,
  });
  const readOnlyCopy = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: true,
    false: false,
  });
  const a11yTitle = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: 'Text input with copy action',
    false: 'Text input',
  });

  template = {
    id: 'TextInput',
    imports: ["import { TextInput } from 'grommet';"],
    example: figma.code`<TextInput name="text-input"${figma.helpers.react.renderProp(
      'a11yTitle',
      a11yTitle,
    )} placeholder="Placeholder text"${figma.helpers.react.renderProp(
      'value',
      value,
    )}${figma.helpers.react.renderProp(
      'icon',
      iconSwap,
    )} reverse${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly,
    )}${figma.helpers.react.renderProp(
      'readOnlyCopy',
      readOnlyCopy,
    )}${figma.helpers.react.renderProp('focusIndicator', focusIndicator)}/>`,
    metadata: { nestable: true },
  };
} else {
  const iconSwap = figma.selectedInstance
    .getInstanceSwap('Icon swap')
    ?.executeTemplate().example;
  const value = figma.selectedInstance.getEnum('Value', {
    false: undefined,
    true: 'Text input value',
  });
  const disabled = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: true,
    readOnly: false,
  });
  const readOnly = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: false,
    disabled: false,
    readOnly: true,
  });
  const focusIndicator = figma.selectedInstance.getEnum('State', {
    enabled: false,
    hovered: false,
    focused: true,
    disabled: false,
    readOnly: false,
  });
  const readOnlyCopy = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: true,
    false: false,
  });
  const a11yTitle = figma.selectedInstance.getBoolean('show ReadOnlyCopy', {
    true: 'Text input with copy action',
    false: 'Text input',
  });

  template = {
    id: 'TextInput',
    imports: ["import { TextInput } from 'grommet';"],
    example: figma.code`<TextInput name="text-input"${figma.helpers.react.renderProp(
      'a11yTitle',
      a11yTitle,
    )} placeholder="Placeholder text"${figma.helpers.react.renderProp(
      'value',
      value,
    )}${figma.helpers.react.renderProp(
      'icon',
      iconSwap,
    )} reverse${figma.helpers.react.renderProp(
      'disabled',
      disabled,
    )}${figma.helpers.react.renderProp(
      'readOnly',
      readOnly,
    )}${figma.helpers.react.renderProp(
      'readOnlyCopy',
      readOnlyCopy,
    )}${figma.helpers.react.renderProp('focusIndicator', focusIndicator)}/>`,
    metadata: { nestable: true },
  };
}

export default template;
