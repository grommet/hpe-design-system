// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
//
// THROWAWAY PROTOTYPE — not for merge.
//
// Storybook documentation for the Stepper colour-token proposal: compares the
// current grommet-theme-hpe treatment of the selected error indicator with
// "Option A" (filled = selected, with dedicated strong-critical tokens),
// including per-state token tables and Figma-style indicator matrices.
import React from 'react';
import {
  Box,
  Grid,
  Heading,
  List,
  Paragraph,
  Stepper,
  Text,
  ThemeContext,
} from 'grommet';
import {
  CURRENT,
  CURRENT_TOKENS_USED,
  NEW_TOKENS,
  OPTION_A,
  PROPOSED_PRIMITIVES,
  a2Name,
  type Interaction,
  type StepperState,
} from './tokenProposal';
import {
  IndicatorMatrix,
  StateIndicator,
  TokenChip,
  TokenTable,
} from './TokenProposalComponents';
import { optionATheme, useCurrentThemeFix } from './themes';

type Naming = 'A1' | 'A2';
interface Args {
  naming: Naming;
}

export default {
  title: 'Prototypes/Stepper token proposal',
  argTypes: {
    naming: {
      control: 'radio',
      options: ['A1', 'A2'],
      description: 'Which naming scheme to display for the new fill tokens',
    },
  },
  args: { naming: 'A1' },
  parameters: { chromatic: { disableSnapshot: true } },
};

const nameForScheme = (naming: Naming) =>
  naming === 'A2' ? a2Name : (t: string) => t;

// Applies the misc.js icon-onStrong fix so "Current" renders as intended
// rather than as the inverted glyph shipped in grommet-theme-hpe 8.x.
const WithCurrentFix = ({ children }: { children: React.ReactNode }) => {
  const fix = useCurrentThemeFix();
  return <ThemeContext.Extend value={fix}>{children}</ThemeContext.Extend>;
};

const WithOptionA = ({ children }: { children: React.ReactNode }) => (
  <WithCurrentFix>
    <ThemeContext.Extend value={optionATheme}>{children}</ThemeContext.Extend>
  </WithCurrentFix>
);

const demoSteps = [
  { id: 'a', title: 'Complete', status: 'completed' as const },
  {
    id: 'b',
    title: 'Error',
    status: 'error' as const,
    errorMessage: 'Needs attention',
  },
  {
    id: 'c',
    title: 'Error selected',
    status: 'error' as const,
    errorMessage: 'Needs attention',
  },
  { id: 'd', title: 'Pending' },
  { id: 'e', title: 'Disabled', status: 'disabled' as const },
];

const DemoStepper = () => (
  <Stepper
    steps={demoSteps}
    currentStep="c"
    clickableSteps
    onStepClick={() => {}}
  />
);

const TokenList = ({
  tokens,
  nameFor = (t: string) => t,
}: {
  tokens: string[];
  nameFor?: (t: string) => string;
}) => (
  <Box gap="xsmall">
    {tokens.map(t => (
      <TokenChip key={t} token={t} nameFor={nameFor} size="small" />
    ))}
  </Box>
);

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Box gap="small" pad={{ bottom: 'medium' }} border="bottom">
    <Heading level={2} margin="none" size="small">
      {title}
    </Heading>
    {children}
  </Box>
);

const ProsCons = ({ pros, cons }: { pros: string[]; cons: string[] }) => (
  <Grid columns={['1/2', '1/2']} gap="medium">
    <Box gap="xsmall">
      <Text weight="bold" color="text-ok">
        Pros
      </Text>
      <List data={pros} pad={{ vertical: 'xxsmall' }} border={false}>
        {(item: string) => <Text size="small">• {item}</Text>}
      </List>
    </Box>
    <Box gap="xsmall">
      <Text weight="bold" color="text-critical">
        Cons
      </Text>
      <List data={cons} pad={{ vertical: 'xxsmall' }} border={false}>
        {(item: string) => <Text size="small">• {item}</Text>}
      </List>
    </Box>
  </Grid>
);

