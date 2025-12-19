import { Box, Image, ThemeContext } from 'grommet';
import { useContext } from 'react';

export const HPEGreenLakeBadge = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box
      alignSelf="start"
      flex={false}
      background="background-front"
      pad="medium"
      height="3xsmall"
      width={{ max: 'xsmall' }}
    >
      <Image
        alt="HPE GreenLake badge"
        src={
          theme.dark
            ? 'https://d3hq6blov2iije.cloudfront.net/images/hpe-greenlake/hpe_greenlake_grn_rev_rgb.svg'
            : 'https://d3hq6blov2iije.cloudfront.net/images/hpe-greenlake/hpe_greenlake_grn_pos_rgb.svg'
        }
        fit="contain"
      />
    </Box>
  );
};
