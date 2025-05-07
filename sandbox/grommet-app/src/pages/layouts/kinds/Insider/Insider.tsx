import React from 'react';
import { 
    Box,
    dark,
    Page, 
    PageContent, 
    ThemeContext,
} from 'grommet';
import { Hero } from './Hero';
import { Stories } from './Stories';

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
                'bkg-component-primary': {
                    light: '#FFFFFF',
                    dark: '#1D1F27'
                },
                'bkg-card-primary': {
                    light: '#F7F7F7',
                    dark: '#292D3A'
                }
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
                2: {
                    'xxlarge': {
                        size: '4.5rem',
                        height: '4.5rem',
                    }
                },
                3: {
                    'xxlarge': {
                        size: '2.0rem',
                        height: '2.5rem',
                    }
                },
            },
        }
    };

    return (
    <ThemeContext.Extend value={adjustedTheme}>
        <Page pad={{ bottom: '3xlarge' }}>
            <Box background={{dark: true}}>
                <PageContent 
                    background={{
                        fill: 'horizontal', 
                        color: 'bkg-component-primary'
                    }}
                >
                    <Hero as="section" border={{style: 'dashed'}}/>
                </PageContent>
            </Box>
            <PageContent
                background={{
                    fill: 'horizontal',
                    color: 'bkg-component-primary'
                }}
            >
                <Stories as="section" border={{style: 'dashed'}}/>
            </PageContent>
        </Page>
    </ThemeContext.Extend>
    );
}
