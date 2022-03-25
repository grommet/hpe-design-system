import React from 'react';

import { Anchor, Box } from 'grommet';

export const AccessVideo = () => {

  return (
    <>
      <Box gap="small" width="large" pad={{ bottom: 'large' }}>
        <video 
          aria-label="Accessibility at HPE Video" 
          aria-describedby="video-alt" 
          poster="/static/accessibility/Bill-Access-Cover.png" 
          transcript="/static/accessibility/transcript.html"
          controls
        >
          <source
            src="https://d3hq6blov2iije.cloudfront.net/media/BILL-ACCESS-VID.mp4"
            type="video/mp4"
          />
          <track
            default
            kind="captions"
            srcLang="en"
            src="/static/accessibility/Bill.Access.Captions.vtt"
          />

          <div id="video-alt">
            The video shows Bill, a white man with blondish brown hair and a 
            mustache, in his office wearing a long-sleeved lavender-blue 
            dress shirt with the HPE rectangular-shaped, multi-color logo
            against a black background as the background.
          </div>
        </video>
        <Anchor 
          a11yTitle="Accessibility at HPE with Bill Tipton"
          href="/static/accessibility/transcript.html" 
          target="_blank"
        >
          Transcript file
        </Anchor>
      </Box>
    </>
  );
};
