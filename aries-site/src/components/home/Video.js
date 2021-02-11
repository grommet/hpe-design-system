import React, { useEffect, useRef, useState } from 'react';

import { Box, Video as GrommetVideo } from 'grommet';
import { useDarkMode } from '../../utils';

export const Video = ({ ...rest }) => {
  const darkMode = useDarkMode();
  const videoRef = useRef(null);

  const [videoEnabled, setVideoEnabled] = useState(false);
  const [windowHeight, setWindowHeight] = useState();

  useEffect(() => {
    const onResize = () => {
      setWindowHeight(window.innerHeight);
    };
    window.addEventListener('resize', onResize);
    onResize();
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <Box
      fill
      onClick={evt => {
        // Toggle whether the video is playing. We'll ignore the event
        // though if it's over the video controls at the bottom
        // otherwise we'll interfere with the other controls.
        if (!videoEnabled || evt.target === videoRef.current) {
          if (videoRef.current.paused) {
            setVideoEnabled(true);
            videoRef.current.play();
          } else {
            videoRef.current.pause();
          }
        }
      }}
      {...rest}
    >
      <GrommetVideo
        ref={videoRef}
        controls={videoEnabled ? 'below' : false}
        poster={`/static/images/video-placeholder${
          darkMode.value ? '-dark' : ''
        }.png`}
        style={windowHeight ? { maxHeight: `${windowHeight}px` } : undefined}
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
      </GrommetVideo>
    </Box>
  );
};
