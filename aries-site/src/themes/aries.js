import { hpe, hpePop } from 'grommet-theme-hpe';
import { deepMerge } from 'grommet/utils';
import { Info } from 'grommet-icons';
// eslint-disable-next-line import/no-unresolved
import { dimension, components } from 'hpe-design-tokens/grommet';

export const aries = deepMerge(hpe, {
  defaultMode: 'dark',
  // To be stripped out once theme changes are made in grommet-theme-hpe.
  // keeping file for use as playground for future theme adjusments that need
  // to be quickly tested
  buttonGroup: {
    // any Box props
    gap: 'small',
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
      justify: 'start',
      gap: 'xsmall',
    },
    success: {
      color: 'text-strong',
      weight: 500,
      alignSelf: 'end',
    },
  },
  tab: {
    color: 'text',
    active: {
      background: undefined,
      color: 'text-primary',
      weight: 600,
    },
    hover: { background: 'transparent', color: 'text-strong' },
    border: {
      side: 'all',
      color: 'transparent',
      size: components.hpe.element.medium.borderWidth,
      active: { color: undefined },
      disabled: { color: undefined },
      hover: { color: undefined },
    },
    disabled: { background: 'background-disabled', color: 'text-disabled' },
    pad: {
      bottom: components.hpe.element?.medium.paddingY,
      top: components.hpe.element?.medium.paddingY,
      horizontal: components.hpe.element?.medium?.paddingX?.narrow,
    },
    margin: { vertical: 'none', horizontal: 'none' },
    extend: 'font-weight: 500;',
  },
  tabs: {
    gap: dimension.hpe.spacing.small,
    header: {
      border: undefined,
      // padding-bottom ensures the marker is not cut off by subsequent
      // page elements.
      extend: ({ theme }) => `
      padding-bottom: ${dimension.hpe.borderWidth.medium};
      & button {
        border-radius: ${dimension.hpe.radius.xxsmall};
      }
      & button[aria-selected="true"] {
          position: relative;
          &::before {
            display: block;
            position: absolute;
            content: '';
            height: ${dimension.hpe.borderWidth.medium};
            border-radius: 9999px;
            bottom: -${dimension.hpe.borderWidth.medium};
            left: 0;
            right: 0;
            background: ${
              theme.global.colors['border-selected'][
                theme.dark ? 'dark' : 'light'
              ]
            };
          }
          }`,
    },
    step: { xsmall: 1, xlarge: 3 },
  },
});

export const ariesPop = deepMerge(aries, {
  ...hpePop,
  anchor: {
    // rely on base anchor styling to meet color contrast on background-back
    size: {
      large: undefined,
      xlarge: undefined,
    },
  },
  // this is producing a console warning because it's not a supported status
  // proposing that notification should be more flexible to allow other statuses
  notification: {
    learn: {
      icon: Info,
      background: {
        color: 'status-warning',
        opacity: 'weak',
      },
      color: 'text',
      toast: {
        background: 'background-front',
      },
    },
  },
});

export const { colors } = aries.global;
