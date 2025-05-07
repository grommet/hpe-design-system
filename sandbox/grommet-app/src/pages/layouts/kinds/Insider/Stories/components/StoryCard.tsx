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
    pad = 'xxlarge',
    ...rest
}) => {
    return (
        <Box as="article" justify="between" {...rest}>
            <Box flex>
                {image}
            </Box>
            <Box pad={pad} gap="medium">
                <Box gap="medium" height={{min: '3xsmall'}}>
                <Heading level={level} size={size} margin="none">{headline}</Heading>
                <Paragraph margin="none">{description}</Paragraph>
                </Box>
                <Anchor label={cta} icon={<LinkNext aria-label={undefined} />} href={href} reverse />
            </Box>
        </Box>
    );
}