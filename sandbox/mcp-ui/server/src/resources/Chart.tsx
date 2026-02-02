import { DataChart } from "grommet";

export const Chart = ({ data }: { data: Array<{ label: string; value: number }> }) => {
  return (
    <DataChart
      data={data}
      series={['label', 'value']}
      chart={[{ property: 'value', type: 'bar', thickness: 'medium' }]}
      axis={{ x: { property: 'label', granularity: 'fine' } }}
      gap="small"
      pad={{ vertical: 'small' }}
    />
  );
};