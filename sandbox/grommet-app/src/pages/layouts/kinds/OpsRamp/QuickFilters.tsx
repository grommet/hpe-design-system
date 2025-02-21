import React, { useContext } from 'react';
import { SelectorGroup, Selector } from '../../../../components';
import {
  StatusCriticalSmall,
  StatusGoodSmall,
  StatusUnknownSmall,
  StatusPlaceholderSmall,
} from 'grommet-icons';
import { DataContext, Text } from 'grommet';

export const QuickFilters: React.FC<{
  value;
  setValue;
  counts;
}> = ({ value: selectedValue, setValue, counts }) => {
  const { onView, view } = useContext(DataContext);

  return (
    <SelectorGroup
      a11yTitle="Server State quick filters"
      value={selectedValue}
      onSelect={({ value }) => {
        let nextView = { ...view };
        const nextProperties = {};
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
        description={<Text size="xlarge">{counts?.undefiend}</Text>}
      />
    </SelectorGroup>
  );
};

export default QuickFilters;
