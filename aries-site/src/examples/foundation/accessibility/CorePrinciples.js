import React, { useContext } from 'react';
import { Box, Grid, Image, Paragraph, Text, ThemeContext } from 'grommet';

const corePrinciplesObjects = [
  {
    name: 'Perceivable',
    description: `Users must be able to identify the information and interface 
    components of an application. For most users, this is done visually, but 
    also can be accomplished through touch and sound.`,
    imageSrc: {
      light:
        '/foundationImages/accessibilityImages/Perceivable-visual-element.svg',
      dark:
        // eslint-disable-next-line max-len
        '/foundationImages/accessibilityImages/Perceivable-visual-element-invert.svg',
    },
    imageAlt: `Two illustrated eyes, layered atop one another, displayed on a 
    split light and dark background to represent contrast.`,
  },
  {
    name: 'Operable',
    description: `Users must be able to control and navigate interface elements 
    in an application. For example, allow for buttons to be clicked by a 
    keyboard operation.`,
    imageSrc: {
      light:
        '/foundationImages/accessibilityImages/Operable-visual-element.svg',
      dark:
        // eslint-disable-next-line max-len
        '/foundationImages/accessibilityImages/Operable-visual-element-invert.svg',
    },
    imageAlt: `An illustrated computer on a solid background with up, left, 
    right, and down arrows displayed on the screen.`,
  },
  {
    name: 'Understandable',
    description: `The content, information, and operations presented to a user 
    must be understandable.`,
    imageSrc: {
      light:
        // eslint-disable-next-line max-len
        '/foundationImages/accessibilityImages/Understandable-visual-element.svg',
      dark:
        // eslint-disable-next-line max-len
        '/foundationImages/accessibilityImages/Understandable-visual-element-invert.svg',
    },
    imageAlt: `A square, circle, rounded square, and pentagon connected with a 
    green dotted line.`,
  },
  {
    name: 'Robust',
    description: `Content of an application must be designed and developed 
    using well-adopted, enduring web standards that work across browsers 
    and platforms.`,
    imageSrc: {
      light: '/foundationImages/accessibilityImages/Robust-visual-element.svg',
      dark:
        // eslint-disable-next-line max-len
        '/foundationImages/accessibilityImages/Robust-visual-element-invert.svg',
    },
    imageAlt:
      // eslint-disable-next-line max-len
      'A desktop computer screen connected to a mobile screen with a dotted line.',
  },
];

export const CorePrinciples = () => {
  const theme = useContext(ThemeContext);

  return (
    <Grid columns="xsmall" gap="xlarge" pad={{ vertical: 'medium' }}>
      {corePrinciplesObjects.map(item => (
        <Box key={item.name}>
          <Image
            src={theme.dark ? item.imageSrc.dark : item.imageSrc.light}
            alt={item.imageAlt}
          />
          <Box pad={{ top: 'medium' }}>
            <Text size="xlarge">{item.name}</Text>
            <Paragraph margin={{ top: '3xsmall' }}>
              {item.description}
            </Paragraph>
          </Box>
        </Box>
      ))}
    </Grid>
  );
};
