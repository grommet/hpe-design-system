import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

const baseSpacing = 24;

const fontSizing = factor => {
  const scale = baseSpacing * 0.25;
  const baseFontSize = baseSpacing - scale;

  const size = baseFontSize + factor * scale;
  const height = baseSpacing + factor * scale;
  const maxWidth = baseSpacing * size;

  return {
    size: `${size}px`,
    height: `${height}px`,
    maxWidth: `${maxWidth}px`,
  };
};

export const aries = deepMerge(hpe, {
  name: 'HPE 2',
  rounding: 6,
  spacing: baseSpacing,
  defaultMode: 'dark',
  global: {
    colors: {
      brand: 'green',
      background: {
        dark: '#1A1F2B',
        light: '#FFFFFF',
      },
      'background-strong': {
        dark: '#000000',
        light: '#FFFFFF',
      },
      'background-weak': {
        dark: '#44444480',
        light: '#E8E8E880',
      },
      'background-xweak': {
        dark: '#66666699',
        light: '#CCCCCC90',
      },
      'background-subtle': {
        dark: '#1F253280',
        light: '#E8E8E880',
      },
      text: {
        dark: '#FFFFFF',
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
      border: 'background-xweak',
      control: 'brand',
      'active-background': 'background-weak',
      'active-text': 'text-strong',
      'selected-background': 'brand',
      // 'selected-text': undefined,
      'status-critical': '#FF4040',
      'status-warning': '#FFAA15',
      'status-ok': '#00C781',
      'status-unknown': '#CCCCCC',
      'status-disabled': '#CCCCCC',
      red: '#ff0000d0',
      'red-dark': '#4B1916',
      'red-light': '#FF4F4F',
      teal: '#00E8CF',
      'teal-dark': '#007366',
      'teal-light': '#82FFF2',
      blue: '#00739D',
      'blue-dark': '#1F2532',
      'blue-light': '#00C8FF',
      purple: '#7630EA',
      'purple-dark': '#371177',
      'purple-light': '#F740FF',
      orange: '#FF8300',
      'orange-dark': '#CC4B00',
      'orange-light': '#FFB024',
      yellow: '#FEC901',
      'yellow-dark': '#D78F00',
      'yellow-light': '#FFEB59',
      green: '#00C781',
      'green-dark': '#007A5E',
      'green-light': '#6FFFB0',
    },
    font: {
      weight: 100,
    },
    active: {
      background: 'active-background',
      color: 'active-text',
    },
    hover: {
      background: 'active-background',
      color: 'active-text',
    },
    selected: {
      background: 'selected-background',
      color: 'selected-text',
    },
  },
  anchor: {
    fontWeight: 400,
  },
  heading: {
    level: {
      1: {
        medium: fontSizing(5),
      },
      2: {
        medium: fontSizing(3),
      },
      3: {
        medium: fontSizing(0),
      },
    },
    weight: 700,
  },
  text: {
    medium: fontSizing(0),
    large: fontSizing(1),
    xlarge: fontSizing(2),
  },
});
