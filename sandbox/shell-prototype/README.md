# Shell prototype

An interactive prototype of the proposed HPE GreenLake shell, built with the
HPE Design System (`grommet` + `grommet-theme-hpe` + `@hpe-design/icons-grommet`).

It is a separate, deliberately small sandbox app: no theme-version switching
and no router. It exists to show the shell anatomy and how the regions work
together. On this branch it is also the harness for comparing surface-token
architectures; see [Surface token previews](#surface-token-previews).

## Run it

```bash
pnpm install
pnpm --filter hpe-design-tokens build   # the theme is built from these
pnpm start:shell-prototype      # or: pnpm --filter shell-prototype dev
```

Other scripts (run from this folder): `pnpm build`, `pnpm preview`, `pnpm lint`.

The app is a static Vite build (`dist/`), so it can be published anywhere static
files are served (Netlify, GitHub Pages, S3). A `_redirects` file is included for
Netlify-style SPA hosting.

### Deploy preview

On this branch the demo app (`sandbox/grommet-app`) renders the prototype
instead of itself — its `src/main.jsx` imports `../../shell-prototype/src/App.jsx`
— so the demo app's existing Netlify deploy preview *is* the prototype
preview; no Netlify changes are needed. The prototype builds its theme from
the workspace `hpe-design-tokens` (`src/theme.js`), so that package has to be
built before the app is. To restore the demo app, point `main.jsx` back at
`./App.jsx`.

## What it demonstrates

| # | Scenario | How to get there |
|---|----------|------------------|
| 1 | HPE GreenLake home | Default view, or **Home** in the rail / the brand logo. Follows the overview dashboard template: *Health overview* (server health, firmware compliance, utilization, subscriptions — figures reconcile with the Compute overview and verdicts drill into it), *This week at a glance* (incl. devices by location), *Discover services* |
| 2 | Compute home | Rail → **Services** → *HPE Compute Ops Management* (also via **Recent**, the home "My services" widget, or the pinned dock) |
| 3 | Copilot panel open | Rail → **GreenLake AI** (sparkle). Close with the X in the panel or click the sparkle again. The expand icon (or "Open in full screen" in the panel menu) moves the conversation into the content area; contract/"Exit full screen" returns it |
| 4 | Copilot "nav panel" | Opens in the navigation slot together with the panel; shows favorites + chat/canvas history. Pick a session to load it; send a prompt to append a (simulated) reply |
| 5 | Local navigation | Inside any service the nav slot shows that service's own tree (Compute has expandable sections). The rail toggle collapses it |
| 6 | Global navigation | Rail entries **Home, Recent, Services, Customers, Asset explorer, IAM and administration, Communities, Legal & financial** each open their sub-items in the navigation slot (content mirrors the old hamburger menus) |

Also wired up: labelled **Region** / **Workspace** selectors and the
workspaces-and-regions **hub** (right panel, design system Selector pattern)
in the header; **pin / unpin** a
service to the rail dock via the bookmark in the nav header; **Help**,
**Feedback** (dialog), **Notifications** and **Appearance** (light/dark) in the
user section of the rail; the initials **Avatar** uses an accent background.

## Anatomy → code

| Region | Component | Notes |
|--------|-----------|-------|
| Global rail — capability (top) | `components/GlobalRail/GlobalRail.jsx` | Collapse toggle, pinned *current service* tile, capabilities, pinned-services dock |
| Global rail — user (bottom) | `components/GlobalRail/UserRail.jsx` | Help, feedback, notifications, appearance, account |
| Local side nav | `components/LocalNav/*` | One slot, three panels: `ServiceNav`, `CapabilityNav`, `CopilotNav`. `NavItem` uses the design system navigation pattern (selected marker + `background-active`) |
| Global header | `components/GlobalHeader/GlobalHeader.jsx` | Brand (home), search, Region/Workspace selectors, hub button |
| Primary content area | `pages/*` | `HomePage` (+ `home/HealthOverview`, `home/WeekAtAGlance`, `home/DiscoverServices`), `ServicePage` (+ `ComputeOverview`, `MarvisOverview`), `PlatformPage` (+ `MyServices`; other platform pages are generic) |
| Contextual panel | `components/ContextualPanel/*` | `CopilotPanel`, `HubPanel` |

Shell state (what is in the nav slot, which panel is open, active service/page,
pins, workspace, conversations) lives in a single reducer:
`contexts/ShellContext.js`, provided by `contexts/ShellProvider.jsx`.
Mock data (services, capability menus, dashboards, conversations, tenants) is
in `data/`.

## Behaviour decisions (assumptions where the spec was silent)

- **Rail click = open menu, not navigate.** Capabilities open their sub-items
  in the nav slot; items inside navigate. Clicking the open capability again
  returns the slot to the current service's nav. *Home* and the brand logo
  navigate directly.
- **Current service is pinned at the top of the rail.** It shows GreenLake on
  the home page and the service icon once you enter one; clicking it restores
  that service's nav.
- **GreenLake home has no local nav** (the platform's own pages are
  capabilities). The rail toggle is disabled there.
- **My services** (Services → "View all my services") lists every service
  instance grouped by region with a region filter, per-group sort and
  Launch, following the GreenLake catalog. Instances carry a `category` and
  `region`; region codes map to display labels in `data/services.js`.
- **Platform pages keep the capability menu** as their local nav (e.g.
  *Asset explorer → Device inventory*), while services replace the slot wholesale.
- **GreenLake AI** opens both the nav-slot history panel and the right-hand
  chat panel; closing the chat returns the slot to the service nav.
- **Contextual panel shows one thing at a time** (GreenLake AI *or* the
  workspace hub).
- Compute (overview dashboard) and Mist AI (Marvis™) have fully designed
  landing pages; other services and every non-landing section render a
  generic page so nothing is a dead end. A service may declare a named
  landing page (`defaultPage`), which then titles the content area.
- **Marvis™** reinterprets the Mist AI design inside the shell: the topology
  uses Grommet `Diagram` on a brand-colour gradient canvas, "Latest
  updates" is page-level content (a content column, not the shell's
  contextual panel); conversation stays with GreenLake AI in the rail. The
  canvas gradient drifts slowly between blue- and green-dominant (two static
  gradient layers cross-faded on `opacity`, so it is compositor-only; 28.5 s
  per swap via `AMBIENT_MOTION` in `theme.js`; `prefers-reduced-motion`
  holds a fixed blend).
