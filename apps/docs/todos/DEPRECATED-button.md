# DEPRECATED Button Content

Some legacy content could not be programmatically mapped directly to the new rigid MDX formats:

### When to use "Add", "Create" and "New"

| Label      | Purpose                                                                                                                                                                                                   | Example                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Add**    | "Add" is used when an object already exists. It builds an association between that object and another object or set of objects.                                                                           | When editing a device group, use "Add device" to add an existing device to the group.                                               |
| **New**    | "New" opens a template, or blank canvas, of a given object type to allow for user input. The object will not be added as a record in a database until a "Create" or submission action has been completed. | When starting the configuration process for a new device, use "New device" to initiate the process.                                 |
| **Create** | "Create" is typically used for form submission, to submit user input and create an instance of an object.                                                                                                 | After completing inputs related to configuring a new device, use "Create device" to submit the data and create the object instance. |

### Button alignment

Buttons are unique components since their alignment depends on where they appear (drawers, modals, etc.). Buttons should always be where the user most expects it. In general, follow this guide on how to align buttons in most use cases.

<ButtonAlignmentTable />

### Button ordering

Button types may be applied in various combinations, however they should always be ordered by order of importance and in relation to their alignment: Primary first, followed by Secondary, then by Default.

<Example previewWidth="xlarge" height="none" pad="xsmall" width="xlarge">
  <ButtonLeftAlignExample />
</Example>

<Example previewWidth="xlarge" height="none" pad="xsmall" width="xlarge">
  <ButtonRightAlignExample />
</Example>
