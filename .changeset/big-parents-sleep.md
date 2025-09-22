---
'hpe-design-tokens': major
---

**Dimension**
- Added new files, `dimension.v1-default` and `dimension.v1-small`.

**Primitives**

- Deprecated `base.fontFamily.MetricHPEXS`.
- Added new file `primitives.v1.json`.
- Added deprecated set of colors to support old themes (v0 and v1) `deprecated.base.color.[color-name]`.

**Color (light)**

- Added `color.background.neutral.strong`.
- Added `color.decorative.cyan`.
- Added `color.background.neutral.xstrong`.
- Updated `color.background.back` from `base.color.grey.50` to `base.color.white.100`.
- Updated `color.background.front` from `base.color.white.100` to `base.color.grey.50`.
- Updated `color.background.disabled` from `base.color.black.opacity4` to `#d4d8d8`.
- Updated `color.background.warning` from `#fff3dd` to `base.color.orange.50`.
- Updated `color.background.ok` from `#e3fdf4` to `base.color.green.100`.
- Updated `color.background.info` from `#e0f8ff` to `base.color.blue.50`.
- Updated `color.background.critical` from `#ffecec` to `base.color.red.50`.
- Updated `color.border.strong` from `base.color.black.opacity72` to `base.color.grey.800`.
- Updated `color.border.default` from `base.color.black.opacity36` `base.color.grey.500`.
- Updated `color.border.weak` from `base.color.black.opacity12` `base.color.grey.400`.
- Updated `color.border.disabled` from `base.color.black.opacity12` to `base.color.grey.400`.
- Updated `color.text.weak` from `#676767` `base.color.grey.650`.
- Updated `color.text.disabled` from `base.color.black.opacity24` to `#a0a2a8`.
- Updated `color.icon.default` from `base.color.grey.800` to `color.text.default`.
- Updated `color.icon.strong` from `base.color.grey.1000` to `color.text.strong`.
- Updated `color.icon.disabled` from `base.color.black.opacity24` to `color.text.disabled`.
- Updated `color.icon.info` from `base.color.blue.900` to `color.color.blue.700`.
- Updated `color.icon.unknown` from `base.color.grey.700` to `color.color.grey.650`.
- Updated `color.decorative.green` from `base.color.green.400` to `color.color.green.550`.
- Updated `color.decorative.purple` from `base.color.purple.500` to `color.color.purple.300`.
- Updated `color.decorative.blue` from `base.color.blue.400` to `color.color.blue.500`.
- Updated `color.decorative.neutral` from `base.color.grey.700` to `color.color.grey.650`.
- Updated `color.datavis.categorical-10` from `base.color.datavis.purple2` to `base.color.blue.500`.
- Updated `color.datavis.categorical-20` from `base.color.datavis.gold1` to `base.color.green.650`.
Updated `color.datavis.categorical-30` from `base.color.datavis.pink1` to `base.color.purple.400`.
- Updated `color.datavis.categorical-40` from `base.color.datavis.blue1` to `base.color.blue.900`.
- Updated `color.datavis.categorical-50` from `#a78972` to `base.color.fuschia.300`.
- Updated `color.datavis.categorical-60` from `base.color.datavis.purple1` to `base.color.cyan.500`.
- Updated `color.datavis.categorical-70` from `base.color.datavis.darkblue.2` to `base.color.plum.700`.
- Updated `color.datavis.categorical-80` from `base.color.datavis.grape1` to `base.color.coral.300`.
- Deprecated `color.decorative.teal`, use `color.decorative.cyan` instead.
- Deprecated `color.decorative.red`.
- Deprecated `color.decorative.orange`.
- Deprecated `color.decorative.yellow`.

**Color (dark)**

