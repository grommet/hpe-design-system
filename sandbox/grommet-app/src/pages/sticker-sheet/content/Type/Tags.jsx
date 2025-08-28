import { Box, Tag } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Tags = () => {
  return (
    <ContentPane>
      <Compare>
        <Box align="start" gap="xsmall">
          <Tag value="Value" name="Name" />
          <Tag value="Value" name="Name" onRemove={() => {}} />
        </Box>
      </Compare>
    </ContentPane>
  );
};
