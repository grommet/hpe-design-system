import React from 'react';

import { Box } from 'grommet';

export const AccessVideo = () => {

  return (
    <Box width="large" pad={{ bottom: 'large' }}>
      <video controls>
        <source
          src="https://d3hq6blov2iije.cloudfront.net/media/BILL-ACCESS-VID.mp4"
          type="video/mp4"
        />
        <track
          default
          kind="captions"
          srcLang="en"
          src="/static/Bill.Access.Captions.vtt"
        />
      </video>
    </Box>
  );
};
