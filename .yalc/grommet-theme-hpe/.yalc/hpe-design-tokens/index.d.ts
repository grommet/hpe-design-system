declare module "hpe-design-tokens" {
  export interface TokensType {
    "color.background": string;
    "color.background.front": string;
    "color.background.back": string;
    "color.background.contrast": string;
    "color.brand": string;
    "color.border": string;
    "color.border.strong": string;
    "color.border.weak": string;
    "color.status.critical": string;
    "color.status.warning": string;
    "color.status.ok": string;
    "color.status.unknown": string;
    "color.text": string;
    "color.text.strong": string;
    "color.text.weak": string;
    "color.text.xweak": string;
    "color.validation.critical": string;
    "color.validation.warning": string;
    "color.validation.ok": string;
    "color.background.disabled": string;
    "color.text.disabled": string;
    "color.background.selected": string;
    "color.text.selected": string;
    "color.background.active": string;
    "color.text.active": string;
    "color.focus": string;

    "elevation.small": string;
    "elevation.medium": string;
    "elevation.large": string;

    "font.family": string;
    "font.fallback": string;
    "font.url.light": string;
    "font.url.regular": string;
    "font.url.medium": string;
    "font.url.semibold": string;
    "font.url.bold": string;
    "font.weight.light": number;
    "font.weight.regular": number;
    "font.weight.medium": number;
    "font.weight.semibold": number;
    "font.weight.bold": number;
    "font.weight.black": number;

    "font.size.text.xsmall": string;
    "font.size.text.small": string;
    "font.size.text.medium": string;
    "font.size.text.large": string;
    "font.size.text.xlarge": string;
    "font.height.text.xsmall": string;
    "font.height.text.small": string;
    "font.height.text.medium": string;
    "font.height.text.large": string;
    "font.height.text.xlarge": string;
    "font.weight.text.xsmall": string;
    "font.weight.text.small": string;
    "font.weight.text.medium": string;
    "font.weight.text.large": string;
    "font.weight.text.xlarge": string;

    "breakpoints.tablet": string;
    "breakpoints.desktop": string;

    "text.height": string | number;
    "heading.height": string | number;
    "text.size.mobile": string;
    "text.size.tablet": string;
    "text.size.desktop": string;

    "text.xsmall.size": string;
    "text.xsmall.height": string;
    "text.xsmall.weight": string;
    "text.small.size": string;
    "text.small.height": string;
    "text.small.weight": string;
    "text.medium.size": string;
    "text.medium.height": string;
    "text.medium.weight": string;
    "text.large.size": string;
    "text.large.height": string;
    "text.large.weight": string;
    "text.xlarge.size": string;
    "text.xlarge.height": string;
    "text.xlarge.weight": string;
    "heading.1.size": string;
    "heading.2.size": string;
    "heading.3.size": string;

    "text.xsmall.desktop.size": string;
    "text.xsmall.desktop.height": string;
    "text.xsmall.desktop.weight": string;
    "text.xsmall.tablet.size": string;
    "text.xsmall.tablet.height": string;
    "text.xsmall.tablet.weight": string;
    "text.xsmall.mobile.size": string;
    "text.xsmall.mobile.height": string;
    "text.xsmall.mobile.weight": string;

    "text.small.desktop.size": string;
    "text.small.desktop.height": string;
    "text.small.desktop.weight": string;
    "text.small.tablet.size": string;
    "text.small.tablet.height": string;
    "text.small.tablet.weight": string;
    "text.small.mobile.size": string;
    "text.small.mobile.height": string;
    "text.small.mobile.weight": string;

    "text.medium.desktop.size": string;
    "text.medium.desktop.height": string;
    "text.medium.desktop.weight": string;
    "text.medium.tablet.size": string;
    "text.medium.tablet.height": string;
    "text.medium.tablet.weight": string;
    "text.medium.mobile.size": string;
    "text.medium.mobile.height": string;
    "text.medium.mobile.weight": string;

    "text.large.desktop.size": string;
    "text.large.desktop.height": string;
    "text.large.desktop.weight": string;
    "text.large.tablet.size": string;
    "text.large.tablet.height": string;
    "text.large.tablet.weight": string;
    "text.large.mobile.size": string;
    "text.large.mobile.height": string;
    "text.large.mobile.weight": string;

    "text.xlarge.desktop.size": string;
    "text.xlarge.desktop.height": string;
    "text.xlarge.desktop.weight": string;
    "text.xlarge.tablet.size": string;
    "text.xlarge.tablet.height": string;
    "text.xlarge.tablet.weight": string;
    "text.xlarge.mobile.size": string;
    "text.xlarge.mobile.height": string;
    "text.xlarge.mobile.weight": string;

    "heading.1.desktop.size": string;
    "heading.1.desktop.height": string;
    "heading.1.desktop.weight": string;
    "heading.1.tablet.size": string;
    "heading.1.tablet.height": string;
    "heading.1.tablet.weight": string;
    "heading.1.mobile.size": string;
    "heading.1.mobile.height": string;
    "heading.1.mobile.weight": string;

    "heading.2.desktop.size": string;
    "heading.2.desktop.height": string;
    "heading.2.desktop.weight": string;
    "heading.2.tablet.size": string;
    "heading.2.tablet.height": string;
    "heading.2.tablet.weight": string;
    "heading.2.mobile.size": string;
    "heading.2.mobile.height": string;
    "heading.2.mobile.weight": string;

    "heading.3.desktop.size": string;
    "heading.3.desktop.height": string;
    "heading.3.desktop.weight": string;
    "heading.3.tablet.size": string;
    "heading.3.table.heightt": string;
    "heading.3.tablet.weight": string;
    "heading.3.mobile.size": string;
    "heading.3.mobile.height": string;
    "heading.3.mobile.weight": string;

    "opacity.enabled": number;
    "opacity.disabled": number;

    "radius.xsmall": string;
    "radius.small": string;
    "radius.medium": string;
    "radius.large": string;
    "radius.xlarge": string;
    "radius.full": string;

    "spacing.3xsmall": string;
    "spacing.2xsmall": string;
    "spacing.xsmall": string;
    "spacing.small": string;
    "spacing.medium": string;
    "spacing.large": string;
    "spacing.xlarge": string;

    "icon.small": string;
    "icon.medium": string;
    "icon.large": string;
    "icon.xlarge": string;
    "icon.xxlarge": string;

    "content.2xsmall": string;
    "content.xsmall": string;
    "content.small": string;
    "content.medium": string;
    "content.large": string;
    "content.xlarge": string;
    "content.2xlarge": string;

    "page.min": string;
    "page.narrow.max": string;
    "page.wide.max": string;

    "stroke.xsmall": string;
    "stroke.small": string;
    "stroke.medium": string;
    "stroke.large": string;
    "stroke.xlarge": string;
  }

  export var tokens: TokensType;
}
