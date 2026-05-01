# Notification — mappings/radix.md

Platform-specific mapping for `@radix-ui/react-toast`.
References the platform-agnostic spec in the parent directory.

---

## 1 — How Radix implements this component

### What Radix provides

`@radix-ui/react-toast` provides:

- `Toast.Provider` — Context provider. Wraps the application. Configures
  global defaults (`duration`, `swipeDirection`, `label`).
- `Toast.Root` — The floating toast container. Manages open/closed state,
  auto-close timer, swipe-to-dismiss, pause-on-hover/focus, and keyboard
  dismiss (Escape). Emits `data-state="open|closed"`.
- `Toast.Title` — Semantic title element for the toast.
- `Toast.Description` — Semantic description/message element.
- `Toast.Action` — Action element. Requires `altText` for screen reader
  alternative. Safe to ignore per WCAG time-limit guidance.
- `Toast.Close` — Button to dismiss the toast. Closes `Toast.Root` on click.
- `Toast.Viewport` — Fixed-position container where toasts are rendered.
  Accessible via F8 hotkey.

### What Radix handles automatically

- Auto-close timer with pause on hover/focus/window blur.
- Swipe-to-dismiss gesture with CSS variable animation support.
- Live region announcement via ARIA (`role="status"` for background type,
  interrupt for foreground type).
- Keyboard interactions: Escape, Tab, Space, Enter on action/close.
- Toast stacking within the Viewport.

### What the spec requires that Radix does NOT provide natively

| Requirement | Radix gap |
|---|---|
| `kind='inline'` | Radix has no primitive for inline (embedded) notifications. |
| `kind='global'` | Radix has no primitive for full-width banner notifications. |
| Status-aware backgrounds and icon colors | Not in Radix — applied via CSS tokens. |
| Custom status icons | Not in Radix — rendered as children. |
| Action links (`actions` array) | Radix `Toast.Action` supports one action; multiple actions require mapping each entry. |

**Key consequence:** The Radix primitive only satisfies `kind='toast'`.
Inline and global kinds are implemented as plain semantic HTML elements
styled with the same tokens. See section 6.

---

## 2 — Anatomy → Radix primitive mapping

| Anatomy part | Radix component | Notes |
|---|---|---|
| Container (toast kind) | `Toast.Root` | `data-state="open\|closed"` drives visibility |
| Container (inline kind) | `<div role="status">` / `<div role="alert">` | Plain HTML; role depends on status (alert for critical) |
| Container (global kind) | `<div role="status">` / `<div role="alert">` | Plain HTML; full-width via CSS |
| StatusIcon | `<span aria-hidden="true">` wrapping icon SVG | Inside `IconContainer` |
| IconContainer | `<span className="hpe-notification-iconContainer">` | No Radix primitive |
| TextContainer | `<div className="hpe-notification-textContainer">` | No Radix primitive |
| Title (toast kind) | `Toast.Title` | Semantic heading in live region |
| Title (inline/global kind) | `<strong className="hpe-notification-title">` | Plain HTML |
| Message (toast kind) | `Toast.Description` | Semantic description in live region |
| Message (inline/global kind) | `<p className="hpe-notification-message">` | Plain HTML |
| CloseButton (toast kind) | `Toast.Close` | Handles dismiss; aria-label via `messages.close` |
| CloseButton (inline/global kind) | `<button className="hpe-notification-closeButton">` | Plain HTML; consumer wires `onClick` to `onClose` |
| Actions (toast kind) | `Toast.Action` (one per action) | `altText` required per action |
| Actions (inline/global kind) | `<a>` or `<button>` per action | Plain HTML anchors/buttons |
| FloatingLayer | `Toast.Viewport` + `Toast.Provider` | Provider at app root; Viewport placed where toasts appear |

---

## 3 — Props → Radix implementation

