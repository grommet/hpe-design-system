// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const { findJsxTokenAtOffset } = require('./jsxResolver');
const { createTokenIndex } = require('./resolver');

const tokenIndex = createTokenIndex([
  {
    'hpe.color.background.front': { value: '#ffffff' },
    'hpe.color.border.weak': { value: '#d4d8db' },
    'hpe.color.decorative.blue': { value: '#0070f8' },
    'hpe.color.foreground.critical': { value: '#ec3331' },
    'hpe.color.icon.strong': { value: '#292d3a' },
    'hpe.color.text.strong': { value: '#292d3a' },
    'hpe.borderWidth.medium': { value: '4px' },
    'hpe.container.medium': { value: '384px' },
    'hpe.icon.xxlarge.size': { value: '32px' },
    'hpe.radius.medium': { value: '8px' },
    'hpe.spacing.5xsmall': { value: '3px' },
    'hpe.spacing.medium': { value: '24px' },
    'hpe.spacing.none': { value: '0px' },
    'hpe.spacing.small': { value: '16px' },
    'hpe.text.small.fontSize': { value: '14px' },
  },
]);

test('resolves a direct JSX sizing prop', () => {
  const text = 'import { Box } from \'grommet\';\n<Box gap="medium" />';
  const match = findJsxTokenAtOffset(
    text,
    text.indexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.medium');
  assert.equal(match.token.value, '24px');
});

test('resolves Button gaps through the spacing scale', () => {
  const text = 'import { Button } from \'grommet\';\n<Button gap="medium" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.medium');
  assert.equal(match.token.value, '24px');
});

test('resolves Button pads through the spacing scale', () => {
  const text = 'import { Button } from \'grommet\';\n<Button pad="5xsmall" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('5xsmall') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.5xsmall');
  assert.equal(match.token.value, '3px');
});

test('resolves CheckBox pads through the spacing scale', () => {
  const text = 'import { CheckBox } from \'grommet\';\n<CheckBox pad="none" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('none') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.none');
  assert.equal(match.token.value, '0px');
});

