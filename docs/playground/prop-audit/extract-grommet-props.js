#!/usr/bin/env node
/**
 * extract-grommet-props.js
 *
 * Fetches each component page from v2.grommet.io and parses the Props section
 * to produce a CSV with 14 columns per prop row (including normalizedPropType).
 *
 * Usage:
 *   node prop-audit/extract-grommet-props.js
 *
 * Output:
 *   prop-audit/grommet-props.csv
 */

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// PropType normalisation
// ---------------------------------------------------------------------------

// Props that are free-form strings despite having an enumValues entry.
// The docs provide a descriptive example rather than a true fixed value set.
const FREE_FORM_STRING_PROPS = new Set([
  'gridArea', 'className', 'id', 'lang', 'style',
]);

const JS_TYPES = new Set([
  'string', 'number', 'boolean', 'object', 'array',
  'function', 'node', 'element', 'ReactNode', 'any',
]);

const GROMMET_ALIAS_TYPES = new Set([
  'BackgroundType', 'BorderType', 'ColorType', 'EdgeType',
  'MarginType', 'PadType', 'SizeType',
]);

function normalizeType(raw, enumValues, propName) {
  if (!raw || raw.trim() === '') return '';

  const t = raw.trim();

  if (t === 'boolean')  return 'boolean';
  if (t === 'string')   return 'string';
  if (t === 'number')   return 'number';
  if (t === 'array')    return 'array';
  if (t === 'object')   return 'object';
  if (t === 'function') return 'function';
  if (t === 'node' || t === 'ReactNode') return 'ReactNode';
  if (t === 'element') return 'element';
  if (t === 'BoxProps') return 'object';

  // Array shorthand — covers both string[] and array[number] forms
  if (t.endsWith('[]') || t.startsWith('array[')) return 'array';

  // Grommet aliases
  if (GROMMET_ALIAS_TYPES.has(t) || t.endsWith('Type')) return 'object';

  // Function signatures
  if (t.includes('=>')) return 'function';

  // Pipe-separated unions
  if (t.includes('|')) {
    const tokens = t.split('|').map(s => s.trim());
    const hasJSType = tokens.some(tok =>
      JS_TYPES.has(tok) ||
      GROMMET_ALIAS_TYPES.has(tok) ||
      tok.endsWith('Type') ||
      tok.endsWith('[]')
    );
    if (hasJSType) return 'union';
    const allPlainWords = tokens.every(tok =>
      /^[a-zA-Z0-9_\-]+$/.test(tok.replace(/^"|"$/g, ''))
    );
    if (allPlainWords) return 'enum';
    return 'union';
  }

  return 'unknown';
}

// Applies base normalisation then promotes string → enum when the prop has
// specific documented literals in enumValues.
function deriveNormalizedType(propType, enumValues, propName) {
  const base = normalizeType(propType, enumValues, propName);

  // Enum promotion: propType resolved to 'string' but has specific literal examples
  if (
    base === 'string' &&
    enumValues &&
    enumValues.trim() !== '' &&
    !enumValues.includes('"string"') &&
    !FREE_FORM_STRING_PROPS.has(propName)
  ) {
    return 'enum';
  }

  return base;
}