| Spec prop | Radix implementation | Notes |
|---|---|---|
| `title` | Children of `Toast.Title` (toast) / inner text of `<strong>` (inline/global) | |
| `message` | Children of `Toast.Description` (toast) / `<p>` text (inline/global) | |
| `status` | CSS class `hpe-notification--{status}` on Container | Drives CSS variable resolution for background and icon colors |
| `kind` | Selects Radix Toast vs plain HTML; adds CSS class `hpe-notification--{kind}` | |
| `onClose` | `onOpenChange` on `Toast.Root` (toast) / `onClick` on `<button>` (inline/global) | Toast.Root calls `onOpenChange(false)` on dismiss |
| `actions` | One `Toast.Action` per entry (toast) / `<a>` or `<button>` per entry (inline/global) | Each action's `label` maps to button text; `altText` for Toast.Action is the label |
| `icon` | Rendered inside `IconContainer` replacing the default SVG | No Radix prop; purely a rendering decision |
| `autoClose` | `duration` on `Toast.Root` (if false, set `duration={Infinity}`) | Radix does not accept a boolean — see GAP-004 |
| `duration` | `duration` prop on `Toast.Root` (number in ms) | Cannot be a CSS variable — see GAP-005 |
| `position` | CSS classes on `Toast.Viewport` (`hpe-toast-viewport--top`, etc.) | Radix positions via CSS; the `position` prop drives the CSS class |
| `id` | `id` on `Toast.Root` (toast) / `id` on `<div>` (inline/global) | |
| `messages.close` | `aria-label` on `Toast.Close` (toast) / `aria-label` on `<button>` (inline/global) | |
| `ariaLive` | `type` on `Toast.Root`: `'assertive'` → `"foreground"`, `'polite'` → `"background"` | Radix maps foreground/background to ARIA live polarity — see note below |

> **ARIA type note:** Radix uses `type="foreground"` (announces immediately,
> like `aria-live="assertive"`) and `type="background"` (announces next idle,
> like `aria-live="polite"`). When `status='critical'`, use `type="foreground"`.
> All others default to `type="background"`.

---

## 4 — State → Radix mechanism

| Anatomy state | Radix mechanism | Applies to |
|---|---|---|
| rest (open) | `Toast.Root[data-state="open"]` | Toast Container |
| dismissed (closed) | `Toast.Root[data-state="closed"]` | Toast Container |
| hover (pause timer) | Radix handles automatically via `onMouseEnter`/`onMouseLeave` | Toast.Root |
| focus (pause timer) | Radix handles automatically via `onFocus`/`onBlur` | Toast.Root |
| focus (CloseButton) | `Toast.Close:focus-visible` | CloseButton |
| focus (Action) | `Toast.Action:focus-visible` | Actions |
| active (CloseButton) | `Toast.Close:active` | CloseButton |
| active (Action) | `Toast.Action:active` | Actions |
| swipe gesture | `Toast.Root[data-swipe="start\|move\|cancel\|end"]` | Toast Container |
| inline/global visible | Presence in DOM — no Radix mechanism | Container (inline/global) |
| inline/global dismissed | Consumer unmounts the element | Container (inline/global) |

---

## 5 — Token import

```js
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
```

---

## 6 — Component structure

