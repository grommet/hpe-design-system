import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Select,
  Text,
  TextInput,
  Heading,
} from 'grommet';
import { Copy } from '@hpe-design/icons-grommet';

const ICON_OPTIONS = [
  { label: 'None', value: null },
  { label: 'NewWindow', value: 'NewWindow' },
  { label: 'LinkNext', value: 'LinkNext' },
  { label: 'LinkPrevious', value: 'LinkPrevious' },
];

export const ComponentPlayground = ({
  component: Component,
  defaultProps = {},
  controls = [],
}) => {
  const [componentProps, setComponentProps] = useState(defaultProps);
  const [copied, setCopied] = useState(false);

  const handlePropChange = (propName, value) => {
    setComponentProps(prev => ({ ...prev, [propName]: value }));
  };

  const generateCode = () => {
    const propsString = Object.entries(componentProps)
      .filter(
        ([, value]) => value !== null && value !== undefined && value !== '',
      )
      .map(([key, value]) => {
        if (key === 'icon' && value) {
          return `icon={<${value} />}`;
        }
        if (typeof value === 'boolean') {
          return value ? key : null;
        }
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        return null;
      })
      .filter(Boolean)
      .join(' ');

    const iconImport = componentProps.icon
      ? `import { ${componentProps.icon} } from '@hpe-design/icons-grommet';\n`
      : '';

    const componentName = Component.displayName || 'Component';
    const propsCode = propsString ? ` ${propsString}` : '';

    return `${iconImport}import { ${componentName} } from 'grommet';

<${componentName}${propsCode} />`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderControl = control => {
    const { name, type, options, label } = control;

    let controlElement;

    switch (type) {
      case 'text':
        controlElement = (
          <TextInput
            value={
              componentProps[name] !== undefined &&
              componentProps[name] !== null
                ? String(componentProps[name])
                : ''
            }
            onChange={event => handlePropChange(name, event.target.value)}
            placeholder={`Enter ${label || name}`}
            size="small"
          />
        );
        break;

      case 'select':
        controlElement = (
          <Select
            options={options || []}
            value={componentProps[name] || ''}
            onChange={({ option }) => handlePropChange(name, option)}
            placeholder={`Select ${label || name}`}
            size="small"
          />
        );
        break;

      case 'checkbox':
        controlElement = (
          <CheckBox
            checked={componentProps[name] || false}
            onChange={event => handlePropChange(name, event.target.checked)}
            toggle
          />
        );
        break;

      case 'icon':
        controlElement = (
          <Select
            options={options || ICON_OPTIONS}
            labelKey="label"
            valueKey="value"
            value={
              (options || ICON_OPTIONS).find(
                opt => opt.value === componentProps[name],
              ) || { label: 'None', value: null }
            }
            onChange={({ option }) => handlePropChange(name, option.value)}
            size="small"
          />
        );
        break;

      default:
        return null;
    }

    return (
      <Box
        key={name}
        direction="row"
        align="center"
        justify="between"
        pad={{ vertical: 'xsmall' }}
        border={{ side: 'bottom', color: 'border-weak' }}
      >
        <Text size="small" weight={500}>
          {label || name}
        </Text>
        <Box width="medium">{controlElement}</Box>
      </Box>
    );
  };

  // Dynamically import icon if needed
  const ComponentWithIcon = () => {
    if (componentProps.icon) {
      const icons = require('@hpe-design/icons-grommet');
      const IconComponent = icons[componentProps.icon];
      const propsToRender = { ...componentProps };
      if (IconComponent) {
        propsToRender.icon = <IconComponent />;
      }
      return <Component {...propsToRender} />;
    }
    return <Component {...componentProps} />;
  };

  return (
    <Box
      background="background-front"
      pad="medium"
      round="small"
      gap="medium"
      border={{ color: 'border', size: 'xsmall' }}
    >
      <Heading level={3} margin="none" size="small">
        Interactive Playground
      </Heading>

      {/* Preview Area */}
      <Box
        background="background-back"
        pad="large"
        round="xsmall"
        align="center"
        justify="center"
        border={{ color: 'border-weak', size: 'xsmall' }}
        height={{ min: 'small' }}
      >
        <ComponentWithIcon />
      </Box>

      {/* Controls */}
      <Box gap="small">
        <Text weight="bold">Props</Text>
        <Box border={{ color: 'border-weak' }} round="xsmall" overflow="hidden">
          {controls.map(control => renderControl(control))}
        </Box>
      </Box>

      {/* Code Output */}
      <Box gap="small">
        <Box direction="row" justify="between" align="center">
          <Text weight="bold">Code</Text>
          <Button
            icon={<Copy />}
            label={copied ? 'Copied!' : 'Copy'}
            onClick={handleCopy}
            size="small"
            secondary
          />
        </Box>
        <Box
          background="background-contrast"
          pad="small"
          round="xsmall"
          overflow="auto"
        >
          <Text
            size="small"
            style={{ fontFamily: 'monospace', whiteSpace: 'pre' }}
          >
            {generateCode()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

ComponentPlayground.propTypes = {
  component: PropTypes.elementType.isRequired,
  defaultProps: PropTypes.object,
  controls: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['text', 'select', 'checkbox', 'icon']).isRequired,
      label: PropTypes.string,
      options: PropTypes.array,
    }),
  ).isRequired,
};
