import React, { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  PageContent,
  Text,
  ResponsiveContext,
  Video,
} from 'grommet';
import { LinkNext } from 'grommet-icons';

export const HPEVideo = () => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <PageContent
      pad={{ vertical: 'xlarge', horizontal: 'xlarge' }}
      background={{
        fill: 'horizontal',
        image: 'url(/public/video-marketing-background.png)',
        dark: false,
        size: 'cover',
      }}
      fill="horizontal"
    >
      <Box align="center" gap="large">
        {/* their heading is level 2 60px for font size */}
        <Heading level={2} margin="none">
          NVIDIA AI Computing by HPE
        </Heading>
        <Video controls="over" fit="cover">
          <source
            type="video/mp4"
            src="https://s3-figma-videos-production-sig.figma.com/video/815326206297160627/ORG/70cc/75a4/-d1dd-497f-acaf-41e38e081503?Expires=1742169600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=SFCpkNaHZYtv000IJoDBIICX5512L-tt3IT9J5r0lQX-kBAKqDaX6yKEnIkyKAwHsjJXNI9yPjxyGR2dX5HpvT9oGDMbTThq~qQpw0JJuefvYEBnZ3AFtcfeAag0tEX-ZvNkAOMIImqdHL8Ma2yFQflxSI~B56I2A17TdBzehuBqgVOXP3yW5HnBAUbbyU8I~tP-f~t4N~MtjRQ6LAda0dbjlZIEL1NC5cY0n4Mama1~gSvY6Bpn0lg71avVpCCB7b4SjfKwJvVBrOYebFtPBMCtih2ZfRabUK8YA2oHG4n5Erk4YFRmg2RD8NhX4J0xMZ92PeyQ~zRlykXoacLnbA"
          />
          <track
            key="cc"
            label="English"
            kind="subtitles"
            srcLang="en"
            default
          />
        </Video>
        <Text
          size={
            breakpoint === 'xlarge'
              ? 'xxlarge'
              : breakpoint === 'large'
              ? 'xlarge'
              : breakpoint === 'medium'
              ? 'xlarge'
              : 'large'
          }
          textAlign="center"
        >
          HPE and NVIDIA are collaborating to deliver co-developed enterprise AI
          solutions and joint go-to-market integrations to assist businesses in
          streamlining the development and deployment of AI applications from
          pilot to production.
        </Text>
        <Button
          primary
          reverse
          alignSelf={
            ['xsmall', 'small'].includes(breakpoint) ? 'stretch' : 'center'
          }
          align="center"
          label="Read the press release"
          icon={<LinkNext />}
          size={['xsmall', 'small'].includes(breakpoint) ? 'medium' : 'large'}
        />
      </Box>
    </PageContent>
  );
};