test('resolves supported data and utility component spacing and radius props', () => {
  [
    ['Button', 'margin', 'none', 'hpe.spacing.none', '0px'],
    ['Chart', 'pad', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
    ['DataChart', 'pad', 'medium', 'hpe.spacing.medium', '24px'],
    ['List', 'pad', 'none', 'hpe.spacing.none', '0px'],
    ['Skeleton', 'pad', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
    ['Skeleton', 'round', 'medium', 'hpe.radius.medium', '8px'],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="${value}" />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves supported Calendar, Chart, List, Skeleton, and Drop margins and radii', () => {
  [
    ['Calendar', 'margin', 'none', 'hpe.spacing.none', '0px'],
    ['Chart', 'margin', 'medium', 'hpe.spacing.medium', '24px'],
    ['Drop', 'margin', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
    ['Drop', 'round', 'medium', 'hpe.radius.medium', '8px'],
    ['List', 'margin', 'none', 'hpe.spacing.none', '0px'],
    ['Skeleton', 'margin', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="${value}" />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves generic-margin component props through the spacing scale', () => {
  [
    ['Accordion', 'small', 'hpe.spacing.small', '16px'],
    ['Cards', 'medium', 'hpe.spacing.medium', '24px'],
    ['DataTable', 'none', 'hpe.spacing.none', '0px'],
    ['Distribution', 'small', 'hpe.spacing.small', '16px'],
    ['Image', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
    ['Meter', 'medium', 'hpe.spacing.medium', '24px'],
    ['Pagination', 'small', 'hpe.spacing.small', '16px'],
    ['PageHeader', 'medium', 'hpe.spacing.medium', '24px'],
    ['Select', 'medium', 'hpe.spacing.medium', '24px'],
    ['SelectMultiple', 'none', 'hpe.spacing.none', '0px'],
    ['Stack', 'none', 'hpe.spacing.none', '0px'],
    ['Table', '5xsmall', 'hpe.spacing.5xsmall', '3px'],
    ['Tabs', 'medium', 'hpe.spacing.medium', '24px'],
    ['Video', 'none', 'hpe.spacing.none', '0px'],
  ].forEach(([componentName, value, tokenName, tokenValue]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} margin="${value}" />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves Cards padding and Distribution gaps', () => {
  [
    ['Cards', 'pad', 'medium', 'hpe.spacing.medium', '24px'],
    ['Distribution', 'gap', 'small', 'hpe.spacing.small', '16px'],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} ${propName}="${value}" />`,
    ].join('\n');
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves layout props for newly supported Box-derived components', () => {
  [
    ['Nav', 'gap', 'small', 'hpe.spacing.small', '16px'],
    ['Sidebar', 'pad', 'medium', 'hpe.spacing.medium', '24px'],
    ['Spinner', 'margin', 'none', 'hpe.spacing.none', '0px'],
    ['Tag', 'round', 'medium', 'hpe.radius.medium', '8px'],
    [
      'Toolbar',
      'background',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} ${propName}="${value}" />`,
    ].join('\n');
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves component semantic colors and backgrounds', () => {
  [
    [
      'Chart',
      'color',
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'Drop',
      'background',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
    [
      'Meter',
      'background',
      'foreground-critical',
      'hpe.color.foreground.critical',
      '#ec3331',
    ],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="${value}" />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves root and container background props', () => {
  [
    [
      'Grommet',
      'background="background-front"',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
    [
      'Grommet',
      "background={{ color: 'decorative-blue' }}",
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'Layer',
      'background="background-front"',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
    [
      'Layer',
      "background={{ color: 'decorative-blue' }}",
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'List',
      'background="background-front"',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
  ].forEach(([componentName, prop, value, tokenName, tokenValue]) => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} ${prop} />`,
    ].join('\n');
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves Menu popup background props', () => {
  [
    [
      'dropBackground="background-front"',
      'background-front',
      'hpe.color.background.front',
      '#ffffff',
    ],
    [
      "dropBackground={{ color: 'decorative-blue' }}",
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
  ].forEach(([prop, value, tokenName, tokenValue]) => {
    const text = `import { Menu } from 'grommet';\n<Menu ${prop} />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves Layer margin through the spacing scale', () => {
  const text = 'import { Layer } from \'grommet\';\n<Layer margin="5xsmall" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('5xsmall') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.5xsmall');
  assert.equal(match.token.value, '3px');
});

test('resolves FormField, Menu, and DropButton margins', () => {
  ['DropButton', 'FormField', 'Menu'].forEach(componentName => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} margin="5xsmall" />`,
    ].join('\n');
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf('5xsmall') + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, 'hpe.spacing.5xsmall');
    assert.equal(match.token.value, '3px');
  });
});

test('resolves direct component semantic colors', () => {
  [
    [
      'Button',
      'color',
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'Meter',
      'color',
      'foreground-critical',
      'hpe.color.foreground.critical',
      '#ec3331',
    ],
    [
      'RangeInput',
      'color',
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'RangeSelector',
      'color',
      'foreground-critical',
      'hpe.color.foreground.critical',
      '#ec3331',
    ],
    [
      'WorldMap',
      'color',
      'decorative-blue',
      'hpe.color.decorative.blue',
      '#0070f8',
    ],
    [
      'WorldMap',
      'hoverColor',
      'foreground-critical',
      'hpe.color.foreground.critical',
      '#ec3331',
    ],
  ].forEach(([componentName, propName, value, tokenName, tokenValue]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="${value}" />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, tokenName);
    assert.equal(match.token.value, tokenValue);
  });
});

test('resolves direct and nested component dimensions', () => {
  [
    ['Carousel', "height={{ max: 'medium' }}", 'medium'],
    ['Carousel', "height={{ min: 'medium' }}", 'medium'],
    ['Carousel', 'height="medium"', 'medium'],
    ['Carousel', "width={{ max: 'medium' }}", 'medium'],
    ['Carousel', "width={{ min: 'medium' }}", 'medium'],
    ['Carousel', 'width="medium"', 'medium'],
    ['Skeleton', "height={{ max: 'medium' }}", 'medium'],
    ['Skeleton', 'width="medium"', 'medium'],
    ['Select', 'dropHeight="medium"', 'medium'],
    ['SelectMultiple', 'dropHeight="medium"', 'medium'],
    ['TextInput', "width={{ min: 'medium' }}", 'medium'],
  ].forEach(([componentName, prop, value]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${prop} />`;
    const match = findJsxTokenAtOffset(
      text,
      text.lastIndexOf(value) + 2,
      'javascript',
      tokenIndex,
    );

    assert.equal(match.name, 'hpe.container.medium');
    assert.equal(match.token.value, '384px');
  });
});

test('resolves Text margins through the spacing scale', () => {
  const text = 'import { Text } from \'grommet\';\n<Text margin="none" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('none') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.none');
  assert.equal(match.token.value, '0px');
});

test('resolves Heading margins through the spacing scale', () => {
  const text =
    'import { Heading } from \'grommet\';\n<Heading margin="none" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('none') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.none');
  assert.equal(match.token.value, '0px');
});

test('resolves Paragraph margins through the spacing scale', () => {
  const text =
    'import { Paragraph } from \'grommet\';\n<Paragraph margin="none" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('none') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.none');
  assert.equal(match.token.value, '0px');
});

test('resolves Anchor margins through the spacing scale', () => {
  const text = 'import { Anchor } from \'grommet\';\n<Anchor margin="none" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('none') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.none');
  assert.equal(match.token.value, '0px');
});

test('resolves a multiline nested JSX sizing prop', () => {
  const text = `import { Header } from 'grommet';
<Header
  pad={{
    horizontal: '5xsmall',
  }}
/>`;
  const match = findJsxTokenAtOffset(
    text,
    text.indexOf('5xsmall') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.spacing.5xsmall');
  assert.equal(match.token.value, '3px');
});

test('uses a component-specific typography mapping', () => {
  const text = 'import { Text } from \'grommet\';\n<Text size="small" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('small') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.text.small.fontSize');
  assert.equal(match.token.value, '14px');
});

test('resolves Anchor sizes through the text scale', () => {
  const text = 'import { Anchor } from \'grommet\';\n<Anchor size="small" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('small') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.text.small.fontSize');
  assert.equal(match.token.value, '14px');
});

test('resolves Paragraph sizes through the text scale', () => {
  const text =
    'import { Paragraph } from \'grommet\';\n<Paragraph size="small" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('small') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.text.small.fontSize');
  assert.equal(match.token.value, '14px');
});

test('uses the radius category for round', () => {
  const text = 'import { Box } from \'grommet\';\n<Box round="medium" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.radius.medium');
  assert.equal(match.token.value, '8px');
});

test('resolves a direct layout width', () => {
  const text = 'import { Box } from \'grommet\';\n<Box width="medium" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.container.medium');
  assert.equal(match.token.value, '384px');
});

test('resolves an object-form layout height', () => {
  const text = `import { Box } from 'grommet';
<Box height={{ min: 'medium' }} />`;
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.container.medium');
  assert.equal(match.token.value, '384px');
});

test('does not resolve arbitrary object-form layout dimensions', () => {
  const text = `import { Box } from 'grommet';
<Box width={{ width: '100%' }} />`;

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.lastIndexOf('100%') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});

test('resolves a Grommet background color alias', () => {
  const text =
    'import { Box } from \'grommet\';\n<Box background="background-front" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('background-front') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.background.front');
  assert.equal(match.token.value, '#ffffff');
});

