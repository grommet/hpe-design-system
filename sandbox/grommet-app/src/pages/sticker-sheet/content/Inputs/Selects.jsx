import { Box, Select } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const Selects = () => {
  return (
    <ContentPane>
      <Box gap="medium">
        <Compare>
          <Select
            options={['Option 1', 'Option 2', 'Option 3']}
            placeholder="Select option"
            multiple
          />
        </Compare>
        <Compare>
          <Select
            options={['Option 1', 'Option 2', 'Option 3']}
            placeholder="Select option"
            multiple
            onSearch={() => {}}
            clear
          />
        </Compare>
      </Box>
    </ContentPane>
  );
};
