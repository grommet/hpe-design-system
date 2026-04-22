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
import { useEffect, useMemo, useState } from 'react';

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
export function Playground({ component, exclude = [] }) {
  const [schema, setSchema] = useState(/** @type {any[]|null} */ (null));
  const [error, setError] = useState(/** @type {string|null} */ (null));

  // Stable key derived from exclude contents — prevents re-running the effect
  // when callers pass an inline array literal (new reference each render).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const excludeKey = useMemo(() => exclude.join('\0'), [exclude.join('\0')]);
  const excludeSet = useMemo(
    () => new Set(exclude),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [excludeKey],
  );

  useEffect(() => {
    loadSchema(component)
      .then(fullSchema => {
        // Show all props except those explicitly excluded.
        const filtered = fullSchema.filter(p => !excludeSet.has(p.name));
        setSchema(filtered);

        const isDev = import.meta.env.DEV;

        // Demo log — shows resolved prop names + types in the browser console.
        if (isDev) {
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
        }
      })
      .catch(err => setError(err.message));
  }, [component, excludeKey, excludeSet]);

  if (error) {
    console.error(`Playground error: ${error}`);
    return (
      <div
        role="alert"
        style={{
          border: '1px solid #f1b0b7',
          borderRadius: '4px',
          padding: '12px',
          margin: '12px 0',
          background: '#fff5f5',
        }}
      >
        <strong>Playground unavailable</strong>
        <div>{error}</div>
      </div>
    );
  }

  if (schema === null) {
    return (
      <div
        aria-live="polite"
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '4px',
          padding: '12px',
          margin: '12px 0',
          background: '#fafafa',
        }}
      >
        Loading {component} playground…
      </div>
    );
  }

  return (
    <section
      aria-label={`${component} playground`}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        padding: '12px',
        margin: '12px 0',
        background: '#fafafa',
      }}
    >
      <strong>{component} playground</strong>
      <div style={{ marginTop: '8px' }}>
        Interactive controls are not yet available. Loaded {schema.length} prop
        {schema.length === 1 ? '' : 's'} for this component.
      </div>
      {schema.length > 0 && (
        <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
          {schema.map(prop => (
            <li key={prop.name}>
              <code>{prop.name}</code>
              {' — '}
              {prop.type}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

Playground.propTypes = {
  component: PropTypes.string.isRequired,
  exclude: PropTypes.arrayOf(PropTypes.string),
};
