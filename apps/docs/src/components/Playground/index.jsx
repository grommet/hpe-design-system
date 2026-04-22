// @ts-check
/**
 * Playground
 *
 * Renders an interactive prop editor for a grommet component.
 *
 * Usage in MDX:
 *   <Playground component="Button" exclude={['as', 'children', 'style']} />
 *
 * Props:
 *   component {string}    - PascalCase component name matching generated/ file
 *   exclude   {string[]}  - Prop names to hide from controls (e.g. rarely-used
 *                           or layout-only props). All other props are shown.
 */

import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

/**
 * Dynamically loads the generated schema for a component.
 * @param {string} componentName
 * @returns {Promise<import('../../data/playground/schema').PropDescriptor[]>}
 */
async function loadSchema(componentName) {
  // Vite / webpack dynamic import — bundler resolves at build time from the
  // generated/ directory. Add new components to the switch as they are
  // scaffolded with `pnpm generate:schemas <Name>`.
  switch (componentName) {
    case 'Button':
      return (await import('../../data/playground/generated/Button'))
        .buttonSchema;
    default:
      throw new Error(
        `Playground: no generated schema found for "${componentName}". ` +
          `Run: pnpm --filter docs generate:schemas ${componentName}`,
      );
  }
}

/**
 * @param {{ component: string, exclude?: string[] }} props
 */
export function Playground({ component, exclude }) {
  const [, setSchema] = useState(/** @type {any[]|null} */ (null));
  const [error, setError] = useState(/** @type {string|null} */ (null));

  useEffect(() => {
    loadSchema(component)
      .then(fullSchema => {
        // Show all props except those explicitly excluded.
        const filtered = fullSchema.filter(p => !exclude.includes(p.name));
        setSchema(filtered);

        // Demo log — shows resolved prop names + types in the browser console.
        console.group(`Playground: ${component}`);
        filtered.forEach(prop => {
          if (!prop) return;
          let extra = '';
          if (prop.type === 'enum' && 'options' in prop) {
            extra = ` [${prop.options.join(', ')}]`;
          } else if (prop.type === 'union' && 'types' in prop) {
            extra = ` (${prop.types.map(t => t.type).join(' | ')})`;
          }
          console.log(`  ${prop.name}: ${prop.type}${extra}`);
        });
        console.groupEnd();
      })
      .catch(err => setError(err.message));
  }, [component, exclude]);

  if (error) {
    console.error(`Playground error: ${error}`);
  }

  // UI not yet built — component is wired for demo/console logging only.
  return null;
}

Playground.propTypes = {
  component: PropTypes.string.isRequired,
  exclude: PropTypes.arrayOf(PropTypes.string),
};

Playground.defaultProps = {
  exclude: [],
};
