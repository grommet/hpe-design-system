import React from "react";
import {
  Box,
  Data,
  DataChart,
  Text,
  ToggleGroup,
  Toolbar
} from "grommet";
import ContentPane from "../../../../../components/ContentPane";
import capacityData from "../../../../../mockData/capacity.json";

const MOCK_TODAY = capacityData.reduce((max, d) => {
  const date = new Date(d.timestamp);
  return new Date(Math.max(max.getTime(), date.getTime()));
}, new Date(0));

const timeframes = {
  "1H": new Date(MOCK_TODAY.getTime() - 60 * 60 * 1000),
  "8H": new Date(MOCK_TODAY.getTime() - 8 * 60 * 60 * 1000),
  "1D": new Date(MOCK_TODAY.getTime() - 24 * 60 * 60 * 1000),
  "1W": new Date(MOCK_TODAY.getTime() - 7 * 24 * 60 * 60 * 1000),
};
const defaultRange = [timeframes["1W"], MOCK_TODAY];

export const Capacity = () => {
  const [data, setData] = React.useState(capacityData);
  const [range, setRange] = React.useState(defaultRange);


  const onToggle = (event: { value?: string | string[] }) => {
    const nextRange = event.value;
    const nextData = capacityData.filter((d) => {
      const date = new Date(d.timestamp);
      switch (nextRange) {
        case "1H":
          return date > timeframes["1H"];
        case "8H":
          return date > timeframes["8H"];
        case "1D":
          return date > timeframes["1D"];
        case "1W":
          return date > timeframes["1W"];
        default:
          return false;
      }
    });
    setRange([timeframes[nextRange as keyof typeof timeframes], MOCK_TODAY]);
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
          <Box gap="5xsmall">
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
            <Text size="small">
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "medium" }).format(range[0])}
              {' '}&ndash;{' '}
              {Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "medium" }).format(range[1])}
            </Text>
          </Box>
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
                  label: "Total capacity",
                  suffix: " TiB"
                }
              ]}
              axis={{
                x: { property: "timestamp", granularity: "medium" },
                y: { property: "used", granularity: "fine" },
              }}
              chart={[
                { property: "used", type: "line", thickness: "xxsmall" },
                { property: "total capacity", type: "line", thickness: "xsmall" },
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
