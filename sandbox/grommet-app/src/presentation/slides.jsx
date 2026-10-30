// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext, useState } from 'react';
import { Anchor, Box, Button, Card, CardBody, CardHeader, Drop, Layer, Text, Tip } from 'grommet';
import { Surface } from '../surfaces/Surface';
import { SurfaceStateContext, TOKENS } from '../surfaces/surfaceState';
import {
  AliasTable,
  Chain,
  Code,
  Column,
  Columns,
  Floating,
  Mono,
  Note,
  ReferenceTable,
  Slide,
  ThemeFacts,
  ThemePane,
} from './parts';
import { tonedWithOptionalSteps } from './optionalExtension';
import { ShellDesign } from '../surfaces/pages/ShellDesign';

const useMode = () => useContext(SurfaceStateContext);

/* 1 ---------------------------------------------------------------------- */
export const Title = () => (
  <Slide
    kicker="Surface tokens · grommet/hpe-design-system#6071 · Phase 2C"
    title="Does the architecture work?"
    lead={
      <>
        Four surface tokens and one claim: <em>a container takes whichever tone
        its parent is not</em>. This deck is rendered with grommet-theme-hpe plus
        the prototype Surface themes, so every container below is a live
        Grommet component carrying a real token. Use the switches above at any
        point — nothing here is a screenshot.
      </>
    }
  >
    <Columns>
      <Column>
        <Surface token={TOKENS.base} label="Page" note="surface.base — the root">
          <Chain compact />
        </Surface>
      </Column>
      <Column>
        <Floating note="surface.floating — the other root; tones restart from it" />
      </Column>
    </Columns>
    <Text size="small" color="text-weak">
      Each label reads: token · the value the theme resolves it to · the value
      the browser painted (getComputedStyle). Keyboard: ← → to move.
    </Text>
  </Slide>
);

/* 2 ---------------------------------------------------------------------- */
export const Claim = () => (
  <Slide
    kicker="What is being proven"
    title="Three testable consequences of one rule"
    lead="From the issue: because there are exactly two tones, the whole system inverts by swapping values rather than remapping tokens."
  >
    <Columns>
      <Column>
        <Note title="1 · Alternation resolves">
          At any depth, in light and dark, on every platform. Page → tone.1 →
          tone.2 → tone.1 …
        </Note>
        <Note title="2 · The pair inverts">
          Swapping the values turns a white page with grey containers into a
          grey page with white containers — on every screen, with no token
          changed anywhere. Before this phase that had only been shown in
          light mode; dark mode was the open question. This phase made it
          decidable — the two possible dark renderings and the evidence are
          on slides 10–13 — but it does not decide it.
        </Note>
        <Note title="3 · floating is a root">
          Unaffected by what it sits over; containers alternate from it
          normally.
        </Note>
      </Column>
      <Column>
        <Code title="How it was tested">
          {`token files  →  Style Dictionary  →  CSS · Grommet · ESM · docs
                                  →  Figma variables payload + round trip
outputs      →  grommet-app (this app) and native-web (plain CSS)
screens      →  3 layouts × 2 surface modes × 2 colour modes = 16
evidence     →  getComputedStyle() on every surface, compared
                across environments (0 differences)`}
        </Code>
        <Code title="The layout (#6071 Part 2)">
          {`Page                      surface.base
├─ Card                   surface.tone.1
│   └─ Inner section      surface.tone.2
│       └─ Nested region  surface.tone.1
├─ Shell panel            surface.tone.1
│   └─ Card in shell      surface.tone.2
└─ Modal                  surface.floating
    └─ Card in modal      surface.tone.1`}
        </Code>
      </Column>
    </Columns>
  </Slide>
);

