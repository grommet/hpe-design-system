import { DataTableColumns, ToggleGroup, View } from 'grommet';
import { ManageDataView } from '../ManageDataView';
import { defaultVisualization, visualizationOptions } from '../devicesDefaults';
import { columnOptions } from '../TableView/table-columns';

export const CustomizeControls = (
  {
    view,
    setView,
    views,
    setViews,
    visualization,
    setVisualization
  }: {
    view: View,
    setView: (view: View) => void,
    views: View[],
    setViews: (views: View[]) => void,
    visualization: string,
    setVisualization: (visualization: string | string[]) => void
  }) => {
  return (
    <>
      <ManageDataView
        view={view}
        views={views}
        setView={setView}
        setViews={setViews}
      />
      <ToggleGroup
        a11yTitle="Choose visualization"
        defaultValue={defaultVisualization}
        options={visualizationOptions}
        value={visualization}
        onToggle={({ value }) => setVisualization(value || '')}
      />
      {visualization === 'table' &&
        <DataTableColumns
          drop
          options={columnOptions}
        />}
    </>);
}