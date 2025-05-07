import React from 'react';
import { Image } from 'grommet';
import image from '../../../../../../assets/celebrate.png';
import { StoryCard } from '../components';

export const CelebrateTeam = ({...rest}) => {
    return (
        <StoryCard 
            level={3}
            size={undefined}
            headline="Celebrate your teammates"
            description="And save the date to be celebrated yourself!"
            cta="Browse events"
            image={<Image src={image} alt="Abstract purple and teal digital waves on black background" />}
            href="#"
            background={undefined}
            pad={{top: 'xlarge'}}
            {...rest} 
        />
    );
}
