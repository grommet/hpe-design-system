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
        The surface token architecture was agreed on paper. This phase built
        it with prototype tokens and checked that it works end to end — in the
        build, in the browser, in the Grommet theme and in Figma. This deck is
        itself a grommet-theme-hpe render using the prototype Surface themes,
        so every container below is a live Grommet component carrying a real
        token. Use the switches above at any point — nothing here is a
        screenshot.
      </>
    }
  >
    <Columns>
      <Column>
        <Surface token={TOKENS.base} label="Page" note="surface.base — the page">
          <Chain compact />
        </Surface>
      </Column>
      <Column>
        <Floating note="surface.floating — over the page; containers alternate from it" />
      </Column>
    </Columns>
    <Text size="small" color="text-weak">
      Four tokens: base (the page), tone.1 and tone.2 (two container colours
      that alternate — a container takes whichever tone its parent is not),
      floating (anything over the page). Keyboard: ← → to move. The
      “values” switch shows the theme and painted colour on each surface.
    </Text>
  </Slide>
);

/* 2 ---------------------------------------------------------------------- */
const QUESTIONS = [
  [
    'Does it build?',
    'Four consumer tokens pointing at three internal values, through the real Style Dictionary pipeline, out as correct CSS, Grommet theme entries, ESM/CJS and docs — one alias per token, no mode special-casing.',
    'slides 3–6',
  ],
  [
    'Does it resolve on a real screen?',
    'A Grommet app via grommet-theme-hpe and a plain HTML/CSS page using only the built CSS: does every surface paint what its token says, in light and dark, and do the two agree pixel for pixel?',
    'slide 7',
  ],
  [
    'Does the alternation hold in practice?',
    'Page → card → panel → region; a shell wrapping a sheet; a modal with a card inside. Every level visibly different from the one around it, no depth limit, both modes, on realistic layouts and on real designs.',
    'slides 7–8',
  ],
  [
    'Can the look be inverted without touching a product?',
    'A second surface file re-points the same four names (a “toned” theme: grey page, white cards). Does every screen invert with no product change — and what happens in dark, which had never been tried?',
    'slides 11–14',
  ],
  [
    'Does the Grommet theme wire up?',
    'Card, Layer, Drop and Tip take the tokens from the theme; theme.dark still derives correctly; the tokens are in theme.global.colors.',
    'slide 9',
  ],
  [
    'Does it round-trip with Figma?',
    'The generated variables payload has the right shape — a Surface collection with modes, hidden internal values, visible consumer tokens — and exporting it back reproduces the token files.',
    'slide 6',
  ],
  [
    'Do the known failure modes behave as expected?',
    'Self-nesting, tone.2 placed directly on the page, a hard-coded tone: which are visible, which detectable, which neither?',
    'slide 15',
  ],
];

export const Claim = () => (
  <Slide
    kicker="What this phase set out to validate"
    title="Seven practical questions, not a conceptual one"
    lead="The architecture had been designed and agreed. The job here was to find out whether it survives contact with the build, the browser, the theme and Figma."
  >
    <Columns>
      <Column>
        {QUESTIONS.slice(0, 4).map(([q, a, where]) => (
          <Note key={q} title={q}>
            <Text size="small">{a}</Text>
            <Text size="xsmall" color="text-weak">
              {where}
            </Text>
          </Note>
        ))}
      </Column>
      <Column>
        {QUESTIONS.slice(4).map(([q, a, where]) => (
          <Note key={q} title={q}>
            <Text size="small">{a}</Text>
            <Text size="xsmall" color="text-weak">
              {where}
            </Text>
          </Note>
        ))}
        <Code title="How">
          {`token files  →  Style Dictionary  →  CSS · Grommet · ESM · docs
                                  →  Figma payload + round trip
consumers    →  grommet-app (this app) and native-web (plain CSS)
screens      →  3 layouts + 2 real designs, × 2 surface modes
                × 2 colour modes
evidence     →  getComputedStyle() on every surface, compared
                across environments`}
        </Code>
      </Column>
    </Columns>
  </Slide>
);

