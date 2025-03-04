import React, { useContext } from 'react';
import { SelectorGroup, Selector } from '../../../../components';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
} from 'grommet-icons';
import { DataContext, Text } from 'grommet';

interface DataContextType {
  onView: (view: any) => void;
  view: any;
}

export const QuickFilters: React.FC<{
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  counts: {
    down?: number;
    up?: number;
    unknown?: number;
    undefinedState?: number;
  };
}> = ({ value: selectedValue, setValue, counts }) => {
  const { onView, view } = useContext(DataContext) as DataContextType;

  return (
    <SelectorGroup
      a11yTitle="Server State quick filters"
      value={selectedValue}
      defaultValue={undefined}
      multiple={false}
      onSelect={({ value }) => {
        const nextView = {
          ...view,
          search: '',
          page: 1,
          properties: value ? { state: [value] } : {},
          value: undefined,
        };
        onView(nextView);
        setValue(value);
      }}
      layout="grid"
    >
      <Text size="large">Group By Availability State</Text>
      {[
        {
          icon: <StatusCriticalSmall color="status-critical" height="medium" />,
          title: 'Down',
          value: 'down',
          count: counts?.down,
        },
        {
          icon: <StatusGoodSmall color="status-ok" height="medium" />,
          title: 'Up',
          value: 'up',
          count: counts?.up,
        },
        {
          icon: <StatusUnknownSmall height="medium" />,
          title: 'Unknown',
          value: 'unknown',
          count: counts?.unknown,
        },
        {
          icon: (
            <StatusPlaceholderSmall color="status-unknown" height="medium" />
          ),
          title: 'Undefined',
          value: 'undefined',
          count: counts?.undefinedState,
        },
      ].map(({ icon, title, value, count }) => (
        <Selector
          key={value}
          icon={icon}
          title={title}
          value={value}
          direction="column"
          indicator={true}
          description={<Text size="xlarge">{count}</Text>}
        />
      ))}
    </SelectorGroup>
  );
};

export default QuickFilters;
