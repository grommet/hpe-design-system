// import { hpe } from 'grommet-theme-hpe';
// import { deepMerge } from 'grommet/utils';
import { css } from 'styled-components';

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

// export const aries = deepMerge(hpe, {
export const aries = {
  spacing: baseSpacing,
  defaultMode: 'dark',
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
      family: "'Metric', Arial, sans-serif",
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
    color: 'text',
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
  checkBox: {
    gap: 'medium',
    color: 'text-strong',
  },
  formField: {
    border: {
      side: 'all',
    },
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
  radioButton: {
    color: 'text-strong',
    check: {
      color: 'text-strong',
    },
    gap: 'medium',
  },
  rangeInput: {
    track: {
      color: 'background-contrast',
    },
    thumb: {
      color: 'text',
    },
  },
  select: {
    icons: {
      color: 'text',
    },
    options: {
      text: {
        size: 'small',
      },
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
    small: fontSizing(0), // 18
    medium: fontSizing(1), // 24
    large: fontSizing(3), // 36
  },
  paragraph: {
    small: fontSizing(0),
    medium: fontSizing(1),
    large: fontSizing(3),
  },
};

export const { colors } = aries.global;
