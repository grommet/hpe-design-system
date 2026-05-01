# Notification — tokens.md

Platform-agnostic visual token specification for the `notification` component.
All token names confirmed against `hpe-design-tokens` dist CSS files.
No framework references.

---

## How to read this file

| Column | Meaning |
|---|---|
| Property | The CSS property this token sets |
| State | The visual state it applies to |
| Layer | `C` = component token, `S` = semantic token |
| CSS variable | The confirmed token name |
| Notes | Context, constraint cross-references, or gap refs |

Markers on token names:
- _(none)_ — confirmed present in `hpe-design-tokens`
- `*` — camelCase pattern applied, not fully confirmed
- `⛔` — confirmed absent — logged as GAP

---

## 1 — Container

The outer flex row wrapper. Present for all three kinds: inline, global, toast.

### 1a — Background

Status backgrounds apply to inline and global kinds only.
Toast always uses `background-front` regardless of status — see constraints §4.

| Property | Status | Kind | Layer | CSS variable | Notes |
|---|---|---|---|---|---|
| background | — | toast (all statuses) | S | `--hpe-color-background-front` | Toast never uses a status background |
| background | critical | inline, global | S | `--hpe-color-background-critical` | |
| background | warning | inline, global | S | `--hpe-color-background-warning` | |
| background | normal | inline, global | S | `--hpe-color-background-ok` | |
| background | unknown | inline, global | S | `--hpe-color-background-unknown` | |
| background | info | inline, global | S | `--hpe-color-background-info` | |

### 1b — Shape and elevation

| Property | State | Kind | Layer | CSS variable | Notes |
|---|---|---|---|---|---|
| border-radius | rest | inline, toast | S | `--hpe-radius-xsmall` | |
| border-radius | rest | global | S | `--hpe-radius-none` | Global spans full width — no rounded corners |
| box-shadow | rest | toast | S | `--hpe-shadow-medium` | Floating card elevation — see constraints §4 |

### 1c — Padding

The outer container padding is split between the content area (start side) and
the CloseButton (end side) to avoid double-padding when the close button is
present. See constraints §1 and §8 (CloseButton) for the end-side padding.

| Property | Kind | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| padding-block | inline, toast | S | `--hpe-spacing-3xsmall` | 6px | Top and bottom |
| padding-inline-start | inline, toast | S | `--hpe-spacing-xsmall` | 12px | Start side only; end side on CloseButton |
| padding-block | global | S | `--hpe-spacing-3xsmall` | 6px | Same as inline |
| padding-inline-start | global | S | `--hpe-spacing-xlarge` | 48px | Wide horizontal band — matches close button end padding |

### 1d — Internal layout gap

| Property | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|
| gap (content area → CloseButton) | S | `--hpe-spacing-xsmall` | 12px | Flex gap between [IconContainer + TextContainer] and [CloseButton] |

### 1e — z-index (toast kind only)

No notification-specific z-index token exists in `hpe-design-tokens`.
See GAP-002.

| Property | Kind | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| z-index | toast | S | `--hpe-drop-default-zIndex` | 110 | GAP-002 workaround — confirmed present in components.css; used because no notification-specific token exists |

---

## 2 — IconContainer

Wrapper around the status icon. Provides the gap between the icon and the
TextContainer via padding-inline-end only.

| Property | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|
| padding-inline-end | S | `--hpe-spacing-xsmall` | 12px | Gap from icon to TextContainer |

---

## 3 — StatusIcon

The status icon rendered inside IconContainer. See constraints §2.

### 3a — Icon component names (from `@hpe-design/icons-grommet`)

| Status | Icon component | Notes |
|---|---|---|
| critical | `StatusCritical` | |
| warning | `StatusWarning` | |
| normal | `StatusGood` | |
| unknown | `StatusUnknown` | |
| info | `Info` | |

Close button icon: `Close` (from `@hpe-design/icons-grommet`)

### 3b — Size and color

| Property | Status | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| width, height | all | S | `--hpe-icon-medium-size` | 16px | `medium` icon size from reference |
| color | critical | S | `--hpe-color-icon-critical` | | |
| color | warning | S | `--hpe-color-icon-warning` | | |
| color | normal | S | `--hpe-color-icon-ok` | | |
| color | unknown | S | `--hpe-color-icon-unknown` | | |
| color | info | S | `--hpe-color-icon-info` | | |

---

## 4 — TextContainer

Vertical flex column holding Title and Message. See constraints §11.

| Property | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|
| gap (title → message) | S | `--hpe-spacing-medium` | 24px | Vertical gap between Title and Message; confirmed from reference theme |

> **Note on 24px gap:** `--hpe-spacing-medium` (24px) is confirmed from the
> reference theme entry (`textContainer.gap: 'medium'`). This is the
> intentional HPE design decision — not an error.

