import { useEffect, useState } from 'react';
import {
  Box,
  Data,
  DataSummary,
  Menu,
  Page,
  PageContent,
  PageHeader,
  SortType,
  Toolbar,
  View
} from 'grommet';
import { filter } from 'grommet/components/Data/filter';
import { Link } from 'react-router-dom';
import { ContentPane, ReverseAnchor } from '../../components/index.ts';
import { CustomizeControls } from './CustomizeControls';
import { FindControls } from './FindControls';
import { TableView } from './TableView/index.ts';
import {
  defaultData,
  defaultProperties,
  defaultView,
  defaultViews,
  defaultVisualization
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
  const [views, setViews] = useState<View[]>(
    localStorage.getItem('views') ?
      JSON.parse(localStorage.getItem('views')) :
      defaultViews
  );

  // Set views to local storage
  useEffect(() => {
    localStorage.setItem('views', JSON.stringify(views));
  }, [views]);

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
                  <FindControls
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    view={view}
                    setView={setView}
                  />
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
