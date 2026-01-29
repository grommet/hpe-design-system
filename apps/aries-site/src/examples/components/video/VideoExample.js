import React from 'react';
import { Box, Video } from 'grommet';

export const VideoExample = () => (
  <Box height="medium" width="xlarge">
    <Video
      aria-label={`Video, one minute in length, describing the purpose of the 
      HPE Design System and providing an overview for the types of resources 
      the Design System provides.`}
      poster="/static/images/video-placeholder.png"
    >
      <source
        src="https://d3hq6blov2iije.cloudfront.net/media/HPE+Design+System-v3.mp4"
        type="video/mp4"
      />
      <track
        default
        kind="captions"
        srcLang="en"
        src="/static/HPE.Design.System.V6.vtt"
      />
    </Video>
  </Box>
);
