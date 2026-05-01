# Notification — tokens.md

All visual design tokens required to style the Notification component.
No framework references. No hardcoded values.

> **Note:** No `--hpe-notification-*` component tokens exist in
> `hpe-design-tokens`. All tokens are semantic (S layer). See GAP-001.

---

## Legend

| Symbol | Meaning |
|---|---|
| `C` | Component token (`components.hpe.*`) |
| `S` | Semantic token (`hpe.color.*`, `hpe.spacing.*` etc.) |
| _(no marker)_ | Confirmed present in `hpe-design-tokens` |
| `*` | Unverified — camelCase pattern applied but not confirmed |
| `⛔` | Confirmed missing — logged as GAP-XXX |

---

## Container

The root element of the notification. Appearance varies by `kind`
(`inline`, `global`, `toast`) and `status`.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| background-color | rest | S | hpe.color.background.critical | `--hpe-color-background-critical` | status=critical, kind=inline or global |
| background-color | rest | S | hpe.color.background.warning | `--hpe-color-background-warning` | status=warning, kind=inline or global |
| background-color | rest | S | hpe.color.background.ok | `--hpe-color-background-ok` | status=normal, kind=inline or global |
| background-color | rest | S | hpe.color.background.info | `--hpe-color-background-info` | status=info, kind=inline or global |
| background-color | rest | S | hpe.color.background.unknown | `--hpe-color-background-unknown` | status=unknown, kind=inline or global |
| background-color | rest | S | hpe.color.background.front | `--hpe-color-background-front` | kind=toast, all statuses |
| border-radius | rest | S | hpe.radius.xsmall | `--hpe-radius-xsmall` | kind=inline or toast |
| border-radius | rest | S | hpe.radius.none | `--hpe-radius-none` | kind=global |
| padding-inline (x) | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | kind=inline or toast |
| padding-block (y) | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | all kinds |
| padding-inline (x) | rest | S | hpe.spacing.xlarge | `--hpe-spacing-xlarge` | kind=global |
| gap | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | horizontal gap between IconContainer and TextContainer |

---

## StatusIcon

The status-specific icon. Defaults to a preset per status; can be
overridden via the `icon` prop. Conditionally replaced by the custom icon
when provided.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.icon.critical | `--hpe-color-icon-critical` | status=critical |
| color | rest | S | hpe.color.icon.warning | `--hpe-color-icon-warning` | status=warning |
| color | rest | S | hpe.color.icon.ok | `--hpe-color-icon-ok` | status=normal |
| color | rest | S | hpe.color.icon.info | `--hpe-color-icon-info` | status=info |
| color | rest | S | hpe.color.icon.unknown | `--hpe-color-icon-unknown` | status=unknown |
| size (width + height) | rest | S | hpe.icon.medium.size | `--hpe-icon-medium-size` | shared with CloseButton |

---

## IconContainer

Wraps the StatusIcon. Provides right-side spacing between icon and text.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| padding-inline-end (right) | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | right padding only |

---

## TextContainer

Wraps the Title and Message. Provides vertical gap between them.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| gap | rest | S | hpe.spacing.medium | `--hpe-spacing-medium` | vertical gap between title and message |

---

## Title

Primary heading text of the notification. Required.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.text.onCritical.strong | `--hpe-color-text-onCritical-strong` | status=critical, kind=inline or global |
| color | rest | S | hpe.color.text.onWarning.strong | `--hpe-color-text-onWarning-strong` | status=warning, kind=inline or global |
| color | rest | S | hpe.color.text.onOk.strong | `--hpe-color-text-onOk-strong` | status=normal, kind=inline or global |
| color | rest | S | hpe.color.text.onInfo.strong | `--hpe-color-text-onInfo-strong` | status=info, kind=inline or global |
| color | rest | S | hpe.color.text.onUnknown.strong | `--hpe-color-text-onUnknown-strong` | status=unknown, kind=inline or global |
| color | rest | S | hpe.color.text.strong | `--hpe-color-text-strong` | kind=toast, all statuses |
| font-weight | rest | S | hpe.fontWeight.medium | `--hpe-fontWeight-medium` | all statuses, all kinds |
| font-size | rest | S | hpe.text.medium.fontSize | `--hpe-text-medium-fontSize` | |
| line-height | rest | S | hpe.text.medium.lineHeight | `--hpe-text-medium-lineHeight` | |

---

## Message

Optional body/description text. Rendered beneath the title in column
layout; inline with the title in row layout.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.text.onCritical | `--hpe-color-text-onCritical` | status=critical, kind=inline or global |
| color | rest | S | hpe.color.text.onWarning | `--hpe-color-text-onWarning` | status=warning, kind=inline or global |
| color | rest | S | hpe.color.text.onOk | `--hpe-color-text-onOk` | status=normal, kind=inline or global |
| color | rest | S | hpe.color.text.onInfo | `--hpe-color-text-onInfo` | status=info, kind=inline or global |
| color | rest | S | hpe.color.text.onUnknown | `--hpe-color-text-onUnknown` | status=unknown, kind=inline or global |
| color | rest | S | hpe.color.text.default | `--hpe-color-text-default` | kind=toast, all statuses |
| font-size | rest | S | hpe.text.medium.fontSize | `--hpe-text-medium-fontSize` | |
| font-weight | rest | S | hpe.fontWeight.regular | `--hpe-fontWeight-regular` | |
| line-height | rest | S | hpe.text.medium.lineHeight | `--hpe-text-medium-lineHeight` | |
| margin-inline-end (right) | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | spacing between message text and first action |

---

## CloseButton

Icon button that dismisses the notification. Conditional — only rendered
when `onClose` is provided.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| icon color | rest | S | hpe.color.icon.default | `--hpe-color-icon-default` | |
| size (width + height) | rest | S | hpe.icon.medium.size | `--hpe-icon-medium-size` | shared with StatusIcon |
| padding-inline (x) | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | |
| padding-block (y) | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | |
| outline | focus | S | hpe.focusIndicator.outline | `--hpe-focusIndicator-outline` | all three focus tokens must be applied together |
| outline-offset | focus | S | hpe.focusIndicator.outlineOffset | `--hpe-focusIndicator-outlineOffset` | |
| box-shadow | focus | S | hpe.focusIndicator.boxShadow | `--hpe-focusIndicator-boxShadow` | |

> **Delegation note:** The `hover` and `active` states for the CloseButton
> are provided by the underlying Button component's own token layer — they
> are not defined as notification-specific tokens. See GAP-003.

---

## Actions

Optional inline action link(s). Rendered inside the Message area.
Action link colour and focus ring are inherited from the Anchor/Button
component tokens and are not redefined here.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| margin-inline-end (right) | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | right spacing after each action link |

---

## FloatingLayer (toast kind only)

The fixed-position overlay that positions toast notifications on screen.
This part has no visual styling of its own beyond positioning; the
Container styles apply inside it.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| z-index | rest | ⛔ | — | — | No z-index token for toast overlay — see GAP-002; use `--hpe-drop-default-zIndex` as workaround |
