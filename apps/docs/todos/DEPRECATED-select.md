# Deprecated Select Documentation Content

The following legacy prose was removed from the old `select.mdx` files during migration because it was overly conversational, redundant with structural guidelines, or fell into the discouraged "Catch-all Guidance" or "When to use" unstructured paragraphs:

### Legacy `Guidance` dropped:
> Select is a flexible input element able to serve a wide variety of use cases. Though flexible, asking "is Select the best tool in this circumstance?" is a healthy exercise. Variants of Select, such as Select with Search, or alternatives like RadioButtonGroup, MaskedInput, or TextInput with suggestions may be more appropriate for crafting an elegant user experience.

### Legacy `When to use Select` dropped/condensed into rules:
> Because Select is flexible and familiar, the following questions are helpful to consider alternatives and/or confirm that Select is the most appropriate element:
> 
> - Is there a need to conserve screen space? Select may be appropriate.
> - Ensuring collection of standardized values? Select may be appropriate.
> - Are there less than five options? Consider a CheckBoxGroup or RadioButtonGroup as they may be more efficient for users. Select can hide information and requires extra clicks/taps for users to access that information.
> - Are there a large number of options? Lengthy scrolling can be problematic for users. Consider Select with Search or TextInput with suggestions.
> - Is the select for a State/Province in the context of collecting an address? Consider only asking for ZIP/Postal Code and automatically determining City, State, Country, etc. without user input.
> - Are the values in list well known and understood, such as Year? Consider TextInput with suggestions or MaskedInput.

### Legacy `Selecting multiple options` dropped/condensed:
> If multiple selections are permitted and there are more than 5 options, use SelectMultiple. Otherwise, consider using CheckBoxGroup.

### Legacy `Variants` Intro dropped:
> The Select input is flexible and may be extended to allow for multi-select, search, and create options.

### Legacy `Search` prose condensed:
> Select with search is especially useful when presenting lengthy options lists such as when selecting from countries or regions. TextInput with suggestions and MaskedInput are also worth considering in circumstances where values are well known.