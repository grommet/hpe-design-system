import React from 'react';

import { Box } from 'grommet';

export const AccessVideo = () => {

  return (
    <Box width="large" pad={{ bottom: 'large' }}>
      <video 
        aria-label="Accessibility at HPE Video" 
        aria-describedby="video-alt" 
        poster="/static/images/BILL-ACCESS-COVER.png" 
        transcript="transcript.html"
        controls
      >
        <div id="video-alt">
          The video shows Bill, a white man with blondish brown hair and a 
          mustache, in his office wearing a long-sleeved lavender-blue 
          dress shirt with the HPE rectangular-shaped, multi-color logo
          against a black background as the background.
        </div>
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