```jsx
import * as Toast from '@radix-ui/react-toast';
import 'hpe-design-tokens/dist/css/primitives.css';
import 'hpe-design-tokens/dist/css/color.light.css';
import 'hpe-design-tokens/dist/css/color.dark.css';
import 'hpe-design-tokens/dist/css/dimension.css';
import 'hpe-design-tokens/dist/css/components.css';
import './Notification.css';

// Default status icons — consumers may override via the `icon` prop
import {
  StatusCritical,
  StatusWarning,
  StatusGood,
  Info,
  StatusUnknown,
} from '@hpe-design/icons';

const STATUS_ICONS = {
  critical: StatusCritical,
  warning: StatusWarning,
  normal: StatusGood,
  info: Info,
  unknown: StatusUnknown,
};

// ----- Toast kind (floating, Radix-powered) -----

/**
 * ToastViewport must be rendered once at app root inside ToastProvider.
 * position drives the CSS class for viewport placement.
 */
export function NotificationViewport({ position = 'top' }) {
  return (
    <Toast.Viewport
      className={`hpe-notification-viewport hpe-notification-viewport--${position}`}
    />
  );
}

/**
 * Notification — toast kind.
 * Wrap your app once with <Toast.Provider> and render <NotificationViewport>.
 */
export function NotificationToast({
  title,
  message,
  status = 'unknown',
  onClose,
  actions,
  icon,
  autoClose = true,
  duration = 5000,
  id,
  messages = { close: 'Close notification' },
  ariaLive,
  open,
  onOpenChange,
}) {
  // see constraints §2: status is mutually exclusive — CSS class encodes it
  // see constraints §4: toast always uses background-front regardless of status

  const StatusIcon = STATUS_ICONS[status] ?? StatusUnknown;
  // Radix type maps to ARIA live polarity — see constraints §8
  const radixType =
    (ariaLive === 'assertive' || status === 'critical')
      ? 'foreground'
      : 'background';

  // autoClose: false → set duration to Infinity (GAP-004)
  const radixDuration = autoClose ? duration : Infinity;

  return (
    <Toast.Root
      id={id}
      className={`hpe-notification hpe-notification--toast hpe-notification--${status}`}
      open={open}
      onOpenChange={onOpenChange ?? onClose}
      duration={radixDuration} // see constraints §5, GAP-005
      type={radixType}         // see constraints §8
    >
      {/* IconContainer — see constraints §2 for icon color */}
      <span className="hpe-notification-iconContainer" aria-hidden="true">
        {icon ?? <StatusIcon className="hpe-notification-statusIcon" />}
      </span>

      {/* TextContainer */}
      <div className="hpe-notification-textContainer">
        {/* Title — see constraints §4 for toast text color */}
        <Toast.Title className="hpe-notification-title">{title}</Toast.Title>

        {/* Message + Actions */}
        {(message || actions) && (
          <Toast.Description asChild>
            <p className="hpe-notification-message">
              {message && (
                <span className="hpe-notification-messageText">{message}</span>
              )}
              {actions?.map((action) => (
                <Toast.Action
                  key={action.label}
                  asChild
                  altText={action.label} // required by Radix for screen readers
                  className="hpe-notification-action"
                >
                  {action.href ? (
                    <a href={action.href} onClick={action.onClick}>
                      {action.label}
                    </a>
                  ) : (
                    <button type="button" onClick={action.onClick}>
                      {action.label}
                    </button>
                  )}
                </Toast.Action>
              ))}
            </p>
          </Toast.Description>
        )}
      </div>

      {/* CloseButton — see constraints §6 for focus indicator */}
      {onClose && (
        <Toast.Close
          className="hpe-notification-closeButton"
          aria-label={messages.close}
        >
          <span className="hpe-notification-closeIcon" aria-hidden="true">
            {/* Close icon SVG — consumers substitute their icon system */}
            ✕
          </span>
        </Toast.Close>
      )}
    </Toast.Root>
  );
}

// ----- Inline and global kinds (plain HTML, no Radix primitive) -----
// see implementation notes — Radix has no primitive for these kinds

export function Notification({
  title,
  message,
  status = 'unknown',
  kind = 'inline',
  onClose,
  actions,
  icon,
  id,
  messages = { close: 'Close notification' },
  ariaLive,
}) {
  if (kind === 'toast') {
    throw new Error(
      'Use NotificationToast for kind="toast". ' +
      'Wrap app with Toast.Provider and render NotificationViewport.'
    );
  }

  const StatusIcon = STATUS_ICONS[status] ?? StatusUnknown;
  // see constraints §8: critical → assertive, others → polite
  const liveValue =
    ariaLive ?? (status === 'critical' ? 'assertive' : 'polite');
  // role=alert is equivalent to aria-live=assertive + aria-atomic=true
  const role = liveValue === 'assertive' ? 'alert' : 'status';

  return (
    <div
      id={id}
      role={role}
      aria-live={liveValue}
      aria-atomic="true"
      className={[
        'hpe-notification',
        `hpe-notification--${kind}`,
        `hpe-notification--${status}`,
      ].join(' ')}
    >
      {/* IconContainer */}
      <span className="hpe-notification-iconContainer" aria-hidden="true">
        {icon ?? <StatusIcon className="hpe-notification-statusIcon" />}
      </span>

      {/* TextContainer */}
      <div className="hpe-notification-textContainer">
        {/* Title — see constraints §2 for per-status text color */}
        <strong className="hpe-notification-title">{title}</strong>

        {/* Message + Actions */}
        {(message || actions) && (
          <p className="hpe-notification-message">
            {message && (
              <span className="hpe-notification-messageText">{message}</span>
            )}
            {actions?.map((action) =>
              action.href ? (
                <a
                  key={action.label}
                  href={action.href}
                  onClick={action.onClick}
                  className="hpe-notification-action"
                >
                  {action.label}
                </a>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  className="hpe-notification-action"
                >
                  {action.label}
                </button>
              )
            )}
          </p>
        )}
      </div>

      {/* CloseButton — see constraints §6 for focus indicator */}
      {onClose && (
        <button
          type="button"
          className="hpe-notification-closeButton"
          aria-label={messages.close}
          onClick={onClose}
        >
          <span className="hpe-notification-closeIcon" aria-hidden="true">
            ✕
          </span>
        </button>
      )}
    </div>
  );
}
```

