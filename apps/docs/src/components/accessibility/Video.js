import React, { useContext, useState } from 'react';

import { AnnounceContext, Box, Button } from 'grommet';
import { Down, Up } from '@hpe-design/icons-grommet';

const desc = `The video shows Bill, a white man with blondish brown hair 
  and a mustache, in his office wearing a long-sleeved lavender-blue 
  dress shirt with the HPE rectangular-shaped, multi-color logo
  against a black background as the background.`;

export const AccessVideo = () => {
  const announce = useContext(AnnounceContext);

  const [expanded, setExpanded] = useState(false);

  return (
    <Box width="xlarge" pad={{ bottom: 'xlarge' }}>
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
      <Box
        background="background-front"
        round={{ corner: 'bottom', size: 'medium' }}
        pad="xsmall"
      >
        <Box direction="row" gap="xsmall">
          <Button
            icon={
              expanded ? (
                <Up a11yTitle="Up icon" />
              ) : (
                <Down a11yTitle="Down icon" />
              )
            }
            reverse
            alignSelf="start"
            label="Video Description"
            a11yTitle="Audio Description of video"
            ariaDescription={`Click to ${expanded ? 'hide' : 'show'} audio 
            description`}
            onClick={() => {
              setExpanded(!expanded);
              if (expanded) announce('Hid audio description');
              else announce('Opened audio description');
            }}
          />
          <Button
            alignSelf="start"
            label="Transcript file"
            a11yTitle="Video transcript file with audio description"
            href="/foundation/accessibility-transcript-file"
            target="_blank"
            onClick={() =>
              announce('Opened video transcript file', 'assertive')
            }
          />
        </Box>
        {expanded && <Box pad="xsmall">{desc}</Box>}
      </Box>
    </Box>
  );
};
