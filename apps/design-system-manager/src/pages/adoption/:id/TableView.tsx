import { DataTable } from "grommet";
import type { ColumnConfig } from "grommet";
import { sentenceCase } from "../../../utils/textTransform";
import type { FeatureAdoption } from ".";

const tableColumns: ColumnConfig<FeatureAdoption>[] = [
	{
		property: 'id',
		header: 'ID',
		primary: true,
		render: (datum: FeatureAdoption) => datum.feature,
	},
	{
		property: 'adoption_level',
		header: 'Adoption level',
	},
	{
		property: 'category',
		header: 'Category',
		render: (datum: FeatureAdoption) => sentenceCase(datum.category),
	},
	{
		property: 'feature_name',
		header: 'Feature name',
	},
	{
		property: 'design',
		header: 'Design',
	},
	{
		property: 'code',
		header: 'Code',
	}
];

export const TableView = ({...rest}) => {
  return (
    <DataTable
      columns={tableColumns}
      alignSelf="start"
      size="60vh"
      {...rest}
    />
  );
}