/**
 * Codemod for migrating t-shirt size props from v6 to v7
 * Usage: node node_modules/grommet-theme-hpe/codemod <transform> <path>
 */

/* eslint-disable no-param-reassign */
// disabled for codemod transform scripts, since it is typical to
// re-assign the function parameters of the nodes/path/attr.

const SPACING_PROPS = ['gap', 'margin', 'pad', 'thickness'];
const BORDER_PROPS = ['border'];
const CONTAINER_PROPS = ['height', 'width'];
const RADIUS_PROPS = ['round'];
const OTHER_PROPS = ['nameProps', 'valueProps'];

// maps for each category
const MAPS = {
  spacing: {
    xxsmall: '5xsmall',
    xsmall: '3xsmall',
    small: 'xsmall',
    large: 'xlarge',
    xlarge: '3xlarge',
  },
  border: {
    xlarge: 'large',
  },
  container: {
    xxsmall: '5xsmall',
    xsmall: '3xsmall',
    small: 'xsmall',
    large: 'xlarge',
    xlarge: 'xxlarge',
    xxlarge: '3xlarge',
  },
  radius: {
    small: 'medium',
    medium: 'xlarge',
    large: 'xxlarge',
    xlarge: 'xxlarge',
  },
};

// Determine which size mapping to use based on the prop name
const getMapForProp = (prop) => {
  if (SPACING_PROPS.includes(prop)) return MAPS.spacing;
  if (BORDER_PROPS.includes(prop)) return MAPS.border;
  if (CONTAINER_PROPS.includes(prop) || prop === 'columns' || prop === 'rows')
    return MAPS.container;
  if (RADIUS_PROPS.includes(prop)) return MAPS.radius;
  return null;
};

// Replaces old size with new size
const replaceSize = (prop, value, fileInfo = {}) => {
  const map = getMapForProp(prop);
  if (!map) return value;

  const newValue = map[value] || value;

  return newValue;
};

// helper for compatibility with JS + TS parser
const isStringLiteral = (n) =>
  n &&
  ((n.type === 'Literal' && typeof n.value === 'string') ||
    n.type === 'StringLiteral');

// Recursively traverse and replace t-shirt sizes in complex data structures
// Handles arrays, objects, conditionals, logical expressions, etc.
const deepReplaceSize = (prop, node, fileInfo) => {
  if (!node) return node;

  // String literal
  if (isStringLiteral(node)) {
    // const node = node;
    const newValue = replaceSize(prop, node.value, fileInfo);
    if (newValue !== node.value) {
      node.value = newValue;
      node.raw = `'${newValue}'`;
    }
    return node;
  }
  if (node.type === 'ArrayExpression') {
    // Use container map for columns/rows arrays
    let arrayProp = prop;
    if (prop === 'columns' || prop === 'rows') arrayProp = 'width';
    node.elements = node.elements.map((el) =>
      deepReplaceSize(arrayProp, el, fileInfo),
    );
    return node;
  }

  // CallExpression - handle .includes() specially
  if (node.type === 'CallExpression') {
    // If this is a .includes() call, don't transform the array argument
    if (
      node.callee &&
      node.callee.type === 'MemberExpression' &&
      node.callee.property &&
      node.callee.property.name === 'includes'
    ) {
      // Don't transform the array (callee.object) or the arguments
      // Just return the node as-is
      return node;
    }
    // For other call expressions, transform arguments normally
    if (node.arguments) {
      node.arguments = node.arguments.map((arg) =>
        deepReplaceSize(prop, arg, fileInfo),
      );
    }
    return node;
  }

  // Object
  if (node.type === 'ObjectExpression') {
    node.properties.forEach((p) => {
      // Key-based mapping for container props (e.g., width, height)
      const keyName = p.key && (p.key.name || p.key.value);
      let valueProp = prop;
      if (CONTAINER_PROPS.includes(keyName)) valueProp = keyName;
      if (p.value) p.value = deepReplaceSize(valueProp, p.value, fileInfo);
    });
    return node;
  }
  // Conditional
  if (node.type === 'ConditionalExpression') {
    node.consequent = deepReplaceSize(prop, node.consequent, fileInfo);
    node.alternate = deepReplaceSize(prop, node.alternate, fileInfo);
    return node;
  }
  // Logical expression (e.g., a && 'small')
  if (node.type === 'LogicalExpression') {
    node.left = deepReplaceSize(prop, node.left, fileInfo);
    node.right = deepReplaceSize(prop, node.right, fileInfo);
    return node;
  }
  // MemberExpression (e.g., pad.small)
  if (node.type === 'MemberExpression') {
    node.object = deepReplaceSize(prop, node.object, fileInfo);
    node.property = deepReplaceSize(prop, node.property, fileInfo);
    return node;
  }
  // Identifier
  return node;
};

