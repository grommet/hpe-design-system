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
  alternative.
- `Toast.Close` — Button to dismiss the toast. Closes `Toast.Root` on click.
- `Toast.Viewport` — Fixed-position container where toasts render.
  Accessible via F8 hotkey.

### What Radix handles automatically

- Auto-close timer with pause on hover/focus/window blur (constraints §5).
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
| Status icons (`StatusCritical` etc.) | Not in Radix — rendered as children. |
| Multiple actions | `Toast.Action` wraps one element; multiple actions require looping. |

**Key consequence:** The Radix primitive only satisfies `kind='toast'`.
Inline and global kinds are implemented as plain semantic HTML elements
styled with the same tokens. See section 6.

---

## 2 — Anatomy → Radix primitive mapping

| Anatomy part | Radix component | Notes |
|---|---|---|
| Container (toast) | `Toast.Root` | `data-state="open\|closed"` drives visibility |
| Container (inline) | `<div role="status">` or `<div role="alert">` | Plain HTML; role driven by `status` and `ariaLive` — see constraints §8 |
| Container (global) | `<div role="status">` or `<div role="alert">` | Plain HTML; full-width via CSS |
| StatusIcon | `<span aria-hidden="true">` wrapping icon SVG | Inside `IconContainer`; icon component per status — see anatomy §4 |
| IconContainer | `<span className="hpe-notification-iconContainer" aria-hidden="true">` | No Radix primitive |
| TextContainer | `<div className="hpe-notification-textContainer">` | No Radix primitive |
| Title (toast) | `Toast.Title` | Semantic title in live region |
| Title (inline/global) | `<strong className="hpe-notification-title">` | Plain HTML |
| Message (toast) | `Toast.Description asChild` wrapping `<p>` | Semantic description in live region |
| Message (inline/global) | `<p className="hpe-notification-message">` | Plain HTML |
| CloseButton (toast) | `Toast.Close` | Handles dismiss; aria-label via `messages.close` |
| CloseButton (inline/global) | `<button className="hpe-notification-closeButton">` | Plain HTML; `onClick` wired to `onClose` |
| Actions (toast) | `Toast.Action asChild` (one per action) | `altText` required per Radix |
| Actions (inline/global) | `<a>` or `<button>` per action | Plain HTML anchors/buttons |
| FloatingLayer | `Toast.Viewport` + `Toast.Provider` | Provider at app root; Viewport placed where toasts appear |

---

## 3 — Props → Radix implementation

| Spec prop | Radix implementation | Notes |
|---|---|---|
| `title` | Children of `Toast.Title` (toast) / inner text of `<strong>` (inline/global) | |
| `message` | Children of `Toast.Description` (toast) / `<p>` text (inline/global) | |
| `status` | CSS class `hpe-notification--{status}` on Container | Drives token resolution for background, icon color, text color |
| `kind` | Selects Toast.Root vs plain HTML; CSS class `hpe-notification--{kind}` | |
| `onClose` | `onOpenChange` on `Toast.Root` (toast) / `onClick` on `<button>` (inline/global) | Toast.Root calls `onOpenChange(false)` on dismiss |
| `actions` | One `Toast.Action asChild` per entry (toast) / `<a>` or `<button>` per entry (inline/global) | Each action's `label` maps to button text |
| `icon` | Rendered inside `IconContainer` replacing the default icon SVG | Purely a rendering decision |
| `autoClose` | `duration={Infinity}` when `false`, `duration={duration}` when `true` | Radix does not accept a boolean — see GAP-004 |
| `duration` | `duration` prop on `Toast.Root` (number in ms) | Cannot be a CSS variable — see GAP-005 |
| `time` | Same as `duration` — `time` overrides `duration` when provided | Grommet-parity prop |
| `position` | CSS class on `Toast.Viewport` (`hpe-notification-viewport--{position}`) | Radix positions via CSS |
| `id` | `id` on `Toast.Root` (toast) / `id` on `<div>` (inline/global) | |
| `messages.close` | `aria-label` on `Toast.Close` (toast) / `aria-label` on `<button>` (inline/global) | |
| `ariaLive` | `type` on `Toast.Root` (`'assertive'` → `"foreground"`, `'polite'` → `"background"`) | Inline/global: sets `aria-live` directly on the container |

> **ARIA type note:** Radix maps `type="foreground"` ≈ `aria-live="assertive"`
> and `type="background"` ≈ `aria-live="polite"`. When `status='critical'`,
> use `type="foreground"`. All others default to `type="background"`.
> See constraints §8.

---

## 4 — State → Radix mechanism

