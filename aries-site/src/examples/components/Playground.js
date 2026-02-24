/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Text } from 'grommet';
import { anchorArgTypes } from '@shared/aries-core/src/stories/components/Anchor.stories';
import { boxArgTypes } from '@shared/aries-core/src/stories/components/Box.stories';
import { ComponentPlayground } from '../../components/content/ComponentPlayground';

// Component configurations
const COMPONENT_CONFIGS = {
  anchor: {
    component: Anchor,
    argTypes: anchorArgTypes,
    defaultProps: {
      label: 'Link',
      href: '#',
      a11yTitle: 'Navigate to link',
      icon: null,
      size: 'medium',
      reverse: false,
      disabled: false,
    },
  },
  box: {
    component: Box,
    argTypes: boxArgTypes,
    defaultProps: {
      direction: 'column',
      pad: 'medium',
    },
    // Custom renderer for Box to include children
    customRender: props => (
      <Box {...props}>
        <Text>First item</Text>
        <Text>Second item</Text>
        <Text>Third item</Text>
      </Box>
    ),
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

  if (!config) {
    return (
      <div>Component "{componentName}" not found in playground config</div>
    );
  }

  const controls = transformArgTypesToControls(
    config.argTypes,
    componentName.toLowerCase(),
  );

  // Set display name for code generation
  const displayName =
    componentName.charAt(0).toUpperCase() + componentName.slice(1);
  config.component.displayName = displayName;

  // If using customRender, set its displayName too
  if (config.customRender) {
    config.customRender.displayName = displayName;
  }

  return (
    <ComponentPlayground
      component={config.customRender || config.component}
      defaultProps={config.defaultProps}
      controls={controls}
    />
  );
};

Playground.propTypes = {
  component: PropTypes.string.isRequired,
};
