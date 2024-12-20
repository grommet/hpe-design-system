import { Box, Spinner } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Spinners = () => {
  return (
    <ContentPane>
      <Box gap="medium">
        <Compare>
          <Spinner size="xsmall" />
        </Compare>
        <Compare>
          <Spinner size="small" />
        </Compare>
        <Compare>
          <Spinner size="medium" />
        </Compare>
        <Compare>
          <Spinner size="large" />
        </Compare>
      </Box>
    </ContentPane>
  );
};