| Anatomy state | Radix mechanism | Applies to |
|---|---|---|
| rest (open) | `Toast.Root[data-state="open"]` | Toast Container |
| dismissed (closed) | `Toast.Root[data-state="closed"]` | Toast Container |
| hover (pause timer) | Radix handles via `onMouseEnter` / `onMouseLeave` automatically | Toast.Root |
| focus (pause timer) | Radix handles via `onFocus` / `onBlur` automatically | Toast.Root |
| focus (CloseButton, toast) | `Toast.Close:focus-visible` | CloseButton |
| focus (CloseButton, inline/global) | `button.hpe-notification-closeButton:focus-visible` | CloseButton |
| focus (Action, toast) | `Toast.Action:focus-visible` | Actions |
| focus (Action, inline/global) | `.hpe-notification-action:focus-visible` | Actions |
| active (CloseButton) | `:active` pseudo-class | CloseButton |
| active (Action) | `:active` pseudo-class | Actions |
| swipe gesture | `Toast.Root[data-swipe="start\|move\|cancel\|end"]` | Toast Container |
| visible (FloatingLayer) | Presence of toast in Viewport when `open=true` | FloatingLayer |
| hidden (FloatingLayer) | Toast removed from Viewport after dismiss / `open=false` | FloatingLayer |
| dismissed (inline/global) | Consumer unmounts the element | Container |

---

## 5 — Token import

Tokens are imported once in `src/main.jsx`. Do not import inside component files.

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
import './notification.css';

// ---- Status icons -----------------------------------------------------------
// Spec requires icons from @hpe-design/icons-grommet (anatomy §4).
// That package is not installed in this project — see GAP-006.
// Inline SVG substitutes are used here. Replace with the correct imports
// once @hpe-design/icons-grommet is available:
//
//   import { StatusCritical } from '@hpe-design/icons-grommet/icons/StatusCritical';
//   import { StatusWarning }  from '@hpe-design/icons-grommet/icons/StatusWarning';
//   import { StatusGood }     from '@hpe-design/icons-grommet/icons/StatusGood';
//   import { Info }           from '@hpe-design/icons-grommet/icons/Info';
//   import { StatusUnknown }  from '@hpe-design/icons-grommet/icons/StatusUnknown';
//   import { Close }          from '@hpe-design/icons-grommet/icons/Close';

const StatusCritical = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M15 9L9 15M9 9l6 6" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" />
  </svg>
);

const StatusWarning = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
      stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <line x1="12" y1="9" x2="12" y2="13" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const StatusGood = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const InfoIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="8" r="1" fill="currentColor" />
    <line x1="12" y1="12" x2="12" y2="16" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const StatusUnknown = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="17" r="1" fill="currentColor" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none"
    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" />
  </svg>
);

// ---- Status icon map --------------------------------------------------------

const STATUS_ICONS = {
  critical: StatusCritical,
  warning:  StatusWarning,
  normal:   StatusGood,
  info:     InfoIcon,
  unknown:  StatusUnknown,
};

// ---- NotificationViewport ---------------------------------------------------
// Rendered once at app root inside Toast.Provider.
// The `position` prop drives the CSS class for viewport placement.

export function NotificationViewport({ position = 'top' }) {
  return (
    <Toast.Viewport
      className={`hpe-notification-viewport hpe-notification-viewport--${position}`}
    />
  );
}

// ---- NotificationToast (kind="toast") ---------------------------------------
// Wrap your app once with <Toast.Provider> and render <NotificationViewport>.
// See constraints §4: toast always uses --hpe-color-background-front.
// See constraints §5: timer pauses on hover/focus — Radix handles automatically.