---

## 7 — CSS

```css
/* ============================================================
   Notification — HPE Design System
   All tokens from tokens.md. No hardcoded values.
   GAP-001: no --hpe-notification-* component tokens exist;
            all tokens are semantic (S layer).
   GAP-002: no z-index token for toast — using --hpe-drop-default-zIndex.
   ============================================================ */

/* ---- Container base ---------------------------------------- */

.hpe-notification {
  display: flex;
  flex-direction: row;      /* icon + text side by side */
  align-items: flex-start;
  gap: var(--hpe-spacing-xsmall);  /* see constraints §1 */
  box-sizing: border-box;
}

/* ---- Kind: inline ------------------------------------------ */
/* see constraints §3: kind is mutually exclusive */

.hpe-notification--inline {
  border-radius: var(--hpe-radius-xsmall);    /* see constraints §3 */
  padding-inline: var(--hpe-spacing-xsmall);  /* see constraints §1 */
  padding-block: var(--hpe-spacing-3xsmall);  /* see constraints §1 */
}

/* ---- Kind: global ------------------------------------------ */

.hpe-notification--global {
  width: 100%;
  border-radius: var(--hpe-radius-none);        /* see constraints §3 */
  padding-inline: var(--hpe-spacing-xlarge);    /* see constraints §1, §3 */
  padding-block: var(--hpe-spacing-3xsmall);    /* see constraints §1 */
}

/* ---- Kind: toast ------------------------------------------- */

.hpe-notification--toast {
  border-radius: var(--hpe-radius-xsmall);    /* see constraints §3 */
  padding-inline: var(--hpe-spacing-xsmall);  /* see constraints §1 */
  padding-block: var(--hpe-spacing-3xsmall);  /* see constraints §1 */
  /* see constraints §4: toast always uses background-front */
  background-color: var(--hpe-color-background-front);
}

/* ---- Status backgrounds (inline and global only) ----------- */
/* see constraints §2: status is mutually exclusive */
/* see constraints §4: toast overrides to background-front */

.hpe-notification--inline.hpe-notification--critical,
.hpe-notification--global.hpe-notification--critical {
  background-color: var(--hpe-color-background-critical);
}

.hpe-notification--inline.hpe-notification--warning,
.hpe-notification--global.hpe-notification--warning {
  background-color: var(--hpe-color-background-warning);
}

.hpe-notification--inline.hpe-notification--normal,
.hpe-notification--global.hpe-notification--normal {
  background-color: var(--hpe-color-background-ok);
}

.hpe-notification--inline.hpe-notification--info,
.hpe-notification--global.hpe-notification--info {
  background-color: var(--hpe-color-background-info);
}

.hpe-notification--inline.hpe-notification--unknown,
.hpe-notification--global.hpe-notification--unknown {
  background-color: var(--hpe-color-background-unknown);
}

/* ---- IconContainer ----------------------------------------- */

.hpe-notification-iconContainer {
  display: flex;
  flex-shrink: 0;
  padding-inline-end: var(--hpe-spacing-xsmall);
}

/* ---- StatusIcon -------------------------------------------- */
/* see constraints §2: icon color per status */

.hpe-notification-statusIcon {
  width: var(--hpe-icon-medium-size);
  height: var(--hpe-icon-medium-size);
}

.hpe-notification--critical .hpe-notification-statusIcon {
  color: var(--hpe-color-icon-critical);
}
.hpe-notification--warning .hpe-notification-statusIcon {
  color: var(--hpe-color-icon-warning);
}
.hpe-notification--normal .hpe-notification-statusIcon {
  color: var(--hpe-color-icon-ok);
}
.hpe-notification--info .hpe-notification-statusIcon {
  color: var(--hpe-color-icon-info);
}
.hpe-notification--unknown .hpe-notification-statusIcon {
  color: var(--hpe-color-icon-unknown);
}

/* ---- TextContainer ----------------------------------------- */

.hpe-notification-textContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--hpe-spacing-medium);
}

/* ---- Title ------------------------------------------------- */
/* see constraints §2: title color per status and kind */
/* see constraints §4: toast always uses text-strong */

.hpe-notification-title {
  font-weight: var(--hpe-fontWeight-medium);
  font-size: var(--hpe-text-medium-fontSize);
  line-height: var(--hpe-text-medium-lineHeight);
  display: block;
}

/* Toast: all statuses use text-strong (see constraints §4) */
.hpe-notification--toast .hpe-notification-title {
  color: var(--hpe-color-text-strong);
}

/* Inline + global: per-status title colors */
.hpe-notification--inline.hpe-notification--critical .hpe-notification-title,
.hpe-notification--global.hpe-notification--critical .hpe-notification-title {
  color: var(--hpe-color-text-onCritical-strong);
}
.hpe-notification--inline.hpe-notification--warning .hpe-notification-title,
.hpe-notification--global.hpe-notification--warning .hpe-notification-title {
  color: var(--hpe-color-text-onWarning-strong);
}
.hpe-notification--inline.hpe-notification--normal .hpe-notification-title,
.hpe-notification--global.hpe-notification--normal .hpe-notification-title {
  color: var(--hpe-color-text-onOk-strong);
}
.hpe-notification--inline.hpe-notification--info .hpe-notification-title,
.hpe-notification--global.hpe-notification--info .hpe-notification-title {
  color: var(--hpe-color-text-onInfo-strong);
}
.hpe-notification--inline.hpe-notification--unknown .hpe-notification-title,
.hpe-notification--global.hpe-notification--unknown .hpe-notification-title {
  color: var(--hpe-color-text-onUnknown-strong);
}

/* ---- Message ----------------------------------------------- */

.hpe-notification-message {
  margin: 0;
  font-size: var(--hpe-text-medium-fontSize);
  font-weight: var(--hpe-fontWeight-regular);
  line-height: var(--hpe-text-medium-lineHeight);
}

/* Toast: message always text-default (see constraints §4) */
.hpe-notification--toast .hpe-notification-message {
  color: var(--hpe-color-text-default);
}

/* Inline + global: per-status message colors */
.hpe-notification--inline.hpe-notification--critical .hpe-notification-message,
.hpe-notification--global.hpe-notification--critical .hpe-notification-message {
  color: var(--hpe-color-text-onCritical);
}
.hpe-notification--inline.hpe-notification--warning .hpe-notification-message,
.hpe-notification--global.hpe-notification--warning .hpe-notification-message {
  color: var(--hpe-color-text-onWarning);
}
.hpe-notification--inline.hpe-notification--normal .hpe-notification-message,
.hpe-notification--global.hpe-notification--normal .hpe-notification-message {
  color: var(--hpe-color-text-onOk);
}
.hpe-notification--inline.hpe-notification--info .hpe-notification-message,
.hpe-notification--global.hpe-notification--info .hpe-notification-message {
  color: var(--hpe-color-text-onInfo);
}
.hpe-notification--inline.hpe-notification--unknown .hpe-notification-message,
.hpe-notification--global.hpe-notification--unknown .hpe-notification-message {
  color: var(--hpe-color-text-onUnknown);
}

.hpe-notification-messageText {
  margin-inline-end: var(--hpe-spacing-3xsmall);
}

/* ---- Actions ----------------------------------------------- */

.hpe-notification-action {
  margin-inline-end: var(--hpe-spacing-3xsmall);
  white-space: nowrap;
  /* Action color/decoration inherits from Anchor/Button component tokens */
}

.hpe-notification-action:focus-visible {
  /* see constraints §6: all three focus tokens together */
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
}

/* ---- CloseButton ------------------------------------------- */

.hpe-notification-closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--hpe-spacing-xsmall);
  padding-block: var(--hpe-spacing-3xsmall);
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--hpe-color-icon-default);
  flex-shrink: 0;
  /* see constraints §1: no size change on interaction */
}

.hpe-notification-closeIcon {
  width: var(--hpe-icon-medium-size);
  height: var(--hpe-icon-medium-size);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hpe-notification-closeButton:focus-visible {
  /* see constraints §6: all three focus tokens must be applied together */
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
}

/* hover/active: delegated to platform Button styles — see GAP-003 */

/* ---- Toast Viewport ---------------------------------------- */

.hpe-notification-viewport {
  position: fixed;
  display: flex;
  flex-direction: column;
  gap: var(--hpe-spacing-xsmall);
  width: max-content;
  max-width: 100vw;
  margin: 0;
  padding: var(--hpe-spacing-xsmall);
  list-style: none;
  /* GAP-002: no --hpe-notification-toast-zIndex; using --hpe-drop-default-zIndex */
  z-index: var(--hpe-drop-default-zIndex); /* see constraints §10, GAP-002 */
  outline: none;
}

/* Position variants — driven by `position` prop */
.hpe-notification-viewport--top {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.hpe-notification-viewport--top-left {
  top: 0;
  left: 0;
  align-items: flex-start;
}
.hpe-notification-viewport--top-right {
  top: 0;
  right: 0;
  align-items: flex-end;
}
.hpe-notification-viewport--bottom {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  align-items: center;
}
.hpe-notification-viewport--bottom-left {
  bottom: 0;
  left: 0;
  align-items: flex-start;
}
.hpe-notification-viewport--bottom-right {
  bottom: 0;
  right: 0;
  align-items: flex-end;
}

/* ---- Toast open/closed state ------------------------------- */

.hpe-notification--toast[data-state='open'] {
  /* enter animation hook — consumer applies keyframes here */
}

.hpe-notification--toast[data-state='closed'] {
  /* exit animation hook — consumer applies keyframes here */
}

/* ---- Toast swipe-to-dismiss -------------------------------- */

.hpe-notification--toast[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}

.hpe-notification--toast[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out;
}

.hpe-notification--toast[data-swipe='end'] {
  animation: hpe-notification-slideOut 100ms ease-out forwards;
}

@keyframes hpe-notification-slideOut {
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(100%);
  }
}
```

