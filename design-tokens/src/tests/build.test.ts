import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'fs';
import { HPEStyleDictionary } from '../HPEStyleDictionary.js';

describe('HPEStyleDictionary', () => {
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

  beforeAll(async () => {
    const extendedDictionary = await HPEStyleDictionary.extend({
      source: [`${TOKENS_DIR}/**/*.json`],
      platforms: {
        grommet: {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.js',
              format: 'esmGrommetRefs',
            },
          ],
        },
        'grommet/cjs': {
          transformGroup: 'js/w3c',
          buildPath: GROMMET_CJS_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.cjs',
              format: 'commonJsGrommetRefs',
            },
          ],
        },
        js: {
          transformGroup: 'js/css',
          buildPath: ESM_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.js',
              format: 'javascript/esm',
            },
          ],
        },
        'js/cjs': {
          transformGroup: 'js/css',
          buildPath: CJS_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.cjs',
              format: 'javascript/commonJs',
            },
          ],
        },
        css: {
          transformGroup: 'css/w3c',
          buildPath: CSS_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.css',
              format: 'css/variables',

              options: {
                outputReferences: true,
              },
            },
          ],
        },
        docs: {
          transformGroup: 'js/w3c',
          buildPath: DOCS_DIR,
          prefix: PREFIX,
          files: [
            {
              destination: 'test-output.js',
              format: 'jsonFlat',
            },
          ],
        },
      },
    });

    await extendedDictionary.cleanAllPlatforms();
    await extendedDictionary.buildAllPlatforms();
  });

  it('should support ESM format', () => {
    const output = fs.readFileSync(`${ESM_DIR}test-output.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

export default {
  "hpe": {
    "color": {
      "background": {
        "plum": "var(--hpe-color-background-plum)",
        "plum-hover": "var(--hpe-color-background-plum-hover)",
        "plum-strong": "var(--hpe-color-background-plum-strong)"
      }
    },
    "spacing": {
      "medium": "var(--hpe-spacing-medium)"
    },
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
    },
    "fontSize": {
      "large": "var(--hpe-fontSize-large)"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support CJS format', () => {
    const output = fs.readFileSync(`${CJS_DIR}test-output.cjs`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

module.exports = {
  "hpe": {
    "color": {
      "background": {
        "plum": "var(--hpe-color-background-plum)",
        "plum-hover": "var(--hpe-color-background-plum-hover)",
        "plum-strong": "var(--hpe-color-background-plum-strong)"
      }
    },
    "spacing": {
      "medium": "var(--hpe-spacing-medium)"
    },
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
    },
    "fontSize": {
      "large": "var(--hpe-fontSize-large)"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support CSS format', () => {
    const output = fs.readFileSync(`${CSS_DIR}test-output.css`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

:root {
  --hpe-color-background-plum: #f5f0f6; /* Plum background color */
  --hpe-color-background-plum-hover: #f5d3f6; /* Plum background color hover */
  --hpe-color-background-plum-strong: #f5f0f6; /* Plum background color */
  --hpe-spacing-medium: 96px; /* Medium spacing value */
  --hpe-fontStack-primary: 'Metric', Arial, sans-serif; /* The main font stack for an application. */
  --hpe-base-color-white-100: #ffffff; /* White color */
  --hpe-static-container-small: 192; /* Small container width */
  --hpe-fontSize-large: 1.5rem; /* Large font size */
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet format', () => {
    const output = fs.readFileSync(`${GROMMET_DIR}test-output.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

export default {
  "hpe": {
    "color": {
      "background": {
        "plum": "#f5f0f6",
        "plum-hover": "#f5d3f6",
        "plum-strong": "#f5f0f6"
      }
    },
    "spacing": {
      "medium": "96px"
    },
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
    },
    "fontSize": {
      "large": "1.5rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support Grommet CJS format', () => {
    const output = fs.readFileSync(`${GROMMET_CJS_DIR}test-output.cjs`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

module.exports = {
  "hpe": {
    "color": {
      "background": {
        "plum": "#f5f0f6",
        "plum-hover": "#f5d3f6",
        "plum-strong": "#f5f0f6"
      }
    },
    "spacing": {
      "medium": "96px"
    },
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
    },
    "fontSize": {
      "large": "1.5rem"
    }
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
  it('should support docs format', () => {
    const output = fs.readFileSync(`${DOCS_DIR}test-output.js`, 'utf8');
    const expectedOutput = `/**
 * Do not edit directly, this file was auto-generated.
 */

export default {
  "hpe.color.background.plum": {
    "$value": "#f5f0f6",
    "$type": "color",
    "$description": "Plum background color",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": "#f5f0f6",
      "$type": "color",
      "$description": "Plum background color"
    },
    "name": "hpe.color.background.plum",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "plum",
      "subitem": "DEFAULT",
      "state": "REST"
    },
    "path": [
      "color",
      "background",
      "plum",
      "DEFAULT",
      "REST"
    ],
    "key": "{color.background.plum.DEFAULT.REST}"
  },
  "hpe.color.background.plum.hover": {
    "$value": "#f5d3f6",
    "$type": "color",
    "$description": "Plum background color hover",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": "#f5d3f6",
      "$type": "color",
      "$description": "Plum background color hover"
    },
    "name": "hpe.color.background.plum.hover",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "plum",
      "subitem": "DEFAULT",
      "state": "hover"
    },
    "path": [
      "color",
      "background",
      "plum",
      "DEFAULT",
      "hover"
    ],
    "key": "{color.background.plum.DEFAULT.hover}"
  },
  "hpe.color.background.plum.strong": {
    "$value": "#f5f0f6",
    "$type": "color",
    "$description": "Plum background color",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": "#f5f0f6",
      "$type": "color",
      "$description": "Plum background color"
    },
    "name": "hpe.color.background.plum.strong",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "plum",
      "subitem": "strong",
      "state": "REST"
    },
    "path": [
      "color",
      "background",
      "plum",
      "strong",
      "REST"
    ],
    "key": "{color.background.plum.strong.REST}"
  },
  "hpe.spacing.medium": {
    "$value": "96px",
    "$type": "number",
    "$description": "Medium spacing value",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": 96,
      "$type": "number",
      "$description": "Medium spacing value"
    },
    "name": "hpe.spacing.medium",
    "attributes": {
      "category": "spacing",
      "type": "medium"
    },
    "path": [
      "spacing",
      "medium"
    ],
    "key": "{spacing.medium}"
  },
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
  },
  "hpe.fontSize.large": {
    "$value": "1.5rem",
    "$type": "number",
    "$description": "Large font size",
    "filePath": "src/tests/tokens/collection.mode.json",
    "isSource": true,
    "original": {
      "$value": 24,
      "$type": "number",
      "$description": "Large font size"
    },
    "name": "hpe.fontSize.large",
    "attributes": {
      "category": "fontSize",
      "type": "large"
    },
    "path": [
      "fontSize",
      "large"
    ],
    "key": "{fontSize.large}"
  }
}
`;
    expect(output).toBe(expectedOutput);
  });
});
