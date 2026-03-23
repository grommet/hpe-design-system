# TODO: Select component refactoring gaps

## Missing Documentation & Examples

- Anatomy diagram needs to be created and mapped to the markdown table.
- `Select`: "Specifying a location or region" use case example needs to be created.
- `Select`: "Categorizing data or assigning a role" use case example needs to be created.

## Undocumented Props

The following Grommet Select props are not yet documented in the YAML:
- `labelKey` / `valueKey` — for object-based option arrays
- `children` — render prop for custom option appearance
- `emptySearchMessage` — shown when search returns no results
- `clear` — adds a "clear" option at the top of the list
- `size` — controls the size of the Select

## Notes & Future Considerations

- Keep an eye on FormField integrations where `htmlFor` and `id` linking is specifically mentioned. Future audits might unify this instruction into a global form-level guideline.
- `SelectMultiple` is a related component that should have its own YAML file.
