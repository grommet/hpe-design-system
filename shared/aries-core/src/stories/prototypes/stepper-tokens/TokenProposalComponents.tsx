// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
//
// THROWAWAY PROTOTYPE — not for merge.
import React from 'react';
import {
  Box,
  Grid,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Text,
  ThemeContext,
} from 'grommet';
import { isSwappedPair, useTheme } from './themes';
import {
  INTERACTIONS,
  NEW_TOKENS,
  ROLES,
  STATES,
  STATE_LABELS,
  isNewToken,
  resolveRow,
  type Interaction,
  type Model,
  type StepperState,
} from './tokenProposal';

type Mode = 'light' | 'dark';
type NameFor = (token: string) => string;
const identity: NameFor = t => t;

const useMode = (): Mode => (useTheme()?.dark ? 'dark' : 'light');

// Read a colour out of the theme. Tokens suffixed `*` are on-strong colours
// that colors.js may swap (light holds the dark value and vice versa); detect
// that from the values so the authored colour is shown on any theme version.
const readColor = (
  theme: any,
  token: string,
  mode: Mode,
): string | undefined => {
  const onStrong = token.endsWith('*');
  const clean = token.replace(/\*$/, '');
  if (NEW_TOKENS[clean]) return NEW_TOKENS[clean][mode];
  const value = theme?.global?.colors?.[clean];
  if (!value) return undefined;
  const resolved =
    typeof value === 'object' ? value : theme?.global?.colors?.[value];
  if (resolved && typeof resolved === 'object') {
    const pick =
      onStrong && isSwappedPair(resolved)
        ? mode === 'light'
          ? 'dark'
          : 'light'
        : mode;
    return resolved[pick];
  }
  return resolved ?? value;
};

const useResolve = () => {
  const theme = useTheme();
  const mode = useMode();
  return (token: string | null | undefined) =>
    token ? readColor(theme, token, mode) : undefined;
};

// ---------------------------------------------------------------------------

interface TokenChipProps {
  token: string | null | undefined;
  nameFor?: NameFor;
  size?: string;
}

