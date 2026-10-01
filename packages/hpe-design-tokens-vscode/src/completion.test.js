// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const assert = require('node:assert/strict');

const { completionLabel, completionsAtOffset } = require('./completion');
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
    'hpe.spacing.medium': { value: '24px' },
    'hpe.spacing.none': { value: '0px' },
    'hpe.spacing.small': { value: '16px' },
    'hpe.text.small.fontSize': { value: '14px' },
  },
]);

test('adds the resolved value to each completion label', () => {
  assert.deepEqual(completionLabel('none', { value: '0px' }), {
    label: 'none',
    detail: ' = 0px',
  });
});

test('offers token values for an imported Grommet layout prop', () => {
  const text = 'import { Box } from \'grommet\';\n<Box gap="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('gap="') + 'gap="'.length,
    'javascript',
    tokenIndex,
  );

  assert.equal(result.context.componentName, 'Box');
  assert.equal(result.context.propName, 'gap');
  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers spacing values for Button props', () => {
  const gapText = 'import { Button } from \'grommet\';\n<Button gap="" />';
  const padText = 'import { Button } from \'grommet\';\n<Button pad="" />';
  const gapResult = completionsAtOffset(
    gapText,
    gapText.indexOf('gap="') + 'gap="'.length,
    'javascript',
    tokenIndex,
  );
  const padResult = completionsAtOffset(
    padText,
    padText.indexOf('pad="') + 'pad="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    gapResult.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    padResult.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers spacing values for CheckBox pad', () => {
  const text = 'import { CheckBox } from \'grommet\';\n<CheckBox pad="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('pad="') + 'pad="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers values for supported data and utility component props', () => {
  [
    ['Button', 'margin', ['medium', 'none', 'small']],
    ['Chart', 'pad', ['medium', 'none', 'small']],
    ['DataChart', 'pad', ['medium', 'none', 'small']],
    ['List', 'pad', ['medium', 'none', 'small']],
    ['Skeleton', 'pad', ['medium', 'none', 'small']],
    ['Skeleton', 'round', ['medium']],
  ].forEach(([componentName, propName, expectedValues]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="" />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      expectedValues,
    );
  });
});

test('offers values for supported Calendar, Chart, List, Skeleton, and Drop props', () => {
  [
    ['Calendar', 'margin', ['medium', 'none', 'small']],
    ['Chart', 'margin', ['medium', 'none', 'small']],
    ['Drop', 'margin', ['medium', 'none', 'small']],
    ['Drop', 'round', ['medium']],
    ['List', 'margin', ['medium', 'none', 'small']],
    ['Skeleton', 'margin', ['medium', 'none', 'small']],
  ].forEach(([componentName, propName, expectedValues]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="" />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      expectedValues,
    );
  });
});

