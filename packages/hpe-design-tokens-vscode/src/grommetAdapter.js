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
  hoverIndicator: {
    fromTokenValue: value => value.replace(/\./g, '-'),
    prefix: 'hpe.color.',
    toTokenValue: value => value.replace(/-/g, '.'),
  },
  'hoverIndicator.background': {
    fromTokenValue: value => value.replace(/\./g, '-'),
    prefix: 'hpe.color.',
    toTokenValue: value => value.replace(/-/g, '.'),
  },
  'hoverIndicator.color': {
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

const textSizeResolver = { prefix: 'hpe.text.', suffix: '.fontSize' };

const nestedDropPropResolvers = parentProp =>
  Object.fromEntries(
    [
      'background',
      'borderWidth',
      'gap',
      'height',
      'hoverIndicator',
      'margin',
      'pad',
      'round',
      'width',
    ].map(propName => [
      `${parentProp}.${propName}`,
      layoutPropResolvers[propName],
    ]),
  );

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
    'chart.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    pad: { prefix: 'hpe.spacing.' },
  },
  DateInput: {
    'buttonProps.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
    'buttonProps.gap': layoutPropResolvers.gap,
    'buttonProps.hoverIndicator': layoutPropResolvers.background,
    'buttonProps.margin': layoutPropResolvers.margin,
    'buttonProps.pad': layoutPropResolvers.pad,
    'calendarProps.margin': layoutPropResolvers.margin,
    ...nestedDropPropResolvers('dropProps'),
    'inputProps.dropHeight': { prefix: 'hpe.container.' },
    'inputProps.size': textSizeResolver,
    size: textSizeResolver,
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
    'contentProps.background': layoutPropResolvers.background,
    'contentProps.borderWidth': layoutPropResolvers.borderWidth,
    'contentProps.gap': layoutPropResolvers.gap,
    'contentProps.height': layoutPropResolvers.height,
    'contentProps.hoverIndicator': layoutPropResolvers.hoverIndicator,
    'contentProps.margin': layoutPropResolvers.margin,
    'contentProps.pad': layoutPropResolvers.pad,
    'contentProps.round': layoutPropResolvers.round,
    'contentProps.width': layoutPropResolvers.width,
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
    'pinned.background': layoutPropResolvers.background,
    'pinned.color': {
      fromTokenValue: value => value.replace(/\./g, '-'),
      prefix: 'hpe.color.',
      toTokenValue: value => value.replace(/-/g, '.'),
    },
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
    size: textSizeResolver,
  },
  MaskedInput: {
    size: textSizeResolver,
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
    ...nestedDropPropResolvers('dropProps'),
    dropHeight: { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
    size: textSizeResolver,
  },
  SelectMultiple: {
    ...nestedDropPropResolvers('dropProps'),
    dropHeight: { prefix: 'hpe.container.' },
    margin: { prefix: 'hpe.spacing.' },
    size: textSizeResolver,
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
  Tag: {
    size: textSizeResolver,
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
    size: textSizeResolver,
    width: { prefix: 'hpe.container.' },
    'width.max': { prefix: 'hpe.container.' },
    'width.min': { prefix: 'hpe.container.' },
  },
  TextArea: {
    size: textSizeResolver,
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
