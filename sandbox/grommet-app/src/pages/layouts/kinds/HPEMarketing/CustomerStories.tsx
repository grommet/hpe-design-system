import React, { useContext } from 'react';
import {
  Box,
  Button,
  Carousel,
  Heading,
  PageContent,
  Tabs,
  Tab,
  Image,
  Text,
  Markdown,
  ResponsiveContext,
} from 'grommet';
import { LinkNext } from 'grommet-icons';
import { dimension } from 'hpe-design-tokens/grommet';

const objectivesContent = [
  'Improve network **reliability and safety**',
  'Drive **sustainability** in wireless communication',
  'Boost **resource allocation** in wireless communication systems',
];

const outcomeContent = [
  'Improves wireless network reliability and adaptability, ensuring **connectivity in critical** scenarios',
  'Boosts network performance while **minimizing energy consumption**',
  'Increases **network safety** and contributes to safer wireless environments',
];

const solutionContent = [
  'HPE ProLiant DL380 Gen11 Servers with NVIDIA A100 Tensor Core GPUs',
  'HPE Tech Care Service',
];

const ImageCards = ({ background, size, alt, src, fit }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box
      flex={false}
      round="medium"
      height={
        breakpoint === 'xlarge'
          ? dimension.hpe.container.large
          : breakpoint === 'large' || breakpoint === 'medium'
          ? dimension.hpe.container.medium
          : undefined
      }
      width={
        size === 'small'
          ? breakpoint === 'large' || breakpoint === 'xlarge'
            ? dimension.hpe.container.large
            : breakpoint === 'medium'
            ? dimension.hpe.container.medium
            : dimension.hpe.container.xlarge
          : dimension.hpe.container.xlarge
      }
      overflow="hidden"
      background={background}
      justify="center"
    >
      <Image fit={fit} alt={alt} src={src} />
    </Box>
  );
};

const NavigationalCards = ({
  title,
  size,
  desc,
  label,
  background,
  primary = true,
  secondary = false,
}) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box
      background={background}
      flex={false}
      height={
        breakpoint === 'xlarge'
          ? dimension.hpe.container.large
          : breakpoint === 'large' || breakpoint === 'medium'
          ? dimension.hpe.container.medium
          : undefined
      }
      width={
        size === 'small'
          ? breakpoint === 'large' || breakpoint === 'xlarge'
            ? dimension.hpe.container.large
            : breakpoint === 'medium'
            ? dimension.hpe.container.medium
            : dimension.hpe.container.xlarge
          : dimension.hpe.container.xlarge
      }
      pad="large"
      gap="medium"
      round="medium"
      justify="between"
    >
      <Box gap="small">
        <Heading weight="bold" size="xlarge" level={3} margin="none">
          {title}
        </Heading>
        <Text>{desc}</Text>
      </Box>
      <Button
        alignSelf="start"
        reverse
        icon={<LinkNext />}
        primary={primary}
        secondary={secondary}
        label={label}
        size="large"
      />
    </Box>
  );
};

const BulletCards = ({ title, size, children, background }) => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Box
      className="custom-scroll"
      background={background}
      flex={false}
      height={
        breakpoint === 'xlarge'
          ? dimension.hpe.container.medium
          : breakpoint === 'large' || breakpoint === 'medium'
          ? dimension.hpe.container.medium
          : undefined
      }
      width={
        size === 'small'
          ? breakpoint === 'large' || breakpoint === 'xlarge'
            ? dimension.hpe.container.large
            : breakpoint === 'medium'
            ? dimension.hpe.container.medium
            : dimension.hpe.container.xlarge
          : dimension.hpe.container.xlarge
      }
      pad="large"
      gap="small"
      round="medium"
    >
      <Heading level={3} size="xlarge" weight="bold" margin="none">
        {title}
      </Heading>
      <Markdown>{children}</Markdown>
    </Box>
  );
};

