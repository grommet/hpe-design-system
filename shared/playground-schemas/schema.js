// @ts-check

/**
 * @typedef {'boolean'|'string'|'number'|'enum'|'union'} PropTypeName
 */

/**
 * @typedef {object} BasePropDescriptor
 * @property {string} name - Prop name as it appears in JSX.
 * @property {PropTypeName} type - Drives which control is rendered.
 * @property {string} description - Short description shown in the UI.
 * @property {*} [defaultValue] - Shown as a hint in the control.
 * @property {boolean} [required]
 */

/**
 * @typedef {BasePropDescriptor & { type: 'boolean' }} BooleanPropDescriptor
 */

/**
 * @typedef {BasePropDescriptor & { type: 'string' }} StringPropDescriptor
 */

/**
 * @typedef {BasePropDescriptor & { type: 'number' }} NumberPropDescriptor
 */

/**
 * @typedef {BasePropDescriptor & {
 *   type: 'enum',
 *   options: string[]
 * }} EnumPropDescriptor
 */

/**
 * A single member of a union — same shape as a top-level descriptor
 * but without `name` or `description`, and must not itself be 'union'.
 * @typedef {object} UnionMember
 * @property {'boolean'|'string'|'number'|'enum'} type
 * @property {string} [description]
 * @property {string[]} [options] - Required when type is 'enum'.
 * @property {*} [defaultValue]
 */

/**
 * @typedef {BasePropDescriptor & {
 *   type: 'union',
 *   types: UnionMember[]
 * }} UnionPropDescriptor
 */

/**
 * @typedef {BooleanPropDescriptor
 *   | StringPropDescriptor
 *   | NumberPropDescriptor
 *   | EnumPropDescriptor
 *   | UnionPropDescriptor
 * } PropDescriptor
 */

/**
 * Per-prop conf entry controlling Playground visibility.
 * @typedef {{ enabled: boolean }} PropConfEntry
 */

/**
 * Conf object for a component — keys are prop names.
 * @typedef {Record<string, PropConfEntry>} ComponentConf
 */

// Prop type identifiers used in the schema. These map directly to the
// control component that will be rendered in the Playground.
// `as const` via JSDoc ensures values stay as literal types, not `string`.
export const PropTypes = /** @type {const} */ ({
  BOOLEAN: 'boolean',
  STRING: 'string',
  NUMBER: 'number',
  ENUM: 'enum',
  // A prop that accepts more than one type, e.g. string | boolean.
  // The control renders type toggle buttons so the user can switch between
  // input flavors. Entering a value for one type clears the others.
  UNION: 'union',
});

// ---------------------------------------------------------------------------
// Schema shape
// ---------------------------------------------------------------------------
// Each entry in the schema array describes one prop.
//
// All prop descriptors share these fields:
//   name        {string}   - the prop name as it appears in JSX
//   type        {string}   - one of PropTypes.*
//   description {string}   - short human-readable description shown in the UI
//   defaultValue {*}       - optional; shown as a hint in the control
//   required    {boolean}  - optional; defaults to false
//
// Additional fields per type:
//
//   ENUM:
//     options   {Array<string>} - the allowed values
//
//   UNION:
//     types     {Array<PropDescriptor>} - one descriptor per accepted type.
//               Each inner descriptor follows the same shape as a top-level
//               descriptor (minus `name` and `description`) and must not
//               itself be UNION.
//
// ---------------------------------------------------------------------------
// Conf object shape
// ---------------------------------------------------------------------------
// Each component also exports a conf object that controls which props the
// Playground exposes. Any prop not listed (or listed with enabled: false)
// will be hidden from the UI.
//
//   {
//     [propName]: {
//       enabled: boolean,  // whether to show this prop in the Playground
//     }
//   }
//
// This lets teams progressively add Playground coverage without needing to
// expose every prop from day one, and keeps the UI focused on the most
// relevant controls for each component.
// ---------------------------------------------------------------------------

/**
 * Creates a boolean prop descriptor.
 * @param {string} name
 * @param {object} [opts]
 * @param {string} [opts.description]
 * @param {boolean} [opts.defaultValue]
 * @param {boolean} [opts.required]
 * @returns {BooleanPropDescriptor}
 */
export const booleanProp = (name, opts = {}) => ({
  name,
  type: PropTypes.BOOLEAN,
  description: opts.description ?? '',
  defaultValue: opts.defaultValue,
  required: opts.required ?? false,
});

/**
 * Creates a string prop descriptor.
 * @param {string} name
 * @param {object} [opts]
 * @param {string} [opts.description]
 * @param {string} [opts.defaultValue]
 * @param {boolean} [opts.required]
 * @returns {StringPropDescriptor}
 */
export const stringProp = (name, opts = {}) => ({
  name,
  type: PropTypes.STRING,
  description: opts.description ?? '',
  defaultValue: opts.defaultValue,
  required: opts.required ?? false,
});

/**
 * Creates a number prop descriptor.
 * @param {string} name
 * @param {object} [opts]
 * @param {string} [opts.description]
 * @param {number} [opts.defaultValue]
 * @param {boolean} [opts.required]
 * @returns {NumberPropDescriptor}
 */
export const numberProp = (name, opts = {}) => ({
  name,
  type: PropTypes.NUMBER,
  description: opts.description ?? '',
  defaultValue: opts.defaultValue,
  required: opts.required ?? false,
});

/**
 * Creates an enum prop descriptor.
 * @param {string} name
 * @param {string[]} options - the allowed values
 * @param {object} [opts]
 * @param {string} [opts.description]
 * @param {string} [opts.defaultValue]
 * @param {boolean} [opts.required]
 * @returns {EnumPropDescriptor}
 */
export const enumProp = (name, options, opts = {}) => ({
  name,
  type: PropTypes.ENUM,
  options,
  description: opts.description ?? '',
  defaultValue: opts.defaultValue,
  required: opts.required ?? false,
});

/**
 * Creates a union prop descriptor for props that accept more than one type.
 * @param {string} name
 * @param {UnionMember[]} types - one entry per accepted type
 * @param {object} [opts]
 * @param {string} [opts.description]
 * @param {boolean} [opts.required]
 * @returns {UnionPropDescriptor}
 */
export const unionProp = (name, types, opts = {}) => ({
  name,
  type: PropTypes.UNION,
  types,
  description: opts.description ?? '',
  required: opts.required ?? false,
});