// Rows: how each visual treatment is tokenised today for the primary (green)
// states, and what the error states do by comparison.
const PATTERN_ROWS: {
  treatment: string;
  primary: string[];
  error: string[];
  errorOk: boolean;
}[] = [
  {
    treatment: 'Unselected — outline ring + glyph',
    primary: ['icon-primary', 'icon-primary-hover'],
    error: ['icon-critical', '(no hover → color-mix)'],
    errorOk: true,
  },
  {
    treatment: 'Selected — solid fill',
    primary: [
      'background-selected-primary-strong',
      'background-selected-primary-strong-hover',
    ],
    error: ['icon-critical (as a fill)', '(no hover → color-mix)'],
    errorOk: false,
  },
  {
    treatment: 'Selected — glyph on the fill',
    primary: ['icon-onSelectedPrimaryStrong'],
    error: ['icon-onStrong (generic)'],
    errorOk: false,
  },
];

const PatternTable = () => (
  <Box gap="xsmall">
    <Grid columns={['1/3', '1/3', '1/3']} gap="small">
      <Text size="small" weight="bold">
        Treatment
      </Text>
      <Text size="small" weight="bold">
        Primary states (complete / selected)
      </Text>
      <Text size="small" weight="bold">
        Error states today
      </Text>
    </Grid>
    {PATTERN_ROWS.map(row => (
      <Grid
        key={row.treatment}
        columns={['1/3', '1/3', '1/3']}
        gap="small"
        pad={{ vertical: 'xsmall' }}
        border="top"
      >
        <Text size="small">{row.treatment}</Text>
        <Box>
          {row.primary.map(t => (
            <Text key={t} size="small">
              <code>{t}</code>
            </Text>
          ))}
        </Box>
        <Box>
          {row.error.map(t => (
            <Text
              key={t}
              size="small"
              color={row.errorOk ? undefined : 'text-critical'}
            >
              <code>{t}</code>
            </Text>
          ))}
        </Box>
      </Grid>
    ))}
  </Box>
);

const A1_TOKENS = [
  'background-critical-strong',
  'background-critical-strong-hover',
  'icon-onCriticalStrong',
];

// ---------------------------------------------------------------------------

