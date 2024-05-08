import { useState } from 'react';
import {
  Box,
  Data,
  DataFilter,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTableColumns,
  DateInput,
  Menu,
  Page,
  PageContent,
  PageHeader,
  SortType,
  ToggleGroup,
  Toolbar,
  View
} from 'grommet';
import { filter } from 'grommet/components/Data/filter';
import { Link } from 'react-router-dom';
import { ContentPane, ReverseAnchor } from '../../components/index.ts';
import { CustomizeControls } from './CustomizeControls';
import { TableView } from './TableView/index.ts';
import { columnOptions } from './TableView/table-columns.tsx';
import { ManageDataView } from './ManageDataView';
import {
  defaultData,
  defaultProperties,
  defaultView,
  defaultViews,
  defaultVisualization,
  visualizationOptions
} from './devicesDefaults.tsx';

const totalItems = defaultData.length;

const initialData = filter(defaultData, defaultView, defaultProperties);

const Devices = () => {
  const [data, setData] = useState(initialData.data);
  const [filteredTotal, setFilteredTotal] = useState<number>(totalItems);
  const [selected, setSelected] = useState<string[]>([]);
  const [visualization, setVisualization] = useState<string | string[]>(defaultVisualization);
  const [dateRange, setDateRange] = useState<string | string[]>([]);
  const [view, setView] = useState<View>(defaultView);
  const [views, setViews] = useState<View[]>(defaultViews);

  const handleAction = ({ action, items }: { action: string, items: string[] }) => {
    const result = items.map((item) => data.find((datum) => datum.serial_number === item));
    alert(`${action} ${result.length} selected records.`)
  }

  const onSort = ({ property, direction }: SortType) => {
    onView({ ...view, sort: { property, direction } });
  }

  const onView = (nextView: View) => {
    if (!nextView.properties) {
      setDateRange([]);
    } else if (nextView.properties.expiration_date) {
      const { min, max } = nextView.properties.expiration_date;
      setDateRange([new Date(min).toISOString(), new Date(max).toISOString()]);
    }

    const response = filter(defaultData, nextView, defaultProperties);

    setData(response.data);
    setFilteredTotal(response.filteredTotal);
    setView(nextView);
  }

  return (
    <Page pad={{ bottom: 'xlarge' }}>
      <PageContent>
        <PageHeader
          title="Devices"
          parent={<ReverseAnchor as={Link} to="/" label="Home" />}
          subtitle="Onboard and manage all devices in your inventory."
        />
        <ContentPane
          heading="Inventory"
          level={2}
          contain
          skeleton={false}
        >
          <Data
            data={data}
            total={totalItems}
            filteredTotal={filteredTotal}
            views={views}
            properties={defaultProperties}
            view={view}
            onView={onView}
          >
            <Toolbar fill gap="medium">
              <Box>
                <Toolbar>
                  <DataSearch />
                  <DataFilters layer>
                    <DataFilter property="location_name" />
                    <DataFilter property="device_type" />
                    <DataFilter property="tier" />
                    <DataFilter property="expiration_date">
                      <DateInput
                        format="mm/dd/yyyy-mm/dd/yyyy"
                        value={dateRange}
                        onChange={({ value }) => {
                          const [start, end] = Array.isArray(value) ?
                            value.map((date) => new Date(date)) :
                            [new Date(value), new Date(value)];
                          setDateRange(value);
                          setView({
                            ...view,
                            properties: {
                              ...view.properties,
                              expiration_date: {
                                min: start?.getTime(),
                                max: end?.getTime()
                              }
                            }
                          });
                        }}
                      />
                    </DataFilter>
                  </DataFilters>
                </Toolbar>
                <DataSummary />
              </Box>
              <Toolbar>
                <CustomizeControls
                  view={view}
                  setView={onView}
                  views={views}
                  setViews={setViews}
                  visualization={visualization}
                  setVisualization={setVisualization}
                />
              </Toolbar>
              <Box flex />
              <Menu
                label="Actions"
                kind="toolbar"
                items={[[
                  { label: 'Add devices', onClick: () => { } },
                  { label: 'Add to group', onClick: () => { handleAction({ action: 'Adding', items: selected }) } },
                  { label: 'Assign to location', onClick: () => { handleAction({ action: 'Assiging', items: selected }) } }]
                  ,
                [{ label: 'Export', onClick: () => { handleAction({ action: 'Exporting', items: selected }) } }]
                ]}
                dropAlign={{ top: 'bottom', right: 'right' }}
              />
            </Toolbar>
            {visualization === 'table' && <TableView onSort={onSort} select={selected} setSelect={setSelected} total={filteredTotal} view={view} />}
          </Data>
        </ContentPane>
      </PageContent>
    </Page >
  );
};

export default Devices;
