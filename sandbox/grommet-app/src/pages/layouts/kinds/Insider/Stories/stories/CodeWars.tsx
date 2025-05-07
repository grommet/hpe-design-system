import React from 'react';
import { Image } from 'grommet';
import image from '../../../../../../assets/codewars.png';
import { StoryCard } from '../components';

export const CodeWars = ({...rest}) => {
    return (
        <StoryCard 
            level={3}
            size={undefined}
            headline="HPE CodeWars 2025"
            description="Where the war is won with brainpower"
            cta="Register now"
            image={<Image src={image} alt="African American male wearing glasses sitting behind two monitors" />}
            href="#"
            background={undefined}
            pad={{top: 'xlarge'}}
            {...rest} 
        />
    );
}
