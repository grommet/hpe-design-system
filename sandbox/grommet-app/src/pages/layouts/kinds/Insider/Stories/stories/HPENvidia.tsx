import React from 'react';
import { Box, Image } from 'grommet';
import image from '../../../../../../assets/hpe-nvidia.png';
import { StoryCard } from '../components';

export const HPENvidia = ({...rest}) => {
    return (
        <StoryCard 
            headline="Winning together with NVIDIA and AI at GTC 2025"
            level={3}
            size="xxlarge"
            description="Unlock the future of AI"
            cta="Read more"
            image={
                <Box 
                    fill
                    pad={{horizontal: '4xlarge'}}
                >
                    <Image src={image} alt="HPE & Nvidia logos" fit="contain"/>
                </Box>
            }
            href="#"
            background={{
                color: 'bkg-card-primary',
                image: `linear-gradient(
                  #01A98200 70%,
                  #01A982 120%
                );`,
                rotate: 167,
              }}
            {...rest} 
        />
    );
}