// Helper to get file information for error reporting
const getFileInfo = (file, node) => ({
  file: file.path,
  line: node.loc ? node.loc.start.line : undefined,
});

// Improved scanning function - only flag variable declarations and suspicious patterns
const scanForTshirtSizes = (file, root, j) => {
  const tshirtSizes = [
    'xxsmall',
    'xsmall',
    'small',
    'medium',
    'large',
    'xlarge',
    'xxlarge',
    '3xsmall',
    '4xsmall',
    '5xsmall',
    '3xlarge',
  ];

  let foundAny = false;

  // scan for const/let/var declarations with t-shirt size values
  root.find(j.VariableDeclarator).forEach((path) => {
    const { id, init } = path.node;

    if (!init) return;

    // Check if the initial value is a t-shirt size string
    if (isStringLiteral(init) && tshirtSizes.includes(init.value)) {
      const varName = id.name || 'unknown';
      const line = path.node.loc ? path.node.loc.start.line : '?';

      if (!foundAny) {
        console.log(`\n📁 ${file.path}`);
        foundAny = true;
      }

      console.warn(
        `  ⚠️  Line ${line}: const ${varName} = "${init.value}" - may need manual review`,
      );
    }

    // Check for object assignments: const padding = { top: 'small', left: 'large' }
    if (init.type === 'ObjectExpression') {
      let hasAnyTshirtSize = false;
      const foundSizes = [];

      // Check if this object has style-related properties
      const hasStyleProps = init.properties.some((prop) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          // ADD ObjectProperty HERE
          const keyName = prop.key.name || prop.key.value;
          return [
            'pad',
            'margin',
            'gap',
            'width',
            'height',
            'round',
            'border',
            'thickness',
            // Add directional properties
            'top',
            'bottom',
            'left',
            'right',
            'horizontal',
            'vertical',
          ].includes(keyName);
        }
        return false;
      });

      // Check if this object has t-shirt size keys
      const hasTshirtSizeKeys = init.properties.some((prop) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          const keyName = prop.key.name || prop.key.value;
          const isMatch = tshirtSizes.includes(keyName);
          return isMatch;
        }
        return false;
      });

      // Add this after the existing hasTshirtSizeKeys check:
      const tshirtSizeKeyCount = init.properties.filter((prop) => {
        if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
          const keyName = prop.key.name || prop.key.value;
          const isMatch = tshirtSizes.includes(keyName);
          return isMatch;
        }
        return false;
      }).length;

      const mostlyTshirtSizeKeys =
        init.properties.length > 0 &&
        tshirtSizeKeyCount / init.properties.length >= 0.7;

      // Only process objects that are likely style-related:
      // 1. Have style properties (like { pad: 'small' }), OR
      // 2. Have t-shirt size keys (like { xsmall: 'value', small: 'value' })
      // This excludes random objects like { name: 'small', type: 'medium' }
      if (hasStyleProps || hasTshirtSizeKeys || mostlyTshirtSizeKeys) {
        init.properties.forEach((prop) => {
          if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
            // ADD ObjectProperty HERE
            // Check if property key is a t-shirt size
            const propKey = prop.key.name || prop.key.value;
            if (tshirtSizes.includes(propKey)) {
              hasAnyTshirtSize = true;
              foundSizes.push(`${propKey}: ...`);
            }

            // Check if property value is a t-shirt size
            if (
              isStringLiteral(prop.value) &&
              tshirtSizes.includes(prop.value.value)
            ) {
              hasAnyTshirtSize = true;
              foundSizes.push(`${propKey}: "${prop.value.value}"`);
            }
          }
        });
      }

      if (hasAnyTshirtSize) {
        const varName = id.name || 'unknown';
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: const ${varName} = { ${foundSizes.join(
            ', ',
          )} } - may need manual review`,
        );
      }
    }

    // Check for array assignments: const sizes = ['small', 'large'] or nested arrays
    if (init.type === 'ArrayExpression') {
      let hasAnyTshirtSize = false;
      const foundSizes = [];

      const checkArrayForTshirtSizes = (elements, depth = 0) => {
        elements.forEach((element, index) => {
          if (isStringLiteral(element) && tshirtSizes.includes(element.value)) {
            hasAnyTshirtSize = true;
            foundSizes.push(`"${element.value}"`);
          }
          // Handle nested arrays like [['medium', 'auto'], ['small', 'medium']]
          else if (element && element.type === 'ArrayExpression') {
            checkArrayForTshirtSizes(element.elements, depth + 1);
          }
        });
      };

      checkArrayForTshirtSizes(init.elements);

      if (hasAnyTshirtSize) {
        const varName = id.name || 'unknown';
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: const ${varName} = [${foundSizes.join(
            ', ',
          )}] - may need manual review`,
        );
      }
    }

    // Check for conditional expressions: const size = condition ? 'small' : 'medium'
    if (init.type === 'ConditionalExpression') {
      let hasAnyTshirtSize = false;
      const foundSizes = [];

      const checkConditionalForTshirtSizes = (node) => {
        if (isStringLiteral(node) && tshirtSizes.includes(node.value)) {
          hasAnyTshirtSize = true;
          foundSizes.push(`"${node.value}"`);
        }
        // Handle arrays in conditionals
        if (node.type === 'ArrayExpression') {
          node.elements.forEach((element) => {
            checkConditionalForTshirtSizes(element);
          });
        }
        // Handle nested conditionals
        if (node.type === 'ConditionalExpression') {
          checkConditionalForTshirtSizes(node.test);
          checkConditionalForTshirtSizes(node.consequent);
          checkConditionalForTshirtSizes(node.alternate);
        }
        // Handle call expressions like .includes()
        if (node.type === 'CallExpression') {
          // Check the callee (the array part of ['x', 'y'].includes())
          if (
            node.callee &&
            node.callee.object &&
            node.callee.object.type === 'ArrayExpression'
          ) {
            node.callee.object.elements.forEach((element) => {
              checkConditionalForTshirtSizes(element);
            });
          }
        }
      };

      checkConditionalForTshirtSizes(init.test); // ✅ ADD THIS LINE
      checkConditionalForTshirtSizes(init.consequent);
      checkConditionalForTshirtSizes(init.alternate);

      if (hasAnyTshirtSize) {
        const varName = id.name || 'unknown';
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: const ${varName} = [${foundSizes.join(
            ', ',
          )}] - may need manual review`,
        );
      }
    }

    // Check for destructuring with default values: const { round = 'xxsmall', size = 'medium' } = indicator;
    if (id.type === 'ObjectPattern') {
      let hasAnyTshirtSize = false;
      const foundSizes = [];

      const checkDestructuringForTshirtSizes = (pattern) => {
        pattern.properties.forEach((prop) => {
          if (prop.type === 'Property') {
            // Handle simple destructuring: { round, size }
            if (prop.value.type === 'Identifier') {
              // No default value, skip
              return;
            }

            // Handle destructuring with defaults: { round = 'xxsmall', size = 'medium' }
            if (prop.value.type === 'AssignmentPattern') {
              const keyName = prop.key.name || prop.key.value;
              const defaultValue = prop.value.right;

              // Check if default value is a t-shirt size string
              if (
                isStringLiteral(defaultValue) &&
                tshirtSizes.includes(defaultValue.value)
              ) {
                hasAnyTshirtSize = true;
                foundSizes.push(`${keyName} = "${defaultValue.value}"`);
              }

              // Check for complex default values (conditionals, etc.)
              if (defaultValue.type === 'ConditionalExpression') {
                const checkConditionalInDefault = (node) => {
                  if (
                    isStringLiteral(node) &&
                    tshirtSizes.includes(node.value)
                  ) {
                    hasAnyTshirtSize = true;
                    foundSizes.push(`${keyName} = "${node.value}"`);
                  }
                  if (node.type === 'ConditionalExpression') {
                    checkConditionalInDefault(node.consequent);
                    checkConditionalInDefault(node.alternate);
                  }
                };
                checkConditionalInDefault(defaultValue);
              }
            }
          }

          // Handle rest patterns if needed
          if (prop.type === 'RestElement') {
            // Skip rest elements for now
            return;
          }
        });
      };

      checkDestructuringForTshirtSizes(id);

      if (hasAnyTshirtSize) {
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: const { ${foundSizes.join(
            ', ',
          )} } = ... - may need manual review`,
        );
      }
    }
  });

  // scan for assignment expressions with style objects (e.g., kindStyles = { ... })
  root.find(j.AssignmentExpression).forEach((path) => {
    const { left, right } = path.node;

    // Only check object assignments
    if (right && right.type === 'ObjectExpression') {
      let hasAnyTshirtSize = false;
      const foundSizes = [];

      // Check if this object has style-related properties or t-shirt size keys
      const hasStyleProps = right.properties.some((prop) => {
        if (prop.type === 'Property') {
          const keyName = prop.key.name || prop.key.value;
          return [
            'pad',
            'margin',
            'gap',
            'width',
            'height',
            'round',
            'border',
            'thickness',
            // Add directional properties
            'top',
            'bottom',
            'left',
            'right',
            'horizontal',
            'vertical',
          ].includes(keyName);
        }
        return false;
      });

      const hasTshirtSizeKeys = right.properties.some((prop) => {
        if (prop.type === 'Property') {
          const keyName = prop.key.name || prop.key.value;
          return tshirtSizes.includes(keyName);
        }
        return false;
      });

      // Check nested objects for style properties (like container: { pad: 'xsmall' })
      const hasNestedStyleProps = right.properties.some((prop) => {
        if (
          prop.type === 'Property' &&
          prop.value &&
          prop.value.type === 'ObjectExpression'
        ) {
          return prop.value.properties.some((nestedProp) => {
            if (nestedProp.type === 'Property') {
              const keyName = nestedProp.key.name || nestedProp.key.value;
              return [
                'pad',
                'margin',
                'gap',
                'width',
                'height',
                'round',
                'border',
                'thickness',
                'top',
                'bottom',
                'left',
                'right',
                'horizontal',
                'vertical',
              ].includes(keyName);
            }
            return false;
          });
        }
        return false;
      });

      // Process if it has style-related properties or nested style properties
      if (hasStyleProps || hasTshirtSizeKeys || hasNestedStyleProps) {
        // Helper function to recursively check for t-shirt sizes in nested objects
        const checkObjectForTshirtSizes = (obj, prefix = '') => {
          obj.properties.forEach((prop) => {
            if (prop.type === 'Property') {
              const propKey = prop.key.name || prop.key.value;
              const fullKey = prefix ? `${prefix}.${propKey}` : propKey;

              // Check if property key is a t-shirt size
              if (tshirtSizes.includes(propKey)) {
                hasAnyTshirtSize = true;
                foundSizes.push(`${fullKey}: ...`);
              }

              // Check if property value is a t-shirt size
              if (
                isStringLiteral(prop.value) &&
                tshirtSizes.includes(prop.value.value)
              ) {
                hasAnyTshirtSize = true;
                foundSizes.push(`${fullKey}: "${prop.value.value}"`);
              }

              // Recursively check nested objects
              if (prop.value && prop.value.type === 'ObjectExpression') {
                checkObjectForTshirtSizes(prop.value, fullKey);
              }
            }
          });
        };

        checkObjectForTshirtSizes(right);
      }

      if (hasAnyTshirtSize) {
        const varName = left.type === 'Identifier' ? left.name : 'unknown';
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: ${varName} = { ${foundSizes.join(
            ', ',
          )} } - may need manual review`,
        );
      }
    }
  });

  // scan for theme.global.edgeSize references
  root.find(j.MemberExpression).forEach((path) => {
    const { node } = path;

    // Check for theme.global.edgeSize.xxx pattern
    if (
      node.object &&
      node.object.object &&
      node.object.object.object &&
      node.object.object.object.name === 'theme' &&
      node.object.object.property &&
      node.object.object.property.name === 'global' &&
      node.object.property &&
      node.object.property.name === 'edgeSize'
    ) {
      const sizeName = node.property.name || node.property.value;
      if (tshirtSizes.includes(sizeName)) {
        const line = path.node.loc ? path.node.loc.start.line : '?';

        if (!foundAny) {
          console.log(`\n📁 ${file.path}`);
          foundAny = true;
        }

        console.warn(
          `  ⚠️  Line ${line}: theme.global.edgeSize.${sizeName} - may need manual review`,
        );
      }
    }
  });

  // scan for obvious style objects that might contain t-shirt sizes
  // Look for objects with style-related property names
  root.find(j.ObjectExpression).forEach((path) => {
    const { node } = path;

    // Skip if this is already handled by VariableDeclarator above
    let isPartOfVariableDeclarator = false;
    let isPartOfAssignmentExpression = false;
    let current = path.parent;
    while (current) {
      if (current.value && current.value.type === 'VariableDeclarator') {
        isPartOfVariableDeclarator = true;
        break;
      }
      if (current.value && current.value.type === 'AssignmentExpression') {
        isPartOfAssignmentExpression = true;
        break;
      }
      current = current.parent;
    }

    if (isPartOfVariableDeclarator || isPartOfAssignmentExpression) return;

    // Check if this object has style-related properties
    const hasStyleProps = node.properties.some((prop) => {
      if (prop.type === 'Property') {
        const keyName = prop.key.name || prop.key.value;
        return [
          'pad',
          'margin',
          'gap',
          'width',
          'height',
          'round',
          'border',
        ].includes(keyName);
      }
      return false;
    });

    // Only flag if it looks like a style object
    if (hasStyleProps) {
      node.properties.forEach((prop) => {
        if (
          prop.type === 'Property' &&
          isStringLiteral(prop.value) &&
          tshirtSizes.includes(prop.value.value)
        ) {
          const propKey = prop.key.name || prop.key.value;
          const line = path.node.loc ? path.node.loc.start.line : '?';

          if (!foundAny) {
            console.log(`\n📁 ${file.path}`);
            foundAny = true;
          }

          console.warn(
            `  ⚠️  Line ${line}: Object with ${propKey}: "${prop.value.value}" - may need manual review`,
          );
        }
      });
    }
  });

  // Return original source unchanged in scan mode
  return file.source;
};

module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);

  // Scanning mode - detect all t-shirt sizes
  if (options.scan) {
    return scanForTshirtSizes(file, root, j);
  }

  // Track components imported from 'grommet-icons'
  const grommetIconComponents = new Set();

  // Find all imports from 'grommet-icons'
  root.find(j.ImportDeclaration).forEach((path) => {
    if (path.node.source.value === 'grommet-icons') {
      path.node.specifiers.forEach((specifier) => {
        if (specifier.type === 'ImportSpecifier') {
          grommetIconComponents.add(specifier.imported.name);
        }
      });
    }
  });

  // Helper function to check if a component is imported from grommet-icons
  const isGrommetIconComponent = (elementName) =>
    grommetIconComponents.has(elementName);

  // Replace theme.global.edgeSize.xxx references
  root
    .find(j.MemberExpression, {
      object: {
        object: { object: { name: 'theme' }, property: { name: 'global' } },
        property: { name: 'edgeSize' },
      },
    })
    .forEach((path) => {
      const prop = path.node.property;

      // Only transform identifiers (e.g., theme.global.edgeSize.small)
      if (prop.type === 'Identifier') {
        const oldKey = prop.name;
        const newKey = MAPS.spacing[oldKey];
        if (newKey && newKey !== oldKey) {
          if (/^\d/.test(newKey)) {
            // starts with a number → use bracket notation
            path.node.property = j.stringLiteral(newKey);
            path.node.computed = true; // theme.global.edgeSize['5xsmall']
          } else {
            // safe identifier
            path.node.property = j.identifier(newKey);
            path.node.computed = false;
          }
        }
      }

      // Literal or StringLiteral: theme.global.edgeSize['small']
      if (isStringLiteral(prop)) {
        const oldKey = prop.value;
        const newKey = MAPS.spacing[oldKey];
        if (newKey && newKey !== oldKey) {
          if (/^\d/.test(newKey)) {
            // starts with a number → use bracket notation
            // by setting computed to true, jscodeshift will convert to bracket notation
            // stringLiteral ensure it's a string type
            path.node.property = j.stringLiteral(newKey);
            path.node.computed = true;
          } else {
            // safe identifier → use dot notation
            // ensure consistency by explicity setting computed to false
            path.node.property = j.identifier(newKey);
            path.node.computed = false;
          }
        }
      }
    });

  const ALL_PROPS = [
    ...SPACING_PROPS,
    ...BORDER_PROPS,
    ...CONTAINER_PROPS,
    ...RADIUS_PROPS,
    ...OTHER_PROPS,
    // Add additional props that can contain pad, margin, round, height, width
    'dropProps',
    'defaultItemProps',
    'boxProp',
    'buttonProps',
    'paginate',
    'contentProps',
    'chart',
  ];

  // Replace string literal, object, array, and conditional props (deep traversal)
  ALL_PROPS.forEach((prop) => {
    root.find(j.JSXAttribute, { name: { name: prop } }).forEach((path) => {
      const val = path.node.value;
      if (val) {
        const fileInfo = getFileInfo(file, path.node);

        // Check if this is a height prop on a grommet-icons component
        const isHeightOnGrommetIcon =
          prop === 'height' &&
          path.parent &&
          path.parent.value &&
          path.parent.value.name &&
          isGrommetIconComponent(path.parent.value.name.name);

        // Skip transformation for height props on grommet-icons components
        if (isHeightOnGrommetIcon) {
          return;
        }

        // Handle special container props differently
        const isSpecialContainer = [
          'dropProps',
          'defaultItemProps',
          'boxProp',
          'buttonProps',
          'paginate',
          'contentProps',
          'chart',
        ].includes(prop);

        // String literal
        if (isStringLiteral(val) && !isSpecialContainer) {
          const newValue = replaceSize(prop, val.value, fileInfo);
          if (newValue !== val.value) {
            path.get('value').replace(j.stringLiteral(newValue));
          }
        }

        // Deep traverse expression containers
        if (val.type === 'JSXExpressionContainer') {
          if (isSpecialContainer) {
            // For special containers, only transform nested pad, margin, round, height, width, thickness
            if (val.expression.type === 'ObjectExpression') {
              val.expression.properties.forEach((propNode) => {
                if (propNode.type === 'Property') {
                  const keyName =
                    propNode.key && (propNode.key.name || propNode.key.value);

                  // Only transform specific nested properties
                  if (
                    [
                      'pad',
                      'margin',
                      'round',
                      'height',
                      'width',
                      'thickness',
                    ].includes(keyName)
                  ) {
                    if (isStringLiteral(propNode.value)) {
                      const newValue = replaceSize(
                        keyName,
                        propNode.value.value,
                        fileInfo,
                      );
                      if (newValue !== propNode.value.value) {
                        propNode.value = j.stringLiteral(newValue);
                      }
                    } else {
                      // Handle complex structures (arrays, objects, conditionals)
                      propNode.value = deepReplaceSize(
                        keyName,
                        propNode.value,
                        fileInfo,
                      );
                    }
                  }
                }
              });
            }
            // Handle arrays within special containers (like chart prop)
            if (val.expression.type === 'ArrayExpression') {
              val.expression.elements.forEach((element) => {
                if (element && element.type === 'ObjectExpression') {
                  element.properties.forEach((propNode) => {
                    if (propNode.type === 'Property') {
                      const keyName =
                        propNode.key &&
                        (propNode.key.name || propNode.key.value);

                      // Transform thickness within chart array objects
                      if (
                        [
                          'pad',
                          'margin',
                          'round',
                          'height',
                          'width',
                          'thickness',
                        ].includes(keyName)
                      ) {
                        if (isStringLiteral(propNode.value)) {
                          const newValue = replaceSize(
                            keyName,
                            propNode.value.value,
                            fileInfo,
                          );
                          if (newValue !== propNode.value.value) {
                            propNode.value = j.stringLiteral(newValue);
                          }
                        } else {
                          // Handle complex structures
                          propNode.value = deepReplaceSize(
                            keyName,
                            propNode.value,
                            fileInfo,
                          );
                        }
                      }
                    }
                  });
                }
              });
            }
          } else {
            val.expression = deepReplaceSize(prop, val.expression, fileInfo);
          }
        }
      }
    });
  });

  // Replace variable assignments and array/string/object literals
  root.find(j.VariableDeclarator).forEach((path) => {
    const { id } = path.node;
    const { init } = path.node;
    // Only handle variables named after known props or common names (pad, columns, rows, etc.)
    const varNames = [
      ...ALL_PROPS,
      'columns',
      'rows',
      'thickness',
      'size',
      'width',
      'height',
      'round',
      'nameProps',
      'valueProps',
    ];
    let prop = null;
    if (id.type === 'Identifier' && varNames.includes(id.name)) {
      prop = id.name;
    }
    // For destructured assignment: const { pad } = ...
    if (id.type === 'ObjectPattern') {
      id.properties.forEach((p) => {
        if (p.key && varNames.includes(p.key.name)) {
          prop = p.key.name;
        }
      });
    }
    if (prop && init) {
      const fileInfo = getFileInfo(file, path.node);
      path.node.init = deepReplaceSize(prop, init, fileInfo);
    }
  });

  // Replace assignment expressions (e.g., pad = ...)
  root.find(j.AssignmentExpression).forEach((path) => {
    const { left } = path.node;
    const { right } = path.node;
    const varNames = [
      ...ALL_PROPS,
      'columns',
      'rows',
      'thickness',
      'size',
      'width',
      'height',
      'round',
      'nameProps',
    ];
    let prop = null;
    if (left.type === 'Identifier' && varNames.includes(left.name)) {
      prop = left.name;
    }
    if (prop && right) {
      const fileInfo = getFileInfo(file, path.node);
      path.node.right = deepReplaceSize(prop, right, fileInfo);
    }
  });

  // Handle components with container size mapping (Meter, TableCell, Cards)
  //  test -> <Chart size="small" />
  ['Meter', 'TableCell', 'Cards', 'DataChart', 'Chart'].forEach(
    (componentName) => {
      root
        .find(j.JSXElement, {
          openingElement: {
            name: { name: componentName },
          },
        })
        .forEach((path) => {
          const { attributes } = path.node.openingElement;
          attributes.forEach((attr, index) => {
            if (attr.type === 'JSXAttribute' && attr.name.name === 'size') {
              if (attr.value && isStringLiteral(attr.value)) {
                const newValue =
                  MAPS.container[attr.value.value] || attr.value.value;
                if (newValue !== attr.value.value) {
                  attributes[index] = j.jsxAttribute(
                    j.jsxIdentifier('size'),
                    j.stringLiteral(newValue),
                  );
                }
              }
            }
          });
        });
    },
  );

  // Handle components with spacing size mapping (RangeSelector)
  ['RangeSelector'].forEach((componentName) => {
    root
      .find(j.JSXElement, {
        openingElement: {
          name: { name: componentName },
        },
      })
      .forEach((path) => {
        const { attributes } = path.node.openingElement;
        attributes.forEach((attr, index) => {
          if (attr.type === 'JSXAttribute' && attr.name.name === 'size') {
            if (attr.value && isStringLiteral(attr.value)) {
              const newValue =
                MAPS.spacing[attr.value.value] || attr.value.value;
              if (newValue !== attr.value.value) {
                attributes[index] = j.jsxAttribute(
                  j.jsxIdentifier('size'),
                  j.stringLiteral(newValue),
                );
              }
            }
          }
        });
      });
  });

  // Handle DataChart component size prop
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'DataChart' },
      },
    })
    .forEach((path) => {
      const { attributes } = path.node.openingElement;
      attributes.forEach((attr, index) => {
        if (attr.type === 'JSXAttribute' && attr.name.name === 'size') {
          if (attr.value && isStringLiteral(attr.value)) {
            const newValue =
              MAPS.container[attr.value.value] || attr.value.value;
            if (newValue !== attr.value.value) {
              attributes[index] = j.jsxAttribute(
                j.jsxIdentifier('size'),
                j.stringLiteral(newValue),
              );
            }
          }

          // Handle object: <DataChart size={{ height: "small", width: "large" }} />
          if (
            attr.value &&
            attr.value.type === 'JSXExpressionContainer' &&
            attr.value.expression.type === 'ObjectExpression'
          ) {
            attr.value.expression.properties.forEach((propNode, propIndex) => {
              if (
                isStringLiteral(propNode.value) &&
                (propNode.key.name === 'height' ||
                  propNode.key.name === 'width')
              ) {
                const newValue =
                  MAPS.container[propNode.value.value] || propNode.value.value;
                if (newValue !== propNode.value.value) {
                  attr.value.expression.properties[propIndex] = j.property(
                    'init',
                    propNode.key,
                    j.stringLiteral(newValue),
                  );
                }
              }
            });
          }
        }
      });
    });

  // Handle Grid component columns and rows prop
  root
    .find(j.JSXElement, {
      openingElement: {
        name: { name: 'Grid' },
      },
    })
    .forEach((path) => {
      const { attributes } = path.node.openingElement;
      attributes.forEach((attr, index) => {
        if (
          attr.type === 'JSXAttribute' &&
          (attr.name.name === 'columns' || attr.name.name === 'rows')
        ) {
          // Handle string: <Grid columns="large" /> or <Grid rows="large" />
          if (attr.value && isStringLiteral(attr.value)) {
            const newValue =
              MAPS.container[attr.value.value] || attr.value.value;
            if (newValue !== attr.value.value) {
              attributes[index] = j.jsxAttribute(
                j.jsxIdentifier(attr.name.name),
                j.stringLiteral(newValue),
              );
            }
          }

          // Handle anything more complex (arrays, objects, conditionals, etc.)
          if (attr.value && attr.value.type === 'JSXExpressionContainer') {
            const fileInfo = getFileInfo(file, path.node);
            attr.value.expression = deepReplaceSize(
              attr.name.name,
              attr.value.expression,
              fileInfo,
            );
          }
        }
      });
    });

  // Transform default parameter values for both arrow and function declarations
  root.find(j.AssignmentPattern).forEach((path) => {
    const { left } = path.node;
    const { right } = path.node;
    if (
      left.type === 'Identifier' &&
      ALL_PROPS.includes(left.name) &&
      isStringLiteral(right)
    ) {
      const fileInfo = getFileInfo(file, path.node);
      const newValue = replaceSize(left.name, right.value, fileInfo);
      if (newValue !== right.value) {
        path.node.right = j.stringLiteral(newValue);
      }
    } else if (left.type === 'Identifier' && ALL_PROPS.includes(left.name)) {
      const fileInfo = getFileInfo(file, path.node);
      path.node.right = deepReplaceSize(left.name, right, fileInfo);
    }
  });

  // Transform size props within function calls (e.g., cloneElement, createElement, etc.)
  root.find(j.CallExpression).forEach((path) => {
    const callExpr = path.node;

    // Check if this call expression has object literal arguments
    if (callExpr.arguments && callExpr.arguments.length > 0) {
      callExpr.arguments.forEach((arg) => {
        // Look for object expressions that might contain size props
        if (arg.type === 'ObjectExpression') {
          arg.properties.forEach((prop) => {
            if (prop.type === 'Property' || prop.type === 'ObjectProperty') {
              const keyName = prop.key && (prop.key.name || prop.key.value);

              // Transform size prop specifically
              if (keyName === 'size' && isStringLiteral(prop.value)) {
                const fileInfo = getFileInfo(file, path.node);
                // Use container mapping for size prop by default
                const newValue = replaceSize(
                  'width',
                  prop.value.value,
                  fileInfo,
                );
                if (newValue !== prop.value.value) {
                  prop.value = j.stringLiteral(newValue);
                }
              }

              // Transform other known props
              if (ALL_PROPS.includes(keyName)) {
                const fileInfo = getFileInfo(file, path.node);
                if (isStringLiteral(prop.value)) {
                  const newValue = replaceSize(
                    keyName,
                    prop.value.value,
                    fileInfo,
                  );
                  if (newValue !== prop.value.value) {
                    prop.value = j.stringLiteral(newValue);
                  }
                } else {
                  // Handle complex values (arrays, objects, conditionals)
                  prop.value = deepReplaceSize(keyName, prop.value, fileInfo);
                }
              }
            }
          });
        }
      });
    }
  });

  // get --quote flag from options argument
  const quote = options.quote === 'single' ? 'single' : 'double';

  // detect and maintain original file's end of line sequence
  const lineTerminator = /\r\n/.test(file.source) ? '\r\n' : '\n';

  return root.toSource({ quote, lineTerminator });
};
