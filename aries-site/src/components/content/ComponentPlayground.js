import React, { useState, useEffect } from 'react';
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
  ToggleGroup,
  ResponsiveContext,
  Grommet,
} from 'grommet';
import { Copy, Moon } from '@hpe-design/icons-grommet';
import { hpe } from 'grommet-theme-hpe';
import { CodeEditor } from './CodeEditor';

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
  const [code, setCode] = useState('');
  const [isCodeManuallyEdited, setIsCodeManuallyEdited] = useState(false);
  const [codeError, setCodeError] = useState(null);
  const [layout, setLayout] = useState('right'); // 'bottom', 'left', or 'right'
  const [previewTheme, setPreviewTheme] = useState('light'); // 'light' or 'dark'

  const togglePreviewTheme = () => {
    setPreviewTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

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

  // Update code when componentProps change, unless user manually edited it
  useEffect(() => {
    if (!isCodeManuallyEdited) {
      const newCode = generateCode();
      setCode(newCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentProps, isCodeManuallyEdited]);

  const handleCodeChange = newCode => {
    setCode(newCode);
    setIsCodeManuallyEdited(true);

    // Validate code syntax
    const componentName = Component.displayName || 'Component';
    const componentRegex = new RegExp(
      `<${componentName}([^/>]*)(/>|>.*?</${componentName}>)`,
      's',
    );

    // Check for basic JSX syntax errors
    if (
      newCode.includes(`<${componentName}`) &&
      !componentRegex.test(newCode)
    ) {
      setCodeError('Syntax Error: Incomplete or malformed JSX tag');
      return;
    }

    // Check for unclosed quotes
    const quoteMatches = newCode.match(/"/g);
    if (quoteMatches && quoteMatches.length % 2 !== 0) {
      setCodeError('Syntax Error: Unclosed quote');
      return;
    }

    // Check for unclosed braces in JSX
    const braceMatches = newCode.match(/\{/g);
    const closeBraceMatches = newCode.match(/\}/g);
    if ((braceMatches?.length || 0) !== (closeBraceMatches?.length || 0)) {
      setCodeError('Syntax Error: Unclosed brace');
      return;
    }

    // Clear error if validation passes
    setCodeError(null);

    // Parse the code to extract props
    try {
      const match = newCode.match(componentRegex);

      if (match) {
        const propsString = match[1];
        const newProps = {};

        // Parse label="value"
        const labelMatch = propsString.match(/label="([^"]*)"/);
        if (labelMatch) newProps.label = labelMatch[1];

        // Parse href="value"
        const hrefMatch = propsString.match(/href="([^"]*)"/);
        if (hrefMatch) newProps.href = hrefMatch[1];

        // Parse size="value"
        const sizeMatch = propsString.match(/size="([^"]*)"/);
        if (sizeMatch) newProps.size = sizeMatch[1];

        // Parse icon={<IconName />}
        const iconMatch = propsString.match(/icon=\{<(\w+)\s*\/>\}/);
        if (iconMatch) newProps.icon = iconMatch[1];

        // Parse boolean props (just the prop name without =)
        const boolProps = ['disabled', 'primary', 'secondary', 'reverse'];
        boolProps.forEach(prop => {
          if (new RegExp(`\\b${prop}\\b(?!=)`).test(propsString)) {
            newProps[prop] = true;
          }
        });

        // Replace props entirely when code is manually edited
        setComponentProps(newProps);
      }
    } catch (error) {
      // If parsing fails, just keep the code change
      setCodeError(`Error: ${error.message}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code || generateCode());
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
    <ResponsiveContext.Consumer>
      {size => {
        const isSmallScreen =
          size === 'small' || size === 'xsmall' || size === 'medium';
        const effectiveLayout = isSmallScreen ? 'bottom' : layout;

        return (
          <Box
            pad="medium"
            round="small"
            gap="medium"
            border={{ color: 'border', size: 'xsmall' }}
          >
            <Box direction="row" justify="between" align="center">
              <Heading level={3} margin="none" size="small">
                Interactive Playground
              </Heading>
              <Box direction="row" gap="small" align="center">
                <Button
                  icon={<Moon />}
                  tip={
                    previewTheme === 'dark'
                      ? 'Switch preview to light mode'
                      : 'Switch preview to dark mode'
                  }
                  onClick={togglePreviewTheme}
                  secondary
                />
                {!isSmallScreen && (
                  <ToggleGroup
                    value={layout}
                    onToggle={event => setLayout(event.value)}
                    options={[
                      { label: 'Bottom', value: 'bottom' },
                      { label: 'Right', value: 'right' },
                    ]}
                  />
                )}
              </Box>
            </Box>

            <Box
              direction={effectiveLayout === 'bottom' ? 'column' : 'row'}
              gap="medium"
            >
              <Box
                background="background-back"
                pad="large"
                round="xsmall"
                align="center"
                justify="center"
                border={{ color: 'border-weak', size: 'xsmall' }}
                height={
                  effectiveLayout === 'bottom'
                    ? { min: 'small' }
                    : { min: 'small' }
                }
                width={
                  effectiveLayout !== 'bottom'
                    ? { min: 'small', max: 'medium' }
                    : undefined
                }
                flex={
                  effectiveLayout !== 'bottom' ? { grow: 0, shrink: 1 } : false
                }
              >
                <Grommet theme={hpe} themeMode={previewTheme}>
                  <ComponentWithIcon />
                </Grommet>
              </Box>

              {(effectiveLayout === 'bottom' ||
                effectiveLayout === 'right') && (
                <Box
                  direction="row"
                  justify="space-between"
                  align="start"
                  margin={{ bottom: 'small' }}
                >
                  <Tabs
                    activeIndex={activeTab}
                    onActive={setActiveTab}
                    justify="start"
                    flex
                  >
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
                              !control.showWhen ||
                              control.showWhen(componentProps),
                          );
                          return visibleControls.map((control, index) =>
                            renderControl(
                              control,
                              index === visibleControls.length - 1,
                            ),
                          );
                        })()}
                      </Box>
                    </Tab>

                    <Tab title="Code">
                      <Box gap="small">
                        {codeError && (
                          <Box
                            background="status-critical"
                            pad="small"
                            round="xsmall"
                          >
                            <Text size="small" color="text-strong">
                              {codeError}
                            </Text>
                          </Box>
                        )}
                        <Box background="background-contrast" round="xsmall">
                          <CodeEditor code={code} onChange={handleCodeChange} />
                        </Box>
                      </Box>
                    </Tab>
                  </Tabs>
                  {activeTab === 1 && (
                    <Button
                      icon={<Copy />}
                      label={copied ? 'Copied!' : 'Copy'}
                      onClick={handleCopy}
                      size="small"
                      secondary
                    />
                  )}
                </Box>
              )}
            </Box>
          </Box>
        );
      }}
    </ResponsiveContext.Consumer>
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