// ---------------------------------------------------------------------------
// Component list — 61 components in five categories
// ---------------------------------------------------------------------------
const COMPONENTS = [
  // Layout
  { name: 'Box',        category: 'Layout' },
  { name: 'Card',       category: 'Layout' },
  { name: 'Footer',     category: 'Layout' },
  { name: 'Grid',       category: 'Layout' },
  { name: 'Header',     category: 'Layout' },
  { name: 'Layer',      category: 'Layout' },
  { name: 'Main',       category: 'Layout' },
  { name: 'Page',       category: 'Layout' },
  { name: 'PageHeader', category: 'Layout' },
  { name: 'Sidebar',    category: 'Layout' },
  { name: 'Stack',      category: 'Layout' },

  // Type
  { name: 'Heading',   category: 'Type' },
  { name: 'Markdown',  category: 'Type' },
  { name: 'Paragraph', category: 'Type' },
  { name: 'Text',      category: 'Type' },
  { name: 'Tag',       category: 'Type' },

  // Controls
  { name: 'Accordion',   category: 'Controls' },
  { name: 'Anchor',      category: 'Controls' },
  { name: 'Button',      category: 'Controls' },
  { name: 'Drop',        category: 'Controls' },
  { name: 'DropButton',  category: 'Controls' },
  { name: 'Menu',        category: 'Controls' },
  { name: 'Nav',         category: 'Controls' },
  { name: 'Tabs',        category: 'Controls' },
  { name: 'Tip',         category: 'Controls' },
  { name: 'ToggleGroup', category: 'Controls' },

  // Input
  { name: 'CheckBox',          category: 'Input' },
  { name: 'CheckBoxGroup',     category: 'Input' },
  { name: 'DateInput',         category: 'Input' },
  { name: 'FileInput',         category: 'Input' },
  { name: 'MaskedInput',       category: 'Input' },
  { name: 'RadioButton',       category: 'Input' },
  { name: 'RadioButtonGroup',  category: 'Input' },
  { name: 'RangeInput',        category: 'Input' },
  { name: 'RangeSelector',     category: 'Input' },
  { name: 'Select',            category: 'Input' },
  { name: 'SelectMultiple',    category: 'Input' },
  { name: 'StarRating',        category: 'Input' },
  { name: 'TextArea',          category: 'Input' },
  { name: 'TextInput',         category: 'Input' },
  { name: 'ThumbsRating',      category: 'Input' },
  { name: 'FormField',         category: 'Input' },
  { name: 'Form',              category: 'Input' },

  // Visualizations
  { name: 'Avatar',         category: 'Visualizations' },
  { name: 'Calendar',       category: 'Visualizations' },
  { name: 'Cards',          category: 'Visualizations' },
  { name: 'Chart',          category: 'Visualizations' },
  { name: 'Clock',          category: 'Visualizations' },
  { name: 'DataChart',      category: 'Visualizations' },
  { name: 'DataTable',      category: 'Visualizations' },
  { name: 'Diagram',        category: 'Visualizations' },
  { name: 'Distribution',   category: 'Visualizations' },
  { name: 'List',           category: 'Visualizations' },
  { name: 'Meter',          category: 'Visualizations' },
  { name: 'NameValueList',  category: 'Visualizations' },
  { name: 'Notification',   category: 'Visualizations' },
  { name: 'Skeleton',       category: 'Visualizations' },
  { name: 'Pagination',     category: 'Visualizations' },
  { name: 'Spinner',        category: 'Visualizations' },
  { name: 'Table',          category: 'Visualizations' },
  { name: 'WorldMap',       category: 'Visualizations' },
];