export const Overview = {
  render: ({ naming }: Args) => {
    const nameFor = nameForScheme(naming);
    return (
      <WithCurrentFix>
        <Box gap="large" width={{ max: 'xxlarge' }}>
          <Box>
            <Heading level={1} margin="none">
              Stepper colour tokens — Current vs Option A
            </Heading>
            <Paragraph fill>
              Both options fill the indicator when a step is <em>selected</em>{' '}
              (current). The question is only what paints the selected error
              indicator and whether the critical colours get hover variants.
              Colour values on this page are read from the active theme, except
              tokens marked <strong>NEW</strong>, whose proposed values are
              defined in <code>tokenProposal.ts</code>.
            </Paragraph>
          </Box>

          <Section title="Current (grommet-theme-hpe 8.x)">
            <Grid columns={['2/3', '1/3']} gap="medium" align="start">
              <Box gap="small">
                <DemoStepper />
                <Paragraph size="small" fill margin="none">
                  The selected error indicator borrows{' '}
                  <code>icon-critical</code> as a <em>fill</em> and{' '}
                  <code>icon-onStrong</code> as the glyph. Neither critical
                  colour has a hover token, so Grommet falls back to{' '}
                  <code>color-mix(in srgb, X 80%, black)</code> for hover — an
                  un-tokenised colour that darkens in dark mode too. (On theme
                  versions where <code>colors.js</code> swaps{' '}
                  <code>icon-onStrong</code>, the glyph renders inverted; this
                  page hands the Stepper the authored value so the intent is
                  visible regardless of version.)
                </Paragraph>
              </Box>
              <Box gap="xsmall">
                <Text weight="bold" size="small">
                  Tokens used
                </Text>
                <TokenList tokens={CURRENT_TOKENS_USED} />
              </Box>
            </Grid>
          </Section>

          <Section title="Why a background token at all?">
            <Paragraph size="small" fill margin="none">
              The primary states already follow a rule: an <em>outline</em>{' '}
              indicator is painted with <code>icon-*</code> tokens, and a{' '}
              <em>filled</em> indicator is painted with a{' '}
              <code>background-*-strong</code> token plus its matching{' '}
              <code>icon-on*Strong</code> glyph. The error states only follow
              that rule while unselected. Once selected, the fill reaches for an
              icon colour because no critical background-strong exists — that is
              the role mismatch Option A fixes.
            </Paragraph>
            <PatternTable />
            <Paragraph size="small" fill margin="none">
              So the proposal is not "we need another red"; it is "the selected
              error indicator is a strong background and should be tokenised
              like one", with <code>icon-critical-hover</code> added so the
              unselected error state gets the same hover affordance as complete.
            </Paragraph>
          </Section>

          <Section title="Option A — filled = selected, with dedicated critical tokens">
            <WithOptionA>
              <Grid columns={['2/3', '1/3']} gap="medium" align="start">
                <Box gap="small">
                  <DemoStepper />
                  <Paragraph size="small" fill margin="none">
                    Same visual at rest. Adds a real strong-critical fill with
                    its own on-colour and hover, plus{' '}
                    <code>icon-critical-hover</code> for the unselected error
                    ring/glyph. Every colour is now a named token; no role
                    mismatch and no colour-mix fallback.
                  </Paragraph>
                </Box>
                <Box gap="xsmall">
                  <Text weight="bold" size="small">
                    Proposed new tokens ({naming} names)
                  </Text>
                  <TokenList
                    tokens={Object.keys(NEW_TOKENS)}
                    nameFor={nameFor}
                  />
                  <Text
                    size="xsmall"
                    color="text-weak"
                    margin={{ top: 'xsmall' }}
                  >
                    Light-mode hover of a red.800 fill needs a darker step that
                    does not exist: proposed primitive{' '}
                    <code>red.900 = {PROPOSED_PRIMITIVES['red.900']}</code>{' '}
                    (parallel to green.800 → green.900). Dark mode can reuse
                    red.400.
                  </Text>
                </Box>
              </Grid>
            </WithOptionA>
          </Section>

          <Section title="Required regardless of A1 / A2">
            <Paragraph size="small" fill margin="none">
              <code>icon-critical</code> (exists) and{' '}
              <code>icon-critical-hover</code> (new) are needed by the{' '}
              <em>unselected</em> error indicator in every option, including
              Current — the ring and glyph need a hover change parallel to{' '}
              <code>icon-primary-hover</code> on the complete state. A1 vs A2
              only decides the names of the three fill-related tokens.
            </Paragraph>
          </Section>

          <Section title="A1 — background-critical-strong">
            <TokenList tokens={A1_TOKENS} />
            <ProsCons
              pros={[
                'Direct parallel to background-primary-strong / -hover / icon-onPrimaryStrong.',
                'Short, discoverable; designers will guess the name.',
                'Reusable if a strong critical fill is ever legitimately needed elsewhere (e.g. a badge count on a danger state).',
              ]}
              cons={[
                'Reads as a general-purpose strong critical fill, inviting use on danger buttons, toasts, banners — exactly the proliferation concern.',
                'There is no text-onCriticalStrong, and text-onCritical-strong already exists meaning "emphasised text on the WEAK critical background". The two names will be confused.',
                'First strong status fill in the system; sets a precedent for background-warning-strong, -ok-strong, etc.',
              ]}
            />
          </Section>

          <Section title="A2 — background-selected-critical-strong">
            <TokenList tokens={A1_TOKENS} nameFor={a2Name} />
            <ProsCons
              pros={[
                '1:1 sibling of background-selected-primary-strong, which is what the indicator actually means: "this item is selected and it is in error".',
                '"selected" scopes the token to selection UIs (stepper, list, tabs), making misuse on buttons/toasts obviously wrong in review.',
                'No collision with text-onCritical / text-onCritical-strong.',
                'Future-proof: a weak background-selected-critical can be added if a selected-row-in-error ever needs it, mirroring the primary pair.',
              ]}
              cons={[
                'Long names (background-selected-critical-strong-hover is 40 chars).',
                'Implies a "selected-critical" family exists; today the stepper is its only consumer.',
                'Slightly less discoverable for someone searching "critical".',
              ]}
            />
          </Section>
        </Box>
      </WithCurrentFix>
    );
  },
};

// ---------------------------------------------------------------------------

