# DEPRECATED Checkbox Content

### States

There are three states which CheckBox provides:

- Unchecked - Value has not been selected.
- Checked - Value has been selected.
- Indeterminate - Used in situations where the CheckBox is a parent to a list of child options. Use the indeterminate state to indicate that only a subset of the child options have been checked.

Checked and unchecked states refer to when an individual CheckBox is checked or when all options from a group are checked. CheckBox can be used individually, within a group, or as a toggle. A standalone or toggle checkbox indicates that a user is opting-in to the context of the checkbox. Within a group, one or multiple checkboxes can be selected.

### Toggle details
- When using toggles the order of text and toggle can be controlled using the reverse prop. If the toggles are used in a group that contains only toggles then it is preferred to have the text on the left and the toggle on the right.

### Accessibility outside of FormField

If a CheckBox is used outside of the context of a FormField, it is important to meet accessibility requirements in an alternate way.