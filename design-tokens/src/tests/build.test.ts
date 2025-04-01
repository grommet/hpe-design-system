import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.js';
import { getThemeAndMode } from '../utils.js';

const basePath = `./src/tests`;
const buildPath = `${basePath}/build`;
const TOKENS_DIR = `${basePath}/tokens`;
const PREFIX = 'hpe';
const GROMMET_DIR = `${buildPath}/grommet/`;
const GROMMET_CJS_DIR = `${buildPath}/grommet/cjs/`;
const ESM_DIR = `${buildPath}/esm/`;
const CJS_DIR = `${buildPath}/cjs/`;
const CSS_DIR = `${buildPath}/css/`;
const DOCS_DIR = `${buildPath}/docs/`;
const defaultOptions = {
  fileHeader: 'hpe-file-header',
};

const commonPlatforms = ({
  destination,
  mode,
}: {
  destination: string;
  mode?: string;
}) => ({
  grommet: {
    transformGroup: 'js/w3c',
    buildPath: GROMMET_DIR,
    prefix: PREFIX,
    options: defaultOptions,
    files: [
      {
        destination: `test-${destination}${mode ? `.${mode}` : ''}.js`,
        format: 'esmGrommetRefs',
      },
    ],
  },
  'grommet/cjs': {
    transformGroup: 'js/w3c',
    buildPath: GROMMET_CJS_DIR,
    prefix: PREFIX,
    options: defaultOptions,
    files: [
      {
        destination: `test-${destination}${mode ? `.${mode}` : ''}.cjs`,
        format: 'commonJsGrommetRefs',
      },
    ],
  },
  js: {
    transformGroup: 'js/css',
    buildPath: ESM_DIR,
    prefix: PREFIX,
    options: defaultOptions,
    files: [
      {
        destination: `test-${destination}.js`,
        format: 'javascript/esm',
      },
    ],
  },
  'js/cjs': {
    transformGroup: 'js/css',
    buildPath: CJS_DIR,
    prefix: PREFIX,
    options: defaultOptions,
    files: [
      {
        destination: `test-${destination}.cjs`,
        format: 'javascript/commonJs',
      },
    ],
  },
  docs: {
    transformGroup: 'js/w3c',
    buildPath: DOCS_DIR,
    prefix: PREFIX,
    options: defaultOptions,
    files: [
      {
        destination: `test-${destination}${mode ? `.${mode}` : ''}.js`,
        format: 'jsonFlat',
      },
    ],
  },
});

