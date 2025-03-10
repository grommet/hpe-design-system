import React, { useContext } from 'react';
import { SelectorGroup, Selector } from '../../../../components';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
} from 'grommet-icons';
import { Box, DataContext, Text } from 'grommet';

const MiniSelector = ({ value, count, icon, title }) => {
  return (
    <Selector
      value={value}
      title={
        <Box align="center">
          <Text size="small">{title}</Text>
          <Box direction="row" alignSelf="center" align="center" gap="xsmall">
            {icon}
            <Text size="xsmall">{count}</Text>
          </Box>
        </Box>
      }
      indicator={false}
      pad={{ horizontal: 'xsmall', vertical: 'xsmall' }}
      round="small"
      margin={{ bottom: 'xsmall' }}
    />
  );
};

interface DataContextType {
  onView: (view: any) => void;
  view: any;
}

export const QuickFilters: React.FC<{
  value: any;
  setValue: any;
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
      a11yTitle="Node state quick filters"
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
      layout="fit"
    >
      {[
        {
          icon: <StatusCriticalSmall color="status-critical" />,
          value: 'down',
          count: counts?.down,
          title: 'Down',
        },
        {
          icon: <StatusGoodSmall color="status-ok" />,
          value: 'up',
          count: counts?.up,
          title: 'Up',
        },
        {
          icon: <StatusUnknownSmall />,
          value: 'unknown',
          count: counts?.unknown,
          title: 'Unknown',
        },
        {
          icon: <StatusPlaceholderSmall color="status-unknown" />,
          value: 'undefined',
          count: counts?.undefinedState,
          title: 'Undefined',
        },
      ].map(({ icon, value, count, title }) => (
        <MiniSelector
          key={value}
          icon={icon}
          title={title}
          count={count}
          value={value}
        />
      ))}
    </SelectorGroup>
  );
};

export default QuickFilters;