---

## 5 — Title

The primary label of the notification.

### 5a — Typography

| Property | State | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| font-size | rest | S | `--hpe-text-medium-fontSize` | 1rem | |
| line-height | rest | S | `--hpe-text-medium-lineHeight` | 1.5rem | |
| font-weight | rest | S | `--hpe-fontWeight-medium` | 500 | Not bold (700); medium (500) — confirmed from theme |
| text-align | rest | — | _(no token)_ | left | Set literally — see constraints §10 |

### 5b — Color per status × kind

Toast always overrides per-status title colors. See constraints §4.

| Status | Kind | Layer | CSS variable | Notes |
|---|---|---|---|---|
| critical | inline, global | S | `--hpe-color-text-onCritical-strong` | |
| warning | inline, global | S | `--hpe-color-text-onWarning-strong` | |
| normal | inline, global | S | `--hpe-color-text-onOk-strong` | |
| unknown | inline, global | S | `--hpe-color-text-onUnknown-strong` | |
| info | inline, global | S | `--hpe-color-text-onInfo-strong` | |
| all statuses | toast | S | `--hpe-color-text-strong` | Toast always uses strong text regardless of status |

---

## 6 — Message

Body text displayed below the Title (column layout for inline/toast) or
inline with the Title (row layout for global).

### 6a — Typography

| Property | State | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| font-size | rest | S | `--hpe-text-medium-fontSize` | 1rem | |
| line-height | rest | S | `--hpe-text-medium-lineHeight` | 1.5rem | |
| font-weight | rest | S | `--hpe-fontWeight-regular` | 400 | |
| text-align | rest | — | _(no token)_ | left | Set literally — see constraints §10 |

### 6b — Color per status × kind

| Status | Kind | Layer | CSS variable | Notes |
|---|---|---|---|---|
| critical | inline, global | S | `--hpe-color-text-onCritical` | |
| warning | inline, global | S | `--hpe-color-text-onWarning` | |
| normal | inline, global | S | `--hpe-color-text-onOk` | |
| unknown | inline, global | S | `--hpe-color-text-onUnknown` | |
| info | inline, global | S | `--hpe-color-text-onInfo` | |
| all statuses | toast | S | `--hpe-color-text-default` | Toast always uses default text |

### 6c — Message text trailing margin (before first inline action)

| Property | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|
| margin-inline-end | S | `--hpe-spacing-3xsmall` | 6px | Space between message text and first action |

---

## 7 — Actions

Zero or more inline anchor or button links appended after the message text.

| Property | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|
| margin-inline-end | S | `--hpe-spacing-3xsmall` | 6px | Space after each action before the next |

**Focus state** — all three tokens applied together (constraints §6):

| Property | Layer | CSS variable |
|---|---|---|
| outline | S | `--hpe-focusIndicator-outline` |
| outline-offset | S | `--hpe-focusIndicator-outlineOffset` |
| box-shadow | S | `--hpe-focusIndicator-boxShadow` |

**Hover / active:** Delegated to the Anchor or Button component's own token
layer. No notification-specific tokens exist. See GAP-003.

---

## 8 — CloseButton

Dismiss button at the end of the container. Conditional — only present when
an `onClose` handler is provided. See constraints §9.

### 8a — Padding (end side)

The CloseButton carries `padding-inline-end` and `padding-block` to provide
the end-side outer spacing that the container's `padding-inline-start` covers
on the start side. This prevents double padding.

| Property | Kind | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| padding-block | inline, toast | S | `--hpe-spacing-3xsmall` | 6px | Matches container padding-block |
| padding-inline-end | inline, toast | S | `--hpe-spacing-xsmall` | 12px | End-side outer spacing |
| padding-block | global | S | `--hpe-spacing-3xsmall` | 6px | Matches container padding-block |
| padding-inline-end | global | S | `--hpe-spacing-xlarge` | 48px | Matches global start-side padding |

### 8b — Icon

| Property | State | Layer | CSS variable | Resolved | Notes |
|---|---|---|---|---|---|
| width, height | rest | S | `--hpe-icon-medium-size` | 16px | Same size as StatusIcon |
| color | rest | S | `--hpe-color-icon-default` | | Default interactive icon color |

### 8c — Focus state

All three tokens applied together — constraints §6.

| Property | Layer | CSS variable |
|---|---|---|
| outline | S | `--hpe-focusIndicator-outline` |
| outline-offset | S | `--hpe-focusIndicator-outlineOffset` |
| box-shadow | S | `--hpe-focusIndicator-boxShadow` |

**Hover / active:** Delegated to the Button component's own token layer.
No notification-specific tokens exist. See GAP-003.
