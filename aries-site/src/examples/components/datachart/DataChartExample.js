import { DataChart, Text } from 'grommet';

const data = [];
for (let i = 0; i < 7; i += 1) {
  data.push({
    date: `2020-07-${((i % 31) + 1).toString().padStart(2, 0)}`,
    usage: Math.floor(Math.abs(Math.sin(i / 2.0) * 100)),
    bonus: Math.floor(Math.abs(Math.cos(i / 2.0) * 100)),
  });
}

export const DataChartExample = () => (
  <DataChart
    data={data}
    series={[
      {
        property: 'date',
        render: date => (
          <Text margin={{ horizontal: 'xsmall' }}>
            {new Date(date).toLocaleDateString('en-US', {
              month: 'numeric',
              day: 'numeric',
            })}
          </Text>
        ),
      },
      'usage',
      'bonus',
    ]}
    chart={[
      {
        property: ['usage', 'bonus'],
        type: 'bars',
      },
    ]}
    axis={{ x: { property: 'date', granularity: 'fine' }, y: true }}
    guide={{ y: true }}
    legend
  />
);