- Added `color.background.neutral.strong`.
- Added `color.decorative.cyan`.
- Added `color.background.neutral.xstrong`.
- Updated `color.background.front` from `base.color.grey.1200` to `base.color.grey.1000`.
- Updated `color.background.floating` from `base.color.grey.1200` to `base.color.grey.1000`.
- Updated `color.background.contrast` from `base.color.white.opacity12` to `base.color.white.opacity6`.
- Updated `color.background.contrast.hover` from `base.color.white.opacity20` to `base.color.white.opacity10`.
- Updated `color.background.disabled` from `base.color.black.opacity4` to `#d4d8d8`.
- Updated `color.background.warning` from `#3c361e` to `base.color.orange.1000`.
- Updated `color.background.ok` from `#1b5245` to `base.color.green.1000`.
- Updated `color.background.info` from `#1e363d` to `base.color.blue.1100`.
- Updated `color.background.critical` from `#552120` to `base.color.red.1000`.
- Updated `color.background.primary.strong` from `#007c60` to `base.color.green.600`.
- Updated `color.background.primary.strong.hover` from `#00513f` to `base.color.green.550`.
- Updated `color.background.primary.xstrong` from `base.color.green.1000` to `base.color.green.450`.
- Updated `color.text.default` from `base.color.white.100` `base.color.grey.50`.
- Updated `color.text.weak` from `#ffffff9c` `base.color.grey.500`.
- Updated `color.text.onPrimaryStrong` from `base.color.white.100` to `base.color.grey.1000`.
- Updated `color.text.primary` from `base.color.green.500` to `base.color.green.550`.
- Updated `color.text.primary.hover` from `base.color.green.450` to `base.color.green.500`.
- Updated `color.text.critical` from `color.foreground.critical` to `base.color.red.400`.
- Updated `color.text.onSelectedPrimaryStrong` from `base.color.white.100` to `color.text.onStrong`.
- Updated `color.text.onStrong` from `base.color.grey.1200` to `base.color.grey.1000`.
- Updated `color.icon.default` from `base.color.white.100` to `color.text.default`.
- Updated `color.icon.strong` from `base.color.white.100` to `color.text.strong`.
- Updated `color.icon.disabled` from `base.color.black.opacity24` to `color.text.disabled`.
- Updated `color.icon.info` from `base.color.blue.400` to `base.color.blue.200`.
- Updated `color.icon.ok` from `base.color.green.500` to `base.color.green.550`.
- Updated `color.icon.warning` from `base.color.orange.600` to `base.color.orange.500`.
- Updated `color.icon.primary` from `base.color.green.500` to `base.color.green.550`.
- Updated `color.icon.onPrimaryStrong` from `base.color.white.100` to `base.color.grey.1000`.
- Updated `color.icon.onSelectedStrong` from `base.color.white.100` to `color.icon.onStrong`.
- Updated `color.icon.onStrong` from `base.color.grey.1200` to `base.color.grey.1000`.
- Updated `color.decorative.green` from `base.color.green.700` to `base.color.green.700Updated`.
- Updated `color.decorative.purple` from `base.color.purple.900` to `base.color.purple.500`.
- Updated `color.decorative.blue` from `base.color.blue.700` to `base.color.blue.900updated`.
- Updated `color.decorative.neutral` from `base.color.grey.700` to `base.color.grey.650`.
- Updated `color.datavis.categorical-10` from `#7372CF` to `base.color.blue.200`.
- Updated `color.datavis.categorical-20` from `base.color.datavis.gold2` to `base.color.grenn.400`.
Updated `color.datavis.categorical-30` from `base.color.datavis.pink2` to `base.color.purple.200`.
- Updated `color.datavis.categorical-40` from `base.color.datavis.lightblue1` to `base.color.blue.500`.
- Updated `color.datavis.categorical-50` from `#A68A74` to `base.color.fuschia.300`.
- Updated `color.datavis.categorical-60` from `#B889FF` to `base.color.cyan.300`.
- Updated `color.datavis.categorical-70` from `#4D8DA8` to `base.color.plum.100`.
- Updated `color.datavis.categorical-80` from `base.color.datavis.purple3` to `base.color.coral.200`.
- Deprecated `color.decorative.teal`, use `color.decorative.cyan` instead.
- Deprecated `color.decorative.red`.
- Deprecated `color.decorative.orange`.
- Deprecated `color.decorative.yellow`.

**Components**

- `button.primary.rest.background` updated from `color.background.primary.strong` to `color.background.neutral.xstrong`.
- `button.primary.rest.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
- `button.primary.rest.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
- `button.primary.rest.fontWeight` updated from `fontWeight.semibold` to `fontWeight.medium`.
  - Referenced by `button.primary.hover.fontWeight`, `button.primary.disabled.rest.fontWeight`, `button.primary.selected.rest.fontWeight`, `button.primary.selected.hover.fontWeight`
- `button.primary.hover.background` updated from `color.background.primary.strong.hover` to `color.background.neutral.strong`.
- `button.primary.hover.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
- `button.primary.hover.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
- `button.primary.selected.rest.background` updated from `color.background.primary.strong` to `color.background.neutral.xstrong`.
- `button.primary.selected.rest.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
- `button.primary.selected.rest.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
- `button.primary.selected.hover.background` updated from `color.background.primary.strong.hover` to `color.background.neutral.strong`.
- `button.primary.selected.hover.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
- `button.primary.selected.hover.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.

- `button.secondary.rest.textColor` updated from `color.text.primary` to `color.text.strong`.
  - Referenced by `button.secondary.hover.textColor`
- `button.secondary.rest.iconColor` updated from `color.icon.primary` to `color.icon.strong`.
  - Referenced by `button.secondary.hover.iconColor`
- Added a new file `component.v1.json`.
