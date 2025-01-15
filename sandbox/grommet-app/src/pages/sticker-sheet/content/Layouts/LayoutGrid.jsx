import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import ContentPane from '../../../../components/ContentPane';
import { Compare } from '../../components';

const Cell = ({ index, width, count, color = 'blue!' }) => {
  return (
    <Box
      width={width}
      height="48px"
      background={{
        color,
        opacity: `${((index + 1) / count) * 100}%`,
      }}
      flex={false}
      justify="center"
      align="center"
    >
      {index === 0 && <Text size="small">{width}</Text>}
    </Box>
  );
};

Cell.propTypes = {
  index: PropTypes.number,
  width: PropTypes.string,
  count: PropTypes.number,
  color: PropTypes.string,
};

export const LayoutGrid = () => {
  return (
    <ContentPane>
      <Compare>
        <Box
          width="large"
          // overflow="auto"
          // border
          background="background-front"
          // flex={false}
        >
          <Box direction="row">
            {Array.from({ length: 12 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="4xsmall"
                count={12}
                color="blue!"
              />
            ))}
          </Box>
          <Box direction="row">
            {Array.from({ length: 8 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="3xsmall"
                count={8}
                color="orange!"
              />
            ))}
          </Box>
          <Box direction="row">
            {Array.from({ length: 6 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="xxsmall"
                count={8}
                color="purple!"
              />
            ))}
          </Box>
          <Box direction="row">
            {Array.from({ length: 4 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="xsmall"
                count={8}
                color="yellow!"
              />
            ))}
          </Box>
          <Box direction="row">
            {Array.from({ length: 3 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="small"
                count={4}
                color="teal!"
              />
            ))}
          </Box>
          <Box direction="row">
            {Array.from({ length: 2 }).map((_, index) => (
              <Cell
                key={index}
                index={index}
                width="medium"
                count={2}
                color="red!"
              />
            ))}
          </Box>
        </Box>
      </Compare>
    </ContentPane>
  );
};
