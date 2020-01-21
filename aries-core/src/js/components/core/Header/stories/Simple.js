import React from 'react';
import { Grommet, Box, Header, Menu, Text, TextInput } from 'grommet';
import { Hpe, Search } from 'grommet-icons';
import { css } from 'styled-components';

export default {
  title: 'Header',
};
const baseSpacing = 24;

const fontSizing = factor => {
  const scale = baseSpacing * 0.25;
  const baseFontSize = baseSpacing - scale;

  const size = Math.round(baseFontSize + factor * scale);
  const height = Math.round(baseSpacing + factor * scale);
  const maxWidth = baseSpacing * size;

  return {
    size: `${size}px`,
    height: `${height}px`,
    maxWidth: `${maxWidth}px`,
  };
};

const customTheme = {
  spacing: baseSpacing,
  // defaultMode: 'light',
  global: {
    colors: {
      icon: 'text',
      brand: 'green!',
      background: {
        dark: '#1A1F2B',
        light: '#FFFFFF',
      },
      'background-back': {
        dark: '#1A1F2B',
        light: '#EFEFEF',
      },
      'background-front': {
        dark: '#222938',
        light: '#FFFFFF',
      },
      'background-contrast': {
        dark: '#FFFFFF08',
        light: '#11111108',
      },
      text: {
        dark: '#EEEEEE',
        light: '#333333',
      },
      'text-strong': {
        dark: '#FFFFFF',
        light: '#000000',
      },
      'text-weak': {
        dark: '#CCCCCC',
        light: '#444444',
      },
      'text-xweak': {
        dark: '#999999',
        light: '#666666',
      },
      border: {
        light: '#CCCCCC',
        dark: '#444444',
      },
      control: 'brand',
      'active-background': 'background-contrast',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      'selected-text': 'text-strong',
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      blue: {
        dark: '#0E5265',
        light: '#00C8FF',
      },
      'blue!': '#00739D',
      green: {
        dark: '#007A5E',
        light: '#6FFFB0',
      },
      'green!': '#00C781',
      teal: {
        dark: '#007366',
        light: '#82FFF2',
      },
      'teal!': '#00E8CF',
      purple: {
        dark: '#371177',
        light: '#F740FF',
      },
      'purple!': '#7630EA',
      red: {
        dark: '#4B1916',
        light: '#FF4F4F',
      },
      'red!': '#FF0000',
      orange: {
        dark: '#CC4B00',
        light: '#FFB024',
      },
      'orange!': '#FF8300',
      yellow: {
        dark: '#D78F00',
        light: '#FFEB59',
      },
      'yellow!': '#FEC901',
      'graph-0': 'orange',
      'graph-1': 'blue',
      'graph-2': 'purple',
      focus: 'green',
      placeholder: 'text-weak',
    },
    font: {
      family: 'Metric',
      face: `@font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff") format('woff');
          }
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff") format('woff');
            font-weight: 700;
          }
          @font-face {
            font-family: "Metric"; 
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff") format('woff');
            font-weight: 600;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff") format('woff');
            font-weight: 100;
          }`,
    },
    active: {
      background: 'active-background',
      color: 'active-text',
    },
    drop: {
      background: 'background-front',
      border: {
        radius: '8px',
      },
      shadowSize: 'medium',
    },
    elevation: {
      dark: {
        medium: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
      },
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },
    input: {
      weight: 500,
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
  },
  accordion: {
    border: {
      color: 'text',
    },
    icons: {
      color: 'text',
    },
  },
  anchor: {
    fontWeight: 700,
    textDecoration: 'none',
    hover: {
      textDecoration: 'none',
    },
  },
  button: {
    border: {
      radius: '6px',
    },
    extend: css`
      ${props => !props.plain && 'font-weight: bold;'}
    `,
  },
  heading: {
    level: {
      1: {
        medium: fontSizing(5),
      },
      2: {
        small: fontSizing(1),
        medium: fontSizing(3),
      },
      3: {
        medium: fontSizing(1),
      },
    },
    weight: 700,
  },
  icon: {
    size: {
      xxlarge: '166px',
    },
  },
  tab: {
    border: {
      color: 'text-xweak',
    },
    color: 'text-xweak',
    margin: {
      horizontal: 'none',
    },
    pad: {
      horizontal: 'small',
    },
  },
  text: {
    small: fontSizing(0),
    medium: fontSizing(1),
    large: fontSizing(3),
  },
  paragraph: {
    small: fontSizing(0),
    medium: fontSizing(1),
    large: fontSizing(3),
  },
};

const Brand = () => (
  <Box direction="row" align="center" gap="medium">
    <Hpe color="brand" size="large" />
    <Box direction="row" gap="xsmall">
      <Text weight="bold" size="medium">
        HPE
      </Text>
      <Text size="medium">Application Name</Text>
    </Box>
  </Box>
);
const SearchRC = () => (
  <Box
    width="medium"
    direction="row"
    align="center"
    pad={{ horizontal: 'small', vertical: 'xsmall' }}
    round="small"
    background="background-contrast"
  >
    <Search color="brand" />
    <TextInput
      type="search"
      plain
      placeholder={<Text color="dark-3">Search Application...</Text>}
    />
  </Box>
);

const Menus = () => (
  <Box direction="row" gap="medium">
    <Menu
      dropAlign={{ top: 'bottom' }}
      label="Account Name"
      items={[
        { label: 'Shimi Shimi' },
        { label: 'Tay Tay' },
        { label: 'GlissMann' },
      ]}
    />
    <Box pad="small" border="left" />
    <Menu
      dropAlign={{ top: 'bottom' }}
      label="Location"
      items={[
        { label: 'Fort Collins' },
        { label: 'Boulder' },
        { label: 'Denver' },
      ]}
    />
  </Box>
);

const darkBackground = customTheme.global.colors.background.dark;

export const Simple = () => (
  <Grommet theme={customTheme} full>
    <Box background="light-4" pad="large" gap="large" fill>
      <Header background={darkBackground} pad="medium">
        <Brand />
        <SearchRC />
        <Menus />
      </Header>
      <Header background="background" pad="medium">
        <Brand />
        <SearchRC />
        <Menus />
      </Header>
    </Box>
  </Grommet>
);
