import React, { useContext } from 'react';
import {
  Box,
  Grid,
  Heading,
  Paragraph,
  Page,
  PageContent,
  Text,
  Button,
  Image,
  ThemeContext,
} from 'grommet';

import { demoStyle } from './demoStyle';

export const PageBackGroundExample = () => (
  <Page kind="wide" flex="grow" {...demoStyle}>
    <PageContent
      background={{
        fill: 'horizontal',
        image: 'url(/images/abstract-color-clouds.jpg)',
        size: 'contain',
        position: 'left',
        color: '#FAFBFD', // custom to match image background
      }}
      {...demoStyle}
    >
      <Hero />
    </PageContent>
    <PageContent
      background={{
        fill: 'horizontal',
        color: '#FFFFFF', // ensure correct font color and contrast
        image: `linear-gradient(
          180deg, 
          #FDFDFD 0%,
          #CDECFE 55%,
          #94DBFE 80%,
          #00C8FF 100%
        )`,
      }}
      {...demoStyle}
    >
      <Empathize />
    </PageContent>
    <PageContent
      background={{ fill: 'horizontal', color: 'background-back' }}
      {...demoStyle}
    >
      <Define />
    </PageContent>
    <PageContent
      background={{ fill: 'horizontal', color: 'background-front' }}
      {...demoStyle}
    >
      <Ideate />
    </PageContent>
    <PageContent
      background={{ fill: 'horizontal', color: 'background-back' }}
      {...demoStyle}
    >
      <Prototype />
    </PageContent>
    <PageContent
      background={{
        fill: 'horizontal',
        color: '#FFFFFF', // ensure correct font color and contrast
        image: `linear-gradient(
          0deg, 
          #FFFFFF 0%,
          #D8CFF7 55%,
          #B098F0 80%,
          #7630EA 100%
        )`,
      }}
      {...demoStyle}
    >
      <Test />
    </PageContent>
    <PageContent
      background={{
        fill: 'horizontal',
        image: 'url(/images/abstract-burst-colored-powder.jpg)',
        size: 'contain',
        position: 'right',
        color: '#FFFFFF', // custom to match image background
      }}
      {...demoStyle}
    >
      <CallToAction />
    </PageContent>
  </Page>
);

const Hero = () => (
  <Box height={{ min: 'medium' }}>
    <Grid
      columns={['flex', 'large']}
      rows={['auto', 'auto']}
      areas={[
        ['empty', 'heading'],
        ['empty', 'introduction'],
      ]}
    >
      <Heading
        gridArea="heading"
        level={1}
        size="large"
        margin={{ top: 'large', bottom: 'medium' }}
      >
        Building better, together, with Design Thinking.
      </Heading>
      <Box gridArea="introduction">
        <Paragraph size="xlarge" margin={{ bottom: 'medium' }}>
          Minds coming together from diverse backgrounds, cultures, and
          perspectives paired with the Design Thinking process are primed for
          delivering amazing outcomes.
        </Paragraph>
        <Paragraph
          gridArea="introduction"
          size="xlarge"
          margin={{ bottom: 'large', top: 'none' }}
        >
          Explore how Design Thinking fosters empathy, creativity, and
          ultimately better products and services.
        </Paragraph>
      </Box>
    </Grid>
  </Box>
);

const Empathize = () => (
  <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
    <Grid columns={['1/2', '1/2']}>
      <Box>
        <Heading level={2} size="large" margin="none">
          Empathize
        </Heading>
        <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
          Design Thinking begins by placing the knowledge that you are designing
          a solution for people at the forefront of your mind.
        </Paragraph>
        <Paragraph size="xlarge">
          This starts your{' '}
          <Text size="xlarge" weight="bold">
            human-centered
          </Text>{' '}
          design journey where you seek to understand for whom are you
          designing? What is their context and perspective? What are their hopes
          and desires?
        </Paragraph>
      </Box>
      <Box height="medium">
        <Image
          src="/foundationImages/foundation-preview-human.svg"
          fit="contain"
          alt={`Abstract line art depicting three people 
          in business attire with professional accessories such 
          as cellphones, tablets, and brief cases.`}
        />
      </Box>
    </Grid>
  </Box>
);

