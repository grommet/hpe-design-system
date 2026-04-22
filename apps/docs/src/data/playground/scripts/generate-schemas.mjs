// @ts-check
/**
 * generate-schemas.mjs
 *
 * Reads grommet component index.d.ts files via the TypeScript compiler API
 * and outputs a generated schema file per component into:
 *   src/data/playground/generated/<ComponentName>.js
 *
 * The generated file exports:
 *   - `<componentName>Schema`  — PropDescriptor[] derived from the .d.ts
 *
 * A hand-authored conf file at:
 *   src/data/playground/components/<ComponentName>.js
 * then imports the generated schema and adds the conf object on top.
 *
 * Usage:
 *   node src/data/playground/scripts/generate-schemas.mjs \
 *     [--scaffold] [ComponentName...]
 *
 * Examples:
 *   node src/data/playground/scripts/generate-schemas.mjs
 *     → regenerates all components listed in COMPONENTS
 *   node src/data/playground/scripts/generate-schemas.mjs Button TextInput
 *     → regenerates only Button and TextInput
 *   node src/data/playground/scripts/generate-schemas.mjs --scaffold CheckBox
 *     → regenerates CheckBox schema AND writes a starter
 *       components/CheckBox.js
 *       with all props set to enabled: false (flip to true to show in
 *       Playground)
 */

import ts from 'typescript';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/**
 * @typedef {object} Classification
 * @property {'boolean'|'string'|'number'|'enum'|'union'|'any'|'unknown'} kind
 * @property {string[]} [options]
 * @property {Array<{type: string, options?: string[]}>} [members]
 */

// Resolve grommet's components directory dynamically so the path works
// regardless of the pnpm content-addressable hash in node_modules/.pnpm.
const GROMMET_COMPONENTS = path.dirname(
  path.dirname(require.resolve('grommet/components/Button/index.d.ts')),
);

// Where generated files are written.
const OUT_DIR = path.resolve(__dirname, '../generated');
const CONF_DIR = path.resolve(__dirname, '../components');

// Components to process when no args are given.
const COMPONENTS = ['Button'];

// ---------------------------------------------------------------------------
// Type classification
// ---------------------------------------------------------------------------
// Maps a TypeScript type node to one of our PropTypeName values plus any
// extra data needed (enum options, union members).

/**
 * @param {ts.TypeNode | undefined} typeNode
 * @param {ts.TypeChecker} checker
 * @returns {Classification}
 */
