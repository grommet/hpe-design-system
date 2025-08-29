# hpe-icons

Iconography for Grommet and React.js

## Install

`npm install hpe-icons --save`

or

`yarn add hpe-icons`

## Usage

```javascript
import { Accessibility } from 'hpe-icons';

<Accessibility />
<Accessibility color='plain' />
<Accessibility size='large' />
<Accessibility size='xlarge' />
```

## Create Your Own Grommet Icon

Any 24x24px SVG may be converted to an icon using the `<Blank>` icon. For example:

If an icon is decorative and does not need to be read out by assisstive technologies, use `<Blank />` with default properties. If the icon should be read out by assisstive technologies, apply `aria-hidden={undefined}` and an appropriate `a11yTitle` to `<Blank />`.

```javascript
import React from 'react';
import { Blank } from 'grommet-icons';

export const MyIcon = (props) => (
  <Blank {...props}>
    {/* your 24x24 svg goes here - e.g. here's a 24x24px circle */}
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" />
    </svg>
  </Blank>
);

export const MyOtherIcon = (props) => (
  <Blank a11yTitle="Descriptive icon name" aria-hidden={undefined} {...props}>
    {/* your 24x24 svg goes here - e.g. here's a 24x24px circle */}
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="5" />
    </svg>
  </Blank>
);
```

## Build

To build this library, execute the following commands:

1. Install NPM modules

   $ npm install (or yarn install)

2. Run pack

   $ npm run build

3. Test and run linters:

   $ npm run lint

4. Generate React icons:

   $ npm run generate-icons

[contributing]: CONTRIBUTING.md
