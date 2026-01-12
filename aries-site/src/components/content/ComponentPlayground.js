import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CheckBox,
  Select,
  Tab,
  Tabs,
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
  const [activeTab, setActiveTab] = useState(0);

  const handlePropChange = (propName, value) => {
    setComponentProps(prev => {
      const newProps = { ...prev, [propName]: value };
      return newProps;
    });
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

  const renderControl = (control, isLast = false) => {
    const { name, type, options, displayLabel } = control;

    let controlElement;

    switch (type) {
      case 'text':
        controlElement = (
          <TextInput
            id={`playground-${name}`}
            name={name}
            value={
              componentProps[name] !== undefined &&
              componentProps[name] !== null
                ? String(componentProps[name])
                : ''
            }
            onChange={event => handlePropChange(name, event.target.value)}
            placeholder={`Enter ${displayLabel || name}`}
            size="small"
            focusIndicator
          />
        );
        break;

      case 'select':
        controlElement = (
          <Select
            options={options || []}
            value={componentProps[name] || ''}
            onChange={({ option }) => handlePropChange(name, option)}
            placeholder={`Select ${displayLabel || name}`}
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
        pad={{ vertical: 'xxsmall', horizontal: 'xxsmall' }}
        border={!isLast ? { side: 'bottom', color: 'border-weak' } : undefined}
      >
        <Text size="small" weight={500}>
          {displayLabel || name}
        </Text>
        <Box width="medium">{controlElement}</Box>
      </Box>
    );
  };

  // Dynamically import icon if needed
  const ComponentWithIcon = () => {
    const propsToRender = { ...componentProps };

    // Add onClick handler to prevent default behavior for interactive components
    if (!propsToRender.onClick) {
      propsToRender.onClick = e => {
        e.preventDefault();
        e.stopPropagation();
      };
    }

    if (componentProps.icon) {
      const icons = require('@hpe-design/icons-grommet');
      const IconComponent = icons[componentProps.icon];
      if (IconComponent) {
        propsToRender.icon = <IconComponent />;
      }
    }

    return <Component {...propsToRender} />;
  };

  return (
    <Box
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

      {/* Tabs for Props and Code */}
      <Tabs activeIndex={activeTab} onActive={setActiveTab} justify="start">
        <Tab title="Props">
          <Box
            border={{ color: 'border-weak' }}
            round="xsmall"
            overflow={{ vertical: 'auto' }}
            height={{ max: 'medium' }}
            pad={{ vertical: 'xsmall' }}
            margin={{ top: 'small' }}
          >
            {(() => {
              const visibleControls = controls.filter(
                control =>
                  !control.showWhen || control.showWhen(componentProps),
              );
              return visibleControls.map((control, index) =>
                renderControl(control, index === visibleControls.length - 1),
              );
            })()}
          </Box>
        </Tab>

        <Tab title="Code">
          <Box gap="small">
            <Box direction="row" justify="end" align="center">
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
        </Tab>
      </Tabs>
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
      displayLabel: PropTypes.string,
      options: PropTypes.array,
      showWhen: PropTypes.func,
    }),
  ).isRequired,
};
