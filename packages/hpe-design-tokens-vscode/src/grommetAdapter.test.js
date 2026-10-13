// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const { tokenNameFor, valuesFor } = require('./grommetAdapter');
const { createTokenIndex } = require('./resolver');

const tokenIndex = createTokenIndex([
  {
    'hpe.color.background.front': { value: '#ffffff' },
    'hpe.color.border.weak': { value: '#d4d8db' },
    'hpe.color.decorative.blue': { value: '#0070f8' },
    'hpe.color.icon.strong': { value: '#292d3a' },
    'hpe.color.text.strong': { value: '#292d3a' },
    'hpe.borderWidth.medium': { value: '4px' },
    'hpe.container.medium': { value: '384px' },
    'hpe.icon.xxlarge.size': { value: '32px' },
    'hpe.radius.medium': { value: '8px' },
    'hpe.spacing.medium': { value: '24px' },
    'hpe.spacing.none': { value: '0px' },
    'hpe.spacing.small': { value: '16px' },
    'hpe.text.small.fontSize': { value: '14px' },
  },
]);

test('maps layout and component props to their token paths', () => {
  assert.equal(
    tokenNameFor('Accordion', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Accordion', 'pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Avatar', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(tokenNameFor('Avatar', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Avatar', 'borderWidth', 'medium'),
    'hpe.borderWidth.medium',
  );
  assert.equal(
    tokenNameFor('Box', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('Box', 'background', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Box', 'border.color', 'border-weak'),
    'hpe.color.border.weak',
  );
  assert.equal(
    tokenNameFor('Box', 'border.size', 'medium'),
    'hpe.borderWidth.medium',
  );
  assert.equal(tokenNameFor('Box', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Box', 'hoverIndicator.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Box', 'hoverIndicator.background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(tokenNameFor('Button', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Button', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Button', 'hoverIndicator', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('Button', 'hoverIndicator.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Button', 'badge.background', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(tokenNameFor('Button', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Button', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(
    tokenNameFor('Button', 'size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(
    tokenNameFor('Calendar', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(tokenNameFor('Cards', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Cards', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(
    tokenNameFor('Carousel', 'height.max', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Carousel', 'height.min', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Carousel', 'height', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Carousel', 'width.max', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Carousel', 'width.min', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Carousel', 'width', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(tokenNameFor('Chart', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Chart', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(tokenNameFor('Chart', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Chart', 'size', 'medium'), 'hpe.container.medium');
  assert.equal(
    tokenNameFor('Chart', 'size.height', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Chart', 'size.width', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Chart', 'thickness', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Chart', 'values.thickness', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Chart', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(tokenNameFor('CheckBox', 'pad', 'none'), 'hpe.spacing.none');
  assert.equal(
    tokenNameFor('CheckBoxGroup', 'gap', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DataChart', 'pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('DataChart', 'chart.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('DataChart', 'chart.thickness', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(tokenNameFor('DataChart', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('DataChart', 'offset.gap', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DataChart', 'size', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('DataChart', 'size.height', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('DataChart', 'size.width', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(tokenNameFor('Data', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('DataTable', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DataTable', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('DataTable', 'border.color', 'border-weak'),
    'hpe.color.border.weak',
  );
  assert.equal(
    tokenNameFor('DataTable', 'border.size', 'medium'),
    'hpe.borderWidth.medium',
  );
  assert.equal(
    tokenNameFor('DataTable', 'pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('DataTableGroupBy', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DataTableGroupBy', 'dropHeight', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('DataView', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DateInput', 'inputProps.size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(
    tokenNameFor('DateInput', 'inputProps.dropHeight', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.hoverIndicator', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.gap', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('DateInput', 'buttonProps.size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(
    tokenNameFor('DateInput', 'calendarProps.margin', 'small'),
    'hpe.spacing.small',
  );
  [
    [
      'DateInput',
      'background',
      'background-front',
      'hpe.color.background.front',
    ],
    ['Select', 'borderWidth', 'medium', 'hpe.borderWidth.medium'],
    ['SelectMultiple', 'gap', 'small', 'hpe.spacing.small'],
    ['DateInput', 'height', 'medium', 'hpe.container.medium'],
    [
      'Select',
      'hoverIndicator',
      'decorative-blue',
      'hpe.color.decorative.blue',
    ],
    ['SelectMultiple', 'margin', 'small', 'hpe.spacing.small'],
    ['DateInput', 'pad', 'medium', 'hpe.spacing.medium'],
    ['Select', 'round', 'medium', 'hpe.radius.medium'],
    ['SelectMultiple', 'width', 'medium', 'hpe.container.medium'],
  ].forEach(([componentName, propName, value, tokenName]) => {
    assert.equal(
      tokenNameFor(componentName, `dropProps.${propName}`, value),
      tokenName,
    );
  });
  [
    ['DropButton', 'color', 'decorative-blue', 'hpe.color.decorative.blue'],
    ['Menu', 'gap', 'small', 'hpe.spacing.small'],
    [
      'DropButton',
      'hoverIndicator',
      'background-front',
      'hpe.color.background.front',
    ],
    ['Menu', 'margin', 'small', 'hpe.spacing.small'],
    ['DropButton', 'pad', 'medium', 'hpe.spacing.medium'],
    ['DropButton', 'size', 'small', 'hpe.text.small.fontSize'],
  ].forEach(([componentName, propName, value, tokenName]) => {
    assert.equal(tokenNameFor(componentName, propName, value), tokenName);
  });
  [
    [
      'DropButton',
      'background',
      'background-front',
      'hpe.color.background.front',
    ],
    ['Menu', 'borderWidth', 'medium', 'hpe.borderWidth.medium'],
    ['MaskedInput', 'gap', 'small', 'hpe.spacing.small'],
    ['TextInput', 'height', 'medium', 'hpe.container.medium'],
    [
      'DropButton',
      'hoverIndicator',
      'decorative-blue',
      'hpe.color.decorative.blue',
    ],
    ['Menu', 'margin', 'small', 'hpe.spacing.small'],
    ['MaskedInput', 'pad', 'medium', 'hpe.spacing.medium'],
    ['TextInput', 'round', 'medium', 'hpe.radius.medium'],
    ['DropButton', 'width', 'medium', 'hpe.container.medium'],
  ].forEach(([componentName, propName, value, tokenName]) => {
    assert.equal(
      tokenNameFor(componentName, `dropProps.${propName}`, value),
      tokenName,
    );
  });
  assert.equal(
    tokenNameFor('Diagram', 'connections.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Diagram', 'connections.offset', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Diagram', 'connections.thickness', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Chart', 'values.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(tokenNameFor('Meter', 'size', 'medium'), 'hpe.container.medium');
  assert.equal(
    tokenNameFor('Meter', 'thickness', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Pagination', 'size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(
    tokenNameFor('RangeSelector', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('RangeSelector', 'size', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Meter', 'values.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('WorldMap', 'continents.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('WorldMap', 'places.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  [
    ['background', 'background-front', 'hpe.color.background.front'],
    ['borderWidth', 'medium', 'hpe.borderWidth.medium'],
    ['gap', 'small', 'hpe.spacing.small'],
    ['height', 'medium', 'hpe.container.medium'],
    ['hoverIndicator', 'decorative-blue', 'hpe.color.decorative.blue'],
    ['margin', 'small', 'hpe.spacing.small'],
    ['pad', 'medium', 'hpe.spacing.medium'],
    ['round', 'medium', 'hpe.radius.medium'],
    ['width', 'medium', 'hpe.container.medium'],
  ].forEach(([propName, value, tokenName]) => {
    assert.equal(
      tokenNameFor('Tip', `dropProps.${propName}`, value),
      tokenName,
    );
  });
  assert.equal(tokenNameFor('Drop', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Drop', 'round', 'medium'), 'hpe.radius.medium');
  assert.equal(tokenNameFor('Drop', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(tokenNameFor('Drop', 'width', 'medium'), 'hpe.container.medium');
  assert.equal(
    tokenNameFor('Drop', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('DropButton', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Distribution', 'gap', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Distribution', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('FormField', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Grommet', 'background.color', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('Grid', 'columns', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Grid', 'columns.size', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(tokenNameFor('Grid', 'rows', 'medium'), 'hpe.container.medium');
  assert.equal(tokenNameFor('Nav', 'gap', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('List', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(tokenNameFor('List', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('List', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('List', 'pinned.background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('List', 'pinned.color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('Layer', 'background.color', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(tokenNameFor('Layer', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Menu', 'dropBackground.color', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(tokenNameFor('Menu', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Skeleton', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(
    tokenNameFor('Skeleton', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Skeleton', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('Box', 'width.max', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Text', 'size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(tokenNameFor('Text', 'margin', 'none'), 'hpe.spacing.none');
  assert.equal(tokenNameFor('Heading', 'margin', 'none'), 'hpe.spacing.none');
  assert.equal(tokenNameFor('Paragraph', 'margin', 'none'), 'hpe.spacing.none');
  assert.equal(
    tokenNameFor('Anchor', 'size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(tokenNameFor('Anchor', 'margin', 'none'), 'hpe.spacing.none');
  assert.equal(
    tokenNameFor('Paragraph', 'color', 'text-strong'),
    'hpe.color.text.strong',
  );
  assert.equal(
    tokenNameFor('Paragraph', 'size', 'small'),
    'hpe.text.small.fontSize',
  );
  assert.equal(
    tokenNameFor('Pagination', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('Pagination', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('PageHeader', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('PageHeader', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('PageHeader', 'gap', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('Icon', 'color', 'icon-strong'),
    'hpe.color.icon.strong',
  );
  assert.equal(
    tokenNameFor('Icon', 'size', 'xxlarge'),
    'hpe.icon.xxlarge.size',
  );
  assert.equal(tokenNameFor('Image', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Meter', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Meter', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('Meter', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('RangeInput', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('RangeSelector', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('RadioButtonGroup', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('Select', 'dropHeight', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(tokenNameFor('Select', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('SelectMultiple', 'dropHeight', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('SelectMultiple', 'margin', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(tokenNameFor('Sidebar', 'pad', 'medium'), 'hpe.spacing.medium');
  assert.equal(
    tokenNameFor('Skeleton', 'height.max', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Skeleton', 'width', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(tokenNameFor('Stack', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(tokenNameFor('Spinner', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('Spinner', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(tokenNameFor('Stepper', 'gap', 'medium'), 'hpe.spacing.medium');
  assert.equal(tokenNameFor('Tag', 'round', 'medium'), 'hpe.radius.medium');
  assert.equal(tokenNameFor('Table', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('TableCell', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('TableCell', 'border.color', 'border-weak'),
    'hpe.color.border.weak',
  );
  assert.equal(
    tokenNameFor('TableCell', 'border.size', 'medium'),
    'hpe.borderWidth.medium',
  );
  assert.equal(
    tokenNameFor('TableCell', 'pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(tokenNameFor('Tabs', 'margin', 'small'), 'hpe.spacing.small');
  assert.equal(
    tokenNameFor('TextInput', 'width.min', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('Toolbar', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('ToggleGroup', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('WizardContent', 'width', 'medium'),
    'hpe.container.medium',
  );
  assert.equal(
    tokenNameFor('WizardFooter', 'pad', 'medium'),
    'hpe.spacing.medium',
  );
  assert.equal(
    tokenNameFor('WizardHeader', 'background', 'background-front'),
    'hpe.color.background.front',
  );
  assert.equal(
    tokenNameFor('WizardProgress', 'round', 'medium'),
    'hpe.radius.medium',
  );
  assert.equal(
    tokenNameFor('WizardStepHeader', 'gap', 'small'),
    'hpe.spacing.small',
  );
  assert.equal(
    tokenNameFor('WorldMap', 'color', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(
    tokenNameFor('WorldMap', 'hoverColor', 'decorative-blue'),
    'hpe.color.decorative.blue',
  );
  assert.equal(tokenNameFor('Video', 'margin', 'small'), 'hpe.spacing.small');
});

test('maps text-bearing component sizes to text font-size tokens', () => {
  ['Menu', 'Select', 'SelectMultiple', 'Tag', 'TextArea', 'TextInput'].forEach(
    componentName => {
      assert.equal(
        tokenNameFor(componentName, 'size', 'small'),
        'hpe.text.small.fontSize',
      );
    },
  );
});

test('maps DateInput and MaskedInput sizes to text font-size tokens', () => {
  ['DateInput', 'MaskedInput'].forEach(componentName => {
    assert.equal(
      tokenNameFor(componentName, 'size', 'small'),
      'hpe.text.small.fontSize',
    );
  });
});

test('maps direct FormField content props to Box tokens', () => {
  [
    [
      'contentProps.background',
      'background-front',
      'hpe.color.background.front',
    ],
    ['contentProps.borderWidth', 'medium', 'hpe.borderWidth.medium'],
    ['contentProps.gap', 'small', 'hpe.spacing.small'],
    ['contentProps.height', 'medium', 'hpe.container.medium'],
    [
      'contentProps.hoverIndicator',
      'decorative-blue',
      'hpe.color.decorative.blue',
    ],
    ['contentProps.margin', 'small', 'hpe.spacing.small'],
    ['contentProps.pad', 'medium', 'hpe.spacing.medium'],
    ['contentProps.round', 'medium', 'hpe.radius.medium'],
    ['contentProps.width', 'medium', 'hpe.container.medium'],
  ].forEach(([propName, value, tokenName]) => {
    assert.equal(tokenNameFor('FormField', propName, value), tokenName);
  });
});

test('maps hover indicators for Box-derived layout components', () => {
  [
    ['Accordion', 'hoverIndicator', 'decorative-blue'],
    ['Card', 'hoverIndicator.color', 'decorative-blue'],
    ['Data', 'hoverIndicator.background', 'background-front'],
    ['Drop', 'hoverIndicator', 'decorative-blue'],
    ['Grid', 'hoverIndicator.color', 'decorative-blue'],
    ['Nav', 'hoverIndicator.background', 'background-front'],
    ['PageHeader', 'hoverIndicator', 'decorative-blue'],
    ['Pagination', 'hoverIndicator.color', 'decorative-blue'],
    ['Sidebar', 'hoverIndicator.background', 'background-front'],
    ['Toolbar', 'hoverIndicator.color', 'decorative-blue'],
    ['ToggleGroup', 'hoverIndicator.background', 'background-front'],
  ].forEach(([componentName, propName, value]) => {
    assert.equal(
      tokenNameFor(componentName, propName, value),
      value === 'background-front'
        ? 'hpe.color.background.front'
        : 'hpe.color.decorative.blue',
    );
  });
});

test('translates semantic color token names into Grommet aliases', () => {
  assert.deepEqual(
    valuesFor('Text', 'color', tokenIndex).map(item => item.value),
    ['text-strong'],
  );
});

test('translates component color and background tokens into Grommet aliases', () => {
  ['Chart', 'Drop', 'Meter'].forEach((componentName, index) => {
    const propName = index === 0 ? 'color' : 'background';
    assert.deepEqual(
      valuesFor(componentName, propName, tokenIndex).map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('translates root and container background tokens into Grommet aliases', () => {
  [
    ['Grommet', 'background'],
    ['Grommet', 'background.color'],
    ['Layer', 'background'],
    ['Layer', 'background.color'],
    ['List', 'background'],
    ['Menu', 'dropBackground'],
    ['Menu', 'dropBackground.color'],
  ].forEach(([componentName, propName]) => {
    assert.deepEqual(
      valuesFor(componentName, propName, tokenIndex).map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('translates direct component color tokens into Grommet aliases', () => {
  [
    ['Button', 'color'],
    ['Button', 'hoverIndicator'],
    ['Meter', 'color'],
    ['RangeInput', 'color'],
    ['RangeSelector', 'color'],
    ['WorldMap', 'color'],
    ['WorldMap', 'hoverColor'],
  ].forEach(([componentName, propName]) => {
    assert.deepEqual(
      valuesFor(componentName, propName, tokenIndex).map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('translates semantic border tokens into Grommet border aliases', () => {
  assert.deepEqual(
    valuesFor('Box', 'border.color', tokenIndex).map(item => item.value),
    ['border-weak'],
  );
});

test('provides values available for object-form border sizes', () => {
  assert.deepEqual(
    valuesFor('Box', 'border.size', tokenIndex).map(item => item.value),
    ['medium'],
  );
});

test('translates semantic icon tokens into HPE icon aliases', () => {
  assert.deepEqual(
    valuesFor('Icon', 'color', tokenIndex).map(item => item.value),
    ['icon-strong'],
  );
});

test('provides values available for a component prop', () => {
  assert.deepEqual(
    valuesFor('Box', 'gap', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides container values for Carousel dimensions', () => {
  [
    'height',
    'height.max',
    'height.min',
    'width',
    'width.max',
    'width.min',
  ].forEach(propName => {
    assert.deepEqual(
      valuesFor('Carousel', propName, tokenIndex).map(item => item.value),
      ['medium'],
    );
  });
});

test('provides spacing values for Button gap and pad', () => {
  assert.deepEqual(
    valuesFor('Button', 'gap', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    valuesFor('Button', 'pad', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for Button margin', () => {
  assert.deepEqual(
    valuesFor('Button', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for supported Calendar, Chart, List, and Skeleton margins', () => {
  ['Calendar', 'Chart', 'List', 'Skeleton'].forEach(componentName => {
    assert.deepEqual(
      valuesFor(componentName, 'margin', tokenIndex).map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('provides spacing values for Layer margin', () => {
  assert.deepEqual(
    valuesFor('Layer', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for generic-margin components', () => {
  [
    'Accordion',
    'Cards',
    'DataTable',
    'DropButton',
    'Distribution',
    'FormField',
    'Image',
    'Menu',
    'Meter',
    'Pagination',
    'PageHeader',
    'Select',
    'SelectMultiple',
    'Stack',
    'Table',
    'Tabs',
    'Video',
  ].forEach(componentName => {
    assert.deepEqual(
      valuesFor(componentName, 'margin', tokenIndex).map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('provides spacing values for Cards padding and Distribution gaps', () => {
  [
    ['Cards', 'pad'],
    ['Distribution', 'gap'],
  ].forEach(([componentName, propName]) => {
    assert.deepEqual(
      valuesFor(componentName, propName, tokenIndex).map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('provides container values for select popup heights', () => {
  ['Select', 'SelectMultiple'].forEach(componentName => {
    assert.deepEqual(
      valuesFor(componentName, 'dropHeight', tokenIndex).map(
        item => item.value,
      ),
      ['medium'],
    );
  });
});

test('provides spacing and radius values for Drop', () => {
  assert.deepEqual(
    valuesFor('Drop', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    valuesFor('Drop', 'round', tokenIndex).map(item => item.value),
    ['medium'],
  );
});

test('provides spacing values for CheckBox pad', () => {
  assert.deepEqual(
    valuesFor('CheckBox', 'pad', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for data visualization and list pads', () => {
  ['Chart', 'DataChart', 'List'].forEach(componentName => {
    assert.deepEqual(
      valuesFor(componentName, 'pad', tokenIndex).map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('provides spacing and radius values for Skeleton', () => {
  assert.deepEqual(
    valuesFor('Skeleton', 'pad', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    valuesFor('Skeleton', 'round', tokenIndex).map(item => item.value),
    ['medium'],
  );
});

test('provides spacing values for Text margin', () => {
  assert.deepEqual(
    valuesFor('Text', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for Heading margin', () => {
  assert.deepEqual(
    valuesFor('Heading', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides spacing values for Paragraph and Anchor margins', () => {
  assert.deepEqual(
    valuesFor('Paragraph', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    valuesFor('Anchor', 'margin', tokenIndex).map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('provides container values for layout dimensions', () => {
  assert.deepEqual(
    valuesFor('Box', 'height.min', tokenIndex).map(item => item.value),
    ['medium'],
  );
});

test('provides container values for Skeleton and TextInput dimensions', () => {
  ['height', 'height.max', 'width', 'width.min'].forEach(propName => {
    assert.deepEqual(
      valuesFor('Skeleton', propName, tokenIndex).map(item => item.value),
      ['medium'],
    );
  });
  assert.deepEqual(
    valuesFor('TextInput', 'width.max', tokenIndex).map(item => item.value),
    ['medium'],
  );
});

test('does not map unsupported component props', () => {
  assert.equal(tokenNameFor('Avatar', 'width', 'medium'), false);
  assert.equal(tokenNameFor('Avatar', 'height', 'medium'), false);
  assert.equal(tokenNameFor('Box', 'size', 'small'), undefined);
});