- Both panels are resizable: drag the handle on the panel's inner edge
  (also keyboard: arrow keys, Home/End; double-click resets). Bounds and
  defaults live in `PANEL_SIZES` in `theme.js`.
- The nav slot and contextual panel slide open and closed with a CSS
  transition (`components/SlidePanel.jsx`, 300ms ease-in-out — a touch
  slower than Grommet `Layer`'s 0.2s; tune `PANEL_MOTION` in `theme.js`).
  Pure CSS was chosen over `Collapsible`, which starts its transition from
  `requestAnimationFrame` and stalls in hidden/background documents. The
  outgoing panel stays rendered until the motion ends.
- On small viewports (`xsmall`/`small`) the nav slot and contextual panel
  become overlays. The header and pages respond to the width of the content
  sheet (`responsive="container"`), not the window, since open panels narrow it.

## Spacing rules

Pages follow `apps/docs` → templates/dashboards/OverviewDashboard: `Page`
uses the theme's `wide` kind (content capped at 1536px and centred —
`PAGE_KIND` in `theme.js`; the header uses the same kind so the brand stays
aligned with the content edge), is `flex={false}` so it grows past the
scrolling `Main`, pads `3xlarge` below, `PageContent` has a `medium` gap (never a `pad` — the
theme owns the responsive page margins), sections are `Box as="section"
gap="small"` separated by an `xlarge` gap, grids use a `small` gap, and cards
use a level-3 heading with a `medium` body pad. The global header is wrapped
in `Page`/`PageContent` so the brand lines up with the content edge.

## Surface token previews

The design inverts today's page/card relationship (white page, grey cards).
These previews compare three candidate architectures for the surface tokens
proposed in grommet/hpe-design-system#5969 on the same pages. The four
proposed tokens are not in `hpe-design-tokens` yet, so `src/theme.js` adds
them to the theme as colour names; nothing in the token package changes.
The pipeline version of the tokens is in #6714.

The app is one page with a bar on top:

- **Architecture** select: which architecture paints the page. The info
  button beside it explains the selected architecture in a paragraph.
- **Tabs**: Overview (what each architecture is, with a comparison table),
  Framed shell (the prototype itself), Beside shell (the same prototype with
  its panels sitting on the page), and five stress-test layouts: email
  client, kanban, word processor, node editor and knowledge base.
