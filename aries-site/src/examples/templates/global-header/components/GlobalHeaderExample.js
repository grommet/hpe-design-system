import React from 'react';
import { Box } from 'grommet';
import { MockGlobalHeader } from './MockGlobalHeader';

export const GlobalHeaderExample = () =>  (
  <Box
    background="background"
    width={{ max: 'xxlarge' }}
    margin="auto"
    fill
  >
    <div id="header" className="header" />
    <DemoPageContent />
    <div id="footer" className="footer" />
    <script src="https://h50007.www5.hpe.com/hfws-static/js/framework/jquery/v-3-6-0/jquery.js" />
    <script src="https://h50007.www5.hpe.com/hfws/us/en/hpe/latest.r/root?contentType=js&switchToCHF=true&hide_country_selector=true&hide_search=true&hide_cart=true&hide_sign_in=true&header_logo=hpe&slim_footer=true" />
  </Box>
);

// This is for demo purposes only. Replace in production with app
// specific content.
const DemoPageContent = () => (
  <MockGlobalHeader>
    <Box
      align="center"
      justify="center"
      border={{ color: 'border', style: 'dashed' }}
      flex
    >
      Page content goes here.
    </Box>
  </MockGlobalHeader>
);
