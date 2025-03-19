import React, { useContext } from 'react';
import {
  Box,
  Button,
  Grid,
  Heading,
  PageContent,
  ResponsiveContext,
  Tabs,
  Tab,
  Image,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { CardTemplate } from './components';
import { HPEAIUseCase } from './HPEAIUseCase';

export const HPEProducts = () => {
  const breakpoint = useContext(ResponsiveContext);
  const [index, setIndex] = React.useState(2);

  const columns =
    breakpoint === 'xsmall'
      ? ['auto']
      : [
          ['small', 'medium'],
          ['small', 'medium'],
        ];
  const rows = ['auto'];
  const gap = {
    xsmall: 'medium',
    small: 'medium',
    medium: 'medium',
    large: 'large',
    xlarge: 'large',
  };

  const onActive = (nextIndex: number) => setIndex(nextIndex);
  return (
    <PageContent
      pad="xlarge"
      background={{
        fill: 'horizontal',
        image: 'url(/video-marketing-background.png)',
        dark: false,
        size: 'cover',
      }}
    >
      <Box gap="xlarge">
        <Box gap="large">
          {/* the heading in design is alot bigger can we use size? */}
          <Heading margin="none" size="xlarge" level={2}>
            Products and technologies from HPE
          </Heading>
          {/* tabs also have a different style in the design  */}
          <Tabs activeIndex={index} onActive={onActive} justify="start">
            <Tab title="Compute">
              <Box margin="small" gap="small">
                Compute options here
              </Box>
            </Tab>
            <Tab title="Storage">
              <Box margin="small">Storage options here</Box>
            </Tab>
            <Tab title="Supercomputing">
              <Grid
                pad={{ top: 'medium' }}
                columns={columns}
                rows={rows}
                gap={gap[breakpoint]}
              >
                {/* cards have more padding and height is bigger in design
              I tried to keep to what we usually would recommend  */}
                <CardTemplate
                  border
                  media={
                    <Box height="small">
                      <Image
                        src="/CraySupercomputing.png"
                        alt="hpe cray supercomputing"
                        fit="contain"
                      />
                    </Box>
                  }
                  title="HPE ProLiant DL380a Gen11"
                  description="Exascale technologies to unlock the next frontier of discovery, innovation, and achievement."
                  actions={
                    <Button
                      label="Explore more"
                      reverse
                      primary
                      icon={<LinkNext />}
                      aria-label="Explore more about HPE Cray Supercomputing"
                    />
                  }
                />
                <CardTemplate
                  border
                  media={
                    <Box height="small">
                      <Image
                        src="/CrayXD670.png"
                        alt="hpe CrayXD670"
                        fit="contain"
                      />
                    </Box>
                  }
                  title="NVIDIA GB200 NVL72 by HPE"
                  description="Get extreme performance for AI models over 1 trillion parameters, backed by HPE Services and advanced liquid-cooling technology."
                  actions={
                    <Button
                      label="Explore more"
                      aria-label="Explore more about NVIDIA GB200 NVL72 by HPE"
                      reverse
                      primary
                      icon={<LinkNext />}
                    />
                  }
                />
              </Grid>
            </Tab>
            <Tab title="Software">
              <Box margin="small">Software options here</Box>
            </Tab>
            <Tab title="Services">
              <Box margin="small">Services options here</Box>
            </Tab>
          </Tabs>
        </Box>
        <HPEAIUseCase />
      </Box>
    </PageContent>
  );
};
