import React from 'react';
import { 
    Page, 
    PageContent, 
    ThemeContext,
} from 'grommet';
import { Hero } from './Hero';

export const Insider = () => {
    const theme = React.useContext(ThemeContext);
    const { global } = theme;
    const { colors } = global;
    const { background } = colors;

    console.log('v2 theme - theme', theme)
    // console.log('v2 theme - global', global)
    // console.log('v2 theme - colors', colors)

    const adjustedTheme = {
        global: {
            colors: {
                'midnight-blue': '#1D1F27',
            },
            edgeSize: {
                '4xlarge': '96px',
            },
        },
        heading: {
            level: {
                1: {
                    'xxlarge': {
                        size: '4.5rem',
                        height: '4.5rem',
                    }
                },
            },
        }
    };

    return (
    <ThemeContext.Extend value={adjustedTheme}>
        <Page pad={{ bottom: '3xlarge' }}>
            <PageContent 
                background='midnight-blue'
                pad='4xlarge'
            >
               <Hero />
            </PageContent>
        </Page>
    </ThemeContext.Extend>
    );
}
