import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Compare } from '../../components';
import ContentPane from '../../../../components/ContentPane';

const tshirtSizes = [
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

export const ContentSizes = () => {
  return (
    <ContentPane overflow={{ horizontal: 'auto' }}>
      <Box gap="small">
        {tshirtSizes.map(
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
