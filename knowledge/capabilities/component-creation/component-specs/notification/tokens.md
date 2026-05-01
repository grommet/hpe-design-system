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
| background-color | rest | S | hpe.color.background.front | `--hpe-color-background-front` | kind=toast, all statuses; see constraints §4 |
| border-radius | rest | S | hpe.radius.xsmall | `--hpe-radius-xsmall` | kind=inline or toast (6px) |
| border-radius | rest | S | hpe.radius.none | `--hpe-radius-none` | kind=global |
| padding-inline | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | kind=inline or toast (12px); see padding split note below |
| padding-block | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | all kinds (6px) |
| padding-inline | rest | S | hpe.spacing.xlarge | `--hpe-spacing-xlarge` | kind=global |
| box-shadow | rest | S | hpe.shadow.medium | `--hpe-shadow-medium` | kind=toast only; elevation of the floating notification card |
| text-align | rest | — | — | — | always `left` for all kinds and statuses; no token — see constraints §10 |

> **Padding split note:** When a CloseButton is present, container padding is
> split between the content area (left and block padding) and the close button
> area (right and block padding). Neither side adds new padding values — the
> same `--hpe-spacing-xsmall` / `--hpe-spacing-3xsmall` values are used, just
> distributed so that no double-padding occurs in the middle.

---

## StatusIcon

The status-specific icon. One of five named icons from the HPE icon library.
Can be replaced by a custom `icon` prop — see constraints §7.

### Icon component per status

| Status | Icon component | Package |
|---|---|---|
| `critical` | `StatusCritical` | `@hpe-design/icons-grommet` |
| `warning` | `StatusWarning` | `@hpe-design/icons-grommet` |
| `normal` | `StatusGood` | `@hpe-design/icons-grommet` |
| `info` | `Info` | `@hpe-design/icons-grommet` |
| `unknown` | `StatusUnknown` | `@hpe-design/icons-grommet` |

The icon component name is part of the spec, not just the color. Implementations
must use these exact icons unless the consumer overrides via the `icon` prop.

### Icon tokens

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.icon.critical | `--hpe-color-icon-critical` | status=critical |
| color | rest | S | hpe.color.icon.warning | `--hpe-color-icon-warning` | status=warning |
| color | rest | S | hpe.color.icon.ok | `--hpe-color-icon-ok` | status=normal |
| color | rest | S | hpe.color.icon.info | `--hpe-color-icon-info` | status=info |
| color | rest | S | hpe.color.icon.unknown | `--hpe-color-icon-unknown` | status=unknown |
| size (width + height) | rest | S | hpe.icon.medium.size | `--hpe-icon-medium-size` | shared with CloseButton icon (16px) |

---

## IconContainer

Wraps the StatusIcon. Provides right-side spacing between the icon and
the TextContainer. Does not set an alignment property of its own — icon
vertical alignment is governed by the outer layout; see constraints §11.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| padding-inline-end | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | right padding only (12px); separates icon from TextContainer |

---

## ContentRow gap

The gap on the outer container row — between the `[IconContainer + TextContainer]`
group and the `[CloseButton]`.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| gap | rest | S | hpe.spacing.xsmall | `--hpe-spacing-xsmall` | horizontal gap between content area and close button (12px) |

---

## TextContainer

Wraps Title and (optionally) Message. Controls vertical gap between them
in column layout (inline and toast kinds). In global kind (row layout) title
and message are inline; this gap does not apply.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| gap | rest | S | hpe.spacing.medium | `--hpe-spacing-medium` | vertical gap between Title and Message in column layout (24px) |

---

## Title

Primary heading text. Required.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.text.strong | `--hpe-color-text-strong` | kind=toast, all statuses; see constraints §4 |
| color | rest | S | hpe.color.text.onCritical.strong | `--hpe-color-text-onCritical-strong` | status=critical, kind=inline or global |
| color | rest | S | hpe.color.text.onWarning.strong | `--hpe-color-text-onWarning-strong` | status=warning, kind=inline or global |
| color | rest | S | hpe.color.text.onOk.strong | `--hpe-color-text-onOk-strong` | status=normal, kind=inline or global |
| color | rest | S | hpe.color.text.onInfo.strong | `--hpe-color-text-onInfo-strong` | status=info, kind=inline or global |
| color | rest | S | hpe.color.text.onUnknown.strong | `--hpe-color-text-onUnknown-strong` | status=unknown, kind=inline or global |
| font-weight | rest | S | hpe.fontWeight.medium | `--hpe-fontWeight-medium` | all statuses, all kinds |
| font-size | rest | S | hpe.text.medium.fontSize | `--hpe-text-medium-fontSize` | |
| line-height | rest | S | hpe.text.medium.lineHeight | `--hpe-text-medium-lineHeight` | |
| text-align | rest | — | — | — | always `left`; inherited from Container; see constraints §10 |

