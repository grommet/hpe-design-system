---
name: Grommet Data Components
description: 'How to present and manipulate data collections with Grommet Data Components.'
applyTo: '**/*.{js,jsx,ts,tsx}'
---

# Instructions: Presenting and Manipulating Data Collections with Grommet Data Components

Grommet provides a collection of components for presenting and manipulating data collections. When prompted to present a data collection in an application, use Grommet's `Data` components to enhance the user experience, provide patterns for data interaction, and maintain consistency with the HPE Design System.

## Rules and Guidelines

1. **Creating data contexts**: Use Grommet's `Data` component to create a context for data collections. `DataView` and/or `Data`'s `view` and `views` props manage the state of data presentation.
2. **Data controls**: Use `DataFilters`, `DataFilter`, `DataSort`, `DataSearch`, and `Pagination` to enable filtering, sorting, and searching of data collections.
3. **Presenting data collections**: Visualize data using `DataTable`, `DataChart`, `List`, or `Grid`. Consider providing the user the ability to choose among multiple views for the same data to enhance user experience.

### Good Example — Data table with search, filters, and pagination

```jsx
import {
  Data,
  DataFilters,
  DataFilter,
  DataSearch,
  DataTable,
  Toolbar,
  Pagination,
} from 'grommet';

const columns = [
  { property: 'name', header: 'Name', primary: true },
  { property: 'role', header: 'Role' },
  { property: 'status', header: 'Status' },
];

const MyDataTable = ({ data }) => (
  <Data data={data}>
    <Toolbar>
      <DataSearch />
      <DataFilters layer>
        <DataFilter property="role" />
        <DataFilter property="status" />
      </DataFilters>
    </Toolbar>
    <DataTable columns={columns} />
    <Pagination />
  </Data>
);
```

- `Data` is the required context provider — all other Data components must be descendants of it.
- `Toolbar` arranges controls (`DataSearch`, `DataFilters`, `DataSort`) in a consistent horizontal row.
- `DataFilters` with the `layer` prop renders filters in a slide-out panel.
- `DataTable`, `List`, and `DataChart` all consume the `Data` context automatically — no extra wiring needed.
- `Pagination` automatically reflects the data context's current page state.

---

## Related References

- [coding-guidelines.instructions.md](coding-guidelines.instructions.md): General Grommet component, token, and accessibility rules.
- [grommet-layouts.instructions.md](grommet-layouts.instructions.md): Page and app layout structure.