// ---------------------------------------------------------------------------
// Hard-coded conditional relationships (documented or obvious from types)
// ---------------------------------------------------------------------------
const CONDITIONAL_RELATIONSHIPS = {
  Button:       { target: 'requires href', rel: 'requires href', download: 'requires href' },
  Anchor:       { target: 'requires href', rel: 'requires href', download: 'requires href' },
  FormField:    { htmlFor: 'pairs with Form id', name: 'used by Form for value tracking' },
  Form:         { value: 'controlled via onChange', errors: 'corresponds to FormField name' },
  Drop:         { target: 'requires target element ref', align: 'relative to target element' },
  DropButton:   { dropContent: 'shown when open', dropProps: 'passed to underlying Drop' },
  Select:       { labelKey: 'used with options objects', valueKey: 'used with options objects',
                  children: 'overrides labelKey/valueKey rendering' },
  SelectMultiple: { labelKey: 'used with options objects', valueKey: 'used with options objects' },
  DataTable:    { columns: 'defines column structure', groupBy: 'requires columns with key' },
  Grid:         { columns: 'paired with rows for explicit layout', areas: 'requires columns+rows' },
  Tabs:         { activeIndex: 'controlled: requires onActive', onActive: 'paired with activeIndex' },
  Calendar:     { range: 'enables date range selection', onSelect: 'returns range when range=true' },
  CheckBoxGroup:{ value: 'controlled: requires onChange' },
  RadioButtonGroup: { value: 'controlled: requires onChange' },
  RangeSelector:{ values: 'controlled: requires onChange' },
  MaskedInput:  { mask: 'defines input pattern', suggestions: 'shown as user types' },
  Layer:        { onEsc: 'fired when Esc key pressed inside Layer', onClickOutside: 'fired on outside click' },
  InfiniteScroll: { onMore: 'called when more items needed', replace: 'requires step' },
  Accordion:    { activeIndex: 'controlled: requires onActive', onActive: 'paired with activeIndex' },
  // Visualizations
  Chart:        { values: 'required — defines data points', type: 'affects shape of values array' },
  DataChart:    { data: 'required — paired with series', series: 'required — paired with data' },
  DataTable:    { columns: 'defines column structure', groupBy: 'requires columns with key',
                  primaryKey: 'identifies unique rows', sortable: 'requires columns' },
  Diagram:      { connections: 'requires Stack parent with id-bearing children' },
  List:         { primaryKey: 'identifies unique items', onClickItem: 'fires with item object' },
  Meter:        { values: 'multi-bar mode; conflicts with value', value: 'single-bar mode; conflicts with values' },
  NameValueList:{ nameProps: 'paired with valueProps layout', valueProps: 'paired with nameProps layout' },
  Pagination:   { page: 'controlled: requires onChange', onChange: 'paired with page' },
  Table:        { children: 'expects TableHeader/TableBody/TableFooter children' },
};

// ---------------------------------------------------------------------------
// Child support notes per component
// ---------------------------------------------------------------------------
const CHILD_SUPPORT = {
  Accordion:    'AccordionPanel children',
  Tabs:         'Tab children',
  Form:         'FormField children',
  Card:         'CardBody, CardHeader, CardFooter children',
  Box:          'any React children; supports Layout primitives',
  Grid:         'children placed into grid areas',
  Stack:        'layered children — first child is the guiding layer',
  Layer:        'any React children rendered in a portal',
  Select:       'children render function for custom option rendering',
  SelectMultiple: 'children render function for custom option rendering',
  Menu:         'items array defines child actions',
  DropButton:   'dropContent prop renders child content in Drop',
  Nav:          'Anchor or Button children for navigation',
  // Visualizations
  Calendar:     'children render prop for custom day cell rendering',
  Cards:        'Card children',
  DataTable:    'columns array defines structure; supports groupBy and InfiniteScroll body prop',
  Diagram:      'requires Stack parent; children must have id props referenced by connections',
  List:         'children render function for fully custom item rendering',
  Table:        'TableHeader, TableBody, TableFooter children; each contains TableRow > TableCell',
};

// ---------------------------------------------------------------------------
// Element prop examples — props typed as `element` and the component they expect
// ---------------------------------------------------------------------------
const ELEMENT_PROP_EXAMPLES = {
  icon:        'icon={<Add />}',
  removeIcon:  'removeIcon={<Close />}',
  actions:     'actions={<Button label="Edit" />}',
  parent:      'parent={<Anchor label="Back" />}',
  dropContent: 'dropContent={<Box pad="small">...</Box>}',
};

// ---------------------------------------------------------------------------
// propCategory classification
// ---------------------------------------------------------------------------
const EVENT_RE     = /^on[A-Z]|^handle[A-Z]/;
const STATE_RE     = /^(disabled|active|busy|success|open|checked|selected|loading|error|valid|invalid|readOnly|read_only|multiple|indeterminate|reverse|plain|primary|secondary|fill|focusIndicator|focus)$/i;
const CONTENT_RE   = /^(children|label|icon|badge|placeholder|title|message|tip|content|summary|description|name|value|caption|header|footer|images?|src|alt|options|data|items|columns|rows|series|keys)$/i;
const LAYOUT_RE    = /^(margin|pad|gap|width|height|align|alignSelf|justify|justifyContent|fill|flex|direction|gridArea|basis|overflow|wrap|size|responsive|level|textAlign|weight|color|background|border|round|elevation|animation|skeleton|tag|as|style|className)$/i;
const A11Y_RE      = /^(a11yTitle|aria|tabIndex|role|htmlFor|id|lang|focusable)$/i;

