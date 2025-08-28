import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

export const ContentSizes = ({ theme }) => {
  return (
    <ContentPane overflow={{ horizontal: 'auto' }}>
      <Box gap='xsmall'>
        {Object.keys(theme.global.size).map(
          size =>
            size !== 'responsiveBreakpoint' && (
              <Compare key={size}>
                <Box>
                  <Box
                    background={{
                      color: 'blue',
                      opacity: 'medium',
                    }}
                    width={size}
                    height={size}
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

ContentSizes.propTypes = {
  theme: PropTypes.object,
};
