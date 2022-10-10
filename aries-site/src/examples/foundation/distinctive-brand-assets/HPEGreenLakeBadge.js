import { Box, Image } from 'grommet';

export const HPEGreenLakeBadge = () => (
  <Box
    alignSelf="start"
    flex={false}
    background="background-front"
    pad="medium"
    height="xsmall"
    width={{ max: 'small' }}
  >
    <Image
      alt="HPE GreenLake badge"
      src="https://d3hq6blov2iije.cloudfront.net/images/hpe-greenlake/hpe_greenlake_grn_pos_rgb.svg"
      fit="contain"
    />
  </Box>
);
