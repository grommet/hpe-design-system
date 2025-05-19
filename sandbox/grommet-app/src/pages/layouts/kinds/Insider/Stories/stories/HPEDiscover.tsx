import React from 'react';
import { Image } from 'grommet';
import image from '../../../../../../assets/discover-las-vegas.png';
import { StoryCard } from '../components';

export const HPEDiscover = ({...rest}) => {
    return (
        <StoryCard 
            level={3}
            size="xxlarge"
            headline="Register for ATM Live! from Discover Las Vegas"
            description="Unlock the future of AI"
            cta="Register now"
            image={<Image 
                src={image} 
                alt="HPE Discover Las Vegas 2025 logo" 
            />}
            href="#"
            background="bkg-card-primary"
            {...rest} 
        />
    );
}