import ContentPane from '../../../../components/ContentPane';
import { Box } from 'grommet';
import { User } from 'grommet-icons';
import { Compare } from '../../components';

export const Icons = () => {
  return (
    <ContentPane>
      <Box gap="xsmall">
        <Compare>
          <User size="small" />
        </Compare>
        <Compare>
          <User />
        </Compare>
        <Compare>
          <User size="large" />
        </Compare>
        <Compare>
          <User size="xlarge" />
        </Compare>
      </Box>
    </ContentPane>
  );
};
