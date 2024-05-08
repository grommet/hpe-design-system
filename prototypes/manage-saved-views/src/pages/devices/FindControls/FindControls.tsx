import { DataSearch, DataFilters, DataFilter, DateInput, View } from 'grommet';

export const FindControls = (
  {
    dateRange,
    setDateRange,
    view,
    setView
  }: {
    dateRange: string | string[],
    setDateRange: (dateRange: string | string[]) => void,
    view: View,
    setView: (view: View) => void
  }
) => {
  return (
    <>
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
    </>);
};