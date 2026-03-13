export interface DesignToken {
  $value: string | number;
  $type: 'color' | 'dimension' | 'fontFamily' | 'fontWeight' | 'number';
  $description?: string;
}

export interface DesignTokens {
  [key: string]: DesignToken | DesignTokens;
}

export interface ComponentProp {
  name: string;
  type: string;
  required: boolean;
  description: string;
  defaultValue?: string | number | boolean;
}

export interface ComponentExample {
  description: string;
  code: string;
  /** Path to a .tsx file containing the code snippet (relative to repo root). Resolved to `code` at build time. */
  codeFile?: string;
}

export interface AnatomyPart {
  label: string;
  region: string;
  purpose: string;
  availability: 'required' | 'optional';
  notes?: string;
}

export interface ComponentBehaviors {
  /** States driven by user interaction: rest, hover, focus, active, drag */
  interactiveStates?: string[];
  /** States driven by application logic: disabled, error, readonly, selected, indeterminate, pinned */
  applicationStates?: string[];
  /** States driven by data: loading, empty, "missing-values", "has-value", error */
  dataStates?: string[];
  /** Space and layout behaviors: responsive, overflow, truncation */
  realEstate?: string[];
  /** Motion — token path references only, no raw values */
  animation?: { references: string[] };
}

export interface KeyboardInteraction {
  key: string;
  action: string;
}

export interface AriaAttribute {
  attribute: string;
  value: string;
  /** Free-form description of when this attribute applies, e.g. "always", "when menu is open" */
  condition: string;
}

export interface Announcement {
  trigger: string;
  message: string;
}

export interface WcagCriterion {
  /** e.g. "1.4.3 Contrast (Minimum)" */
  criterion: string;
  status: 'pass' | 'fail' | 'conditional';
}

export interface ComponentAccessibility {
  keyboard?: KeyboardInteraction[];
  aria?: AriaAttribute[];
  announcements?: Announcement[];
  wcag?: WcagCriterion[];
}

export interface ComponentVariant {
  /** Short identifier, e.g. "primary", "icon-only" */
  name: string;
  /** What it looks or behaves like */
  description: string;
  /** The UX scenario or problem this variant solves */
  when: string;
  /** Optional illustrative code snippet */
  example?: string;
}

/**
 * Supported framework targets for component implementations.
 * The build resolves the correct implementation before writing consumer output.
 */
export type FrameworkTarget =
  | 'react'
  | 'vue'
  | 'angular'
  | 'web-components'
  | 'agnostic';

/**
 * Framework-specific override values for a single component.
 * Only fields that differ from the component's defaults need to be specified.
 */
export interface ComponentImplementation {
  /** Package name to import the component from in this framework (e.g. "@hpe/vue-components") */
  importPath: string;
  /**
   * Per-prop type string overrides for this framework.
   * Key = prop name, value = framework-specific type string.
   * e.g. { "label": "string | VNode" } for Vue, { "label": "string | TemplateRef" } for Angular.
   * Prop types not listed here fall back to the top-level props[].type value.
   */
  propTypeOverrides?: Record<string, string>;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  /**
   * Default import path, used when no framework-specific implementation is defined.
   * For React components this is the component library package (e.g. "grommet").
   */
  importPath: string;
  /**
   * Primary framework this component targets. Defaults to "react" when absent.
   * Used by the build to select the correct implementation entry.
   */
  framework?: FrameworkTarget;
  /**
   * Framework-specific overrides for importPath and prop type strings.
   * Present only when the component has been adapted for multiple frameworks.
   * The build resolves the correct entry per consumer before writing output —
   * agents and consuming apps always receive a flat, single-framework definition.
   */
  implementations?: Partial<Record<FrameworkTarget, ComponentImplementation>>;
  // Generated from props during build; do not author in source JSON
  tsInterface?: string;
  props: ComponentProp[]; // Structured for programmatic access if needed
  usage: {
    /** Scenario-driven guidance: when and where to reach for this component */
    whenToUse: string[];
    /** Counter-indications: when NOT to use, and what to use instead */
    whenToAvoid: string[];
  };
  variants?: ComponentVariant[];
  examples: ComponentExample[];
  anatomy?: AnatomyPart[];
  behaviors?: ComponentBehaviors;
  accessibility?: ComponentAccessibility;
  relatedComponents?: string[];
}

/**
 * A single prop value on a PatternNode.
 * - string  — token reference (e.g. "background-front", "medium") or attribute (e.g. "aside")
 * - number  — numeric prop (e.g. line-height multiplier)
 * - boolean — flag prop (e.g. plain: true)
 * - string[] — ordered list (e.g. Grid columns: ["auto","flex","auto"])
 * - Record  — structured object (e.g. responsive areas map, pad shorthand)
 */
export type PatternPropValue =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>;

/**
 * How a PatternNode's presence or content is determined.
 * - static  — always rendered with fixed prop values
 * - context — conditionally rendered or modified by ResponsiveContext (breakpoint)
 * - state   — conditionally rendered by component state (e.g. context pane visibility)
 * - slot    — placeholder for content injected by the consumer via a children prop
 */
export type PatternNodeBinding = 'static' | 'context' | 'state' | 'slot';

/**
 * A single component instance within a pattern's adjacency list.
 * Represents one node in the flat `PatternGraph.nodes` array.
 */
export interface PatternNode {
  /** Unique ID within this pattern's graph (not a ComponentDefinition.id). */
  id: string;
  /** References a ComponentDefinition.id in the design system. */
  componentId: string;
  /** Human-readable role within the pattern (e.g. "nav sidebar", "brand button"). */
  role?: string;
  /**
   * Prop values for this node instance, keyed by prop name.
   * Omit runtime-computed or function props — those remain in `templateCode` only.
   */
  props: Record<string, PatternPropValue>;
  /** IDs of direct child PatternNodes in the adjacency list. */
  children: string[];
  /** How this node's presence or content is determined. Defaults to "static". */
  binding?: PatternNodeBinding;
  /** Implementation notes specific to this node's usage in the pattern. */
  notes?: string;
}

/**
 * Adjacency list representation of a pattern's component tree.
 * Coexists with `templateCode` — both representations are always present
 * when a graph is defined. The graph is the agent-traversable counterpart
 * to the human-readable templateCode.
 */
export interface PatternGraph {
  /** ID of the root PatternNode (entry point for DFS traversal). */
  rootId: string;
  /** Flat list of all nodes; children arrays form the directed acyclic graph. */
  nodes: PatternNode[];
}

export interface PatternDefinition {
  id: string;
  name: string;
  /** Alternative names or shorthand phrases (e.g. "app shell" for "Application Shell"). Used by the context generator for keyword matching. */
  aliases?: string[];
  description: string;
  problem: string;
  solution: string;
  relatedComponents: string[]; // IDs of components
  /** IDs of other patterns that compose with or are recommended alongside this one. */
  relatedPatterns?: string[];
  usage?: {
    whenToUse: string[];
    whenToAvoid: string[];
  };
  templateCode?: string;
  /** Path to a .tsx file for the template (relative to repo root). Resolved to `templateCode` at build time. */
  templateCodeFile?: string;
  examples?: ComponentExample[];
  /**
   * Structured adjacency list of the pattern's component tree.
   * Additive alongside `templateCode` — never replaces it.
   * When present, the context generator emits human-readable composition
   * sentences ("X contains Y and Z") that score higher on semantic queries.
   */
  graph?: PatternGraph;
}

export interface DesignSystemSchema {
  tokens: DesignTokens;
  components: ComponentDefinition[];
  patterns: PatternDefinition[];
}
