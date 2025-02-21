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
  counts: { down?: number; up?: number; unknown?: number; undefined?: number };
}> = ({ value: selectedValue, setValue, counts }) => {
  const { onView, view } = useContext(DataContext) as DataContextType;

  return (
    <SelectorGroup
      a11yTitle="Server State quick filters"
      value={selectedValue}
      defaultValue={undefined}
      multiple={false}
      onSelect={({ value }) => {
        let nextView = { ...view };
        const nextProperties: { state?: string[] } = {};
        if (value) nextProperties.state = [value];
        nextView = {
          ...nextView,
          search: '',
          page: 1,
          properties: nextProperties,
          value: undefined,
        };

        onView(nextView);
        setValue(value);
      }}
      layout="grid"
    >
      <Text size="large">Group By Availability State</Text>
      <Selector
        icon={<StatusCriticalSmall color="status-critical" height="medium" />}
        title="Down servers"
        value="down"
        direction="column"
        indicator={true}
        description={<Text size="xlarge">{counts?.down}</Text>}
      />
      <Selector
        icon={<StatusGoodSmall color="status-ok" height="medium" />}
        title="Up servers"
        value="up"
        direction="column"
        indicator={true}
        description={<Text size="xlarge">{counts?.up}</Text>}
      />
      <Selector
        icon={<StatusUnknownSmall height="medium" />}
        title="Unknown servers"
        value="unknown"
        direction="column"
        indicator={true}
        description={<Text size="xlarge">{counts?.unknown}</Text>}
      />
      <Selector
        icon={<StatusPlaceholderSmall color="status-unknown" height="medium" />}
        title="Undefined servers"
        value="undefined"
        direction="column"
        indicator={true}
        description={<Text size="xlarge">{counts?.undefined}</Text>}
      />
    </SelectorGroup>
  );
};

export default QuickFilters;
