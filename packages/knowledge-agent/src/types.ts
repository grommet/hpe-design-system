// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
  interactiveStates?: string[];
  applicationStates?: string[];
  dataStates?: string[];
  realEstate?: string[];
  animation?: { references: string[] };
}

export interface KeyboardInteraction {
  key: string;
  action: string;
}

export interface AriaAttribute {
  attribute: string;
  value: string;
  condition: string;
}

export interface Announcement {
  trigger: string;
  message: string;
}

export interface WcagCriterion {
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
  name: string;
  description: string;
  when: string;
  example?: string;
}

export type FrameworkTarget =
  | 'react'
  | 'vue'
  | 'angular'
  | 'web-components'
  | 'agnostic';

export interface ComponentImplementation {
  importPath: string;
  propTypeOverrides?: Record<string, string>;
}

export interface ComponentDefinition {
  id: string;
  name: string;
  description: string;
  importPath: string;
  framework?: FrameworkTarget;
  implementations?: Partial<Record<FrameworkTarget, ComponentImplementation>>;
  tsInterface?: string;
  props: ComponentProp[];
  usage: {
    whenToUse: string[];
    whenToAvoid: string[];
  };
  variants?: ComponentVariant[];
  examples: ComponentExample[];
  anatomy?: AnatomyPart[];
  behaviors?: ComponentBehaviors;
  contentGuidelines?: string[];
  dosAndDonts?: {
    do: string;
    dont: string;
    reason?: string;
  }[];
  accessibility?: ComponentAccessibility;
  relatedComponents?: string[];
}

export type PatternPropValue =
  | string
  | number
  | boolean
  | string[]
  | Record<string, unknown>;

export type PatternNodeBinding = 'static' | 'context' | 'state' | 'slot';

export interface PatternNode {
  id: string;
  componentId: string;
  role?: string;
  props: Record<string, PatternPropValue>;
  children: string[];
  binding?: PatternNodeBinding;
  notes?: string;
}

export interface PatternGraph {
  rootId: string;
  nodes: PatternNode[];
}

export interface PatternDefinition {
  id: string;
  name: string;
  aliases?: string[];
  description: string;
  problem: string;
  solution: string;
  relatedComponents: string[];
  relatedPatterns?: string[];
  usage?: {
    whenToUse: string[];
    whenToAvoid: string[];
  };
  templateCode?: string;
  templateCodeFile?: string;
  examples?: ComponentExample[];
  graph?: PatternGraph;
}

export interface DesignSystemSchema {
  tokens: DesignTokens;
  components: ComponentDefinition[];
  patterns: PatternDefinition[];
}
