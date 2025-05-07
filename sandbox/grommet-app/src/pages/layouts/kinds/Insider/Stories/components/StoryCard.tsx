import React from "react";
import {Anchor, Box, Heading, Image, Paragraph} from 'grommet';
import { LinkNext } from "grommet-icons";

export const StoryCard = ({
    cta, 
    description, 
    headline, 
    href, 
    image, 
    level, 
    size,
    ...rest
}) => {
    return (
        <Box as="article" {...rest}>
            <Box flex justify="center">
                {image}
            </Box>
            <Box alignSelf="end" pad="xxlarge">
                <Heading level={level} size={size} margin="none">{headline}</Heading>
                <Paragraph>{description}</Paragraph>
                <Anchor label={cta} icon={<LinkNext />} href={href} reverse />
            </Box>
        </Box>
    );
}