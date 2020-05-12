---
title: Layer
topic: Components
grommetDocs: https://v2.grommet.io/layer?theme=hpe#props
---

{{"example": "components/layer/LayerExample", "intro": true, "designer": true, "figma": "https://www.figma.com/file/Oi5UEEQ33VCAyOKQcZ8Nr8/HPE-Button-Component?node-id=1%3A2"}}

## Guidance

Layer is used to define the properties and behaviors of an overlay for things like a modal dialog or notification. The content of the Layer is defined by the Box component.

### Create

- Define the container, content, location, and any animation, depending on the intent of the use case (like a notification or modal with a form).
- Use the [Box](/components/box) component to define the content of your layer.
- Ensure that any next steps for the user are provided to progress or close out of the layer.

### Best Practices

- Modal is best applied when you need to center attention on specific content, a task, or behavior and not allow interactivity with the underlying content.
- Position forms to the right (side-drawer).
- Position notifications top or bottom.
- Use a close control to guide users to move out of the layer. Provide an alternative to move out of the layer by allowing use of the 'esc' key or clicking off the container of the layer.
- Layer is not great for navigation as it 'hides' content. Maintain context for the user with layer.

### Accessibility

Consider the use of ARIA role='dialog' to implement a modal for screen readers.

## Variants

Depending on the use case of a Layer, the placement and layout of content may differ. Here are some common use cases and guidelines for various types of Layers.

### Side Drawer Modal

A Side Drawer layer is anchored to one side of the screen and acts as a modal. This means that while the layer is open, the rest of the page cannot be interacted with. When a layer contains a [Form](/templates/forms), it should be anchored to the right side of the screen.

{{"example": "components/layer/LayerSideDrawerExample"}}

### Center Modal

A center modal is anchored at the center of the window and acts as a modal. This means that while the layer is open, the rest of the page cannot be interacted with. Center modals may be used to display information without leaving the current context.

{{"example": "components/layer/LayerCenterExample"}}

### Notifications

A notification should always be posititioned at either the top or bottom of the window. Assign the modal prop to false to allow the user to continue to interact with the UI even when the notification is open.

{{"example": "components/layer/LayerNotificationExample"}}
