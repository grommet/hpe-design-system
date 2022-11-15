import { hpe } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  global: {
    font: {
      family: "'Metric', Arial, sans-serif",
      face: `
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Regular.woff") format('woff');
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSThin-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSThin-Regular.woff") format('woff');
          font-weight: 100;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSLight-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSLight-Regular.woff") format('woff');
          font-weight: 300;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSMedium-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSMedium-Regular.woff") format('woff');
          font-weight: 500;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSSemibold-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSSemibold-Regular.woff") format('woff');
          font-weight: 600;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Bold.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXS-Bold.woff") format('woff');
          font-weight: 700;
        }
        @font-face {
          font-family: "Metric";
          src: url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSBlack-Regular.woff2") format('woff2'),
               url("https://d3hq6blov2iije.cloudfront.net/fonts/HPEXS-Metric-Fonts/MetricHPEXSBlack-Regular.woff") format('woff');
          font-weight: 900;
        }`,
    },
  },
  heading: {
    color: 'text',
    weight: 400,
    level: {
      1: {
        font: {
          // family: undefined,
          // weight: undefined,
        },
        small: {
          size: '48px', // size: '36px',
          height: '48px', // height: '42px',
          maxWidth: '854px',
        },
        medium: {
          size: '72px', // size: '53px',
          height: '72px', // height: '59px',
          maxWidth: '1277px',
        },
        large: {
          size: '96px', // size: '88px',
          height: '96px', // height: '94px',
          maxWidth: '2122px',
        },
        xlarge: {
          size: '120px', // size: '124px',
          height: '120px', // height: '130px',
          maxWidth: '2966px',
        },
      },
      2: {
        small: {
          size: '36px', // size: '31px',
          height: '36px', // height: '37px',
          maxWidth: '749px',
        },
        medium: {
          size: '48px', // size: '44px',
          height: '48px', // height: '50px',
          maxWidth: '1066px',
        },
        large: {
          size: '72px', // size: '58px',
          height: '72px', // height: '64px',
          maxWidth: '1382px',
        },
        xlarge: {
          size: '96px', // size: '71px',
          height: '96px', // height: '77px',
          maxWidth: '1699px',
        },
      },
      3: {
        small: {
          // Design file call for h3 small to bump up to font-weight 500,
          // however the theme does not currently support this at the 'size'
          // level, only for at the 'level' level.
          size: '24px', // size: '27px',
          height: '24px', // height: '33px',
          maxWidth: '643px',
        },
        medium: {
          size: '36px', // size: '36px',
          height: '36px', // height: '42px',
          maxWidth: '854px',
        },
        large: {
          size: '48px', // size: '44px',
          height: '48px', // height: '50px',
          maxWidth: '1066px',
        },
        xlarge: {
          size: '72px', // size: '53px',
          height: '72px', // height: '59px',
          maxWidth: '1277px',
        },
      },
      4: {
        font: {
          weight: 500,
        },
        small: {
          // Design file call for h4 small to bump up to font-weight 500,
          // however the theme does not currently support this at the 'size'
          // level, only for at the 'level' level.
          size: '18px', // size: '22px',
          height: '18px', // height: '28px',
          maxWidth: '538px',
        },
        medium: {
          // Design file call for h4 medium to bump up to font-weight 500,
          // however the theme does not currently support this at the 'size'
          // level, only for at the 'level' level.
          size: '24px', // size: '27px',
          height: '24px', // height: '33px',
          maxWidth: '643px',
        },
        large: {
          size: '36px', // size: '31px',
          height: '36px', // height: '37px',
          maxWidth: '749px',
        },
        xlarge: {
          size: '48px', // size: '36px',
          height: '48px', // height: '42px',
          maxWidth: '854px',
        },
      },
      5: {
        font: {
          weight: 500,
        },
        small: {
          size: '16px', // size: '16px',
          height: '16px', // height: '22px',
          maxWidth: '379px',
        },
        medium: {
          size: '18px', // size: '16px',
          height: '18px', // height: '22px',
          maxWidth: '379px',
        },
        large: {
          size: '24px', // size: '16px',
          height: '24px', // height: '22px',
          maxWidth: '379px',
        },
        xlarge: {
          // This should be a weight of 400, while all smaller sizes 500.
          size: '36px', // size: '16px',
          height: '36px', // height: '22px',
          maxWidth: '379px',
        },
      },
      6: {
        font: {
          weight: 500,
        },
        small: {
          size: '14px', // size: '14px',
          height: '14px', // height: '20px',
          maxWidth: '326px',
        },
        medium: {
          size: '16px', // size: '14px',
          height: '16px', // height: '20px',
          maxWidth: '326px',
        },
        large: {
          size: '18px', // size: '14px',
          height: '18px', // height: '20px',
          maxWidth: '326px',
        },
        xlarge: {
          size: '24px', // size: '14px',
          height: '24px', // height: '20px',
          maxWidth: '326px',
        },
      },
    },
  },
  feedback: {
    closeButton: {
      a11yTitle: `You are in a dialog containing a form to submit feedback.
        To close this layer, press Enter.`,
    },
    container: {
      pad: 'medium',
    },
    header: {
      align: 'start',
      direction: 'row',
      justify: 'between',
      gap: 'xsmall',
    },
    heading: {
      size: 'small',
      level: 2,
      margin: {
        vertical: 'none',
      },
    },
    footer: {
      pad: {
        top: 'medium',
      },
      direction: 'row',
      justify: 'end',
      gap: 'xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 'bold',
      alignSelf: 'end',
    },
  },
});

export const { colors } = aries.global;
