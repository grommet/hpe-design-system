import React, { useContext } from 'react';

import { Anchor, AnnounceContext, Box } from 'grommet';

const desc = `The video shows Bill, a white man with blondish brown hair 
  and a mustache, in his office wearing a long-sleeved lavender-blue 
  dress shirt with the HPE rectangular-shaped, multi-color logo
  against a black background as the background.`

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
          aria-description={desc}
          poster="/static/images/Bill-Access-Cover.png" 
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
        </video>
        <Anchor 
          a11yTitle="Video transcript file"
          href="/static/accessibility/transcript.html" 
          target="_blank"
          onClick={() => 
            announce("Opened video transcript file", 'assertive')
          }
        >
          Transcript file
        </Anchor>
      </Box>
    </>
  );
};
