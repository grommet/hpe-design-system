// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const layoutComponents = new Set([
  'Accordion',
  'Box',
  'Card',
  'CardBody',
  'CardFooter',
  'CardHeader',
  'CheckBoxGroup',
  'Data',
  'Drop',
  'Footer',
  'Grid',
  'Header',
  'Main',
  'Page',
  'PageContent',
  'PageHeader',
  'Pagination',
  'RadioButtonGroup',
  'Nav',
  'Sidebar',
  'Spinner',
  'Stepper',
  'Tag',
  'Toolbar',
  'ToggleGroup',
  'WizardContent',
  'WizardFooter',
  'WizardHeader',
  'WizardProgress',
  'WizardStepHeader',
]);

const layoutPropResolvers = {
  background: {
    fromTokenValue: value => value.replace(/\./g, '-'),
    prefix: 'hpe.color.',
    toTokenValue: value => value.replace(/-/g, '.'),
  },
  'background.color': {
    fromTokenValue: value => value.replace(/\./g, '-'),
    prefix: 'hpe.color.',
    toTokenValue: value => value.replace(/-/g, '.'),
  },
  'border.color': {
    fromTokenValue: value => `border-${value.replace(/\./g, '-')}`,
    prefix: 'hpe.color.border.',
    toTokenValue: value => value.replace(/^border-/, '').replace(/-/g, '.'),
  },
  'border.size': { prefix: 'hpe.borderWidth.' },
  borderWidth: { prefix: 'hpe.borderWidth.' },
  gap: { prefix: 'hpe.spacing.' },
  height: { prefix: 'hpe.container.' },
  'height.max': { prefix: 'hpe.container.' },
  'height.min': { prefix: 'hpe.container.' },
  margin: { prefix: 'hpe.spacing.' },
  pad: { prefix: 'hpe.spacing.' },
  round: { prefix: 'hpe.radius.' },
  width: { prefix: 'hpe.container.' },
  'width.max': { prefix: 'hpe.container.' },
  'width.min': { prefix: 'hpe.container.' },
};