export function NotificationToast({
  title,
  message,
  status = 'unknown',
  onClose,
  actions,
  icon,
  autoClose = true,
  duration = 8000,
  time,            // time overrides duration when provided — see props.md
  id,
  messages = { close: 'Close notification' },
  ariaLive,
  open,
  onOpenChange,
}) {
  const StatusIcon = STATUS_ICONS[status] ?? StatusUnknown;

  // see constraints §8; Radix type maps to ARIA live polarity
  const radixType =
    ariaLive === 'assertive' || status === 'critical'
      ? 'foreground'
      : 'background';

  // GAP-004: autoClose=false cannot map directly to Radix duration prop.
  // Radix has no boolean "never auto-close" option — Infinity is the workaround.
  const effectiveDuration = time ?? duration;
  const radixDuration = autoClose ? effectiveDuration : Infinity;

  return (
    <Toast.Root
      id={id}
      className={`hpe-notification hpe-notification--toast hpe-notification--${status}`}
      open={open}
      onOpenChange={onOpenChange ?? onClose}
      duration={radixDuration}  // see GAP-004, GAP-005
      type={radixType}          // see constraints §8
    >
      {/* IconContainer — aria-hidden: icon is decorative; status is in title */}
      {/* align-items: flex-start on Container ensures icon stays top-aligned */}
      {/* see constraints §11 */}
      <span className="hpe-notification-iconContainer" aria-hidden="true">
        {icon ?? <StatusIcon className="hpe-notification-statusIcon" />}
      </span>

      {/* TextContainer — vertical gap between title and message */}
      <div className="hpe-notification-textContainer">

        {/* Title — see constraints §4: toast uses --hpe-color-text-strong */}
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
                  altText={action.label}  // required by Radix for screen readers
                >
                  {action.href ? (
                    <a
                      href={action.href}
                      onClick={action.onClick}
                      className="hpe-notification-action"
                    >
                      {action.label}
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={action.onClick}
                      className="hpe-notification-action"
                    >
                      {action.label}
                    </button>
                  )}
                </Toast.Action>
              ))}
            </p>
          </Toast.Description>
        )}
      </div>

      {/* CloseButton — conditional on onClose; see constraints §6, §9 */}
      {onClose && (
        <Toast.Close
          className="hpe-notification-closeButton"
          aria-label={messages.close}
        >
          <span className="hpe-notification-closeIcon">
            <CloseIcon />
          </span>
        </Toast.Close>
      )}
    </Toast.Root>
  );
}

