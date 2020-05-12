---
title: Button
topic: Components
grommetDocs: https://v2.grommet.io/button?theme=hpe#props
---

{{"example": "components/button/ButtonExample", "intro": true, "designer": true, "figma": "https://www.figma.com/file/Oi5UEEQ33VCAyOKQcZ8Nr8/HPE-Button-Component?node-id=1%3A2"}}

## Guidance

The when, how, and why to use buttons.

### About Buttons

Buttons should be used in situations where users might need to:

- Submit a [form](/templates/forms)
- Begin a new task
- Trigger a new UI element to appear on the page
- Specify a new or next step in a process

### Button Labeling

Using the design system Button Component will ensure you’re button looks like a button. Applying the appropriate label is also important in making sure the user has a clear understanding of what the action will do.

- Use clear and concise wording.
- Avoid contractions or colloquialisms. Keep the language approachable but not personal.
- Ensure your button label matches the route destination.

### Buttons vs. Anchors

The HTML elements for buttons and links (a.k.a. anchors) describe a very specific type of action that is going to be taken when they are used. It is important you know when to use which, as the distinction matters:

- Use a link when you’re navigating to another place, such as: a "view all" page, "Jane Chen" profile, a page "skip link" etc.
- Use buttons when you are performing an action, such as: "submit," "merge," "create new," "upload," etc.
- An action is almost always occurs on the same page

### Accessibility

If pressing a Button results in a new URL, or the resultant UI makes sense as "a new browser tab", that is a link `<a>`. Everything else is a `<button>`.

The distinction is important to screen reader users to know what's going to happen next. Will I navigate somewhere or will something happen on the page? So it's important to choose the right HTML element for the job.

## Variants

There are a couple "flavors" of button depending on use case.

### Primary Button

Used for key actions on the page. Primary Buttons can also be referred to as “Brand” or “CTA (Call to Action)” and should only be used once per page. All other supporting actions should use [Default Button](#).

{{"example": "components/button/PrimaryButtonExample"}}

### Color Button

When looking to accent an interaction or for special use cases that require more importance than a Default Button, the Color Button can be used to support an HPE sub-brand when appropriate or a serious action (ie. using red for a destructive task).

{{"example": "components/button/ColorButtonExample"}}

### Default Button

Simple button is used when you want the action to blend into the content. All the states, styles, and behaviors are persisted in the Simple Button, but without the chrome for time when the content-first approach is required.

### Button with Icon

Icons may be incorporated into buttons, either inline with text or as an icon only. When using icon only buttons, the dimension of the clickable area should be kept in mind for its use on mobile devices. Areas too small lead to errant clicks, and as result, poor experience.

{{"example": "components/button/ButtonIconExample"}}