test('offers spacing values for generic-margin component props', () => {
  [
    'Accordion',
    'Cards',
    'DataTable',
    'Distribution',
    'Image',
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
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} margin="" />`;
    const result = completionsAtOffset(
      text,
      text.indexOf('margin="') + 'margin="'.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('offers spacing values for Cards padding and Distribution gaps', () => {
  [
    ['Cards', 'pad'],
    ['Distribution', 'gap'],
  ].forEach(([componentName, propName]) => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} ${propName}="" />`,
    ].join('\n');
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('offers values for newly supported Box-derived component props', () => {
  [
    ['Nav', 'gap', ['medium', 'none', 'small']],
    ['Sidebar', 'pad', ['medium', 'none', 'small']],
    ['Spinner', 'margin', ['medium', 'none', 'small']],
    ['Tag', 'round', ['medium']],
    [
      'Toolbar',
      'background',
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'foreground-critical',
        'icon-strong',
        'text-strong',
      ],
    ],
  ].forEach(([componentName, propName, expectedValues]) => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} ${propName}="" />`,
    ].join('\n');
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      expectedValues,
    );
  });
});

test('offers semantic colors for Chart, Drop, and Meter', () => {
  [
    ['Chart', 'color'],
    ['Drop', 'background'],
    ['Meter', 'background'],
  ].forEach(([componentName, propName]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="" />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'foreground-critical',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('offers semantic backgrounds for Grommet, Layer, List, and Menu', () => {
  [
    ['Grommet', 'background=""', 'background="'],
    ['Grommet', "background={{ color: '' }}", "color: '"],
    ['Layer', 'background=""', 'background="'],
    ['Layer', "background={{ color: '' }}", "color: '"],
    ['List', 'background=""', 'background="'],
    ['Menu', 'dropBackground=""', 'dropBackground="'],
    ['Menu', "dropBackground={{ color: '' }}", "color: '"],
  ].forEach(([componentName, prop, cursor]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${prop} />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(cursor) + cursor.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'foreground-critical',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('offers spacing values for Layer margin', () => {
  const text = 'import { Layer } from \'grommet\';\n<Layer margin="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('margin="') + 'margin="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers spacing values for FormField, Menu, and DropButton margins', () => {
  ['DropButton', 'FormField', 'Menu'].forEach(componentName => {
    const text = [
      `import { ${componentName} } from 'grommet';`,
      `<${componentName} margin="" />`,
    ].join('\n');
    const result = completionsAtOffset(
      text,
      text.indexOf('margin="') + 'margin="'.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      ['medium', 'none', 'small'],
    );
  });
});

test('offers semantic colors for direct color component props', () => {
  [
    ['Button', 'color'],
    ['Meter', 'color'],
    ['RangeInput', 'color'],
    ['RangeSelector', 'color'],
    ['WorldMap', 'color'],
    ['WorldMap', 'hoverColor'],
  ].forEach(([componentName, propName]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${propName}="" />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(`${propName}="`) + `${propName}="`.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      [
        'background-front',
        'border-weak',
        'decorative-blue',
        'foreground-critical',
        'icon-strong',
        'text-strong',
      ],
    );
  });
});

test('offers container values for Skeleton and TextInput dimensions', () => {
  [
    ['Carousel', "height={{ max: '' }}", "max: '"],
    ['Carousel', "height={{ min: '' }}", "min: '"],
    ['Carousel', 'height=""', 'height="'],
    ['Carousel', "width={{ max: '' }}", "max: '"],
    ['Carousel', "width={{ min: '' }}", "min: '"],
    ['Carousel', 'width=""', 'width="'],
    ['Skeleton', "height={{ max: '' }}", "max: '"],
    ['Skeleton', 'width=""', 'width="'],
    ['Select', 'dropHeight=""', 'dropHeight="'],
    ['SelectMultiple', 'dropHeight=""', 'dropHeight="'],
    ['TextInput', "width={{ min: '' }}", "min: '"],
  ].forEach(([componentName, prop, cursor]) => {
    const text = `import { ${componentName} } from 'grommet';\n<${componentName} ${prop} />`;
    const result = completionsAtOffset(
      text,
      text.indexOf(cursor) + cursor.length,
      'javascript',
      tokenIndex,
    );

    assert.deepEqual(
      result.values.map(item => item.value),
      ['medium'],
    );
  });
});

test('offers spacing values for Text margin', () => {
  const text = 'import { Text } from \'grommet\';\n<Text margin="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('margin="') + 'margin="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers spacing values for Heading margin', () => {
  const text = 'import { Heading } from \'grommet\';\n<Heading margin="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('margin="') + 'margin="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers spacing values for Paragraph and Anchor margins', () => {
  const paragraphText =
    'import { Paragraph } from \'grommet\';\n<Paragraph margin="" />';
  const anchorText =
    'import { Anchor } from \'grommet\';\n<Anchor margin="" />';
  const paragraphResult = completionsAtOffset(
    paragraphText,
    paragraphText.indexOf('margin="') + 'margin="'.length,
    'javascript',
    tokenIndex,
  );
  const anchorResult = completionsAtOffset(
    anchorText,
    anchorText.indexOf('margin="') + 'margin="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    paragraphResult.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
  assert.deepEqual(
    anchorResult.values.map(item => item.value),
    ['medium', 'none', 'small'],
  );
});

test('offers component-specific values', () => {
  const text = 'import { Text } from \'grommet\';\n<Text size="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('size="') + 'size="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['small'],
  );
});

test('offers text sizes for Anchor', () => {
  const text = 'import { Anchor } from \'grommet\';\n<Anchor size="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('size="') + 'size="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['small'],
  );
});

test('offers container values for object-form layout dimensions', () => {
  const text = "import { Box } from 'grommet';\n<Box width={{ max: '' }} />";
  const result = completionsAtOffset(
    text,
    text.indexOf("max: '") + "max: '".length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium'],
  );
});

test('offers Grommet color aliases for supported color props', () => {
  const text = 'import { Text } from \'grommet\';\n<Text color="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('color="') + 'color="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['text-strong'],
  );
});

test('offers color aliases for object-form backgrounds', () => {
  const text =
    "import { Box } from 'grommet';\n<Box background={{ color: '' }} />";
  const result = completionsAtOffset(
    text,
    text.indexOf("color: '") + "color: '".length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    [
      'background-front',
      'border-weak',
      'decorative-blue',
      'foreground-critical',
      'icon-strong',
      'text-strong',
    ],
  );
});

test('offers semantic colors for direct backgrounds', () => {
  const text = 'import { Box } from \'grommet\';\n<Box background="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('background="') + 'background="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    [
      'background-front',
      'border-weak',
      'decorative-blue',
      'foreground-critical',
      'icon-strong',
      'text-strong',
    ],
  );
});

test('offers semantic colors for object-form borders', () => {
  const text = "import { Box } from 'grommet';\n<Box border={{ color: '' }} />";
  const result = completionsAtOffset(
    text,
    text.indexOf("color: '") + "color: '".length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['border-weak'],
  );
});

test('offers border widths for object-form borders', () => {
  const text = "import { Box } from 'grommet';\n<Box border={{ size: '' }} />";
  const result = completionsAtOffset(
    text,
    text.indexOf("size: '") + "size: '".length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['medium'],
  );
});

test('offers semantic colors for Paragraph', () => {
  const text = 'import { Paragraph } from \'grommet\';\n<Paragraph color="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('color="') + 'color="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['text-strong'],
  );
});

test('offers text sizes for Paragraph', () => {
  const text = 'import { Paragraph } from \'grommet\';\n<Paragraph size="" />';
  const result = completionsAtOffset(
    text,
    text.indexOf('size="') + 'size="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    result.values.map(item => item.value),
    ['small'],
  );
});

test('offers semantic colors and sizes for HPE icons', () => {
  const colorText =
    'import { Alarm } from \'@hpe-design/icons-grommet\';\n<Alarm color="" />';
  const sizeText =
    'import { Alarm } from \'@hpe-design/icons-grommet\';\n<Alarm size="" />';
  const colorResult = completionsAtOffset(
    colorText,
    colorText.indexOf('color="') + 'color="'.length,
    'javascript',
    tokenIndex,
  );
  const sizeResult = completionsAtOffset(
    sizeText,
    sizeText.indexOf('size="') + 'size="'.length,
    'javascript',
    tokenIndex,
  );

  assert.deepEqual(
    colorResult.values.map(item => item.value),
    ['icon-strong'],
  );
  assert.deepEqual(
    sizeResult.values.map(item => item.value),
    ['xxlarge'],
  );
});

test('does not offer values outside a Grommet token prop', () => {
  const text = 'import { Box } from \'grommet\';\n<Box label="" />';

  assert.equal(
    completionsAtOffset(
      text,
      text.indexOf('label="') + 'label="'.length,
      'javascript',
      tokenIndex,
    ),
    undefined,
  );
});