function classifyProp(propName) {
  if (EVENT_RE.test(propName))   return 'event';
  if (A11Y_RE.test(propName))    return 'accessibility';
  if (STATE_RE.test(propName))   return 'state';
  if (LAYOUT_RE.test(propName))  return 'layout';
  if (CONTENT_RE.test(propName)) return 'content';
  return 'behavior';
}

// ---------------------------------------------------------------------------
// HTTP fetch with simple retry
// ---------------------------------------------------------------------------
async function fetchPage(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'grommet-prop-extractor/1.0 (design-system research)',
          'Accept': 'text/html',
        },
        timeout: 30000,
      });
      if (!res.ok) {
        console.warn(`  [${res.status}] ${url}`);
        return null;
      }
      return await res.text();
    } catch (err) {
      if (attempt === retries) {
        console.error(`  FAILED after ${retries} attempts: ${url} — ${err.message}`);
        return null;
      }
      await sleep(1000 * attempt);
    }
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Parse the Props section from a component page's HTML
//
// DOM structure (Gatsby SSR at v2.grommet.io):
//
//   <div>  ← Props h2 container
//     <h2>Props</h2>
//   </div>
//   <div id="propName"> ← one per prop, sibling of Props container
//     <div>  ← header row: contains h3 + link icon
//       <h3>propName</h3>
//     </div>
//     <div><span>description text</span></div>   ← top-level description
//     <div class="...edxWBb">  ← one per type variant
//       <div>
//         <code>typeName</code>
//         <div><span>per-type description</span></div>
//       </div>
//       <div>  ← examples column
//         <pre>exampleValue</pre>
//         ...
//       </div>
//     </div>
//     ...additional type variant blocks...
//   </div>
//   <div> ← "Theme" h2 container — marks end of Props section
//     <h2>Theme</h2>
//   </div>
// ---------------------------------------------------------------------------
function parseProps(html, componentName, componentCategory) {
  const $ = cheerio.load(html);
  const rows = [];

  // Find the "Props" h2 and get its container div
  let propsContainer = null;
  $('h2').each((_, el) => {
    if ($(el).text().trim() === 'Props') {
      propsContainer = $(el).parent();
      return false;
    }
  });

  if (!propsContainer) {
    console.warn(`  No "Props" section found for ${componentName}`);
    return rows;
  }

  // Retrieve conditional relationships and child support for this component
  const condRelMap = CONDITIONAL_RELATIONSHIPS[componentName] || {};
  const childNote  = CHILD_SUPPORT[componentName] || '';

  // Walk siblings of propsContainer — each [id] div = one prop
  // Stop when we hit a sibling that contains an h2 (Theme / React/DOM Properties)
  propsContainer.nextAll().each((_, propEl) => {
    const $prop = $(propEl);

    // Stop at section boundary (div containing h2 = Theme or React/DOM Properties)
    if ($prop.find('h2').length > 0) return false;

    // Prop name from the id attribute or inner h3
    const propName = $prop.attr('id') || $prop.find('h3').first().text().trim();
    if (!propName) return; // skip non-prop divs

    // ---- Description: text of the first <span> that sits directly after the header row
    //      (outside any type-variant .edxWBb divs)
    let description = '';
    // The description span is inside a plain <div><span> (not inside a type-variant block)
    // Strategy: look for direct child divs that are NOT the header row and NOT a type block,
    // and read the span text from those.
    $prop.children('div').each((_, child) => {
      if (description) return; // already found
      const $child = $(child);
      // Skip the header row (contains h3) and type-variant blocks
      if ($child.find('h3').length > 0) return;
      // Type-variant blocks contain a nested <code> element
      if ($child.find('code').length > 0) return;
      // Gap spacers are empty — skip
      const text = $child.find('span').first().text().trim();
      if (text && text.length > 5) {
        description = text.replace(/\s+/g, ' ');
      }
    });

    // ---- Collect type variants — each type block has a <code> in its first child
    const types = [];
    const enumSet = new Set();
    const preExamples = []; // all pre values in this prop

    // Type variant blocks are child divs that contain a <code> element
    $prop.find('code').each((_, codeEl) => {
      const typeText = $(codeEl).text().trim();
      if (typeText && !types.includes(typeText)) {
        types.push(typeText);
      }
    });

    // Collect all <pre> values (examples and enum literals)
    $prop.find('pre').each((_, preEl) => {
      const val = $(preEl).text().trim();
      if (val) preExamples.push(val);
    });

    // Enum values: short pre examples (≤40 chars, no leading { or [)
    for (const val of preExamples) {
      if (val.length <= 40 && !val.startsWith('{') && !val.startsWith('[') && !val.includes('\n')) {
        enumSet.add(val);
      }
    }

    // Object example: first pre that looks like an object or multi-line block
    let objectExample = '';
    for (const val of preExamples) {
      if (val.includes('{') || val.includes('\n') || val.length > 40) {
        objectExample = val.replace(/\s+/g, ' ');
        if (objectExample.length > 300) objectExample = objectExample.slice(0, 300) + '...';
        break;
      }
    }

    const propType = types.join(' | ') || 'unknown';
    const typeTokens = types.map(t => t.toLowerCase());

    // ---- acceptsObject / acceptsNode ----
    const acceptsObject = typeTokens.includes('object') ? 'true' : 'false';
    const nodeNames = ['children', 'label', 'icon', 'content', 'header', 'footer',
                       'dropContent', 'tip', 'summary', 'description', 'render', 'emptyIndicator'];
    const acceptsNode = (
      typeTokens.includes('node') ||
      typeTokens.includes('element') ||
      nodeNames.includes(propName)
    ) ? 'true' : 'false';

    // ---- enumValues (string/number literals from pre examples) ----
    const enumValues = [...enumSet].join(' | ');

    // ---- documentedValues — same source as enumValues ----
    const documentedValues = enumValues;

    // ---- defaultValue — check for "default:" pattern in all text ----
    let defaultValue = '';
    const allText = $prop.text();
    const defaultMatch = allText.match(/default[:\s]+([^\n.]{1,80})/i);
    if (defaultMatch) {
      defaultValue = defaultMatch[1].trim().replace(/\s+/g, ' ');
    }

    // ---- propCategory ----
    const propCategory = classifyProp(propName);

    // ---- conditionalRelationship ----
    const conditionalRelationship = condRelMap[propName] || '';

    // ---- childSupport (attached to children prop, or element props with known examples) ----
    const rowChildSupport = propName === 'children'
      ? childNote
      : (ELEMENT_PROP_EXAMPLES[propName] || '');

    const normalizedPropType = deriveNormalizedType(propType, enumValues, propName);

    rows.push({
      component: componentName,
      componentCategory,
      prop: propName,
      propType,
      normalizedPropType,
      propCategory,
      defaultValue,
      acceptsObject,
      objectExample,
      acceptsNode,
      enumValues,
      documentedValues,
      description,
      conditionalRelationship,
      childSupport: rowChildSupport,
    });
  });

  return rows;
}

