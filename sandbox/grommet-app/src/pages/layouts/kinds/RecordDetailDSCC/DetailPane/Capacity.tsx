import React from "react";
import {
  Box,
  Data,
  DataChart,
  ToggleGroup,
  Toolbar
} from "grommet";
import ContentPane from "../../../../../components/ContentPane";
import capacityData from "../../../../../mockData/capacity.json";

const NOW = capacityData.reduce((max, d) => {
  const date = new Date(d.timestamp);
  return new Date(Math.max(max.getTime(), date.getTime()));
}, new Date(0));

console.log(NOW);

export const Capacity = () => {
  const [data, setData] = React.useState(capacityData);
  const onToggle = (event: { value?: string | string[] }) => {
    const nextValue = event.value;
    const nextData = capacityData.filter((d) => {
      const date = new Date(d.timestamp);
      switch (nextValue) {
        case "1H":
          return date > new Date(NOW.getTime() - 60 * 60 * 1000);
        case "8H":
          return date > new Date(NOW.getTime() - 8 * 60 * 60 * 1000);
        case "1D":
          return date > new Date(NOW.getTime() - 24 * 60 * 60 * 1000);
        case "1W":
          return date > new Date(NOW.getTime() - 7 * 24 * 60 * 60 * 1000);
        default:
          return false;
      }
    });
    setData(nextData);
  }

  return (
    <ContentPane
      heading={undefined}
      level={undefined}
      actions={undefined}
      skeleton={undefined}
    >
      <Data data={capacityData}>
        <Box gap="medium">
          <Toolbar>
            <ToggleGroup
              a11yTitle="Choose chart timeframe"
              options={[
                { label: "1H", value: "1H" },
                { label: "8H", value: "8H" },
                { label: "1D", value: "1D" },
                { label: "1W", value: "1W" },
              ]}
              onToggle={onToggle}
              defaultValue={["1W"]}
            />
          </Toolbar>
          <Box height="medium">
            <DataChart
              data={data}
              series={[
                {
                  property: "timestamp",
                  label: "Time",
                  render: (datum: any) => Intl.DateTimeFormat(undefined, {
                    dateStyle: "short",
                    timeStyle: "short"
                  }).format(new Date(datum))
                },
                {
                  property: "used",
                  label: "Used",
                  suffix: " TiB"
                },
                {
                  property: "total capacity",
                  label: "Total Capacity",
                  suffix: " TiB"
                }
              ]}
              axis={{
                x: { property: "timestamp", granularity: "medium" },
                y: { property: "used", granularity: "fine" },
              }}
              chart={[
                { property: "used", type: "line", thickness: "xsmall" },
                { property: "total capacity", type: "line", thickness: "xxsmall" },
              ]}
              size="fill"
              guide={{
                x: true,
                y: {
                  granularity: "fine",
                },
              }}
              legend
              detail
            />
          </Box>
        </Box>
      </Data>
    </ContentPane>
  );
}