const Define = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
      <Grid columns={['1/2', '1/2']}>
        <Box height="medium">
          <Image
            src={
              theme.dark
                ? '/templateImages/template-preview-table-customize-invert.svg'
                : '/templateImages/template-preview-table-customize.svg'
            }
            fit="contain"
            alt="Abstract grid representing a data in a table format."
          />
        </Box>
        <Box alignSelf="center">
          <Heading level={2} size="large" margin="none">
            Define
          </Heading>
          <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
            From the empathy developed, give "names" to the personas,
            objectives, decisions, challenges, and pain points observed.
          </Paragraph>
          <Paragraph size="xlarge">
            Translate observations into a{' '}
            <Text size="xlarge" weight="bold">
              challenge
            </Text>{' '}
            to anchor designs and solutions against and get ready to go.
          </Paragraph>
        </Box>
      </Grid>
    </Box>
  );
};

const Ideate = () => {
  const theme = useContext(ThemeContext);

  return (
    <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
      <Grid columns={['1/2', '1/2']}>
        <Box>
          <Heading level={2} size="large" margin="none">
            Ideate
          </Heading>
          <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
            Go wide and wild with ideas. Make them enumarable. Push the{' '}
            <Text size="xlarge" weight="bold">
              possibilities
            </Text>{' '}
            beyond comfortable boundaries into the space of wacky "what ifs"
            where plausibility isn't a limit.
          </Paragraph>
          <Paragraph size="xlarge">
            Survey the generated potentials, find the favorites, and prioritize.
          </Paragraph>
        </Box>
        <Box height="medium">
          <Image
            src={
              theme.dark
                ? '/templateImages/template-preview-pagelayout-invert.svg'
                : '/templateImages/template-preview-pagelayout.svg'
            }
            fit="contain"
            alt="Abstract collection of overlapping boxes of various colors."
          />
        </Box>
      </Grid>
    </Box>
  );
};

const Prototype = () => {
  const theme = useContext(ThemeContext);
  return (
    <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
      <Grid columns={['1/2', '1/2']}>
        <Box height="medium" pad={{ horizontal: 'large' }}>
          <Image
            src={
              theme.dark
                ? '/templateImages/MatrixNavigation-invert.svg'
                : '/templateImages/MatrixNavigation.svg'
            }
            fit="contain"
            alt="Boxes with directional arrows, representing a flow chart."
          />
        </Box>
        <Box>
          <Heading level={2} size="large" margin={{ bottom: 'none' }}>
            Prototype
          </Heading>
          <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
            Grab a sharpie, some paper and tape, and make your ideas tangible in
            mockups and storyboards.
          </Paragraph>
          <Paragraph size="xlarge">
            <Text size="xlarge" weight="bold">
              Keep it simple
            </Text>
            , fail fast, iterate quickly.
          </Paragraph>
        </Box>
      </Grid>
    </Box>
  );
};

const Test = () => (
  <Box height={{ min: 'medium' }} pad={{ vertical: 'xlarge' }}>
    <Grid columns={['1/2', '1/2']}>
      <Box>
        <Heading level={2} size="large" margin={{ bottom: 'none' }}>
          Test
        </Heading>
        <Paragraph size="xlarge" margin={{ bottom: 'none' }}>
          Put the prototypes{' '}
          <Text size="xlarge" weight="bold">
            in the hands
          </Text>{' '}
          of the people for whom you are designing and turn back on the power of
          observation.
        </Paragraph>
        <Paragraph size="xlarge">
          Identify impediments. Make note of moments of surpise and delight.
          What works? Iterate quickly.
        </Paragraph>
      </Box>
      <Box height="medium">
        <Image
          src="/templateImages/template-preview-wizard.svg"
          fit="contain"
          alt={`Abstract box containing three filled circles 
          separated by dashes.`}
        />
      </Box>
    </Grid>
  </Box>
);

const CallToAction = () => (
  <Box
    alignSelf="center"
    height={{ min: 'large' }}
    pad={{ vertical: 'xlarge' }}
  >
    <Heading level={2} size="large" margin="none">
      Get started with Design Thinking today
    </Heading>
    <Paragraph size="xlarge">
      Access a curated collection of excercises, tool kits, and tutorials by
      creating a free account today.
    </Paragraph>
    <Button alignSelf="start" primary label="Get Started" size="large" />
  </Box>
);