function classifyType(typeNode, checker) {
  if (!typeNode) return { kind: 'unknown' };

  // boolean keyword
  if (typeNode.kind === ts.SyntaxKind.BooleanKeyword) {
    return { kind: 'boolean' };
  }

  // string keyword
  if (typeNode.kind === ts.SyntaxKind.StringKeyword) {
    return { kind: 'string' };
  }

  // number keyword
  if (typeNode.kind === ts.SyntaxKind.NumberKeyword) {
    return { kind: 'number' };
  }

  // string literal  e.g. 'small'
  if (ts.isLiteralTypeNode(typeNode)) {
    if (ts.isStringLiteral(typeNode.literal)) {
      return { kind: 'enum', options: [typeNode.literal.text] };
    }
    if (
      typeNode.literal.kind === ts.SyntaxKind.TrueKeyword ||
      typeNode.literal.kind === ts.SyntaxKind.FalseKeyword
    ) {
      return { kind: 'boolean' };
    }
  }

  // union  e.g. 'small' | 'medium' | boolean
  if (ts.isUnionTypeNode(typeNode)) {
    const stringLiterals = [];
    const kinds = new Set();

    typeNode.types.forEach(member => {
      const c = classifyType(member, checker);
      if (c.kind === 'enum' && c.options) {
        stringLiterals.push(...c.options);
        kinds.add('enum');
      } else if (c.kind !== 'unknown') {
        kinds.add(c.kind);
      }
    });

    // Pure string-literal union → enum
    if (kinds.size === 1 && kinds.has('enum')) {
      return { kind: 'enum', options: stringLiterals };
    }

    // String literals + bare string keyword → enum (string covers the rest)
    if (kinds.size === 2 && kinds.has('enum') && kinds.has('string')) {
      return { kind: 'string' };
    }

    // boolean literals only (true | false) → boolean
    if (kinds.size === 1 && kinds.has('boolean')) {
      return { kind: 'boolean' };
    }

    // Mixed: build union members from the distinct primitive kinds + enums
    /** @type {Array<{type: string, options?: string[]}>} */
    const members = [];
    const seenKinds = new Set();
    typeNode.types
      .map(member => ({ member, c: classifyType(member, checker) }))
      .filter(({ c }) => c.kind !== 'unknown')
      .forEach(({ c }) => {
        if (c.kind === 'enum' && !seenKinds.has('enum')) {
          seenKinds.add('enum');
          // Collect all literals into one enum member
          const allLiterals = typeNode.types
            .map(m => classifyType(m, checker))
            .filter(m => m.kind === 'enum')
            .flatMap(m => m.options ?? []);
          members.push({ type: 'enum', options: allLiterals });
        } else if (c.kind !== 'enum' && !seenKinds.has(c.kind)) {
          seenKinds.add(c.kind);
          members.push({ type: c.kind });
        }
      });

    if (members.length > 1) return { kind: 'union', members };

    // Fell through to a single usable kind
    if (members.length === 1) {
      // Cast: single usable member collapses back to a plain classification
      return /** @type {Classification} */ ({
        ...members[0],
        kind: members[0].type,
      });
    }
  }

  // type reference  e.g. A11yTitleType, FillType — resolve via checker
  if (ts.isTypeReferenceNode(typeNode)) {
    const type = checker.getTypeAtLocation(typeNode);
    const typeStr = checker.typeToString(type);

    // Prop resolved to `any` — can't auto-classify, flag for manual review
    if (typeStr === 'any') return { kind: 'any' };
    if (
      typeStr === 'string' ||
      typeStr === 'A11yTitleType' ||
      typeStr === 'GridAreaType' ||
      typeStr === 'GapType' ||
      // EdgeType / PadType / MarginType are complex objects but we
      // treat them as string (e.g. 'small', 'medium') for the control
      typeStr.startsWith('EdgeType') ||
      typeStr === 'PadType' ||
      typeStr === 'MarginType'
    ) {
      return { kind: 'string' };
    }

    // ColorType = string | { dark, light } — treat as string
    if (typeStr === 'ColorType') return { kind: 'string' };

    if (typeStr === 'boolean') return { kind: 'boolean' };
    if (typeStr === 'number') return { kind: 'number' };

    // AlignSelfType enum
    if (typeStr === 'AlignSelfType') {
      return {
        kind: 'enum',
        options: ['start', 'center', 'end', 'stretch', 'baseline'],
      };
    }

    // FillType = 'horizontal' | 'vertical' | boolean
    if (typeStr === 'FillType') {
      return {
        kind: 'union',
        members: [
          { type: 'boolean' },
          { type: 'enum', options: ['horizontal', 'vertical'] },
        ],
      };
    }

    // HoverIndicatorType = boolean | string | 'background' | ...
    // Treat as union of boolean + string for the control
    if (typeStr === 'HoverIndicatorType') {
      return {
        kind: 'union',
        members: [{ type: 'boolean' }, { type: 'string' }],
      };
    }

    // tip resolves as string | TipProps — drop the object, keep string
    if (typeStr.includes('TipProps')) return { kind: 'string' };

    // PolymorphicType = keyof JSX.IntrinsicElements | React.ComponentType
    // Can't be driven by a simple control
    if (typeStr === 'PolymorphicType') return { kind: 'unknown' };

    // JSX.Element / React.ReactNode — can't render the node itself, but treat
    // the prop as a string so contributors can type a label value.
    // (Pure ReactNode props like `label` are common enough to be useful.)
    if (
      typeStr.includes('ReactNode') ||
      typeStr.includes('ReactElement') ||
      typeStr.includes('JSX.Element') ||
      typeStr.includes('Element')
    ) {
      return { kind: 'string' };
    }

    // Try to expand the type string for string unions
    if (typeStr.includes('|')) {
      const parts = typeStr
        .split('|')
        .map(s => s.trim().replace(/"/g, '').replace(/'/g, ''));
      const stringLiterals = parts.filter(
        p => p !== 'string' && p !== 'boolean' && p !== 'number',
      );
      const hasString = parts.includes('string');
      if (stringLiterals.length > 0 && !hasString) {
        return { kind: 'enum', options: stringLiterals };
      }
      if (hasString) return { kind: 'string' };
    }
  }

  return { kind: 'unknown' };
}

// ---------------------------------------------------------------------------
// Schema extraction
// ---------------------------------------------------------------------------

/**
 * Extracts props from a grommet component's index.d.ts.
 * Returns an array of raw prop data ready to be serialised.
 *
 * @param {string} componentName
 * @returns {Array<{name: string, classification: Classification}>}
 */
function extractProps(componentName) {
  const dtsPath = path.join(GROMMET_COMPONENTS, componentName, 'index.d.ts');
  if (!fs.existsSync(dtsPath)) {
    console.warn(`  ⚠️  No index.d.ts found for ${componentName}`);
    return [];
  }

  const program = ts.createProgram([dtsPath], {
    noEmit: true,
    skipLibCheck: true,
    // point at the ts 5.9 lib
    lib: ['lib.es2020.d.ts'],
  });
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(dtsPath);
  if (!sourceFile) return [];

  /** @type {Map<string, ts.InterfaceDeclaration>} */
  const interfaces = new Map();

  ts.forEachChild(sourceFile, node => {
    if (ts.isInterfaceDeclaration(node)) {
      interfaces.set(node.name.text, node);
    }
  });

  // Prefer the base Props interface (e.g. ButtonProps, CheckBoxProps)
  const propsInterfaceName = `${componentName}Props`;
  const iface = interfaces.get(propsInterfaceName);
  if (!iface) {
    console.warn(`  ⚠️  Interface ${propsInterfaceName} not found`);
    return [];
  }

  /** @type {Array<{name: string, classification: Classification}>} */
  const results = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const member of iface.members) {
    // ts.isPropertySignature is a TS type guard — must use for-of here
    // eslint-disable-next-line no-continue
    if (!ts.isPropertySignature(member) || !member.name) continue;
    const name = member.name.getText(sourceFile);
    // Skip props that can't be driven by a simple control input
    // eslint-disable-next-line no-continue
    if (['children', 'key', 'ref'].includes(name)) continue;
    const classification = classifyType(member.type, checker);
    // eslint-disable-next-line no-continue
    if (classification.kind === 'unknown') continue;
    results.push({ name, classification });
  }

  results.sort((a, b) => a.name.localeCompare(b.name));
  return results;
}

// ---------------------------------------------------------------------------
// Code generation
// ---------------------------------------------------------------------------

/**
 * Serialises a classification object to the corresponding helper call string.
 * @param {string} name
 * @param {Classification} c
 * @returns {string | null}
 */
function toHelperCall(name, c) {
  /** @param {string} s */
  const q = s => `'${s}'`;

  switch (c.kind) {
    case 'boolean':
      return `booleanProp(${q(name)})`;

    case 'string':
      return `stringProp(${q(name)})`;

    case 'number':
      return `numberProp(${q(name)})`;

    case 'enum': {
      const opts = (c.options ?? []).map(q).join(', ');
      return `enumProp(${q(name)}, [${opts}])`;
    }

    case 'union': {
      const members = (c.members ?? []).map(
        /** @param {{type: string, options?: string[]}} m */
        m => {
          if (m.type === 'enum') {
            const opts = (m.options ?? []).map(q).join(', ');
            return `{ type: PropTypes.ENUM, options: [${opts}] }`;
          }
          return `{ type: PropTypes.${m.type.toUpperCase()} }`;
        },
      );
      return `unionProp(${q(name)}, [\n${members
        .map(/** @param {string} m */ m => `    ${m},`)
        .join('\n')}\n  ])`;
    }

    case 'any':
      // Resolved to `any` — type is too complex to auto-classify.
      // Review grommet's index.d.ts and add a manual override in
      // classifyType() or handle it in the component conf file.
      return (
        `null, // TODO: '${name}' resolved to 'any'` + ' — needs manual mapping'
      );

    default:
      return null;
  }
}

/**
 * Generates the content of a schema file for one component.
 * @param {string} componentName
 * @param {Array<{name: string, classification: Classification}>} props
 * @returns {string}
 */
function generateFile(componentName, props) {
  const varName =
    componentName.charAt(0).toLowerCase() + componentName.slice(1);

  const calls = props
    .map(({ name, classification }) => {
      const call = toHelperCall(name, classification);
      // `any` props emit a TODO comment line; unknown/null are dropped
      if (call && call.startsWith('null,')) {
        return `  // TODO: ${call.slice(call.indexOf('TODO:') + 6)}`;
      }
      return call ? `  ${call},` : null;
    })
    .filter(Boolean);

  // Only emit imports that are actually referenced in the generated calls.
  const body = calls.join('\n');
  const allHelpers = [
    'booleanProp',
    'enumProp',
    'numberProp',
    'stringProp',
    'unionProp',
  ];
  const usedHelpers = allHelpers.filter(h => body.includes(h));
  const needsPropTypes = body.includes('PropTypes.');
  const importNames = [
    ...usedHelpers,
    ...(needsPropTypes ? ['PropTypes'] : []),
  ];
  const importBlock = importNames.length
    ? `import {\n  ${importNames.join(',\n  ')},\n} from '../schema';\n`
    : '';

  return `// @ts-check
// ⚠️  AUTO-GENERATED — do not edit by hand.
// Re-run: node src/data/playground/scripts/generate-schemas.mjs \\
//   ${componentName}
/** @typedef {import('../schema').PropDescriptor} PropDescriptor */

${importBlock}
// Derived from grommet ${componentName}Props (index.d.ts).
// Use the conf object in components/${componentName}.js to
// enable/disable individual props for the Playground.

/** @type {PropDescriptor[]} */
export const ${varName}Schema = [
${calls.join('\n')}
];
`;
}

/**
 * Generates the content of a starter conf file for one component.
 * All props are set to `enabled: false` — contributors flip the ones they
 * want to expose in the Playground to `true`.
 * @param {string} componentName
 * @param {Array<{name: string, classification: Classification}>} props
 * @returns {string}
 */
function generateConfFile(componentName, props) {
  const varName =
    componentName.charAt(0).toLowerCase() + componentName.slice(1);

  const entries = props
    .map(({ name }) => `  ${name}: { enabled: false },`)
    .join('\n');

  return `// @ts-check
/** @typedef {import('../schema').ComponentConf} ComponentConf */

export { ${varName}Schema } from '../generated/${componentName}';

// Scaffold generated — flip props to \`enabled: true\` to show in Playground.
/** @type {ComponentConf} */
export const ${varName}Conf = {
${entries}
};
`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

const scaffold = process.argv.includes('--scaffold');
const targets = process.argv.slice(2).filter(a => a !== '--scaffold').length
  ? process.argv.slice(2).filter(a => a !== '--scaffold')
  : COMPONENTS;

if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
if (scaffold && !fs.existsSync(CONF_DIR))
  fs.mkdirSync(CONF_DIR, { recursive: true });

// eslint-disable-next-line no-restricted-syntax
for (const name of targets) {
  console.log(`Processing ${name}...`);
  const props = extractProps(name);
  if (!props.length) {
    console.log('  Skipped (no props extracted).');
    // eslint-disable-next-line no-continue
    continue;
  }

  // Always regenerate the generated/ schema.
  const content = generateFile(name, props);
  const outPath = path.join(OUT_DIR, `${name}.js`);
  fs.writeFileSync(outPath, content, 'utf8');
  console.log(`  ✅  Written → ${path.relative(process.cwd(), outPath)}`);

  // Optionally scaffold a components/ conf file (never overwrites existing).
  if (scaffold) {
    const confPath = path.join(CONF_DIR, `${name}.js`);
    if (fs.existsSync(confPath)) {
      const rel = path.relative(process.cwd(), confPath);
      console.log(`  ⚠️   Skipped scaffold — ${rel} already exists`);
    } else {
      const confContent = generateConfFile(name, props);
      fs.writeFileSync(confPath, confContent, 'utf8');
      const rel = path.relative(process.cwd(), confPath);
      console.log(`  🏗️   Scaffold written → ${rel}`);
    }
  }
}
