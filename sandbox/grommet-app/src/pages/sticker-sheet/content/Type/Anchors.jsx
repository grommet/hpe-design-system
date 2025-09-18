import PropTypes from 'prop-types';
import { Anchor, Box } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

export const Anchors = ({ textSizes }) => {
  return (
    <ContentPane>
      <Box gap='xsmall'>
        {textSizes.map(size => (
          <Compare key={size}>
            <Anchor size={size} key={size}>
              Anchor {size}
            </Anchor>
          </Compare>
        ))}
      </Box>
    </ContentPane>
  );
};

Anchors.propTypes = {
  textSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
