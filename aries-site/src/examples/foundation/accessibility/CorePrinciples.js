import React, { useContext } from 'react';
import { Box, Grid, Image, Paragraph, ResponsiveContext, Text, ThemeContext } from 'grommet';

const object = [
    {
        name: 'Perceivable',
        description: 'Users must be able to identify the information and interface components of an application. For most users, this is done visually, but also can be accomplished through touch and sound.',
        imageSrc: {
            light: '/foundationImages/accessibilityImages/Perceivable-visual-element.svg',
            dark: '/foundationImages/accessibilityImages/Perceivable-visual-element-invert.svg',
        },
        imageAlt: 'Two eye icons layered over one another on a split light and dark background to display contrast'
    },
    {
        name: 'Operable',
        description: 'Users must be able to control and navigate interface elements in an application. For example, allow for buttons to be clicked by a keyboard operation.',
        imageSrc: {
            light: '/foundationImages/accessibilityImages/Operable-visual-element.svg',
            dark: '/foundationImages/accessibilityImages/Operable-visual-element-invert.svg',
        },
        imageAlt: 'A computer icon on a solid background with an up, left, right and down arrow icon displayed on the screen'
    },
    {
        name: 'Understandable',
        description: 'The content, information, and operations presented to a user must be understandable.',
        imageSrc: {
            light: '/foundationImages/accessibilityImages/Understandable-visual-element.svg',
            dark: '/foundationImages/accessibilityImages/Understandable-visual-element-invert.svg',
        },
        imageAlt: 'A square, circle, rounded square, and pentagon connected with a green dotted line'
    },
    {
        name: 'Robust',
        description: 'Content of an application must be designed and developed using well-adopted, enduring web standards that work across browsers and platforms.',
        imageSrc: {
            light: '/foundationImages/accessibilityImages/Robust-visual-element.svg',
            dark: '/foundationImages/accessibilityImages/Robust-visual-element-invert.svg',
        },
        imageAlt: 'A desktop screen UI icon and a mobile screen UI icon connected with a dotted line'
    },
];

export const CorePrinciples = () => {
  const size = useContext(ResponsiveContext);
  const theme = useContext(ThemeContext);

  return (
    <Grid 
        columns={{ 
            count: size === 'small' ? 1 : 2, 
            size: 'auto'
        }} 
        gap={{ 
            column: 'small', 
            row: 'large' 
        }} 
        pad="large"
    >
        {
            object.map(item => (
                <Box width="280px">
                    <Image 
                        src={theme.dark ? item.imageSrc.dark : item.imageSrc.light} 
                        alt={item.imageAlt} 
                    />
                    <Box pad={{ top: 'medium'}}>
                        <Text size="xlarge" weight="bold">{item.name}</Text>
                        <Paragraph margin="none">{item.description}</Paragraph>
                    </Box>
                </Box>
            ))
        }
    </Grid>
  );
};

