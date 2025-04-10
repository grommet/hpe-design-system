import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const Spacing = ({ theme }) => {
  return (
    <ContentPane>
      <Box gap="xsmall">
        {Object.keys(theme.global.edgeSize).map(
          size =>
            size !== 'responsiveBreakpoint' && (
              <Compare key={size}>
                <Box>
                  <Box
                    alignSelf="start"
                    background={{
                      color: 'red',
                      opacity: 'medium',
                    }}
                    pad={{ left: size }}
                    height="xxsmall"
                    flex={false}
                  />
                  <Text size="small">{size}</Text>
                </Box>
              </Compare>
            ),
        )}
      </Box>
    </ContentPane>
  );
};

Spacing.propTypes = {
  theme: PropTypes.object,
};
