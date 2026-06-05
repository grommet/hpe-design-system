# Implementing a Reorderable and Resizable Grid of Cards

## Overview

This pattern creates a dashboard-style grid where cards can be reordered by dragging and resized via a menu. The grid operates in two modes: a normal **view mode** and an **edit mode** that the user opts into via a page-level "Customize" control. All ordering and resizing behavior is driven by an array of plain data objects managed in state.

---

## Data Structure

Each item in the array represents one card in the grid:

```js
{
  id: 'billingSummary',          // required — unique string identifier
  component: <BillingSummary />, // the card React element to render
  size: { columns: 2, rows: 1 }, // optional span override
}
```

**Unique `id` is critical.** Grommet's `Cards` component uses the item's `id` as the React `key` when rendering each card. Without a stable, unique `id`:
- Keyboard focus is lost when the array is reordered, because React cannot track which DOM element corresponds to which card across re-renders.
- Cards that share or lack an `id` will cause unnecessary unmounts and remounts, breaking animations, internal state, and accessibility.

The `id` must also be passed explicitly as a prop to the card element when it is cloned (see below), because `Cards` internally uses it for drag-and-drop identity.

---

## Using `Data` and `Cards`

The `Data` component from Grommet acts as the data context provider. Wrap `Cards` inside `Data` to give it access to the data array along with optional filtering, sorting, and pagination capabilities that `Data` provides. `Cards` reads from that context and renders each item.

The `sizeKey` prop on `Cards` tells it which property of each data item describes the cell span. The value of that property must match an object with `columns` and `rows` numbers. A `columns` prop on `Cards` defines the grid column template.

```jsx
<Data data={widgets}>
  <Cards
    sizeKey="size"
    columns={['flex', 'flex', 'flex']}
    onOrder={customizeOpen ? setWidgets : undefined}
  >
    {(item, index) => { /* render each card */ }}
  </Cards>
</Data>
```

> **Minimum version requirement:** The `onOrder` callback on `Cards` was introduced in **grommet 2.55.0**. Versions below this do not support reordering.

---

## Layout Model: Linear Order, Not Explicit Positions

The cards are a **linear, ordered list**. The grid lays them out by filling available columns left-to-right, then wrapping to the next row — exactly like a flex-wrap or CSS grid auto-placement layout. The number of columns is determined by the available window width and the column template passed to `Cards` (e.g., `['flex', 'flex', 'flex']` for three equal columns, or a responsive value that reduces columns on narrower viewports).

This means:
- You do not specify which row or column a card will land in. You only control the **order** in which cards appear in the list.
- A card configured to span two columns or two rows will consume more grid cells than a 1×1 card. Subsequent cards flow into the next available cell that can fit them, which may push cards to a new row.
- Resizing a card can shift the visual positions of all cards that follow it in the list, but it does not change their order in the array.

Because layout is purely order-driven, all user interactions — drag-and-drop and keyboard reordering — work by changing the position of an item in the array, not by setting coordinates.

---

## Toggling Edit Mode

The page header should include a "Customize" button (outside the grid) that sets a `customizeOpen` boolean in state. This state controls two things:

1. Whether the page-level edit mode header (with Save/Cancel/Add Widget actions) is shown.
2. Whether `onOrder` is passed to `Cards`. When `onOrder` is `undefined`, the grid renders as a static, non-draggable layout. When it is a state setter (e.g., `setWidgets`), `Cards` activates drag-and-drop reordering and calls that function with the updated array when the user drops a card in a new position.

```jsx
// Page header button
<Button
  label="Customize"
  icon={<Configure />}
  onClick={() => setCustomizeOpen(true)}
/>

// CustomizeHeader replaces or supplements the page header in edit mode
{customizeOpen && (
  <CustomizeHeader
    onCancel={() => setCustomizeOpen(false)}
    onSave={() => setCustomizeOpen(false)}
    onAddWidget={() => { /* open widget picker */ }}
  />
)}
```

---

## Rendering Cards with Edit Mode Controls

Inside the `Cards` render function, use `cloneElement` to inject edit mode props into the card's root element without modifying each card's own implementation:

```jsx
{(item, index) => {
  const editControls = customizeOpen
    ? {
        controls: [
          <DragControl
            key={`move-${item.id}`}
            a11yTitle={`Move ${item.id}`}
          />,
          <CustomizeMenu
            key={`menu-${item.id}`}
            item={item}
            onResize={(newSize) => onResize(item.id, sizeToSpan[newSize.size])}
            resizeOptions={resizeOptions}
          />,
        ],
      }
    : {};

  return cloneElement(item.component, {
    id: item.id,
    key: item.id,
    ...editControls,
  });
}}
```

The `controls` prop is a two-element array: `[leftControl, rightControl]`. The card header places the left control (the drag handle) before the title, and the right control (the menu) at the trailing edge of the header — the standard position for the call-to-action icon in view mode.

---