/* 3 ---------------------------------------------------------------------- */
export const ReferenceTier = () => (
  <Slide
    kicker="What was added · 1 of 3"
    title="Three internal reference tokens in the Color collection"
    lead="color.surface.10 / .20 / .30 carry the light and dark values. They are the only new entries in color.light.json and color.dark.json."
  >
    <Columns>
      <Column>
        <Code title="tokens/semantic/color.dark.json (abridged)">
          {`"color": {
  "surface": {
    "10": { "DEFAULT": { "REST": {
      "$description": "[INTERNAL] Reference value for the surface tokens. Do not apply directly: use background-surface-base, …",
      "$extensions": { "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": ["FRAME_FILL", "SHAPE_FILL"] } },
      "$type": "color",
      "$value": "{base.color.grey.1300}"
    }}},
    "20": { … "$value": "{base.color.grey.1200}" },
    "30": { … "$value": "{base.color.grey.1000}" }
  }
}`}
        </Code>
      </Column>
      <Column>
        <Note title="As built (read from hpe-design-tokens/grommet)">
          <ReferenceTable />
        </Note>
        <Note title="Why a tier at all">
          A consumer token can hold only one alias, and an alias cannot say
          “white in light, grey.1300 in dark”. The step holds the pair; the
          consumer points at the step. 10 and 20 sharing white in light is
          deliberate — in dark they are three distinct values, 10 darkest.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 4 ---------------------------------------------------------------------- */
export const SurfaceCollection = () => {
  const { surfaceMode, colorMode } = useMode();
  return (
    <Slide
      kicker="What was added · 2 of 3"
      title="A Surface collection with two value sets"
      lead="surface.default.json and surface.toned.json each carry the same four consumer tokens; every token is a single alias into the reference tier."
    >
      <Columns>
        <Column>
          <Code title="tokens/semantic/surface.default.json (abridged)">
            {`"color": { "background": { "surface": {
  "base":     { … "$value": "{color.surface.10.DEFAULT.REST}" },
  "tone": {
    "1":      { … "$value": "{color.surface.30.DEFAULT.REST}" },
    "2":      { … "$value": "{color.surface.20.DEFAULT.REST}" } },
  "floating": { … "$value": "{color.surface.20.DEFAULT.REST}" }
}}}`}
          </Code>
          <Note title="floating shares tone.2's step (decision 26)">
            They differ by role, not colour: floating is <em>over</em> the page
            and the tones restart from it. Elevation is a component property.
          </Note>
        </Column>
        <Column>
          <Note title={`default${surfaceMode === 'default' ? ' · active' : ''}`}>
            <AliasTable surfaceMode="default" highlight={colorMode} />
          </Note>
          <Note title={`toned${surfaceMode === 'toned' ? ' · active' : ''}`}>
            <AliasTable surfaceMode="toned" highlight={colorMode} />
          </Note>
        </Column>
      </Columns>
    </Slide>
  );
};

/* 5 ---------------------------------------------------------------------- */
export const Pipeline = () => (
  <Slide
    kicker="What was added · 3 of 3"
    title="Build, outputs and wiring"
    lead="One build block, one small CSS format, two parser entries. Everything else is the existing pipeline doing what it already does."
  >
    <Columns>
      <Column>
        <Code title="dist/css/surface.default.css · surface.toned.css">
          {`:root, [data-surface=default] {
  --hpe-color-background-surface-base:     var(--hpe-color-surface-10);
  --hpe-color-background-surface-tone-1:   var(--hpe-color-surface-30);
  --hpe-color-background-surface-tone-2:   var(--hpe-color-surface-20);
  --hpe-color-background-surface-floating: var(--hpe-color-surface-20);
}
[data-surface=toned] {
  --hpe-color-background-surface-base:     var(--hpe-color-surface-30);
  --hpe-color-background-surface-tone-1:   var(--hpe-color-surface-10);
  --hpe-color-background-surface-tone-2:   var(--hpe-color-surface-30);
  --hpe-color-background-surface-floating: var(--hpe-color-surface-30);
}
/* color.light.css / color.dark.css define --hpe-color-surface-10…30 */`}
        </Code>
        <Code title="dist/grommet/surface.default.js (Grommet colour refs)">
          {`hpe.color.background = {
  'surface-base': 'surface-10',  'surface-tone-1': 'surface-30',
  'surface-tone-2': 'surface-20', 'surface-floating': 'surface-20' }`}
        </Code>
      </Column>
      <Column>
        <Note title="src/scripts/build-style-dictionary.js">
          A <Mono>Surface collection</Mono> block after the colour block: globs{' '}
          <Mono>surface.*.json</Mono>, sources primitives + color.light.json +
          the mode file, emits CSS, ESM/CJS, Grommet refs, docs and metadata.
        </Note>
        <Note title="src/formats/cssCollectionModes.ts">
          New Style Dictionary <em>format</em>{' '}
          <Mono>css/variables-collection-modes</Mono>: scopes a collection&apos;s
          variables to <Mono>[data-surface=&lt;mode&gt;]</Mono> and keeps them
          as references, so the file is colour-mode agnostic. Not a transform.
        </Note>
        <Note title="src/semantic_color_core.ts">
          <Mono>surface</Mono> registered as a standalone target (roles 10/20/30)
          and <Mono>background.surface</Mono> as a family (base, floating,
          tone-1, tone-2), so the parser, metadata and Figma name round trip
          accept the paths.
        </Note>
        <Note title="src/tests/surface_collection.test.ts">
          16 tests: resolution matrix, single-alias rule, floating = tone.2,
          alias-direction lint, frozen legacy tokens, CSS/Grommet/ESM outputs,
          Figma payload shape, Figma → tokens round trip.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 6 ---------------------------------------------------------------------- */
export const Resolution = () => {
  const { colorMode } = useMode();
  return (
    <Slide
      kicker="Part 2 · alternation on a real screen"
      title="The tokens resolve — here, now"
      lead={`Every box is a Grommet Box with background="background-surface-…". Switch to ${
        colorMode === 'light' ? 'dark' : 'light'
      }: the painted values change, the tokens on the boxes do not.`}
    >
      <Columns>
        <Column>
          <Surface token={TOKENS.base} label="Page" note="surface.base">
            <Chain />
          </Surface>
        </Column>
        <Column>
          <Note title="What to look for">
            <Text size="small">
              • Every surface differs from its parent in both modes — including
              the depth-3 region, which is tone.1 again.
            </Text>
            <Text size="small">
              • “theme” is what grommet resolves the colour name to; “painted”
              is what the browser drew. They agree in all 16 combinations, and
              native-web (plain CSS) painted the same values.
            </Text>
            <Text size="small">
              • In light, base and tone.2 are both white: a nested panel inside
              a grey card is white again. That is the architecture, not a bug.
            </Text>
          </Note>
          <Floating note="The modal branch of the layout" />
        </Column>
      </Columns>
    </Slide>
  );
};

/* 6b --------------------------------------------------------------------- */
const DESIGNS = [
  { id: 'framed', label: 'Framed shell · #6708 · A′' },
  { id: 'framedAlt', label: 'Framed shell · sheet = tone.2' },
  { id: 'beside', label: 'Beside shell · Overview dashboard · #6635' },
];

export const RealDesigns = () => {
  const [reading, setReading] = useState('framed');
  const { surfaceMode, colorMode } = useMode();
  return (
    <Slide
      kicker="Part 2 · on the real designs"
      title="The GreenLake shell and the Overview dashboard, painted by the tokens"
      lead="The two designs from the shell prototype, ported and themed with the Surface collection. Every area carries its token, the theme value and the painted value. Use the deck switches above; the moon in the rail also flips colour mode."
    >
      <Box direction="row" gap="xsmall" wrap>
        {DESIGNS.map(d => (
          <Button
            key={d.id}
            label={d.label}
            size="small"
            primary={reading === d.id}
            onClick={() => setReading(d.id)}
          />
        ))}
      </Box>
      <Box
        height="520px"
        round="small"
        overflow="hidden"
        border={{ color: 'border-weak' }}
        flex={false}
      >
        <ShellDesign reading={reading} />
      </Box>
      <Columns>
        <Column>
          <Note title="Framed shell (A′)">
            Chrome tone.1 on the root; the content sheet and contextual panel
            are base (decisions 13, 23); cards tone.1; inner panels tone.2. In
            dark the sheet reads as a recess inside the chrome.
          </Note>
        </Column>
        <Column>
          <Note title="Beside shell">
            No chrome surface: the page is base, the rail and nav carry tone.1
            beside it, cards tone.1, header transparent on the page. The
            textbook fit for decisions 6, 13 and 23.
          </Note>
        </Column>
        <Column>
          <Note title={`Now showing: ${surfaceMode} · ${colorMode}`}>
            Full-size versions with the sweep: pages 4, 4b and 5 of{' '}
            <Anchor href="/surfaces.html" label="/surfaces.html" />. In
            toned · dark the cards sit darker than the page — the open
            question on slides 11–13, seen on a real screen.
          </Note>
        </Column>
      </Columns>
    </Slide>
  );
};

/* 7 ---------------------------------------------------------------------- */
export const ThemeWiring = () => {
  const [showLayer, setShowLayer] = useState(false);
  const [showDrop, setShowDrop] = useState(false);
  const [dropTarget, setDropTarget] = useState(null);
  return (
    <Slide
      kicker="Part 5 · theme wiring"
      title="grommet-theme-hpe components pick the tokens up from the theme"
      lead="The prototype buildTheme change: the Surface collection is one more input beside light / dark. Card, Layer, Drop and Tip carry no background prop below — the theme supplies it."
    >
      <Columns>
        <Column>
          <Card data-surface-token="card-component" data-surface-label="Grommet Card (theme)">
            <CardHeader pad="small">
              <Text weight={500}>
                &lt;Card&gt; · card.container.background → surface.tone.1
              </Text>
            </CardHeader>
            <CardBody pad="small" gap="small">
              <Text size="small">
                No background prop. The grey (light) / grey.1000 (dark) comes
                from the theme.
              </Text>
              <Surface token={TOKENS.tone2} label="Panel in the Card" />
            </CardBody>
          </Card>
          <Box direction="row" gap="small" wrap>
            <Button label="Open Layer" onClick={() => setShowLayer(true)} />
            <Button
              ref={setDropTarget}
              label={showDrop ? 'Hide Drop' : 'Show Drop'}
              onClick={() => setShowDrop(v => !v)}
            />
            <Tip content="Tip · tip.content.background → surface.floating">
              <Button label="Hover for Tip" />
            </Tip>
          </Box>
          {showDrop && dropTarget && (
            <Drop
              target={dropTarget}
              align={{ top: 'bottom', left: 'left' }}
              data-surface-token="drop-component"
              data-surface-label="Grommet Drop (theme)"
            >
              <Box pad="small" gap="small">
                <Text size="small">
                  &lt;Drop&gt; · global.drop.background → surface.floating
                </Text>
                <Surface token={TOKENS.tone1} label="Card in drop" />
              </Box>
            </Drop>
          )}
          {showLayer && (
            <Layer
              position="center"
              onEsc={() => setShowLayer(false)}
              onClickOutside={() => setShowLayer(false)}
              data-surface-token="layer-component"
              data-surface-label="Grommet Layer (theme)"
            >
              <Box pad="medium" gap="medium" width="medium">
                <Text weight={500}>
                  &lt;Layer&gt; · layer.background → surface.floating
                </Text>
                <Surface token={TOKENS.tone1} label="Card in Layer" note="tones restart from floating">
                  <Surface token={TOKENS.tone2} label="Nested in card" />
                </Surface>
                <Button label="Close" onClick={() => setShowLayer(false)} alignSelf="end" />
              </Box>
            </Layer>
          )}
        </Column>
        <Column>
          <Code title="sandbox/grommet-app/src/surfaces/theme.js (prototype of 9.0)">
            {`buildSurfaceTheme(hpe, surfaceTokens) = deepMerge(hpe, {
  global: {
    colors: {
      'surface-10': { light, dark }, …           // reference tier
      'background-surface-base': 'surface-10', … // from the collection
      background: { light, dark },               // = surface.base (25)
    },
    drop: { background: 'background-surface-floating' },
  },
  card:  { container: { background: 'background-surface-tone-1' } },
  layer: { background: 'background-surface-floating' },
  tip:   { content: { background: 'background-surface-floating' } },
});
themes = { default: build(hpe, surface), toned: build(hpe, toned) }`}
          </Code>
          <ThemeFacts />
        </Column>
      </Columns>
    </Slide>
  );
};

/* 8 ---------------------------------------------------------------------- */
export const FloatingSlide = () => {
  const { colorMode } = useMode();
  return (
    <Slide
      kicker="Floating"
      title="floating is a root over the page, and the tones restart from it"
      lead="It aliases the same step as tone.2 (decision 26). In light that means a white panel over a white page — the shadow is doing the work, and elevation is a component property, typical but not required."
    >
      <Columns>
        <ThemePane title={`default · ${colorMode}`} surfaceMode="default" colorMode={colorMode}>
          <Floating />
        </ThemePane>
        <ThemePane title={`toned · ${colorMode}`} surfaceMode="toned" colorMode={colorMode}>
          <Floating />
        </ThemePane>
      </Columns>
      <Columns>
        <Column>
          <Note title="What happens under toned">
            floating follows tone.2 onto step 30: grey.50 in light, grey.1000
            in dark — which is also the toned page, in <em>both</em> modes.
            The card inside is still tone.1 (white / grey.1300), so the chain
            inside the modal holds. But over the page a toned Layer in dark
            paints #292d3a on a #292d3a page and is separated by its shadow
            only, where shadows barely read — a situation default never has in
            dark (#22252e on #1d1f27). Not yet reviewed by design; it is one of
            the costs on slide 13.
          </Note>
        </Column>
        <Column>
          <Note title="Why not give floating its own value">
            A separate root value would stop being a member of the swap: under
            inversion it would strand (the base-alt problem, decision 11a). As
            an alias of tone.2 it inverts with everything else and the card in
            a modal and the card on the page keep using the same token.
          </Note>
        </Column>
      </Columns>
    </Slide>
  );
};

/* 9 ---------------------------------------------------------------------- */
export const InvertLight = () => (
  <Slide
    kicker="Part 3 · invertibility, light"
    title="Swap the values: grey page, white containers, grey nested"
    lead="Same tokens, same markup, no product change. toned re-aliases base ↔ tone.1 and lets tone.2 and floating follow the grey step. Both panes below are forced to light."
  >
    <Columns>
      <ThemePane title="default · light" surfaceMode="default" colorMode="light">
        <Chain />
      </ThemePane>
      <ThemePane title="toned · light" surfaceMode="toned" colorMode="light">
        <Chain />
      </ThemePane>
    </Columns>
    <Code title="surface.toned.json · the whole change">
      {`base     → color.surface.30   (was 10)   grey.50  page
tone.1   → color.surface.10   (was 30)   white    first container
tone.2   → color.surface.30   (was 20)   grey.50  nested
floating → color.surface.30   (was 20)   grey.50  over the page`}
    </Code>
  </Slide>
);

/* 10 --------------------------------------------------------------------- */
export const InvertDark = () => (
  <Slide
    kicker="Part 3 · invertibility, dark — determined, not decided"
    title="In dark the swap is a reordering, and on 10–30 it collapses to two values"
    lead="Dark holds three values and base is not a member of the pair. Only one step is grey in light (30), so toned base and toned tone.2 must both point at it — and in dark they share grey.1000. Both panes are forced to dark."
  >
    <Columns>
      <ThemePane title="default · dark" surfaceMode="default" colorMode="dark">
        <Chain />
      </ThemePane>
      <ThemePane title="toned · dark (as built)" surfaceMode="toned" colorMode="dark">
        <Chain />
      </ThemePane>
    </Columns>
    <Columns>
      <Column>
        <Note title="What is painted (both environments)">
          Page #292d3a (grey.1000), first container #1d1f27 (grey.1300), nested
          #292d3a again; Layer and Drop #292d3a, equal to the page. Every
          boundary is the 1300↔1000 step and 1200 is never used. Visibly
          different from default dark.
        </Note>
      </Column>
      <Column>
        <Note title="Status: not assessed — requires design review">
          This is the two-tone dark pattern #6020 reports tested badly
          (“excessive contrast”). #6071 says the inverted dark order should be
          looked at rather than assumed; it has not been looked at by design in
          either environment. The alternative that avoids it is on the next
          slide.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 11 --------------------------------------------------------------------- */
export const Decision = () => (
  <Slide
    kicker="For decision · not decided"
    title="Toned dark: two values on 10–30, or three on 40–60?"
    lead="Both routes give the specified light swap. They differ only in dark. All four toned-dark surfaces are below for each — page, container, nested, and a floating surface over the page with the shadow a real Layer uses. The tokens currently hold 10–30; 40–60 is simulated here, not built. This is a design decision to be made with both renderings in front of designers."
  >
    <Columns>
      <ThemePane title="default · dark (reference)" surfaceMode="default" colorMode="dark">
        <Chain compact />
        <Floating />
      </ThemePane>
      <ThemePane title="toned · dark · 10–30 (in the tokens now)" surfaceMode="toned" colorMode="dark">
        <Chain compact />
        <Floating />
      </ThemePane>
      <ThemePane title="toned · dark · 40–60 (option, simulated)" theme={tonedWithOptionalSteps} colorMode="dark">
        <Chain compact />
        <Floating />
      </ThemePane>
    </Columns>
    <Columns>
      <Column>
        <Note title="10–30 · what it gives">
          Three reference steps, one scale, as #6073 wrote them. Toned dark:
          page grey.1000, containers grey.1300, nested grey.1000, floating =
          page. base ≡ tone.2 in both modes.
        </Note>
      </Column>
      <Column>
        <Note title="40 / 50 / 60 · what it gives">
          Three more hidden reference steps — dark values copied from 10/20/30,
          light values swapped — so dark looks the same whether the surface
          mode is default or toned: 1300 / 1000 / 1200, floating 1200 on 1300.
          Built and verified through every output earlier on this branch
          before being removed, so it is known to work.
        </Note>
      </Column>
      <Column>
        <Code title="The option, if chosen">
          {`color.surface.40  grey.50 / grey.1300
color.surface.50  grey.50 / grey.1200
color.surface.60  white   / grey.1000
toned: base→40 tone.1→60 tone.2→50 floating→50`}
        </Code>
      </Column>
    </Columns>
  </Slide>
);

/* 12 --------------------------------------------------------------------- */
const COST_ROWS = [
  ['toned dark · page · container · nested · floating', '1000 · 1300 · 1000 · 1000', '1300 · 1000 · 1200 · 1200 (= default dark)'],
  ['distinct dark values', '2', '3'],
  ['floating vs base in dark', 'equal — #292d3a on #292d3a, shadow only', 'distinct — 1200 on 1300'],
  ['base carries a third value in toned (#6020\'s reason for base being a token)', 'no — base ≡ tone.2 in both modes', 'yes'],
  ['legacy grey-page team\'s dark on adopting toned (decision 11\'s purpose)', 'changes (today 1300 / 1000 / 1200)', 'unchanged'],
  ['#6020: “alternating only two tones in dark produced excessive contrast”', 'reproduces that pattern — needs design review', 'no'],
  ['reference tier', '3 steps, one scale', '6 steps, two chains; 3 more hidden variables'],
  ['consumer tokens / Figma public surface', 'unchanged', 'unchanged'],
  ['#6289 mapping (30 / 20 / 30 / 20)', 'rejected — tone.1 ≡ floating', 'rejected'],
];

export const CostTable = () => {
  const grid = {
    display: 'grid',
    gridTemplateColumns: '1.4fr 1fr 1fr',
    gap: '0 16px',
    alignItems: 'stretch',
  };
  const cell = { padding: '8px 0', borderBottom: '1px solid var(--border-weak, rgba(128,128,128,.3))' };
  return (
    <Slide
      kicker="For decision · the costs, side by side"
      title="What each route costs"
      lead="Light is identical under both. Every row below is about dark, and none of it has been reviewed by design yet. The write-up recommends neither route until that review happens."
    >
      <Box style={grid} flex={false}>
        <Text size="small" weight={500} style={cell}>&nbsp;</Text>
        <Text size="small" weight={500} style={cell}>10–30 (in the tokens now)</Text>
        <Text size="small" weight={500} style={cell}>40 / 50 / 60 (option, not built)</Text>
        {COST_ROWS.map(([k, a, b]) => [
          <Text key={`${k}-k`} size="small" style={cell}>{k}</Text>,
          <Text key={`${k}-a`} size="small" style={cell}>{a}</Text>,
          <Text key={`${k}-b`} size="small" style={cell}>{b}</Text>,
        ])}
      </Box>
      <Note title="One framing to keep in mind">
        If toned is primarily the migration route decision 11 describes, the
        40–60 option is the one that delivers its promise; if toned is
        primarily “the light swap, and dark is whatever falls out”, 10–30 is
        the honest minimum. That is the question for design, not for this
        phase.
      </Note>
    </Slide>
  );
};

/* 12 --------------------------------------------------------------------- */
export const FailureModes = () => (
  <Slide
    kicker="Part 4 · failure modes"
    title="The three ways to get it wrong, rendered"
    lead="Which are visible, which are greppable, and which are neither — the basis for the decision-17 guardrails."
  >
    <Columns>
      <Column>
        <Surface token={TOKENS.tone1} label="Self-nest · outer tone.1">
          <Surface token={TOKENS.tone1} label="Self-nest · inner tone.1 (error)" note="Invisible on screen; greppable: same token as nearest surface ancestor" />
        </Surface>
        <Surface token={TOKENS.base} label="Page" note="tone.2 directly on base">
          <Surface token={TOKENS.tone2} label="tone.2 on base" note="White on white in light; nothing mechanical catches it (decision 6)" border={{ color: 'border-weak' }} />
        </Surface>
      </Column>
      <Column>
        <Surface token={TOKENS.tone1} label="Shell panel · tone.1">
          <Surface token={TOKENS.tone1} label="Reusable widget with tone.1 hard-coded" note="Right on the page, self-nests here. It still inverts (decision 14)" border={{ color: 'border-weak' }} />
          <Surface token="#f7f7f7" label="Widget with #f7f7f7 hard-coded" note="Right by accident in default light, stranded by toned and by dark" border={{ color: 'border-weak' }} />
        </Surface>
      </Column>
    </Columns>
  </Slide>
);

/* 13 --------------------------------------------------------------------- */
export const FindingsCode = () => (
  <Slide
    kicker="Findings for developers · 1 of 2"
    title="The reference tier cannot stay hidden in code"
    lead="Figma hides color/surface/10–30 from publishing and designers never see them. CSS and the Grommet theme have no such option — those steps are what the four tokens alias."
  >
    <Columns>
      <Column>
        <Code title="dist/css/color.dark.css — must be there">
          {`[data-mode=dark] {
  --hpe-color-surface-10: var(--hpe-base-color-grey-1300);
  --hpe-color-surface-20: var(--hpe-base-color-grey-1200);
  --hpe-color-surface-30: var(--hpe-base-color-grey-1000);
}
/* surface.default.css only says
   --hpe-color-background-surface-base: var(--hpe-color-surface-10);
   filter the tier out and that resolves to nothing. */`}
        </Code>
        <Code title="theme.global.colors — must be there">
          {`'surface-10': { light: '#ffffff', dark: '#1d1f27' },
'surface-20': { light: '#ffffff', dark: '#22252e' },
'surface-30': { light: '#f7f7f7', dark: '#292d3a' },
'background-surface-base': 'surface-10',   // normalizeColor follows this`}
        </Code>
      </Column>
      <Column>
        <Note title="Why">
          The tier is the join between two independent mode axes: the Surface
          mode picks the step, the colour mode resolves it. Hiding it is a
          Figma publishing concern; in code it has to be emitted, and a
          consumer <em>can</em> write <Mono>background=&quot;surface-10&quot;</Mono>.
        </Note>
        <Note title="Guard it the other way">
          <Mono>[INTERNAL]</Mono> descriptions on the tokens, and the
          alias-direction lint in the tests: surface files may alias{' '}
          <Mono>color.surface.*</Mono> only, and the tier may alias primitives
          only. Not a filter on the build.
        </Note>
        <Note title="toned is a theme, not a themeMode">
          Grommet&apos;s themeMode stays light / dark. toned is a second{' '}
          <Mono>buildTheme</Mono> result: <Mono>&lt;Grommet theme=&#123;hpeToned&#125;&gt;</Mono>.
          Two axes, two mechanisms.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 14 --------------------------------------------------------------------- */
export const FindingsMore = () => (
  <Slide
    kicker="Findings for developers · 2 of 2"
    title="Four more things the pipeline taught us"
  >
    <Columns>
      <Column>
        <Note title="Root background stays a { light, dark } pair (decision 25)">
          Grommet derives <Mono>theme.dark</Mono> from the brightness of{' '}
          <Mono>global.colors.background</Mono>. Resolve surface.base to its
          pair rather than aliasing it; verified false / true / false / true
          across the four combinations (see the theme facts on the wiring
          slide).
        </Note>
        <Note title="CSS composes at the root only">
          <Mono>data-mode</Mono> + <Mono>data-surface</Mono> on &lt;html&gt;
          need no combined selectors. But a <em>scoped</em>{' '}
          <Mono>data-mode=&quot;dark&quot;</Mono> region inherits surface
          properties already resolved against the parent&apos;s mode and paints
          light surfaces in a dark region. Root-level switching is what 11b
          promises; scoped regions would need the surface declarations repeated
          inside each mode block.
        </Note>
      </Column>
      <Column>
        <Note title="Component tokens that alias a surface">
          Re-pointing <Mono>drop.default.background</Mono> at{' '}
          <Mono>surface.floating</Mono> fails the <em>colour</em> build, because
          component colour tokens are folded into color.&lt;mode&gt;.css. The
          fix is adding the Surface file to that build&apos;s sources; the emitted
          value is a mode-agnostic <Mono>var()</Mono>.
        </Note>
        <Note title="Greppable vs not">
          Self-nesting is a one-line DOM/JSX check (same token as nearest
          surface ancestor). tone.2 on base and a hard-coded tone are not
          mechanically detectable; a hard-coded <em>hex</em> is the case that
          strands under inversion and under dark.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 15 --------------------------------------------------------------------- */
export const Scorecard = () => (
  <Slide kicker="Exit criteria" title="Scorecard" lead="G = grommet-app, N = native-web, F = generated Figma payload + export round trip (no live file was synced).">
    <Columns>
      <Column>
        <Note title="Part 1 · build and resolution — pass (G, N, F)">
          Correct CSS, ESM, Grommet outputs; one alias per token, correct in
          both modes; values match the spec in every output.
        </Note>
        <Note title="Part 2 · alternation on a real screen — pass (G, N)">
          Distinguishable at every step, no depth ceiling, card in modal and
          card on page use one token. Default dark reads as a three-value
          progression (1300 → 1000 → 1200); toned dark is two values and is
          <em> not assessed</em> — it needs design review.
        </Note>
        <Note title="Part 3 · invertibility — light pass; dark for decision">
          Light: value swap, no token change on any screen, both environments.
          Dark: determined for both routes (10–30: 1000 / 1300 / 1000 /
          floating = page; 40–60: 1300 / 1000 / 1200) and rendered side by
          side, but not reviewed by design and not decided. Shell after
          inversion reviewed; floating after inversion mechanically holds,
          visually not assessed.
        </Note>
      </Column>
      <Column>
        <Note title="Part 4 · failure modes — as expected (G, N)">
          Self-nest detectable (absence on screen, present in the DOM); tone.2
          on base and hard-coded tones not mechanically caught.
        </Note>
        <Note title="Part 5 · theme wiring — pass (G)">
          Card, Layer, Drop, Tip on the right surfaces in both modes; tokens
          present in theme.global.colors. Toast not covered.
        </Note>
        <Note title="Not covered">
          Live Figma file (Parts 2/4/5 in Figma); toast; toned dark not
          visually reviewed in either environment; the docs app does not know
          the surface / toned exports yet. Findings are drafted for #6020, not
          yet written back.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 16 --------------------------------------------------------------------- */
export const WhereToLook = () => (
  <Slide kicker="Where to look" title="Source, outputs and the live pages">
    <Columns>
      <Column>
        <Code title="packages/hpe-design-tokens">
          {`tokens/semantic/color.light.json · color.dark.json   color.surface.10–30
tokens/semantic/surface.default.json · surface.toned.json
src/scripts/build-style-dictionary.js               Surface collection block
src/formats/cssCollectionModes.ts                   css/variables-collection-modes
src/semantic_color_core.ts                          surface target + family
src/tests/surface_collection.test.ts                16 tests
dist/css/surface.*.css · dist/grommet/surface.*.js · dist/esm/surface.js`}
        </Code>
        <Code title="sandbox">
          {`grommet-app/src/surfaces/theme.js        buildSurfaceTheme prototype
grommet-app/src/surfaces/pages/*         validation pages
grommet-app/src/presentation/*           this deck
native-web/surfaces.js · css/surfaces.css  plain-CSS consumer`}
        </Code>
      </Column>
      <Column>
        <Note title="Live pages">
          <Anchor href="/surfaces.html" label="grommet-app validation pages (/surfaces.html)" />
          <Anchor href="http://localhost:5182/surfaces.html" label="native-web validation pages (:5182/surfaces.html)" />
          <Text size="small" color="text-weak">
            Both expose <Mono>window.__runSurfaceMatrix()</Mono>, which sweeps
            every page × surface mode × colour mode and returns the painted
            colours.
          </Text>
        </Note>
        <Note title="Run it">
          <Code>
            {`pnpm --filter hpe-design-tokens build
pnpm --filter hpe-design-tokens test
cd sandbox/grommet-app && pnpm exec vite --port 5181
cd sandbox/native-web  && pnpm exec vite --port 5182`}
          </Code>
        </Note>
      </Column>
    </Columns>
  </Slide>
);