export const TokenChip = ({
  token,
  nameFor = identity,
  size = 'xsmall',
}: TokenChipProps) => {
  const resolve = useResolve();
  if (!token) {
    return (
      <Text size={size} color="text-weak">
        —
      </Text>
    );
  }
  if (token.startsWith('⚠')) {
    return (
      <Text size={size} color="text-critical" weight="bold">
        {token}
      </Text>
    );
  }
  const raw = token.endsWith('*');
  const clean = token.replace(/\*$/, '');
  const hex = resolve(token);
  const isNew = isNewToken(clean);
  return (
    <Box direction="row" gap="xsmall" align="center" flex={false}>
      <Box
        width="14px"
        height="14px"
        round="xsmall"
        border={{ color: 'border-weak', size: 'xsmall' }}
        style={{ background: hex }}
        flex={false}
      />
      <Box>
        <Text
          size={size}
          weight={isNew ? 'bold' : undefined}
          style={{ wordBreak: 'break-word' }}
        >
          {nameFor(clean)}
        </Text>
        <Box direction="row" gap="xsmall" align="center">
          <Text
            size="xsmall"
            color="text-weak"
            style={{ fontFamily: 'monospace' }}
          >
            {hex}
          </Text>
          {isNew && (
            <Box
              background="background-info"
              pad={{ horizontal: '4px' }}
              round="xsmall"
            >
              <Text size="xsmall">NEW</Text>
            </Box>
          )}
          {raw && (
            <Box
              background="background-warning"
              pad={{ horizontal: '4px' }}
              round="xsmall"
            >
              <Text size="xsmall">raw</Text>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

// ---------------------------------------------------------------------------

const stepFor = (state: StepperState) => {
  const base = { id: 'step', title: STATE_LABELS[state] };
  switch (state) {
    case 'completed':
    case 'currentCompleted':
      return { ...base, status: 'completed' as const };
    case 'error':
    case 'currentError':
      return {
        ...base,
        status: 'error' as const,
        errorMessage: 'Fix this step',
      };
    case 'disabled':
      return { ...base, status: 'disabled' as const };
    default:
      return base;
  }
};

const isCurrent = (state: StepperState) =>
  state === 'current' ||
  state === 'currentCompleted' ||
  state === 'currentError';

// Grommet falls back to the first non-disabled step when currentStep does
// not match, so a hidden sibling step is needed to render non-selected
// states. The sibling and connector are hidden with CSS.
const SINGLE_STEP_CSS = `
.sb-single-step li:nth-of-type(2) { display: none; }
.sb-single-step [class*="StyledStepper__StyledConnector"] { display: none; }
`;

// Without storybook-addon-pseudo-states, hover is simulated by promoting the
// state's hover tokens to its rest tokens; focus by painting the theme's focus
// ring onto the indicator.
const useInteractionTheme = (state: StepperState, interaction: Interaction) => {
  const theme = useTheme();
  if (interaction !== 'hover') return undefined;
  const stateTheme = theme?.stepper?.[state] || {};
  const indicator = stateTheme.indicator || {};
  const label = stateTheme.label || {};
  return {
    stepper: {
      [state]: {
        indicator: { ...indicator, ...(indicator.hover || {}) },
        label: { ...label, ...(label.hover || {}) },
      },
    },
  };
};

const useFocusCss = (className: string) => {
  const theme = useTheme();
  const resolve = useResolve();
  const focus = theme?.global?.focus || {};
  const outlineColor =
    resolve(focus.outline?.color || 'focus') || resolve('focus');
  const shadowColor = resolve(focus.shadow?.color || 'focus-support');
  const size = focus.outline?.size || '2px';
  const offset = focus.outline?.offset || '0px';
  return `
.${className} [class*="StyledStepper__StyledIndicator"] {
  outline: ${size} solid ${outlineColor};
  outline-offset: ${offset};
  box-shadow: 0 0 0 ${focus.shadow?.size || '2px'} ${shadowColor};
}
`;
};

interface StateIndicatorProps {
  state: StepperState;
  interaction?: Interaction;
  direction?: 'horizontal' | 'vertical';
}

export const StateIndicator = ({
  state,
  interaction = 'rest',
  direction = 'vertical',
}: StateIndicatorProps) => {
  const step = stepFor(state);
  const interactionTheme = useInteractionTheme(state, interaction);
  const focusClass = `sb-focus-${state}`;
  const focusCss = useFocusCss(focusClass);
  const content = (
    <Box
      className={`sb-single-step ${interaction === 'focus' ? focusClass : ''}`}
      flex={false}
    >
      <style>{SINGLE_STEP_CSS}</style>
      {interaction === 'focus' && <style>{focusCss}</style>}
      <Stepper
        steps={[step, { id: 'sibling', title: 'sibling' }]}
        currentStep={isCurrent(state) ? 'step' : 'sibling'}
        direction={direction}
        clickableSteps
        onStepClick={() => {}}
        aria-label={`${STATE_LABELS[state]} ${interaction}`}
      />
    </Box>
  );
  return interactionTheme ? (
    <ThemeContext.Extend value={interactionTheme}>
      {content}
    </ThemeContext.Extend>
  ) : (
    content
  );
};

// ---------------------------------------------------------------------------

interface TokenTableProps {
  model: Model;
  nameFor?: NameFor;
  states?: StepperState[];
}

export const TokenTable = ({
  model,
  nameFor = identity,
  states = STATES,
}: TokenTableProps) => (
  <Box overflow="auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableCell scope="col" border="bottom">
            <Text weight="bold" size="small">
              State
            </Text>
          </TableCell>
          <TableCell scope="col" border="bottom">
            <Text weight="bold" size="small">
              Interaction
            </Text>
          </TableCell>
          {ROLES.map(([key, label]) => (
            <TableCell key={key} scope="col" border="bottom">
              <Text weight="bold" size="small">
                {label}
              </Text>
            </TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {states.map(state =>
          (state === 'disabled'
            ? (['rest'] as Interaction[])
            : INTERACTIONS
          ).map((interaction, i) => {
            const row = resolveRow(model, state, interaction);
            const changed = model[state].hover;
            const border = i === 0 ? 'top' : false;
            return (
              <TableRow key={`${state}-${interaction}`}>
                <TableCell border={border} verticalAlign="top">
                  {i === 0 && (
                    <Text size="small" weight="bold">
                      {STATE_LABELS[state]}
                    </Text>
                  )}
                </TableCell>
                <TableCell border={border} verticalAlign="top">
                  <Text size="small">{interaction}</Text>
                </TableCell>
                {ROLES.map(([key]) => {
                  const dim =
                    interaction !== 'rest' &&
                    !(interaction === 'hover' && changed[key]);
                  return (
                    <TableCell key={key} border={border} verticalAlign="top">
                      <Box style={{ opacity: dim ? 0.5 : 1 }}>
                        <TokenChip token={row[key]} nameFor={nameFor} />
                      </Box>
                      {interaction === 'focus' && key === 'border' && (
                        <Box margin={{ top: 'xxsmall' }}>
                          <TokenChip token="focus" />
                        </Box>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          }),
        )}
      </TableBody>
    </Table>
  </Box>
);

// ---------------------------------------------------------------------------

const INDICATOR_ROLES = ROLES.filter(([k]) =>
  ['border', 'fill', 'glyph', 'label'].includes(k),
);

interface IndicatorMatrixProps {
  model: Model;
  nameFor?: NameFor;
  states?: StepperState[];
  direction?: 'horizontal' | 'vertical';
}

// Figma-style matrix: columns = states, rows = interactions. Each cell shows
// the rendered step next to the tokens that paint it.
export const IndicatorMatrix = ({
  model,
  nameFor = identity,
  states = STATES,
  direction = 'vertical',
}: IndicatorMatrixProps) => (
  <Box flex={false} style={{ width: 'max-content' }}>
    <Grid
      columns={['xxsmall', ...states.map(() => '200px')]}
      gap={{ row: 'large', column: 'medium' }}
      align="start"
    >
      <Box />
      {states.map(state => (
        <Text key={state} weight="bold" size="small">
          {STATE_LABELS[state]}
        </Text>
      ))}
      {INTERACTIONS.map(interaction => (
        <React.Fragment key={interaction}>
          <Text
            weight="bold"
            size="small"
            style={{ textTransform: 'capitalize' }}
          >
            {interaction}
          </Text>
          {states.map(state => {
            const row = resolveRow(model, state, interaction);
            const disabledHover =
              state === 'disabled' && interaction !== 'rest';
            return (
              <Box
                key={state}
                gap="xsmall"
                style={{ opacity: disabledHover ? 0.4 : 1 }}
              >
                <StateIndicator
                  state={state}
                  interaction={interaction}
                  direction={direction}
                />
                <Box gap="xxsmall" pad={{ left: 'xxsmall' }}>
                  {INDICATOR_ROLES.map(([key, label]) =>
                    row[key] ? (
                      <Box key={key} direction="row" gap="xsmall" align="start">
                        <Text
                          size="xsmall"
                          color="text-weak"
                          style={{ minWidth: 40 }}
                        >
                          {label.replace('Indicator ', '')}
                        </Text>
                        <TokenChip token={row[key]} nameFor={nameFor} />
                      </Box>
                    ) : null,
                  )}
                  {interaction === 'focus' && (
                    <Box direction="row" gap="xsmall" align="start">
                      <Text
                        size="xsmall"
                        color="text-weak"
                        style={{ minWidth: 40 }}
                      >
                        ring
                      </Text>
                      <TokenChip token="focus" />
                    </Box>
                  )}
                </Box>
              </Box>
            );
          })}
        </React.Fragment>
      ))}
    </Grid>
  </Box>
);
