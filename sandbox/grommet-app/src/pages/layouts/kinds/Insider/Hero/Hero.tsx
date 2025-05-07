import React from 'react';
import {
    Box,
    Grid,
    Heading,
    Paragraph,
    Button
} from 'grommet';
import { LinkNext } from 'grommet-icons';

export const Hero = ({...rest}) => {
    return (
    <Grid 
        columns={['large', 'flex']}
        gap="3xlarge"
        pad={{ vertical: '4xlarge', horizontal: '4xlarge'}}
        {...rest}
    >
        <Box 
            align='start' 
            gap="3xlarge"
        >
            <Box gap="xxlarge">
                <Heading 
                    level={1} 
                    size="xxlarge" 
                    margin="none"
                >
                    It starts with ambition.
                </Heading>
                <Paragraph margin="none">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec euismod, nisl eget consectetur sagittis, nisl nunc
                    sagittis quam, id bibendum nunc nisl eget dolor.
                </Paragraph>
            </Box>
            <Button 
                label="Learn more about our new brand" 
                icon={<LinkNext />} 
                onClick={() => {}}
                primary
                reverse
                size='large'
            />
        </Box>
    </Grid>
    );
}