// ---------------------------------------------------------------------------
// CSV utilities
// ---------------------------------------------------------------------------
const CSV_COLUMNS = [
  'component', 'componentCategory', 'prop', 'propType', 'normalizedPropType', 'propCategory', 'defaultValue',
  'acceptsObject', 'objectExample', 'acceptsNode', 'enumValues',
  'documentedValues', 'description', 'conditionalRelationship', 'childSupport',
];

function csvEscape(value) {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // If contains comma, newline, or double-quote — wrap in double-quotes and escape internal quotes
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function rowToCSV(row) {
  return CSV_COLUMNS.map(col => csvEscape(row[col])).join(',');
}

// ---------------------------------------------------------------------------
// Components whose docs have no Props section — handled with fallback logic
// ---------------------------------------------------------------------------

// These components extend Box with no additional props of their own.
// We emit a single marker row per component so they appear in the CSV.
const BOX_WRAPPERS = new Set(['Card', 'Footer', 'Main', 'Nav']);

// These extend RadioButtonGroup (minus `options`).
// After fetching RadioButtonGroup, we derive rows for these.
const RBG_ALIASES = new Set(['StarRating', 'ThumbsRating']);

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  const allRows = [];
  const BASE_URL = 'https://v2.grommet.io';
  const DELAY_MS = 300;

  // ---------------------------------------------------------------------------
  // CLI args: --category <CategoryName> filters which components to process
  // ---------------------------------------------------------------------------
  const args = process.argv.slice(2);
  const categoryArg = args.indexOf('--category');
  const filterCategory = categoryArg !== -1 ? args[categoryArg + 1] : null;

  const componentList = filterCategory
    ? COMPONENTS.filter(c => c.category === filterCategory)
    : COMPONENTS;

  if (filterCategory) {
    console.log(`Filtering to category: ${filterCategory} (${componentList.length} components)\n`);
  }
  console.log(`Extracting props for ${componentList.length} components...\n`);

  // Track RadioButtonGroup rows for later derivation
  let rbgRows = [];

  for (const { name, category } of componentList) {
    const url = `${BASE_URL}/${name.toLowerCase()}`;
    process.stdout.write(`Fetching ${name} (${category}) ... `);

    // ---- Box wrappers — no Props page section; emit a single marker row ----
    if (BOX_WRAPPERS.has(name)) {
      const markerRow = {
        component: name,
        componentCategory: category,
        prop: '(extends Box)',
        propType: 'BoxProps',
        normalizedPropType: 'object',
        propCategory: 'layout',
        defaultValue: '',
        acceptsObject: 'false',
        objectExample: '',
        acceptsNode: 'true',
        enumValues: '',
        documentedValues: '',
        description: `${name} accepts all Box props. See Box component for full prop list.`,
        conditionalRelationship: '',
        childSupport: CHILD_SUPPORT[name] || '',
      };
      console.log('Box wrapper — marker row added');
      allRows.push(markerRow);
      await sleep(DELAY_MS);
      continue;
    }

    // ---- RadioButtonGroup aliases — defer until rbgRows are populated ----
    if (RBG_ALIASES.has(name)) {
      console.log('(deferred — derived from RadioButtonGroup)');
      continue;
    }

    const html = await fetchPage(url);
    if (!html) {
      console.log('SKIPPED (no response)');
      await sleep(DELAY_MS);
      continue;
    }

    const rows = parseProps(html, name, category);
    console.log(`${rows.length} props`);

    if (name === 'RadioButtonGroup') {
      rbgRows = rows;
    }

    allRows.push(...rows);
    await sleep(DELAY_MS);
  }

  // ---- Derive StarRating / ThumbsRating rows from RadioButtonGroup --------
  if (rbgRows.length > 0) {
    for (const alias of RBG_ALIASES) {
      const derived = rbgRows
        .filter(r => r.prop !== 'options') // options is omitted per TypeScript definition
        .map(r => ({ ...r, component: alias }));
      console.log(`Derived ${derived.length} props for ${alias} (from RadioButtonGroup - options)`);
      allRows.push(...derived);
    }
  } else {
    console.warn('RadioButtonGroup rows not found — StarRating/ThumbsRating rows skipped');
  }

  // Build CSV
  const header = CSV_COLUMNS.join(',');
  const lines  = [header, ...allRows.map(rowToCSV)];
  const csv    = lines.join('\n');

  const outputArg = args.indexOf('--output');
  const outFile   = outputArg !== -1 ? args[outputArg + 1] : 'grommet-props.csv';
  const outPath   = path.join(__dirname, outFile);

  fs.writeFileSync(outPath, csv, 'utf8');

  console.log(`\n✓ Written ${allRows.length} rows to ${outPath}`);
  console.log('\nComponent summary:');
  const counts = {};
  for (const row of allRows) counts[row.component] = (counts[row.component] || 0) + 1;
  for (const [comp, count] of Object.entries(counts)) {
    console.log(`  ${comp.padEnd(20)} ${count} props`);
  }
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
