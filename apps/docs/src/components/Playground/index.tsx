/**
 * Playground
 *
 * Renders an interactive prop editor for a grommet component.
 *
 * Usage in MDX:
 *   <Playground component="Button" exclude={['as', 'children', 'style']} />
 *
 * Props:
 *   component  - PascalCase component name matching generated/ filename
 *   exclude    - Prop names to hide from controls (e.g. rarely-used or
 *                layout-only props). All other props are shown.
 */

import { useEffect, useMemo, useState } from 'react';
import { Box, Paragraph, Text } from 'grommet';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type PropTypeName = 'boolean' | 'string' | 'number' | 'enum' | 'union';

interface BasePropDescriptor {
  name: string;
  type: PropTypeName;
  description: string;
  defaultValue?: unknown;
  required?: boolean;
}

interface EnumPropDescriptor extends BasePropDescriptor {
  type: 'enum';
  options: string[];
}

interface UnionMember {
  type: Exclude<PropTypeName, 'union'>;
  description?: string;
  options?: string[];
  defaultValue?: unknown;
}

interface UnionPropDescriptor extends BasePropDescriptor {
  type: 'union';
  types: UnionMember[];
}

type PropDescriptor =
  | BasePropDescriptor
  | EnumPropDescriptor
  | UnionPropDescriptor;

interface PlaygroundProps {
  component: string;
  exclude?: string[];
}

/**
 * Dynamically loads the generated schema for a component.
 * Each generated file exports a named `schema` const so the import path
 * can be derived directly from the component name — no switch required.
 */
async function loadSchema(componentName: string): Promise<PropDescriptor[]> {
  // Dynamic import — path must be a static-enough string for bundler
  // analysis. The generated/ directory name is fixed; only the leaf segment
  // (componentName) varies at runtime.
  const mod = await import(
    `@shared/playground-schemas/generated/${componentName}`
  );
  if (!Array.isArray(mod.schema)) {
    throw new Error(
      `Playground: generated/${componentName}.js does not export "schema". ` +
        'Run: pnpm --filter docs build-playground',
    );
  }
  return mod.schema as PropDescriptor[];
}

export function Playground({ component, exclude = [] }: PlaygroundProps) {
  const [schema, setSchema] = useState<PropDescriptor[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Stable Set derived from exclude contents — prevents re-running the effect
  // when callers pass an inline array literal (new reference each render).
  const excludeSet = useMemo(
    () => new Set(exclude),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(exclude)],
  );

  useEffect(() => {
    loadSchema(component)
      .then(fullSchema => {
        const filtered = fullSchema.filter(p => !excludeSet.has(p.name));
        setSchema(filtered);

        // Log resolved props in dev for quick inspection.
        if ((import.meta as { env?: { DEV?: boolean } })?.env?.DEV) {
          console.group(`Playground: ${component}`);
          filtered.forEach(prop => {
            let extra = '';
            if (prop.type === 'enum' && 'options' in prop) {
              extra = ` [${(prop as { options: string[] }).options.join(
                ', ',
              )}]`;
            } else if (prop.type === 'union' && 'types' in prop) {
              extra = ` (${(prop as { types: { type: string }[] }).types
                .map(t => t.type)
                .join(' | ')})`;
            }
            console.log(`  ${prop.name}: ${prop.type}${extra}`);
          });
          console.groupEnd();
        }
      })
      .catch(err => setError((err as Error).message));
  }, [component, excludeSet]);

  if (error) {
    return (
      <Box
        role="alert"
        border={{ color: 'status-critical', size: 'small' }}
        round="xsmall"
        pad="small"
        margin={{ vertical: 'small' }}
        background="status-critical"
      >
        <Text weight="bold">Playground unavailable</Text>
        <Paragraph margin="none">{error}</Paragraph>
      </Box>
    );
  }

  if (schema === null) {
    return (
      <Box
        aria-live="polite"
        border={{ color: 'border', size: 'small' }}
        round="xsmall"
        pad="small"
        margin={{ vertical: 'small' }}
      >
        <Text>Loading {component} playground…</Text>
      </Box>
    );
  }

  return (
    <Box
      aria-label={`${component} playground`}
      as="section"
      border={{ color: 'border', size: 'small' }}
      round="xsmall"
      pad="small"
      margin={{ vertical: 'small' }}
    >
      <Text weight="bold">{component} playground</Text>
      <Paragraph margin={{ top: 'xsmall', bottom: 'none' }}>
        Interactive controls are not yet available. Loaded {schema.length} prop
        {schema.length === 1 ? '' : 's'} for this component.
      </Paragraph>
      {schema.length > 0 && (
        <Box as="ul" margin={{ top: 'xsmall' }} pad={{ left: 'medium' }}>
          {schema.map((prop: PropDescriptor) => (
            <Box as="li" key={prop.name}>
              <Text>
                <Text as="code">{prop.name}</Text>
                {' — '}
                {prop.type}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
