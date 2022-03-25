import React, { useContext } from 'react';

import { Anchor, AnnounceContext, Box } from 'grommet';

export const AccessVideo = () => {
  const announce = useContext(AnnounceContext);

  return (
    <>
      <Box 
        gap="small" 
        width="large" 
        pad={{ bottom: 'large' }}
      >
        <video 
          aria-label="Accessibility at HPE Video"
          aria-describedby="video-alt" 
          poster="/static/images/Bill-Access-Cover.png" 
          transcript="/static/accessibility/transcript.html"
          controlsList="nodownload"
          controls
        >
          <source
            src="https://d3hq6blov2iije.cloudfront.net/media/BILL-ACCESS-VID.mp4"
            type="video/mp4"
          />
          <track
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
          a11yTitle="Video transcript file"
          href="/static/accessibility/transcript.html" 
          target="_blank"
          onClick={() => announce("Opened video transcript file")}
        >
          Transcript file
        </Anchor>
      </Box>
    </>
  );
};