const componentPropResolvers = {
  Avatar: {
    background: layoutPropResolvers.background,
    'background.color': layoutPropResolvers['background.color'],
    'border.color': layoutPropResolvers['border.color'],
    'border.size': layoutPropResolvers['border.size'],
    borderWidth: layoutPropResolvers.borderWidth,
    gap: layoutPropResolvers.gap,
    margin: layoutPropResolvers.margin,
    pad: layoutPropResolvers.pad,
    round: layoutPropResolvers.round,
  },
  Box: {
    hoverIndicator: layoutPropResolvers.background,
    'hoverIndicator.background': layoutPropResolvers.background,
    'hoverIndicator.color': layoutPropResolvers['background.color'],
  },
  Anchor: {
    color: {
      fromTokenValue: value => `text-${value.replace(/\./g, '-')}`,
      prefix: 'hpe.color.text.',
      toTokenValue: value => value.replace(/^text-/, '').replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    size: { prefix: 'hpe.text.', suffix: '.fontSize' },
  },
  Button: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    gap: { prefix: 'hpe.spacing.' },
    hoverIndicator: layoutPropResolvers.background,
    'hoverIndicator.background': layoutPropResolvers.background,
    'hoverIndicator.color': layoutPropResolvers['background.color'],
    margin: { prefix: 'hpe.spacing.' },
    pad: { prefix: 'hpe.spacing.' },
  },
  Calendar: {
    margin: { prefix: 'hpe.spacing.' },
  },
  Cards: {
    margin: { prefix: 'hpe.spacing.' },
    pad: { prefix: 'hpe.spacing.' },
  },
  Carousel: {
    height: { prefix: 'hpe.container.' },
    'height.max': { prefix: 'hpe.container.' },
    'height.min': { prefix: 'hpe.container.' },
    width: { prefix: 'hpe.container.' },
    'width.max': { prefix: 'hpe.container.' },
    'width.min': { prefix: 'hpe.container.' },
  },
  Chart: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    pad: { prefix: 'hpe.spacing.' },
  },
  CheckBox: {
    pad: { prefix: 'hpe.spacing.' },
  },
  DataChart: {
    pad: { prefix: 'hpe.spacing.' },
  },
  DataTableGroupBy: {
    dropHeight: { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
  },
  DataTable: {
    background: layoutPropResolvers.background,
    'background.color': layoutPropResolvers['background.color'],
    'border.color': layoutPropResolvers['border.color'],
    'border.size': layoutPropResolvers['border.size'],
    margin: { prefix: 'hpe.spacing.' },
    pad: layoutPropResolvers.pad,
  },
  DataView: {
    margin: { prefix: 'hpe.spacing.' },
  },
  Diagram: {
    'connections.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  DropButton: {
    margin: { prefix: 'hpe.spacing.' },
  },
  Distribution: {
    gap: { prefix: 'hpe.spacing.' },
    margin: { prefix: 'hpe.spacing.' },
  },
  FormField: {
    margin: { prefix: 'hpe.spacing.' },
  },
  Grid: {
    columns: { prefix: 'hpe.container.' },
    'columns.size': { prefix: 'hpe.container.' },
    rows: { prefix: 'hpe.container.' },
  },
  Grommet: {
    background: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    'background.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  Heading: {
    color: {
      fromTokenValue: value => `text-${value.replace(/\./g, '-')}`,
      prefix: 'hpe.color.text.',
      toTokenValue: value => value.replace(/^text-/, '').replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    size: { prefix: 'hpe.heading.', suffix: '.fontSize' },
  },
  Paragraph: {
    color: {
      fromTokenValue: value => `text-${value.replace(/\./g, '-')}`,
      prefix: 'hpe.color.text.',
      toTokenValue: value => value.replace(/^text-/, '').replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    size: { prefix: 'hpe.text.', suffix: '.fontSize' },
  },
  Icon: {
    color: {
      fromTokenValue: value => `icon-${value.replace(/\./g, '-')}`,
      prefix: 'hpe.color.icon.',
      toTokenValue: value => value.replace(/^icon-/, '').replace(/-/g, '.'),
    },
    size: { prefix: 'hpe.icon.', suffix: '.size' },
  },
  Image: {
    margin: { prefix: 'hpe.spacing.' },
  },
  List: {
    background: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    pad: { prefix: 'hpe.spacing.' },
  },
  Layer: {
    background: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    'background.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
  },
  Menu: {
    dropBackground: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    'dropBackground.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
  },
  Meter: {
    background: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
  },
  RangeInput: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  RangeSelector: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  Select: {
    dropHeight: { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
  },
  SelectMultiple: {
    dropHeight: { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
  },
  Skeleton: {
    height: { prefix: 'hpe.container.' },
    'height.max': { prefix: 'hpe.container.' },
    'height.min': { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
    pad: { prefix: 'hpe.spacing.' },
    round: { prefix: 'hpe.radius.' },
    width: { prefix: 'hpe.container.' },
    'width.max': { prefix: 'hpe.container.' },
    'width.min': { prefix: 'hpe.container.' },
  },
  Spinner: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  Stack: {
    margin: { prefix: 'hpe.spacing.' },
  },
  Table: {
    margin: { prefix: 'hpe.spacing.' },
  },
  TableCell: {
    background: layoutPropResolvers.background,
    'border.color': layoutPropResolvers['border.color'],
    'border.size': layoutPropResolvers['border.size'],
    pad: layoutPropResolvers.pad,
  },
  Tabs: {
    margin: { prefix: 'hpe.spacing.' },
  },
  TextInput: {
    width: { prefix: 'hpe.container.' },
    'width.max': { prefix: 'hpe.container.' },
    'width.min': { prefix: 'hpe.container.' },
  },
  Text: {
    color: {
      fromTokenValue: value => `text-${value.replace(/\./g, '-')}`,
      prefix: 'hpe.color.text.',
      toTokenValue: value => value.replace(/^text-/, '').replace(/-/g, '.'),
    },
    margin: { prefix: 'hpe.spacing.' },
    size: { prefix: 'hpe.text.', suffix: '.fontSize' },
  },
  WorldMap: {
    color: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    hoverColor: {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
  },
  Video: {
    margin: { prefix: 'hpe.spacing.' },
  },
};

const resolverFor = (componentName, propName) =>
  componentPropResolvers[componentName]?.[propName] ||
  (layoutComponents.has(componentName) && layoutPropResolvers[propName]);

const tokenNameFor = (componentName, propName, value) => {
  const resolver = resolverFor(componentName, propName);
  const tokenValue = resolver?.toTokenValue
    ? resolver.toTokenValue(value)
    : value;
  return resolver && `${resolver.prefix}${tokenValue}${resolver.suffix || ''}`;
};

const tokenNameForLayoutProp = (propName, value) => {
  const resolver = layoutPropResolvers[propName];
  return resolver && `${resolver.prefix}${value}${resolver.suffix || ''}`;
};

const valuesFor = (componentName, propName, tokenIndex) => {
  const resolver = resolverFor(componentName, propName);
  if (!resolver) return [];

  return Array.from(tokenIndex.byName.entries())
    .flatMap(([name, token]) => {
      if (!name.startsWith(resolver.prefix)) return [];
      if (resolver.suffix && !name.endsWith(resolver.suffix)) return [];

      const value = name
        .slice(resolver.prefix.length)
        .replace(resolver.suffix || '', '');
      return [
        {
          name,
          token,
          value: resolver.fromTokenValue
            ? resolver.fromTokenValue(value)
            : value,
        },
      ];
    })
    .sort((first, second) => first.value.localeCompare(second.value));
};

module.exports = { tokenNameFor, tokenNameForLayoutProp, valuesFor };
