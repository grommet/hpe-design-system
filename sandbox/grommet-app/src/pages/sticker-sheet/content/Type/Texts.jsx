import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components/Compare';

export const Texts = ({ textSizes }) => {
  return (
    <ContentPane>
      <Box gap="xsmall">
        {textSizes.map(size => (
          <Compare guidingChild="last" key={size}>
            <Text size={size} key={size}>
              Text {size}
            </Text>
          </Compare>
        ))}
      </Box>
    </ContentPane>
  );
};

Texts.propTypes = {
  textSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