export const HPECustomerStories = () => {
  const [index, setIndex] = React.useState(0);

  const onActive = nextIndex => setIndex(nextIndex);
  const breakpoint = useContext(ResponsiveContext);

  const isSmallScreen = ['small', 'xsmall'].includes(breakpoint);

  return (
    // this is kind of awkward to have a one pageContent for just the header
    // however I need to be able to fill horizontally for the tabs
    <>
      <PageContent
        pad="xlarge"
        background={{ color: 'background-front', fill: 'horizontal' }}
        fill="horizontal"
      >
        <Box gap="large">
          <Heading margin="none" size="xlarge" level={2}>
            Customer Stories
          </Heading>
        </Box>
      </PageContent>
      {/* Tabs could use custom theming the selected color is off */}
      {/* tabs are to close to the size of the window since I took out of
      pageContent */}
      {isSmallScreen ? (
        <Box>
          {/* our carousel looks a little different then what they have */}
          <Carousel wrap>
            <Box pad="large" gap="medium" background="background-back">
              <Box height="xsmall" width="small">
                <Image fit="contain" alt="ku leuven" src="/kuleuven-logo.png" />
              </Box>
              <Box overflow="hidden" round="medium" justify="center">
                <Image
                  fit="cover"
                  alt="girl holding a drone"
                  src="/girl-drone.png"
                />
              </Box>
              <Heading level={3} size="xlarge" weight={900} margin="none">
                Elevating wireless connectivity to new heights with AI
              </Heading>
              <Text>
                Researchers from KU Leuven are advancing network reliability
                while addressing the need for safety and energy efficiency.
              </Text>
              <Button
                margin={{ bottom: 'medium' }}
                reverse
                icon={<LinkNext />}
                primary
                label="Read the customer story"
                aria-label="read the customer story about ku leuven"
              />
            </Box>
            <Box pad="large" gap="medium" background="background-back">
              <Box height="xsmall" width="small">
                <Image fit="contain" alt="sensei" src="/sensei-logo.png" />
              </Box>
              <Box overflow="hidden" round="medium" justify="center">
                <Image
                  fit="cover"
                  alt="girl holding a drone"
                  src="/girl-drone.png"
                />
              </Box>
              <Heading level={3} size="xlarge" weight={900} margin="none">
                Revolutionizing retail with AI
              </Heading>
              <Text>
                Sensei creates autonomous, cashier-less stores that free
                customer time.
              </Text>
              <Button
                margin={{ bottom: 'medium' }}
                reverse
                icon={<LinkNext />}
                primary
                label="Read the customer story"
                aria-label="read the customer story about sensei"
              />
            </Box>
          </Carousel>
        </Box>
      ) : (
        <Tabs activeIndex={index} onActive={onActive} justify="start">
          <Tab
            // it would be nice to be able to have this tab apart of the pagecontent
            style={{ paddingLeft: '100px' }}
            title={
              <Box height="xsmall" width="xsmall">
                <Image fit="contain" alt="ku leuven" src="/kuleuven-logo.png" />
              </Box>
            }
          >
            <Box
              background="background-back"
              margin="small"
              pad="large"
              // here they have style to their horizontal scroll where we dont just using brower default
              // we would have to do some css to get it to look like theirs
              overflow={{ horizontal: 'auto' }}
              gap="large"
              fill="horizontal"
            >
              <Box direction="row" gap="large">
                <NavigationalCards
                  title="Elevating wireless connectivity to new heights with AI"
                  desc="Researchers from KU Leuven are advancing network reliability while addressing the need for safety and energy efficiency."
                  label="Read the customer story"
                  // this is a common color I see that we dont have
                  background="#073634"
                  size={null}
                />
                <ImageCards
                  fit="conatin"
                  background={null}
                  size={null}
                  alt="girl holding a drone"
                  src="/girl-drone.png"
                />
                <BulletCards
                  size="small"
                  background="background-front"
                  title="Objectives"
                >
                  {objectivesContent.map(item => `- ${item}`).join('\n')}
                </BulletCards>
                <ImageCards
                  background={null}
                  size={null}
                  alt="2 people talking to each other in workplace"
                  src="/customer-service.png"
                  fit="cover"
                />
                <BulletCards size={null} background="#073634" title="Outcomes">
                  {outcomeContent.map(item => `- ${item}`).join('\n')}
                </BulletCards>
              </Box>
              <Box direction="row" gap="large">
                <ImageCards
                  background="border-weak"
                  size="small"
                  alt="ku leuven logo"
                  src="/ku-leuven-picture.png"
                  fit="contain"
                />
                <NavigationalCards
                  title="We customize algorithms to deal with the uncertainty of signal transmission behvaior."
                  desc="- Franco Minucci, Post-doctoral Researcher, KU Leuven"
                  label="Read the customer story"
                  background="background-front"
                  size={null}
                />
                <ImageCards
                  alt="male crossing his hands smiling"
                  src="/worker.png"
                  fit="cover"
                  background={null}
                  size="small"
                />
                <BulletCards size="small" background="#073634" title="Solution">
                  {solutionContent.map(item => `- <u>${item}</u>`).join('\n')}
                </BulletCards>
                <ImageCards
                  background="background-front"
                  size={null}
                  alt="ProLiant DL380 Gen11"
                  src="/server-image.png"
                  fit="contain"
                />
                <NavigationalCards
                  title="Digital Game Changers"
                  desc="From edge to hybrid cloud to AI, HPE customers are leading the way to what's next."
                  label="View all stories"
                  background="#073634"
                  size="small"
                  // their secondary button looks like our old design where it is border only
                  secondary={true}
                  primary={false}
                />
              </Box>
            </Box>
          </Tab>
          <Tab
            title={
              <Box height="xsmall" width="xsmall">
                <Image fit="contain" alt="sensei" src="/sensei-logo.png" />
              </Box>
            }
          >
            <Box
              background="background-back"
              margin={{ top: 'large', bottom: 'small' }}
              pad="large"
            >
              sensei options here
            </Box>
          </Tab>
        </Tabs>
      )}
    </>
  );
};