---

## 8 — Implementation notes

| Topic | Note |
|---|---|
| Inline and global kinds | No Radix primitive exists. Implemented as plain HTML with `role="status"` or `role="alert"` and `aria-live`. |
| `autoClose=false` | Radix Root's `duration` prop requires a number. Pass `Infinity` when `autoClose` is `false`. A boolean cannot be passed directly. See GAP-004. |
| `duration` prop | Radix `duration` only accepts a JavaScript number. The HPE token system cannot supply this value as a CSS variable because Radix reads it as a JS prop. See GAP-005. |
| Multiple toasts | Consumers must manage an array of open toast state. The component does not maintain a queue. |
| `Toast.Provider` placement | Must wrap the entire application — not just the notification site. Place `NotificationViewport` at app root alongside `Toast.Provider`. |
| Icon system | The component structure assumes an `@hpe-design/icons` import. Consumers using another icon system pass `icon` prop to override. |
| Close icon glyph | The implementation uses a plain `✕` character as a placeholder. Replace with the Close icon from the HPE icon library. |
| Swipe direction | Default swipe direction is `right` (Radix Provider default). Consumers override via `Toast.Provider swipeDirection`. |
| ARIA `type` mapping | Radix `type="foreground"` ≈ `aria-live="assertive"`. `type="background"` ≈ `aria-live="polite"`. See constraints §8. |
| Hover/active on CloseButton | Hover and active appearance delegates to the Button primitive's own token layer. No notification-specific tokens exist. See GAP-003. |
| z-index | `--hpe-drop-default-zIndex` (110) is used as the toast viewport z-index. See GAP-002. |

---

## 9 — Gaps between Radix and the spec

| Gap | Detail | Recommendation |
|---|---|---|
| No Radix primitive for inline/global kinds | Radix Toast only models floating toasts. Inline and global use plain HTML elements. | Acceptable — plain HTML with ARIA roles is standards-compliant. |
| `autoClose=false` needs `Infinity` | Radix does not accept `duration={false}`. Must translate `autoClose=false` to `duration={Infinity}`. | Log as GAP-004. |
| `duration` cannot be a CSS variable | Radix reads `duration` as a JS number. Token system cannot inject the value via CSS. | Log as GAP-005. |
| Single `Toast.Action` per action | Each `Toast.Action` wraps one interactive element. The spec's `actions` array requires a loop. | No gap — the loop in JSX is idiomatic. |
| Swipe gesture CSS variables are Radix-internal | `--radix-toast-swipe-move-x` and `--radix-toast-swipe-end-x` are Radix-internal and not in `tokens.md`. | Acceptable — these are animation helpers, not design tokens. |
