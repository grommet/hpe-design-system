/* eslint-disable react/prop-types */
import React from 'react';
import { Anchor, Box } from 'grommet';
import {
  anchorArgTypes,
  Default as AnchorDefault,
} from '@shared/aries-core/src/stories/components/Anchor.stories';
import {
  boxArgTypes,
  Default as BoxDefault,
} from '@shared/aries-core/src/stories/components/Box.stories.tsx';
import {
  ComponentPlayground,
} from '../../../components/content/ComponentPlayground';

// Extract code from story render function
const getCodeFromStoryRender = (storyRender, props) => {
  // Get the function source code as string
  const renderSource = storyRender.toString();

  // Extract the JSX part - look for the return statement
  const jsxMatch = renderSource.match(/return\s+([^;]+);?\s*}/);
  if (!jsxMatch) return null;

  let jsxCode = jsxMatch[1].trim();

  // Clean up the JSX code - remove parentheses if wrapped
  jsxCode = jsxCode.replace(/^\(/, '').replace(/\)$/, '');

  // Replace {...args} with actual props
  const propsString = Object.entries(props)
    .filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    )
    .map(([key, value]) => {
      if (typeof value === 'boolean') {
        return value ? `${key}` : null;
      }
      if (typeof value === 'string') {
        return `${key}="${value}"`;
      }
      return null;
    })
    .filter(Boolean)
    .join('\n  ');

  // Replace {...args} with formatted props
  jsxCode = jsxCode.replace(
    /\{\.\.\.\w+\}/,
    propsString ? `\n  ${propsString}\n` : '',
  );

  // Extract component imports from JSX
  const componentMatches = jsxCode.match(/<(\w+)/g);
  const components = [
    ...new Set(componentMatches?.map(match => match.replace('<', '')) || []),
  ];

  const importStatement = `import { ${components.join(', ')} } from 'grommet';`;

  return `${importStatement}

${jsxCode}`;
};

// Component configurations
const COMPONENT_CONFIGS = {
  anchor: {
    component: Anchor,
    argTypes: anchorArgTypes,
    defaultProps: AnchorDefault.args,
  },
  box: {
    component: Box,
    argTypes: boxArgTypes,
    defaultProps: BoxDefault.args,
    customRender: BoxDefault.render,
    // Use story's render function for code generation
    codeTemplate: props => getCodeFromStoryRender(BoxDefault.render, props),
  },
};

// Transform Storybook argTypes to ComponentPlayground controls format
const transformArgTypesToControls = (argTypes, componentName) => {
  const controls = [];

  Object.entries(argTypes).forEach(([name, argType]) => {
    const control = {
      name,
      displayLabel:
        name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, ' $1'),
    };

    // Determine control type based on Storybook control type
    const controlType = argType.control?.type;

    if (controlType === 'text') {
      control.type = 'text';
    } else if (controlType === 'boolean') {
      control.type = 'checkbox';
    } else if (controlType === 'select') {
      control.type = 'select';
      control.options = argType.options || [];

      // Special handling for icon type
      if (argType.mapping) {
        control.type = 'icon';
        control.options = argType.options
          .filter(opt => opt !== 'none')
          .map(opt => ({ label: opt, value: opt }));
        // Add None option at the beginning
        control.options.unshift({ label: 'None', value: null });
      }
    }

    // Add conditional visibility for reverse (anchor-specific)
    if (name === 'reverse' && componentName === 'anchor') {
      control.showWhen = props => props.icon && props.label;
    }

    controls.push(control);
  });

  return controls;
};

export const Playground = ({ component: componentName }) => {
  const config = COMPONENT_CONFIGS[componentName.toLowerCase()];

  const controls = transformArgTypesToControls(
    config.argTypes,
    componentName.toLowerCase(),
  );

  // Set display name for code generation
  config.component.displayName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);

  return (
    <ComponentPlayground
      component={config.customRender || config.component}
      defaultProps={config.defaultProps}
      controls={controls}
      codeTemplate={config.codeTemplate}
    />
  );
};
