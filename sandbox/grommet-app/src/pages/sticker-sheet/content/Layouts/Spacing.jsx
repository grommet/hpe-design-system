import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

const tshirtSizes = [
  'none',
  'hair',
  '4xsmall',
  '3xsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  '3xlarge',
  '4xlarge',
];

export const Spacing = ({ theme }) => {
  return (
    <ContentPane>
      <Box gap="small">
        {tshirtSizes.map(
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
                    height={theme.global.edgeSize.large}
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