---

## Message

Optional body/description text. Rendered beneath the title in column layout
(inline, toast), or inline with title in row layout (global).

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| color | rest | S | hpe.color.text.default | `--hpe-color-text-default` | kind=toast, all statuses; see constraints §4 |
| color | rest | S | hpe.color.text.onCritical | `--hpe-color-text-onCritical` | status=critical, kind=inline or global |
| color | rest | S | hpe.color.text.onWarning | `--hpe-color-text-onWarning` | status=warning, kind=inline or global |
| color | rest | S | hpe.color.text.onOk | `--hpe-color-text-onOk` | status=normal, kind=inline or global |
| color | rest | S | hpe.color.text.onInfo | `--hpe-color-text-onInfo` | status=info, kind=inline or global |
| color | rest | S | hpe.color.text.onUnknown | `--hpe-color-text-onUnknown` | status=unknown, kind=inline or global |
| font-size | rest | S | hpe.text.medium.fontSize | `--hpe-text-medium-fontSize` | |
| font-weight | rest | S | hpe.fontWeight.regular | `--hpe-fontWeight-regular` | |
| line-height | rest | S | hpe.text.medium.lineHeight | `--hpe-text-medium-lineHeight` | |
| margin-inline-end | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | right margin on the message text span, before the first action (6px) |
| text-align | rest | — | — | — | always `left`; inherited from Container; see constraints §10 |

---

## Actions

Optional inline action link(s). Rendered inside the Message area.
Action link color, text-decoration, and focus ring are inherited from the
Anchor/Button component token layer and are not redefined here.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| margin-inline-end | rest | S | hpe.spacing.3xsmall | `--hpe-spacing-3xsmall` | right spacing after each action link (6px) |
| outline | focus | S | hpe.focusIndicator.outline | `--hpe-focusIndicator-outline` | all three focus tokens applied together — see constraints §6 |
| outline-offset | focus | S | hpe.focusIndicator.outlineOffset | `--hpe-focusIndicator-outlineOffset` | |
| box-shadow | focus | S | hpe.focusIndicator.boxShadow | `--hpe-focusIndicator-boxShadow` | |

> **Hover/active note:** Hover and active appearance for action links
> delegates to the Anchor/Button component token layer. See GAP-003.

---

## CloseButton

Icon button that dismisses the notification. Conditional — only rendered
when `onClose` is provided. Uses the `Close` icon from `@hpe-design/icons-grommet`.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| icon color | rest | S | hpe.color.icon.default | `--hpe-color-icon-default` | |
| icon size (width + height) | rest | S | hpe.icon.medium.size | `--hpe-icon-medium-size` | shared with StatusIcon |
| outline | focus | S | hpe.focusIndicator.outline | `--hpe-focusIndicator-outline` | all three focus tokens applied together — see constraints §6 |
| outline-offset | focus | S | hpe.focusIndicator.outlineOffset | `--hpe-focusIndicator-outlineOffset` | |
| box-shadow | focus | S | hpe.focusIndicator.boxShadow | `--hpe-focusIndicator-boxShadow` | |

> **Hover/active delegation:** Hover and active state appearance is provided
> by the underlying Button component's own token layer. No notification-specific
> hover or active tokens exist. See GAP-003.

---

## FloatingLayer (toast kind only)

The fixed-position overlay that positions toast notifications on screen.
The notification card shadow is defined on the Container above.
The FloatingLayer provides only positioning.

| Property | State | Layer | Token path | CSS variable | Notes |
|---|---|---|---|---|---|
| z-index | rest | ⛔ | — | — | No dedicated z-index token for toast overlay — see GAP-002; use `--hpe-drop-default-zIndex` as workaround |