export const TableCurrent = {
  name: 'Table — Current',
  render: () => (
    <WithCurrentFix>
      <Box gap="medium">
        <Heading level={2} margin="none" size="small">
          Current theme — token per state × interaction
        </Heading>
        <Text size="small" color="text-weak">
          Dimmed cells are unchanged from rest. ⚠ marks a non-tokenised
          fallback. “raw” marks tokens that must be passed as literal{' '}
          {'{light, dark}'} values to dodge the colors.js on-colour swap.
        </Text>
        <TokenTable model={CURRENT} />
      </Box>
    </WithCurrentFix>
  ),
};

export const TableOptionA = {
  name: 'Table — Option A',
  render: ({ naming }: Args) => (
    <WithCurrentFix>
      <Box gap="medium">
        <Heading level={2} margin="none" size="small">
          Option A ({naming}) — token per state × interaction
        </Heading>
        <Text size="small" color="text-weak">
          Only the error and error·selected rows change from Current. Bold +{' '}
          <strong>NEW</strong> marks tokens that do not exist yet. Switch the{' '}
          <em>naming</em> control to compare A1 and A2 names.
        </Text>
        <TokenTable model={OPTION_A} nameFor={nameForScheme(naming)} />
      </Box>
    </WithCurrentFix>
  ),
};

// ---------------------------------------------------------------------------

const SIMULATED_NOTE =
  'Hover and focus rows are simulated (hover tokens promoted to rest; focus ring painted on) because this Storybook has no pseudo-state addon.';

export const MatrixCurrent = {
  name: 'Matrix — Current',
  render: () => (
    <WithCurrentFix>
      <Box gap="medium">
        <Heading level={2} margin="none" size="small">
          Current — rendered indicator with the tokens that paint it
        </Heading>
        <Text size="xsmall" color="text-weak">
          {SIMULATED_NOTE}
        </Text>
        <IndicatorMatrix model={CURRENT} />
      </Box>
    </WithCurrentFix>
  ),
};

export const MatrixOptionA = {
  name: 'Matrix — Option A',
  render: ({ naming }: Args) => (
    <WithOptionA>
      <Box gap="medium">
        <Heading level={2} margin="none" size="small">
          Option A ({naming}) — rendered indicator with the tokens that paint it
        </Heading>
        <Text size="xsmall" color="text-weak">
          {SIMULATED_NOTE}
        </Text>
        <IndicatorMatrix model={OPTION_A} nameFor={nameForScheme(naming)} />
      </Box>
    </WithOptionA>
  ),
};

export const MatrixSideBySide = {
  name: 'Matrix — error states side by side',
  render: ({ naming }: Args) => (
    <Box
      direction="row"
      gap="xlarge"
      flex={false}
      style={{ width: 'max-content' }}
    >
      <WithCurrentFix>
        <Box gap="small" flex={false}>
          <Heading level={3} margin="none">
            Current
          </Heading>
          <IndicatorMatrix model={CURRENT} states={['error', 'currentError']} />
        </Box>
      </WithCurrentFix>
      <WithOptionA>
        <Box gap="small" flex={false}>
          <Heading level={3} margin="none">
            Option A ({naming})
          </Heading>
          <IndicatorMatrix
            model={OPTION_A}
            states={['error', 'currentError']}
            nameFor={nameForScheme(naming)}
          />
        </Box>
      </WithOptionA>
    </Box>
  ),
};

interface PlaygroundArgs {
  state: StepperState;
  interaction: Interaction;
  option: 'current' | 'optionA';
}

export const Playground = {
  name: 'Playground — single step',
  argTypes: {
    state: {
      control: 'select',
      options: [
        'pending',
        'current',
        'completed',
        'currentCompleted',
        'error',
        'currentError',
        'disabled',
      ],
    },
    interaction: { control: 'radio', options: ['rest', 'hover', 'focus'] },
    option: { control: 'radio', options: ['current', 'optionA'] },
  },
  args: { state: 'currentError', interaction: 'rest', option: 'current' },
  render: ({ state, interaction, option }: PlaygroundArgs) => {
    const inner = (
      <StateIndicator
        state={state}
        interaction={interaction}
        direction="horizontal"
      />
    );
    return option === 'optionA' ? (
      <WithOptionA>{inner}</WithOptionA>
    ) : (
      <WithCurrentFix>{inner}</WithCurrentFix>
    );
  },
};