/* 2b --------------------------------------------------------------------- */
export const WhatWasAdded = () => (
  <Slide
    kicker="What was added · overview"
    title="Seven new tokens, two new files, and the plumbing to build them"
    lead="Everything below lives in packages/hpe-design-tokens and was built with the normal token pipeline. Nothing in the existing colour system was changed; the legacy back / front / floating tokens are untouched and now guarded by a test."
  >
    <Columns>
      <Column>
        <Note title="1 · Three internal colour values · in the existing colour files">
          <Code title="tokens/semantic/color.light.json  and  color.dark.json">
            {`color.surface.10   light: white      dark: grey.1300
color.surface.20   light: white      dark: grey.1200
color.surface.30   light: grey.50    dark: grey.1000`}
          </Code>
          <Text size="small" style={{ marginTop: 8 }}>
            Each one holds a light value and a dark value. They are
            implementation detail — hidden from Figma publishing, marked
            [INTERNAL] — and nobody styles a screen with them. Next slide.
          </Text>
        </Note>
      </Column>
      <Column>
        <Note title="2 · Four surface tokens · in a new Surface collection">
          <Code title="tokens/semantic/surface.default.json   (new file)">
            {`color.background.surface.base      → color.surface.10
color.background.surface.tone.1    → color.surface.30
color.background.surface.tone.2    → color.surface.20
color.background.surface.floating  → color.surface.20`}
          </Code>
          <Code title="tokens/semantic/surface.toned.json     (new file, the grey-page look)">
            {`color.background.surface.base      → color.surface.30
color.background.surface.tone.1    → color.surface.10
color.background.surface.tone.2    → color.surface.30
color.background.surface.floating  → color.surface.30`}
          </Code>
          <Text size="small" style={{ marginTop: 8 }}>
            These are what products use. Each points at one internal value;
            the file decides which. Slide 5.
          </Text>
        </Note>
      </Column>
    </Columns>
    <Note title="3 · Build, parser and tests · so the files become CSS, Grommet theme entries and Figma variables">
      One new block in the Style Dictionary build script, one new output
      format (CSS scoped to a data-surface attribute), two entries in the
      token-name parser, and a 16-test suite. Slide 6.
    </Note>
  </Slide>
);

