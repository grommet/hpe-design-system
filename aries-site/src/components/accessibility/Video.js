import React, { useContext, useState } from 'react';

import { AnnounceContext, Box, Button } from 'grommet';
import { FormDown, FormUp } from 'grommet-icons';

const desc = `The video shows Bill, a white man with blondish brown hair 
  and a mustache, in his office wearing a long-sleeved lavender-blue 
  dress shirt with the HPE rectangular-shaped, multi-color logo
  against a black background as the background.`

export const AccessVideo = () => {
  const announce = useContext(AnnounceContext);

  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Box 
        gap="small" 
        width="large" 
        pad={{ bottom: 'large' }}
      >
        <video 
          aria-label="Accessibility at HPE Video"
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
        <Button 
          icon={
            expanded ? 
              <FormUp a11yTitle="Up arrow" /> : 
              <FormDown a11yTitle="Down arrow" />
          }
          reverse
          alignSelf="start"
          label="Video Audio Description"
          a11yTitle="Video Audio Description"
          aria-description="Click to show audio description"
          onClick={() => {
            setExpanded(!expanded);
            expanded ? announce("Hid audio description") : 
              announce("Opened audio description");
          }} 
        />
        {expanded && desc}
        <Button 
          alignSelf="start"
          label="Transcript file"
          a11yTitle="Video transcript file with audio description"
          href="/static/accessibility/transcript.html" 
          target="_blank"
          onClick={() => 
            announce("Opened video transcript file", 'assertive')
          }
        />
      </Box>
    </>
  );
};