- **Annotations**: label each area with the token it is painted with. On the
  two shell tabs the bar also lists the token each role takes, so a change
  of architecture is visible at a glance. On a stress test, an area that
  takes no surface says which surface shows through it.
- **Grey page**: apply a peer surface theme. Light values are swapped (base
  and tone-2 take grey.50, tone-1 takes white) and dark is unchanged, because
  in dark the Landmark and legacy values already agree (decisions 11b, 4a).
  This is not the toned mode built in #6714, which also changes dark and
  points `floating` at the grey step; that option is not shown here.
- **Dark mode**.

The view is kept in the URL hash so it can be linked, for example
`#page=shell&arch=frame&grey=1&dark=1&notes=0`.

| Architecture | Tokens | Idea |
| --- | --- | --- |
| Tonal with roles | `base`, `tone-1`, `tone-2`, `floating` | Two unordered tones for containers plus two roots. The token set decided in #5969, read with the workspace kept `base` even when chrome wraps it, which would amend decisions 13 and 23. |
| Tonal scale | `tone-1`, `tone-2`, `floating` | Tones only; the page is a tone too. `tone-2` dark is re-valued to grey.1300. |
| Tonal + frame | `base`, `frame`, `floating`, `tone-1`, `tone-2` | Tonal with roles plus a `frame` root for chrome that surrounds the page. |

They were A′, C and D in an earlier exploration of eight architectures.

| Role | Tonal with roles | Tonal scale | Tonal + frame |
| --- | --- | --- | --- |
| Grommet root (hidden) | `base` | `tone-2` | `base` |
| Shell chrome (rail + local nav sit on it) | `tone-1` | `tone-1` | `frame` |
| Content sheet | `base` | `tone-2` | `base` |
| Contextual panel | `base` | `tone-2` | `base` |
| Cards, chat bubbles | `tone-1` | `tone-1` | `tone-1` |
| Panels inside a card | `tone-2` | `tone-2` | `tone-2` |
| Local nav inside a `Layer` | `floating` | `floating` | `floating` |

Light mode is the same picture under all three. In dark, chrome → sheet →
card → inner is grey 1000 → 1300 → 1000 → 1200 for Tonal with roles and
Tonal + frame, and 1000 → 1300 → 1000 → 1300 for Tonal scale.

The table above is the framed shell, where chrome wraps the page (#6708).
The Beside shell tab keeps the same anatomy and puts the chrome on the page
instead, as the examples in #6635 and #6660 do: the page is the root and
stays visible, and the rail, the local nav and the contextual panel are
rounded containers on it. Two roles change in every architecture (the
contextual panel and the cards in it), and under Tonal + frame the rail and
local nav change as well:

| Role | Framed shell | Beside shell |
| --- | --- | --- |
| Rail and local nav | `tone-1` (`frame` in Tonal + frame) | `tone-1` |
| Contextual panel | the page's token | `tone-1` |
| Cards in the contextual panel | `tone-1` | `tone-2` |

So a card takes a different tone in the contextual panel than on the page,
and Tonal + frame has no frame to paint. In dark, page → panel → card in
panel is grey 1300 → 1000 → 1200, or 1300 → 1000 → 1300 for Tonal scale.

Where things live:

- `src/surfaces.js`: the role → token table for each architecture and page
  theme.
- `src/theme.js`: the theme. It defines the four surface tokens, and
  `buildVariantTheme` applies what an architecture or page theme adds or
  re-values (`frame`, the grey theme, Tonal scale's `tone-2`). The token
  package is untouched.
- `src/components/common/Surface.jsx`: `Surface` paints a role, `SurfaceTag`
  labels it when annotations are on.
- `src/preview/`: the bar, the URL state, the Overview and the stress-test
  page.
- `src/layouts/`: the stress-test layouts, declared by role (`roles.js`).
  Their chips show the value actually painted, measured from the element.
  `LayoutFrame` stands in for the app and paints the page once, as the
  Grommet root does. Each layout's `appLevel` list in `catalog.js` is shown
  above it as "Applied at the app level": the page first, then the other
  top-level regions, including the ones that paint nothing and only show
  the page.

In the framed shell the rail is one `background-contrast` layer darker than
the chrome so it reads as a separate region from the local nav; in the
beside shell the rail and the local nav are separate containers. The chat
composer sits directly on
the contextual panel and takes no surface of its own, only a border.
Everything else uses HPE theme tokens.