describe('HPEStyleDictionary', () => {
  beforeAll(async () => {
    let extendedDictionary = await HPEStyleDictionary.extend({
      source: [`${TOKENS_DIR}/collection.mode.json`],
      platforms: {
        ...commonPlatforms({ destination: 'generic' }),
        css: {
          transformGroup: 'css/w3c',
          buildPath: CSS_DIR,
          prefix: PREFIX,
          options: defaultOptions,
          files: [
            {
              destination: 'test-generic.css',
              format: 'css/variables',
              options: {
                outputReferences: true,
              },
            },
          ],
        },
      },
    });

    await extendedDictionary.cleanAllPlatforms();
    await extendedDictionary.buildAllPlatforms();

    /**
     * Color tokens, requires specific CSS overrides
     */
    const colorModeFiles = fs
      .readdirSync(`${TOKENS_DIR}/`)
      .map(file =>
        file.includes('color') ? `${TOKENS_DIR}/${file}` : undefined,
      )
      .filter(file => file !== undefined);

    colorModeFiles.forEach(async file => {
      const [theme, mode] = getThemeAndMode(file);
      extendedDictionary = await HPEStyleDictionary.extend({
        source: [file],
        platforms: {
          ...commonPlatforms({ destination: 'color', mode }),
          css: {
            transformGroup: 'css/w3c',
            buildPath: CSS_DIR,
            prefix: PREFIX,
            options: defaultOptions,
            files: [
              {
                destination: `test-color.${mode}.css`,
                format: 'css/variables-themed',
                options: {
                  outputReferences: true,
                  mode: mode === 'dark' ? 'dark' : undefined,
                  theme,
                },
              },
            ],
          },
        },
      });
      await extendedDictionary.buildAllPlatforms();
    });

    /**
     * Dimension tokens, requires specific CSS overrides
     */
    const dimensionModeFiles = fs
      .readdirSync(`${TOKENS_DIR}/`)
      .map(file =>
        file.includes('dimension') ? `${TOKENS_DIR}/${file}` : undefined,
      )
      .filter(file => file !== undefined);

    dimensionModeFiles.forEach(async file => {
      const mode = getThemeAndMode(file)[1];
      extendedDictionary = await HPEStyleDictionary.extend({
        source: [file],
        platforms: {
          ...commonPlatforms({
            destination: 'dimension',
            mode: mode !== 'default' ? mode : undefined,
          }),
          css: {
            transformGroup: 'css/w3c',
            buildPath: CSS_DIR,
            prefix: PREFIX,
            options: defaultOptions,
            files: [
              {
                destination: `test-dimension${
                  mode !== 'default' ? `.${mode}` : ''
                }.css`,
                format: 'css/variables-breakpoints',
                options: {
                  outputReferences: true,
                  // For testing purposes, hard-coding the media query
                  mediaQuery: mode === 'small' && `max-width: 768px`,
                },
              },
            ],
          },
        },
      });
      await extendedDictionary.buildAllPlatforms();
    });
  });

  it('should support ESM format', () => {
    const output = fs.readFileSync(`${ESM_DIR}test-generic.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "fontStack": {
      "primary": "var(--hpe-fontStack-primary)"
    },
    "base": {
      "color": {
        "white-100": "var(--hpe-base-color-white-100)"
      }
    },
    "static": {
      "container": {
        "small": "var(--hpe-static-container-small)"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support CJS format', () => {
    const output = fs.readFileSync(`${CJS_DIR}test-generic.cjs`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "fontStack": {
      "primary": "var(--hpe-fontStack-primary)"
    },
    "base": {
      "color": {
        "white-100": "var(--hpe-base-color-white-100)"
      }
    },
    "static": {
      "container": {
        "small": "var(--hpe-static-container-small)"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support CSS format', () => {
    const output = fs.readFileSync(`${CSS_DIR}test-generic.css`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

:root {
  --hpe-fontStack-primary: 'Metric', Arial, sans-serif; /* The main font stack for an application. */
  --hpe-base-color-white-100: #ffffff; /* White color */
  --hpe-static-container-small: 192; /* Small container width */
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support CSS color mode format', () => {
    // Light mode
    let output = fs.readFileSync(`${CSS_DIR}test-color.light.css`, 'utf8');
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

:root, [data-mode=auto], [data-mode=light] {
  --hpe-color-background-plum: #f5f0f6; /* Plum background color */
  --hpe-color-background-plum-hover: #f5d3f6; /* Plum background color hover */
  --hpe-color-background-plum-strong: #f5f0f6; /* Strong background color */
}


    `;
    expect(output).toBe(expectedOutput);

    // Dark mode
    output = fs.readFileSync(`${CSS_DIR}test-color.dark.css`, 'utf8');
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

[data-mode=dark] {
  --hpe-color-background-plum: #5e072b; /* Plum background color */
  --hpe-color-background-plum-hover: #960944; /* Plum background color hover */
  --hpe-color-background-plum-strong: #17020b; /* Strong background color */
}

@media (prefers-color-scheme: dark) {
[data-mode=auto], [data-mode=dark] {
  --hpe-color-background-plum: #5e072b; /* Plum background color */
  --hpe-color-background-plum-hover: #960944; /* Plum background color hover */
  --hpe-color-background-plum-strong: #17020b; /* Strong background color */
}
}

    `;
    expect(output).toBe(expectedOutput);
  });
  it('should support CSS breakpoint mode format', () => {
    // Default mode
    let output = fs.readFileSync(`${CSS_DIR}test-dimension.css`, 'utf8');
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

:root {
  --hpe-spacing-medium: 96px; /* Medium spacing value */
  --hpe-fontSize-large: 1.5rem; /* Large font size */
}`;
    expect(output).toBe(expectedOutput);

    // Small mode
    output = fs.readFileSync(`${CSS_DIR}test-dimension.small.css`, 'utf8');
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

@media (max-width: 768px) {
:root {
  --hpe-spacing-medium: 72px; /* Medium spacing value */
  --hpe-fontSize-large: 1.125rem; /* Large font size */
}
}
`;

    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet ESM format', () => {
    const output = fs.readFileSync(`${GROMMET_DIR}test-generic.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "fontStack": {
      "primary": "'Metric', Arial, sans-serif"
    },
    "base": {
      "color": {
        "white-100": "#ffffff"
      }
    },
    "static": {
      "container": {
        "small": 192
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet ESM color format', () => {
    // Light mode
    let output = fs.readFileSync(`${GROMMET_DIR}test-color.light.js`, 'utf8');
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "color": {
      "background": {
        "plum": "#f5f0f6",
        "plum-hover": "#f5d3f6",
        "plum-strong": "#f5f0f6"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);

    // Dark mode
    output = fs.readFileSync(`${GROMMET_DIR}test-color.dark.js`, 'utf8');
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "color": {
      "background": {
        "plum": "#5e072b",
        "plum-hover": "#960944",
        "plum-strong": "#17020b"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet ESM dimension format', () => {
    // Large mode
    let output = fs.readFileSync(`${GROMMET_DIR}test-dimension.js`, 'utf8');
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "spacing": {
      "medium": "96px"
    },
    "fontSize": {
      "large": "1.5rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);

    // Small mode
    output = fs.readFileSync(`${GROMMET_DIR}test-dimension.small.js`, 'utf8');
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe": {
    "spacing": {
      "medium": "72px"
    },
    "fontSize": {
      "large": "1.125rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet CJS format', () => {
    const output = fs.readFileSync(
      `${GROMMET_CJS_DIR}test-generic.cjs`,
      'utf8',
    );
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "fontStack": {
      "primary": "'Metric', Arial, sans-serif"
    },
    "base": {
      "color": {
        "white-100": "#ffffff"
      }
    },
    "static": {
      "container": {
        "small": 192
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet CJS color format', () => {
    // Light mode
    let output = fs.readFileSync(
      `${GROMMET_CJS_DIR}test-color.light.cjs`,
      'utf8',
    );
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "color": {
      "background": {
        "plum": "#f5f0f6",
        "plum-hover": "#f5d3f6",
        "plum-strong": "#f5f0f6"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);

    // Dark mode
    output = fs.readFileSync(`${GROMMET_CJS_DIR}test-color.dark.cjs`, 'utf8');
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "color": {
      "background": {
        "plum": "#5e072b",
        "plum-hover": "#960944",
        "plum-strong": "#17020b"
      }
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet CJS dimension format', () => {
    // Large mode
    let output = fs.readFileSync(
      `${GROMMET_CJS_DIR}test-dimension.cjs`,
      'utf8',
    );
    let expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "spacing": {
      "medium": "96px"
    },
    "fontSize": {
      "large": "1.5rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);

    output = fs.readFileSync(
      `${GROMMET_CJS_DIR}test-dimension.small.cjs`,
      'utf8',
    );
    expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

module.exports = {
  "hpe": {
    "spacing": {
      "medium": "72px"
    },
    "fontSize": {
      "large": "1.125rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support docs format', () => {
    const output = fs.readFileSync(`${DOCS_DIR}test-generic.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe.fontStack.primary": {
    "$type": "fontFamily",
    "$value": "'Metric', Arial, sans-serif",
    "$description": "The main font stack for an application.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [
          "FONT_FAMILY"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$type": "fontFamily",
      "$value": "'Metric', Arial, sans-serif",
      "$description": "The main font stack for an application.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "FONT_FAMILY"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontStack.primary",
    "attributes": {
      "category": "fontStack",
      "type": "primary"
    },
    "path": [
      "fontStack",
      "primary"
    ],
    "key": "{fontStack.primary}"
  },
  "hpe.base.color.white.100": {
    "$value": "#ffffff",
    "$type": "color",
    "$description": "White color",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": "#ffffff",
      "$type": "color",
      "$description": "White color"
    },
    "name": "hpe.base.color.white.100",
    "attributes": {
      "category": "base",
      "type": "color",
      "item": "white",
      "subitem": "100"
    },
    "path": [
      "base",
      "color",
      "white",
      "100"
    ],
    "key": "{base.color.white.100}"
  },
  "hpe.static.container.small": {
    "$value": 192,
    "$type": "number",
    "$description": "Small container width",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": 192,
      "$type": "number",
      "$description": "Small container width"
    },
    "name": "hpe.static.container.small",
    "attributes": {
      "category": "static",
      "type": "container",
      "item": "small"
    },
    "path": [
      "static",
      "container",
      "small"
    ],
    "key": "{static.container.small}"
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
});
