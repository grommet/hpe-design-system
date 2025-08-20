import type { RecordModel } from "pocketbase";

export interface ColumnConfig {
  property: string;
  header: string;
  primary?: boolean;
  render?: (datum: RecordModel) => React.ReactNode;
}

export const columnsConfig: ColumnConfig[] = [
  {
    property: "id",
    header: "Feature",
    primary: true,
    render: (datum) => datum.name,
  },
  {
    property: "adoption_level",
    header: "Adoption level",
  },
  {
    property: "feature_category",
    header: "Category",
  },
  {
    property: "design",
    header: "Design",
    render: (datum) => datum.design || "--",
  },
  {
    property: "code",
    header: "Code",
    render: (datum) => datum.code || "--",
  },
  {
    property: "adopted",
    header: "Adoption status",
  },
];
