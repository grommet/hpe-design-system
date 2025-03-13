import React, { useContext } from 'react';
import {
  Box,
  Button,
  Heading,
  PageContent,
  Tab,
  Tabs,
  ResponsiveContext,
} from 'grommet';

export const HPECustomerStories = () => {
  const [index, setIndex] = React.useState(1);
  const breakpoint = useContext(ResponsiveContext);

  const onActive = (nextIndex: number) => setIndex(nextIndex);

  return (
    <PageContent
      pad={{ vertical: 'xlarge', horizontal: 'xlarge' }}
      background={{
        fill: 'horizontal',
        image: 'url(/video-marketing-background.png)',
        dark: false,
        size: 'cover',
      }}
      fill="horizontal"
    >
      <Box align="center" gap="large">
        {/* their heading is level 2 60px for font size */}
        <Heading level={2} size="xlarge" margin="none">
          Customer stories
        </Heading>
      </Box>
      <Tabs activeIndex={index} onActive={onActive} justify="start">
        <Tab title="KU Leuven">
          <Box margin="small" gap="small">
            Compute options here
          </Box>
        </Tab>
        <Tab title="Sensei">
          <Box margin="small">Storage options here</Box>
        </Tab>
      </Tabs>
    </PageContent>
  );
};
