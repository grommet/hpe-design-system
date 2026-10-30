# Shell prototype

An interactive prototype of the proposed HPE GreenLake shell, built with the
HPE Design System (`grommet` + `grommet-theme-hpe` + `@hpe-design/icons-grommet`).

It is a separate, deliberately small sandbox app: no theme-version switching,
no token tooling, no router. It exists to show the shell anatomy and how the
regions work together.

## Run it

```bash
pnpm install
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
preview; no Netlify changes are needed. The prototype has no dependency on
`@shared/hooks` or `hpe-design-tokens`, so that build stays self-contained.
To restore the demo app, point `main.jsx` back at `./App.jsx`.

## What it demonstrates

| # | Scenario | How to get there |
|---|----------|------------------|
| 1 | HPE GreenLake home | Default view, or **Home** in the rail / the brand logo. Follows the overview dashboard template: *Health overview* (server health, firmware compliance, utilization, subscriptions — figures reconcile with the Compute overview and verdicts drill into it), *This week at a glance* (cost trend, needs attention, SLA, devices onboarded this week, CPU demand), *Discover services* |
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

## Temporary colours

The design inverts today's page/card relationship (white page, grey cards) and
uses raw hex values for those two surfaces. They are hard-coded once in
`src/theme.js` as `shell-page` (`#ffffff`) and `shell-card` (`#f7f7f7`) and
should be swapped for the official tokens when the theme update ships. The
shell chrome is `shell-card`, with the rail one `background-contrast` layer
darker so it reads as a separate region from the local nav. Everything else
uses HPE theme tokens.