## Card Header: Injecting Edit Controls

Each individual card component should accept a `controls` prop and pass it through to its root card component (e.g., `DashboardCard`). Because these components spread `...rest` onto their root element, no changes to individual card files are needed.

Inside `DashboardCard` (or an equivalent base card), the `controls` prop drives three header changes:

1. **Left slot:** `controls[0]` (the `DragControl`) renders before the card title, providing a visual drag handle with the move cursor and a drag icon. This makes it immediately apparent that the card is in a draggable state.

2. **Right slot:** `controls[1]` (the `CustomizeMenu`) renders at the trailing end of the header.

3. **Navigation/action CTA is hidden:** The normal header action — typically a `LinkNext` or `Share` icon that navigates somewhere — must be suppressed in edit mode. Implement this with a simple guard:
   ```js
   const showCta = !hideCta && !controls;
   ```
   Any other interactive controls inside the card (buttons, links, clickable rows) should similarly be disabled or hidden when `controls` is present, because activating them during a drag gesture is confusing and the card should not behave as a navigation target while in edit mode. The card's own `onClick` handler (if it exists for a hover/click affordance) should also be omitted when `controls` is provided.

---

## Resize Flow

The `CustomizeMenu` renders a `Menu` with at minimum a "Resize" item and a "Remove" item. Clicking "Resize" opens a modal `Layer` containing a `Form` with a `Select` for choosing a new size. Size options are human-readable strings like `"1x1"`, `"2x3"`, etc. that map to `{ columns, rows }` objects:

```js
const sizeToSpan = {
  '1x1': { columns: 1, rows: 1 },
  '2x3': { columns: 2, rows: 3 },
  // ...
};
```

On submit, the parent's `onResize` handler receives the item's `id` and the new `{ columns, rows }` span. The handler updates the array in state:

```js
const handleResize = (id, newSize) => {
  setWidgets(prev =>
    prev.map(w => w.id === id ? { ...w, size: newSize } : w)
  );
};
```

Because `sizeKey="size"` is set on `Cards`, updating the `size` property of a data item immediately causes that card to consume more or fewer grid cells. Cards that follow it in the list shift to the next available space — they do not move in the array, only in their visual position on screen.

---

## Keyboard Reordering

When a card is in edit mode (i.e., `onOrder` is provided), keyboard users can reorder cards without using a mouse:

1. **Focus a card** — either by pressing Tab to reach it, or by clicking on it.
2. **Use arrow keys to move the card** in the linear list:
   - **Left arrow** or **Up arrow** — moves the card one position earlier in the list.
   - **Right arrow** or **Down arrow** — moves the card one position later in the list.

The `Cards` component does not support a "move to the previous/next row" concept, because calculating which card is visually above or below depends on how many columns are available and how many cells each card spans — this changes with viewport width and card sizes. Instead, the four arrow keys all operate on the flat list order. Up/Left move backward; Down/Right move forward. The visual result may not always be an intuitive "one row up" jump, particularly when cards span multiple cells, but the operation is consistent and predictable.

This keyboard behavior works automatically when `onOrder` is present — no additional implementation is required beyond passing the callback.

---

## Accessibility

The `Cards` component provides built-in screen reader support when `onOrder` is provided. No extra ARIA markup is needed.

**Focus announcement:** When a card receives focus in edit mode, the screen reader announces that the card is moveable. This cues the user that arrow keys can reorder it.

**Position change announcement:** When the user moves a card with the arrow keys, the screen reader announces the card's new position in the list (e.g., "Item 3 of 8"). This feedback is only present when `onOrder` is provided — in view mode the cards are not announced as moveable and no position changes are broadcast.

Other edit-mode controls handle their own accessibility independently:
- The `DragControl` element accepts an `a11yTitle` prop (e.g., `"Move Billing Summary"`) that labels the drag handle icon for screen readers.
- The `CustomizeMenu` is a standard Grommet `Menu`, which provides keyboard navigation and announces its items in the normal way.
- The `ResizeDialog` is a modal `Layer` containing a labelled `Form` and `Select`, which are announced as expected by the browser's accessibility tree.

---

## Summary of Responsibilities

| Layer | Responsibility |
|---|---|
| Page state | Holds the `widgets` array; owns `customizeOpen` toggle; handles `onResize` and `onOrder` updates |
| `Data` + `Cards` | Renders the grid; handles drag-and-drop reorder when `onOrder` is provided; maps `sizeKey` to cell spans |
| `CustomizableCards` wrapper | Conditionally builds the `controls` array; injects it via `cloneElement`; maps size strings to span objects |
| Individual card components | Spread `controls` through to their root card; render the drag handle, menu, and title from `controls[0/1]`; suppress CTA and click handlers when `controls` is present |
| `DragControl` | Visual affordance (drag icon + move cursor) signaling the card is draggable |
| `CustomizeMenu` | "Resize" and "Remove" actions; opens the `ResizeDialog` layer |
