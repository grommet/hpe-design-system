import React, { useContext } from 'react';
import Link from 'next/link';
import { Catalog } from 'grommet-icons';
import {
  Box,
  Grid,
  Heading,
  Paragraph,
  ResponsiveContext,
  Stack,
  Text,
} from 'grommet';
import { ContentPreviewCard } from '../cards';
import { nameToPath } from '../../utils';

export const pages = [
  {
    name: 'Foundation',
    description: `Lorem Ipsum has been the industry's
     standard dummy text ever since the 1500s, when an unknown 
     took a galley of type and scrambled it to make a type specimen book.`,
    icon: <Catalog size="large" color="text-strong" />,
    url: '/foundation',
  },
  {
    name: 'Components',
    description: `Lorem Ipsum has been the industry's
     standard dummy text ever since the 1500s, when an unknown 
     took a galley of type and scrambled it to make a type specimen book.`,
    icon: <Catalog size="large" color="text-strong" />,
    url: '/components',
  },
  {
    name: 'Templates',
    description: `Lorem Ipsum has been the industry's standard
     dummy text ever since the 1500s, when an unknown 
     took a galley of type and scrambled it to make a
      type specimen book.`,
    icon: <Catalog size="large" color="text-strong" />,
    url: '/templates',
  },
  {
    name: 'Extend',
    description: `Lorem Ipsum has been the industry's
     standard dummy text ever since the 1500s, when an unknown 
     took a galley of type and scrambled it to make
      a type specimen book.`,
    icon: <Catalog size="large" color="text-strong" />,
    url: '/extend',
  },
];

// export const Components = ({ ...rest }) => {
//   const pageDetails = getPageDetails('Home');
//   const navItems = pageDetails.pages.map(topic => getPageDetails(topic));
//   const size = useContext(ResponsiveContext);
//   const darkMode = useDarkMode();
//   const router = useRouter();

//   return (
//     <Box fill background="background-back">
//       <Box
//         fill
//         pad={{
//           horizontal: size !== 'small' ? 'xlarge' : 'large',
//           top: 'large',
//           bottom: 'medium',
//         }}
//         gap="xlarge"
//         {...rest}
//       >
//         <Box justify="center" align="center" width="large" alignSelf="center">
//           <Heading level={2} size="large">
//             What does the design system offer?
//           </Heading>
//           <Paragraph size="xlarge" fill textAlign="center" margin="none">
//             The HPE Design System has a varity of different components that are
//             designed and ready for other teams to use. We have put together
//             templates and other information that can be accessed by everyone.
//             Explore everything below.
//           </Paragraph>
//           <Featured />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

const Layout = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Box
      fill
      pad={{
        horizontal: size !== 'small' ? 'xlarge' : 'large',
        bottom: 'small',
      }}
      {...rest}
    >
      <Box justify="center" align="center" width="large" alignSelf="center">
        <Heading level={2} size="large">
          In the design system
        </Heading>
        <Paragraph size="xlarge" fill textAlign="center" margin="none">
          The HPE Design System has a varity of different components that are
          designed and ready for other teams to use. We have put together
          templates and other information that can be accessed by everyone.
        </Paragraph>
      </Box>
      <Grid
        rows={[['auto', 'full']]}
        columns={{ count: 'fit', size: 'medium' }}
        gap="large"
        fill
        justify="center"
      >
        {pages.map(({ name, description, icon, url }) => (
          <Link href={url || nameToPath(name)} passHref key={name}>
            <ContentPreviewCard
              forwardedAs="a"
              style={{ textDecoration: 'none' }}
              pad="medium"
            >
              <Box width="100%" round="xsmall">
                {icon}
              </Box>
              <Text
                weight="bold"
                size="xlarge"
                color="text-strong"
                margin={{ top: 'small' }}
              >
                {name}
              </Text>
              <Paragraph size="small">{description}</Paragraph>
            </ContentPreviewCard>
          </Link>
        ))}
      </Grid>
    </Box>
  );
};

export const ComponentsLayout = ({ ...rest }) => {
  return (
    <Stack guidingChild="last">
      <Box background="background-front" margin={{ top: 'xlarge' }} fill />
      <Layout {...rest} />
    </Stack>
  );
};