// ---- Notification (kind="inline" or kind="global") -------------------------
// Radix has no primitive for inline or global kinds — see implementation
// notes section 8. Implemented as plain semantic HTML with ARIA live regions.
// See constraints §8 for ARIA requirements.

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
      'Wrap app with Toast.Provider and render NotificationViewport.',
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
      {/* IconContainer — aria-hidden: icon is decorative */}
      {/* see constraints §11: align-items: flex-start keeps icon top-aligned */}
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
              ),
            )}
          </p>
        )}
      </div>

      {/* CloseButton — conditional on onClose; see constraints §6, §9 */}
      {onClose && (
        <button
          type="button"
          className="hpe-notification-closeButton"
          aria-label={messages.close}
          onClick={onClose}
        >
          <span className="hpe-notification-closeIcon">
            <CloseIcon />
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

   GAP-001: No --hpe-notification-* component tokens; all semantic (S layer).
   GAP-002: No z-index token for toast — using --hpe-drop-default-zIndex.
   GAP-007: Swipe animation uses Radix-internal vars and hardcoded durations.
   ============================================================ */

/* ---- Container base ---------------------------------------- */
/* see constraints §10: text-align: left is explicit — never inherited */
/* see constraints §11: align-items: flex-start — icon stays top-aligned */

.hpe-notification {
  display: flex;
  flex-direction: row;
  align-items: flex-start;          /* see constraints §11 */
  text-align: left;                 /* see constraints §10 — no token; set literally */
  box-sizing: border-box;
  /* Horizontal padding on start side; close button provides end-side padding */
  /* see tokens.md Container: padding split note */
  padding-block: var(--hpe-spacing-3xsmall);   /* see constraints §1, §3 */
  padding-inline-start: var(--hpe-spacing-xsmall); /* kind=inline/toast default */
}

/* ---- Kind: inline ------------------------------------------ */
/* see constraints §3: kind tokens are mutually exclusive */

.hpe-notification--inline {
  border-radius: var(--hpe-radius-xsmall);
}

/* ---- Kind: global ------------------------------------------ */
/* see constraints §3: kind tokens are mutually exclusive */

.hpe-notification--global {
  width: 100%;
  border-radius: var(--hpe-radius-none);
  padding-inline-start: var(--hpe-spacing-xlarge);  /* overrides base — see §1, §3 */
}

/* ---- Kind: toast ------------------------------------------- */
/* see constraints §3, §4: toast always uses background-front and shadow */

.hpe-notification--toast {
  border-radius: var(--hpe-radius-xsmall);
  /* see constraints §4: status backgrounds must NOT apply to toast */
  background-color: var(--hpe-color-background-front);
  /* see tokens.md Container: box-shadow for floating card elevation */
  box-shadow: var(--hpe-shadow-medium);
}

/* ---- Status backgrounds (inline and global only) ----------- */
/* see constraints §2: exactly one status active at a time     */
/* see constraints §4: toast kind must NOT get status background */

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
/* see tokens.md IconContainer: padding-inline-end only        */

.hpe-notification-iconContainer {
  display: flex;
  flex-shrink: 0;
  /* see tokens.md IconContainer: right padding separates icon from TextContainer */
  padding-inline-end: var(--hpe-spacing-xsmall);
}

/* ---- StatusIcon -------------------------------------------- */
/* see constraints §2: icon color must match the active status  */
/* see tokens.md StatusIcon: icon tokens per status             */

.hpe-notification-statusIcon {
  width: var(--hpe-icon-medium-size);
  height: var(--hpe-icon-medium-size);
  display: block;
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
/* see tokens.md TextContainer: vertical gap between Title and Message */
/* ContentRow gap (content area → close button) is provided by the    */
/* parent flex container. TextContainer itself does not set that gap.  */

.hpe-notification-textContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* see tokens.md TextContainer: gap between Title and Message (24px) */
  gap: var(--hpe-spacing-medium);
  min-width: 0; /* prevent text overflow from expanding the container */
}

/* ---- Title ------------------------------------------------- */
/* see constraints §2: title color per status                   */
/* see constraints §4: toast uses --hpe-color-text-strong       */
/* see constraints §10: text-align inherited from Container      */

.hpe-notification-title {
  font-weight: var(--hpe-fontWeight-medium);
  font-size: var(--hpe-text-medium-fontSize);
  line-height: var(--hpe-text-medium-lineHeight);
  display: block;
  margin: 0;
}

/* Toast: all statuses use --hpe-color-text-strong (constraints §4) */
.hpe-notification--toast .hpe-notification-title {
  color: var(--hpe-color-text-strong);
}

/* Inline + global: per-status title colors (constraints §2) */
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
/* see constraints §4: toast uses --hpe-color-text-default      */
/* see constraints §10: text-align inherited from Container      */

.hpe-notification-message {
  margin: 0;
  font-size: var(--hpe-text-medium-fontSize);
  font-weight: var(--hpe-fontWeight-regular);
  line-height: var(--hpe-text-medium-lineHeight);
}

/* Toast: message always --hpe-color-text-default (constraints §4) */
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

/* Message text span — right margin before first action */
/* see tokens.md Message: margin-inline-end (6px) */
.hpe-notification-messageText {
  margin-inline-end: var(--hpe-spacing-3xsmall);
}

/* ---- Actions ----------------------------------------------- */
/* see tokens.md Actions: margin-inline-end after each action   */
/* see constraints §6: all three focus tokens together          */

.hpe-notification-action {
  margin-inline-end: var(--hpe-spacing-3xsmall);
  white-space: nowrap;
  /* color and text-decoration inherit from Anchor/Button component tokens */
  /* hover/active: delegated to Anchor/Button tokens — see GAP-003 */
}

.hpe-notification-action:focus-visible {
  /* see constraints §6: all three focus tokens must be applied together */
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
}

/* ---- CloseButton ------------------------------------------- */
/* see constraints §1: no size/padding change between states    */
/* see constraints §6: all three focus tokens together on focus */

.hpe-notification-closeButton {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  /* End-side padding provided by close button — see tokens.md padding split note */
  padding-inline-end: var(--hpe-spacing-xsmall);   /* kind=inline/toast */
  padding-block: var(--hpe-spacing-3xsmall);        /* see constraints §1 */
  padding-inline-start: 0; /* gap token provides separation from TextContainer */
  background: transparent;
  border: none;
  cursor: pointer;
  /* see tokens.md CloseButton: icon color at rest */
  color: var(--hpe-color-icon-default);
}

/* Global kind: close button end padding matches xlarge horizontal padding */
.hpe-notification--global .hpe-notification-closeButton {
  padding-inline-end: var(--hpe-spacing-xlarge);
}

/* ContentRow gap: between [IconContainer + TextContainer] and [CloseButton] */
/* Applied on the close button itself as margin-inline-start */
/* see tokens.md ContentRow gap: --hpe-spacing-xsmall */
.hpe-notification-closeButton {
  margin-inline-start: var(--hpe-spacing-xsmall);
}

.hpe-notification-closeIcon {
  display: flex;
  align-items: center;
  justify-content: center;
  /* see tokens.md CloseButton: size shared with StatusIcon */
  width: var(--hpe-icon-medium-size);
  height: var(--hpe-icon-medium-size);
}

.hpe-notification-closeIcon svg {
  width: 100%;
  height: 100%;
}

.hpe-notification-closeButton:focus-visible {
  /* see constraints §6: all three focus tokens must be applied together */
  outline: var(--hpe-focusIndicator-outline);
  outline-offset: var(--hpe-focusIndicator-outlineOffset);
  box-shadow: var(--hpe-focusIndicator-boxShadow);
}

/* hover/active: delegated to platform Button styles — see GAP-003 */

/* ---- Toast Viewport ---------------------------------------- */
/* see tokens.md FloatingLayer: z-index (GAP-002)               */

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
  /* GAP-002: no --hpe-notification-toast-zIndex token;
     using --hpe-drop-default-zIndex (110) as workaround */
  z-index: var(--hpe-drop-default-zIndex);
  outline: none;
}

/* Position variants — driven by `position` prop on NotificationViewport */
/* see props.md: position enum */

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

/* ---- Toast open / closed state ----------------------------- */

.hpe-notification--toast[data-state='open'] {
  /* enter animation hook — consumer applies keyframes */
}

.hpe-notification--toast[data-state='closed'] {
  /* exit animation hook — consumer applies keyframes */
}

/* ---- Toast swipe-to-dismiss -------------------------------- */
/* GAP-007: --radix-toast-swipe-move-x and --radix-toast-swipe-end-x
   are Radix-internal variables. Animation durations below have no
   token equivalent — hardcoded values are an unavoidable exception. */

.hpe-notification--toast[data-swipe='move'] {
  transform: translateX(var(--radix-toast-swipe-move-x));
}

.hpe-notification--toast[data-swipe='cancel'] {
  transform: translateX(0);
  transition: transform 200ms ease-out; /* GAP-007: 200ms hardcoded */
}

.hpe-notification--toast[data-swipe='end'] {
  animation: hpe-notification-slideOut 100ms ease-out forwards; /* GAP-007: 100ms hardcoded */
}

@keyframes hpe-notification-slideOut {
  from { transform: translateX(var(--radix-toast-swipe-end-x)); }
  to   { transform: translateX(100%); }
}
```

---

## 8 — Implementation notes

| Topic | Note |
|---|---|
| Inline and global kinds | No Radix primitive exists. Implemented as plain HTML with `role="status"` or `role="alert"` and `aria-live`. See constraints §8. |
| `autoClose=false` | Radix `Toast.Root` requires a number for `duration`. Pass `Infinity` when `autoClose` is `false`. See GAP-004. |
| `duration` / `time` props | Radix reads `duration` as a JS number. Cannot be a CSS variable. `time` (Grommet parity) overrides `duration` when provided. See GAP-005. |
| Icon package | The spec requires `@hpe-design/icons-grommet`. This package is not installed in the radix-test project. Inline SVGs substitute until the package is available. See GAP-006. |
| Close icon | Spec requires `Close` from `@hpe-design/icons-grommet`. Inline SVG used as placeholder. See GAP-006. |
| Padding split | Container sets only `padding-inline-start` and `padding-block`. The CloseButton provides `padding-inline-end` and its own `padding-block`. A `margin-inline-start` on the CloseButton provides the ContentRow gap. |
| `text-align: left` | Set explicitly on `.hpe-notification` — never assumed or inherited. No token exists. See constraints §10. |
| Icon alignment | `align-items: flex-start` on `.hpe-notification` keeps the icon pinned to the top even when message text is long. See constraints §11. |
| Multiple toasts | Consumers manage an array of open toast state. The component does not maintain a queue. |
| `Toast.Provider` placement | Must wrap the entire application. Place `NotificationViewport` at app root alongside `Toast.Provider`. |
| Swipe direction | Default swipe direction is `right` (Radix Provider default). Consumers override via `Toast.Provider swipeDirection`. |
| ARIA type mapping | Radix `type="foreground"` ≈ `aria-live="assertive"`. `type="background"` ≈ `aria-live="polite"`. See constraints §8. |
| Hover/active on CloseButton | Delegates to the Button primitive's own token layer. No notification-specific tokens exist. See GAP-003. |
| z-index | `--hpe-drop-default-zIndex` (110) used as workaround. See GAP-002. |

---

## 9 — Gaps between Radix and the spec

| Gap | Detail | Recommendation |
|---|---|---|
| No Radix primitive for inline/global kinds | Radix Toast only models floating toasts. Inline and global use plain HTML. | Acceptable — plain HTML with ARIA roles is standards-compliant. |
| `autoClose=false` requires `Infinity` | Radix does not accept `duration={false}`. | Log as GAP-004. |
| `duration` cannot be a CSS variable | Radix reads `duration` as a JS number. | Log as GAP-005. |
| `@hpe-design/icons-grommet` not installed | Spec requires specific icon components not available in this project. | Log as GAP-006. Install package or confirm `grommet-icons` is an acceptable fallback. |
| Swipe animation uses hardcoded durations | `--radix-toast-swipe-move-x` is Radix-internal; transition durations have no token. | Log as GAP-007. |