test('resolves a direct Grommet decorative background alias', () => {
  const text =
    'import { Box } from \'grommet\';\n<Box background="decorative-blue" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('decorative-blue') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.decorative.blue');
  assert.equal(match.token.value, '#0070f8');
});

test('resolves a direct Grommet foreground background alias', () => {
  const text =
    'import { Box } from \'grommet\';\n<Box background="foreground-critical" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('foreground-critical') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.foreground.critical');
  assert.equal(match.token.value, '#ec3331');
});

test('does not resolve a direct legacy background alias without a token', () => {
  const text = 'import { Box } from \'grommet\';\n<Box background="brand" />';

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.lastIndexOf('brand') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});

test('resolves an object-form Grommet background color alias', () => {
  const text = `import { Box } from 'grommet';
<Box background={{ color: 'decorative-blue', opacity: 'weak' }} />`;
  const match = findJsxTokenAtOffset(
    text,
    text.indexOf('decorative-blue') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.decorative.blue');
  assert.equal(match.token.value, '#0070f8');
});

test('does not resolve a background opacity as a token color', () => {
  const text = `import { Box } from 'grommet';
<Box background={{ color: 'decorative-blue', opacity: 'weak' }} />`;

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.lastIndexOf('weak') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});

test('resolves an object-form Grommet border color alias', () => {
  const text = `import { Box } from 'grommet';
<Box border={{ color: 'border-weak', side: 'bottom' }} />`;
  const match = findJsxTokenAtOffset(
    text,
    text.indexOf('border-weak') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.border.weak');
  assert.equal(match.token.value, '#d4d8db');
});

test('does not resolve a border side as a token color', () => {
  const text = `import { Box } from 'grommet';
<Box border={{ color: 'border-weak', side: 'bottom' }} />`;

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.lastIndexOf('bottom') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});

test('resolves an object-form Grommet border size', () => {
  const text = `import { Box } from 'grommet';
<Box border={{ color: 'border-weak', size: 'medium' }} />`;
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('medium') + 2,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.borderWidth.medium');
  assert.equal(match.token.value, '4px');
});

test('resolves a Grommet text color alias', () => {
  const text =
    'import { Text } from \'grommet\';\n<Text color="text-strong" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('text-strong') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.text.strong');
  assert.equal(match.token.value, '#292d3a');
});

test('resolves a Paragraph text color alias', () => {
  const text =
    "import { Paragraph } from 'grommet';\n" +
    '<Paragraph color="text-strong" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('text-strong') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.text.strong');
  assert.equal(match.token.value, '#292d3a');
});

test('resolves an HPE icon color alias', () => {
  const text =
    "import { Alarm } from '@hpe-design/icons-grommet';\n" +
    '<Alarm color="icon-strong" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('icon-strong') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.color.icon.strong');
  assert.equal(match.token.value, '#292d3a');
});

test('resolves an aliased HPE icon size', () => {
  const text =
    "import { Alarm as NotificationIcon } from '@hpe-design/icons-grommet';\n" +
    '<NotificationIcon size="xxlarge" />';
  const match = findJsxTokenAtOffset(
    text,
    text.lastIndexOf('xxlarge') + 4,
    'javascript',
    tokenIndex,
  );

  assert.equal(match.name, 'hpe.icon.xxlarge.size');
  assert.equal(match.token.value, '32px');
});

test('does not resolve a size outside a supported JSX prop', () => {
  const text = 'import { Box } from \'grommet\';\n<Box label="medium" />';

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.indexOf('medium') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});

test('does not resolve a matching prop from a non-Grommet component', () => {
  const text = '<Box gap="medium" />';

  assert.equal(
    findJsxTokenAtOffset(
      text,
      text.indexOf('medium') + 2,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});
