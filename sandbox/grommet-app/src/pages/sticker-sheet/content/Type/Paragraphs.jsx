import { Box, Paragraph } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

const PARAGRAPH_SIZES = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];

export const Paragraphs = () => {
  return (
    <ContentPane>
      <Box gap="small">
        {PARAGRAPH_SIZES.map(size => (
          <Compare key={size}>
            <Paragraph size={size} key={size} margin="none">
              Paragraph {size} with some extra text so we can see how it is when
              it wraps
            </Paragraph>
          </Compare>
        ))}
      </Box>
    </ContentPane>
  );
};