/* 3 ---------------------------------------------------------------------- */
export const ReferenceTier = () => (
  <Slide
    kicker="What was added · 1 of 3 · the internal values"
    title="Three entries added to color.light.json and color.dark.json"
    lead="Named color.surface.10, .20 and .30. Each file gives them its own value: in color.light.json they are white, white and grey.50; in color.dark.json they are grey.1300, grey.1200 and grey.1000. They are not meant to be used directly — they exist so that one surface token can mean one colour in light and another in dark."
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
        <Note title="Why not point the surface tokens straight at grey.50 etc.?">
          A surface token lives in its own collection and can hold only one
          pointer — it cannot say “white in light, grey.1300 in dark”. So it
          points at color.surface.10, and color.surface.10 is the thing that
          already has a light value and a dark value, because it lives in the
          colour files that are split by mode. That is the whole job of
          these three entries.
        </Note>
        <Note title="Why 10 and 20 are both white in light">
          Deliberate. In light a page and a nested panel are both white (only
          the first container is grey). In dark they are three different
          greys, 10 darkest.
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
            question on slides 12–14, seen on a real screen.
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
            the costs on slide 14.
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
    kicker="Part 3 · the grey-page look, light mode"
    title="A grey page with white cards, with no product changing a thing"
    lead="Suppose a product wants a grey page instead of a white one. We do not touch its screens. We add a second surface file — surface.toned.json — in which the same four token names point at different internal values: base now points at the grey one, tone.1 at the white one. Load that file instead of surface.default.json (in Grommet: use the toned theme object) and every screen inverts. Both panes below are forced to light."
  >
    <Columns>
      <ThemePane title="default · light" surfaceMode="default" colorMode="light">
        <Chain />
      </ThemePane>
      <ThemePane title="toned · light" surfaceMode="toned" colorMode="light">
        <Chain />
      </ThemePane>
    </Columns>
    <Columns>
      <Column>
        <Code title="surface.toned.json · the whole change, four lines">
          {`base      → color.surface.30   (default points at .10)   page becomes grey.50
tone.1    → color.surface.10   (default points at .30)   cards become white
tone.2    → color.surface.30   (default points at .20)   nested panels grey.50
floating  → color.surface.30   (default points at .20)   modals grey.50`}
        </Code>
      </Column>
      <Column>
        <Note title="Why this is the point of the architecture">
          No product edited a screen, renamed a token or shipped a release.
          The tokens on every card, panel and page are exactly the ones they
          were. Only what the names resolve to changed, in one file. This is
          what “the pair inverts” on slide 2 means in practice.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 10 --------------------------------------------------------------------- */
export const InvertDark = () => (
  <Slide
    kicker="Part 3 · the grey-page look, dark mode — the open question"
    title="The same four lines, in dark, give a two-colour result"
    lead="The toned file changes what the tokens point at; it cannot change the internal values themselves, and each internal value carries a dark colour too. In light the swap was perfect. In dark the page and the nested panels end up the same grey, the cards the only other grey, and modals the same colour as the page. Both panes are forced to dark."
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
        <Note title="Why it happens">
          Only one of the three internal values is grey in light
          (color.surface.30). To make the page grey in light, base must point
          at it — and so must tone.2, for the nested panels. But .30 is also a
          specific dark grey (grey.1000). So in dark the page and the nested
          panels are forced to the same colour, and the three-step dark
          progression the default theme has (1300 → 1000 → 1200) becomes a
          two-step one (1000 → 1300 → 1000).
        </Note>
      </Column>
      <Column>
        <Note title="Status: not assessed — needs a design look">
          It is coherent (containers read as recesses) but it is visibly
          different from today’s dark, and the spec recorded that two-tone
          dark patterns tested badly in the past. Nobody has reviewed this
          rendering yet. It is not a defect in the pipeline — it is a
          consequence of having three internal values — and there is a way
          to avoid it, on the next slide.
        </Note>
      </Column>
    </Columns>
  </Slide>
);

/* 11 --------------------------------------------------------------------- */
export const Decision = () => (
  <Slide
    kicker="An option, not a decision"
    title="If the grey-page look should keep today’s dark mode, add three more internal values"
    lead="Nothing has to be decided now. The toned theme is not shipping, and this only matters if and when a product adopts it. But it is worth knowing the choice exists. Left: today’s dark. Middle: the toned theme in dark with the three internal values we have. Right: the toned theme in dark if we added three more internal values (40, 50, 60) whose dark colours copy 10–30 — then dark looks identical in both themes. The right pane is simulated; those values are not in the token files."
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
        <Note title="Keep three internal values (what is in the files now)">
          Simplest. The grey-page theme changes dark mode too: page and nested
          panels grey.1000, cards grey.1300, modals the same grey as the page.
          Fine if “toned” is meant as a light-mode look; a change for anyone
          who adopts it to keep what they have today.
        </Note>
      </Column>
      <Column>
        <Note title="Add three more (the option)">
          color.surface.40, .50 and .60 — light values swapped, dark values
          copied from 10/20/30 — and point the toned file at those. Then
          switching themes changes light mode and leaves dark exactly as it
          is. Cost: three more internal values nobody uses directly. It was
          built and verified on this branch before being taken out, so it is
          known to work; it was removed so the files hold only what the spec
          asked for.
        </Note>
      </Column>
      <Column>
        <Code title="What it would look like in the files">
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
  ['page and nested panels distinguishable in dark', 'no — same grey', 'yes'],
  ['a product adopting the grey-page theme keeps its current dark mode', 'no — dark changes too', 'yes'],
  ['matches a dark pattern the spec says tested badly (two alternating greys)', 'yes — needs a design look', 'no'],
  ['internal values', '3', '6 (three more that nobody uses directly)'],
  ['the four surface tokens products use', 'unchanged', 'unchanged'],
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
      kicker="The option · side by side"
      title="What each route costs — for when the question comes up"
      lead="This is not a decision we are forced into now; it only arises when a product wants the grey-page theme, and it can be made then with both renderings in front of designers. Light mode is identical under both routes, so every row is about dark. This work recommends neither."
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
        If the grey-page theme is mainly a way for existing products to keep
        the look they have today (which is what the decision log says it is
        for), the three extra values are what make that true in dark as well
        as light. If it is mainly “a light-mode swap, and dark is whatever
        follows”, three values are enough. That is a design question, and it
        can wait until someone needs the theme.
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
        <Note title="toned has to be a theme object; themeMode cannot carry it">
          Grommet&apos;s <Mono>themeMode</Mono> accepts only light / dark / auto and
          becomes a boolean, <Mono>theme.dark</Mono>, that 13 files in Grommet
          branch on — shadows and text contrast as well as colours. A second
          axis needs four combinations; a two-value switch cannot hold them.
          So you use both: <Mono>&lt;Grommet theme=&#123;hpeToned&#125; themeMode=&quot;dark&quot;&gt;</Mono>.
          Changing Grommet to make themeMode 2×2 would be a breaking change to
          a library HPE does not own, for an axis that is a product-level
          build choice rather than a user-level runtime one. Ask
          grommet-theme-hpe for <Mono>buildTheme(tokens, &#123; surface: &apos;toned&apos; &#125;)</Mono>{' '}
          instead — same mechanism, nicer packaging.
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
          <Anchor href="/native-web/surfaces.html" label="native-web validation pages (/native-web/surfaces.html)" />
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

