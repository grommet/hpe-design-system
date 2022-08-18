import {
  Box as GrommetBox,
  Grid,
  Heading,
  Page,
  PageContent,
  Text,
  ThemeContext,
} from 'grommet';
import { useContext } from 'react';
import styled from 'styled-components';

import { Meta } from '../components';

const Box = styled(GrommetBox)`
  ${props =>
    props.background?.clip &&
    ` 
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    background-clip: text;
  `}
  ${props =>
    typeof props.background?.rotate === 'number' &&
    props.background?.image &&
    `
      background-image: ${props.background.image.replace(
        /\d{1,3}deg\b,/gm,
        `${props.background.rotate}deg,`,
      )};
    `}
`;

const Demo = () => {
  const theme = useContext(ThemeContext);
  const { gradients, textures } = theme.global.backgrounds;

  return (
    <>
      <Meta title="Brand assets demo page" />
      <Box direction="row" height={{ min: 'large' }} background="background">
        <Page background="background" pad={{ vertical: 'large' }}>
          <PageContent gap="medium">
            <Grid
              columns={{ size: ['small', 'auto'], count: 'fill' }}
              rows="small"
              gap="large"
              align="center"
              justify="center"
            >
              <Box
                align="end"
                background={{
                  image: gradients['purple-magenta-yellow'],
                  clip: true,
                  rotate: -90,
                }}
              >
                <Heading margin="none">Modernize</Heading>
                <Text size="xlarge" margin="none">
                  edge to cloud
                </Text>
              </Box>
              <Box
                background={{
                  image: gradients['purple-blue-yellow'],
                  clip: true,
                  rotate: 90,
                }}
              >
                <Heading margin="none">Modernize</Heading>
                <Text size="xlarge" margin="none">
                  edge to cloud
                </Text>
              </Box>
              <Box
                align="end"
                background={{
                  image: gradients['purple-blue'],
                  clip: true,
                  rotate: 0,
                }}
              >
                <Text size="xxlarge" weight="bold" margin="none">
                  Modernize
                </Text>
                <Text size="xxlarge" weight="bold" margin="none">
                  Modernize
                </Text>
                <Text size="xxlarge" weight="bold" margin="none">
                  Modernize
                </Text>
                <Text size="large" margin="none">
                  edge to cloud
                </Text>
              </Box>
              <Box
                background={{
                  image: textures['datawave-green-1'],
                  clip: true,
                  position: 'top',
                }}
                align="center"
              >
                <Heading margin="none">Modernize</Heading>
                <Text margin="none" size="large">
                  without compromise
                </Text>
              </Box>
              <Box
                background={{
                  image: textures['datawave-green-2'],
                  clip: true,
                  position: 'bottom',
                }}
                align="center"
              >
                <Heading margin="none">Modernize</Heading>
                <Text margin="none" size="xlarge">
                  without compromise
                </Text>
              </Box>
              <Box
                background={{
                  image: textures['datawave-multi-1'],
                  clip: true,
                }}
                align="center"
              >
                <Heading margin="none">Modernize</Heading>
                <Text margin="none" size="xlarge">
                  edge to cloud
                </Text>
              </Box>
              <Box background={gradients['orange-yellow']} fill />
              <Box background={gradients['purple-blue']} fill />
              <Box background={gradients['purple-blue-yellow']} fill />
              <Box background={gradients['purple-magenta-yellow']} fill />
              <Box background={textures['datawave-green-1']} fill />
              <Box background={textures['datawave-green-2']} fill />
              <Box background={textures['datawave-multi-1']} fill />
              <Box background={textures['datawave-multi-2']} fill />
              <Box background={textures['datawave-multi-3']} fill />
              <Box background={textures['datawave-multi-4']} fill />
              <Box background={textures['datawave-multi-5']} fill />
              <Box background={textures['datawave-multi-6']} fill />
              <Box background={textures['datawave-white-1']} fill />
              <Box background={textures['datawave-white-2']} fill />
              <Box background={textures['datawave-white-3']} fill />
              <Box background={textures['datawave-white-4']} fill />
              <Box background={textures['light-shadow-1']} fill />
              <Box background={textures['light-shadow-2']} fill />
              <Box background={textures['light-shadow-3']} fill />
              <Box background={textures['light-shadow-4']} fill />
            </Grid>
          </PageContent>
        </Page>
      </Box>
    </>
  );
};

// const hpeElement = ({ id, background }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 48 24"
//     preserveAspectRatio="none"
//   >
//     <defs>
//       <pattern
//         id={`element-gradient-${id}`}
//         patternUnits="userSpaceOnUse"
//         width="48"
//         height="48"
//       >
//         <image href={background.image} width="48" height="48" y="-12">
//           <animateTransform
//             id="spin"
//             attributeName="transform"
//             attributeType="XML"
//             type="rotate"
//             from="0 24 12"
//             to="360 24 12"
//             dur="1s"
//             repeatCount="1"
//           />
//         </image>
//       </pattern>
//     </defs>
//     <g
//       x="0"
//       y="0"
//       fill={`url(#element-gradient-${id})`}
//       fillRule="evenodd"
//       clipRule="evenodd"
//     >
//       <animate
//         attributeName="fill"
//         attributeType="XML"
//         from={`url(#element-gradient-${id})`}
//         to="white"
//         begin="1s"
//         dur="0.4s"
//         fill="freeze"
//       />
//       <path d="M2 6h44v12H2V6zm3 3h38v6H5V9z" />
//     </g>
//   </svg>
// );

export default Demo;
