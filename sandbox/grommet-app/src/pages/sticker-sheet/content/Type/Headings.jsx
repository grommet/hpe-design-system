import { Box, Heading } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

const HEADING_LEVELS = [1, 2, 3, 4, 5, 6];

export const Headings = () => {
  return (
    <ContentPane>
      <Box gap="medium">
        {HEADING_LEVELS.map(level => (
          <Box gap='xsmall' key={level}>
            {/* Heading sizes are not relevant to product teams because our guidance
                  discourages use of them. */}
            {/* {['small', 'medium', 'large', 'xlarge'].map(size => ( */}
            <Compare guidingChild="last">
              <Heading
                // size={size}
                key={`${level}`}
                level={level}
                margin="none"
                style={{ color: 'inherit' }}
              >
                Heading {level}
              </Heading>
            </Compare>
            {/* ))} */}
          </Box>
        ))}
      </Box>
    </ContentPane>
  );
};
