// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  EmailClient,
  KnowledgeBase,
  NodeEditor,
  TaskManager,
  WordProcessor,
} from './layouts';

// The stress-test layouts: what each one stresses and what the theme would
// need beyond the surface tokens to serve the design. `tab` is the label in
// the preview bar.
export const LAYOUTS = [
  {
    id: 'email',
    tab: 'Email client',
    title: 'Email client',
    Component: EmailClient,
    stress:
      'Three sibling panes of different tones on one page (folder list and message list toned, reading pane the page itself); selected rows inside a toned pane; a floating compose window whose contents restart the chain; a quote inside a quote.',
    extensions: [
      'Under the simulated peer (grey) theme the compose window (floating) and its first-tone attachment are both white: the theme swaps the tones but leaves floating white. That is true under all three architectures and is a gap in the theme’s definition of floating (decisions 11b, 26; #6071 Part 3), not in the layout. Selected rows and folders use background-selected-primary, a state token, not a surface (decision 16).',
      'The reading pane takes no surface: it is the page (decision 6). If a product wants the list and reading panes to differ from each other and from the page, that is a third value and would have to be a named token outside the pair (decision 1a).',
    ],
  },
  {
    id: 'tasks',
    tab: 'Kanban',
    title: 'Task manager (kanban)',
    Component: TaskManager,
    stress:
      'Depth four: swimlane → column → card → subtasks. Column header bands as component-internal fills (decision 15a); tags as status fills; an empty “add column” slot that is transparent with a dashed border (decision 6); a detail panel with its own nesting.',
    extensions: [
      'None: two alternating tones have no ceiling, so depth four needs no new value. Under Tonal scale every second level repeats the page colour in dark.',
      'Header bands use background-contrast; tags use status backgrounds. Both exist and are not surfaces.',
    ],
  },
  {
    id: 'docs',
    tab: 'Word processor',
    title: 'Word processor',
    Component: WordProcessor,
    stress:
      'A paper on a desk: the desk frames the workspace exactly as shell chrome does, but it is content, not chrome. Is the paper base (Tonal with roles, Tonal + frame) or a container on the desk (Tonal scale)? The desk also tests the name “frame” on something that is not a shell.',
    extensions: [
      'The paper’s shadow is elevation, a component property (decision 26); no token.',
      'Under Tonal with roles the guidance must say that a desk counts as a frame around the workspace, so the paper is base. Under Tonal + frame the frame token is applied to a desk, which is content and not shell chrome.',
      'In dark the paper (grey.1300) is darker than its desk (grey.1000) under all three. A paper lighter than its desk, the word-processor convention, needs a desk darker than grey.1300, and the ramp has no such value, so no architecture gives it today.',
    ],
  },
  {
    id: 'nodes',
    tab: 'Node editor',
    title: 'Node editor',
    Component: NodeEditor,
    stress:
      'Floating UI over the page that is not a Layer (toolbar, minimap); nodes as reusable components that must look the same wherever they sit; a group drawn as a tint (nodes keep their tone) against a group drawn as a container (nodes flip to the other tone); an inspector three deep.',
    extensions: [
      'A group region should be a tint, not a surface, or every node inside it inverts: background-contrast does this today but cannot carry a hue. A coloured group (blue team, red team) needs a translucent accent fill — accent backgrounds are opaque today — or a named group token outside the pair.',
      'The canvas grid is decorative: a border or decorative colour at low opacity, not a surface.',
      'Floating UI drawn inside the canvas rather than in a Layer still takes floating; the token says over the page, not how it is rendered (2f).',
    ],
  },
  {
    id: 'kb',
    tab: 'Knowledge base',
    title: 'Knowledge base',
    Component: KnowledgeBase,
    stress:
      'An accent hero band with a search container on it; status admonitions; code blocks as containers; a tabbed example with a code block one level deeper; a table of contents that takes no surface.',
    extensions: [
      'A container on an accent surface has no rule: neither tone is defined against an accent. Shown here as floating (over the band), which works in both modes; guidance should say so or name a token for it.',
      'Implementation finding: Grommet resolves descendants of a coloured band by the band’s brightness, not the page’s mode. On the strong blue in light mode, floating came out grey.1200; in dark mode the accent’s lighter value flipped it back to white. A surface on an accent must pin its mode to the page (background={{ color, dark }}) or the accent needs a mode-neutral partner token.',
      'Code blocks that must be dark in light mode (a syntax theme) are a fixed named token outside the pair, not tone-1.',
      'Admonitions use status backgrounds; they are fills with meaning, not surfaces (decision 15a).',
    ],
  },
];
