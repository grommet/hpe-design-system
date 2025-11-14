import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { Box, Card, Heading, PageContent, Paragraph } from 'grommet';
import PropTypes from 'prop-types';
// Main homepage for HPE Design System
import { Meta } from '../components';
import {
  Community,
  CreativeToolkit,
  Featured,
  Quote,
  WhatIs,
} from '../components/home';
/* Including header here to share the same background image */
import { Header } from '../layouts/main/Header';
import { getPageDetails } from '../utils';

const title = 'Home';
const pageDetails = getPageDetails(title);

// These make a box width limited to xxlarge but centered
// Used to center sections with max width
const widthProps = { margin: 'auto' };

// Intro section wrapper for hero content
const Intro = ({ children }) => (
  <PageContent pad={{ top: '3xlarge' }}>
    <Card background="none" elevation="none">
      {children}
    </Card>
  </PageContent>
);

Intro.propTypes = {
  children: PropTypes.node,
};

// Homepage component with dark mode background switching
const Index = () => {
  // Get current theme mode for background switching
  const theme = useContext(ThemeContext);
  const isDark = theme?.dark;
  // Use different background image for dark mode
  const bgImage = isDark
    ? 'url(/images/main-bg-dark.jpg)'
    : 'url(/images/main-bg.jpg)';

  return (
    <>
      <Meta title={title} description={pageDetails.seoDescription} />
      {/* The 43% background size covers widths from 768px to 3277px
      background-size: 'cover'; will render it the size of the whole page
      */}
      <Box
        fill
        background={{
          image: bgImage,
          size: 'auto 50%',
          position: 'center top',
        }}        
      >
        <PageContent>
          <Header />
        </PageContent>
        <Intro>
          <Box
            margin="large"
            alignSelf="center"
            align="center"
            width={{ max: 'xxlarge' }}
          >
            <Heading
              margin="small"
              size="medium"
              textAlign="center"
            >
              Design, develop and deliver
            </Heading>
            <Paragraph margin="small" size="xxlarge" textAlign="center">
              Empower designers and developers to quickly create accessible
              enterprise app experiences.
            </Paragraph>
          </Box>
        </Intro>
        <Featured {...widthProps} />
        <WhatIs {...widthProps} />
        <CreativeToolkit {...widthProps} />
        <Quote />
        <Community {...widthProps} />
      </Box>
    </>
  );
};

export default Index;
