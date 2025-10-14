/**
 * Do not edit directly, this file was auto-generated.
 * Copyright Hewlett Packard Enterprise Development LP.
 */

export default {
  "hpe.focusIndicator.outline": {
    "$type": "border",
    "$value": {
      "width": "2px",
      "color": "#292d3a",
      "style": "solid"
    },
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "border",
      "$value": {
        "width": "{base.dimension.50}",
        "color": "{color.focus.DEFAULT}",
        "style": "solid"
      },
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.focusIndicator.outline",
    "attributes": {
      "category": "focusIndicator",
      "type": "outline"
    },
    "path": [
      "focusIndicator",
      "outline"
    ],
    "key": "{focusIndicator.outline}"
  },
  "hpe.focusIndicator.outlineOffset": {
    "$type": "number",
    "$value": "2px",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 2,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.focusIndicator.outlineOffset",
    "attributes": {
      "category": "focusIndicator",
      "type": "outlineOffset"
    },
    "path": [
      "focusIndicator",
      "outlineOffset"
    ],
    "key": "{focusIndicator.outlineOffset}"
  },
  "hpe.focusIndicator.boxShadow": {
    "$type": "shadow",
    "$value": "0 0 0 2px #ffffff ",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": 0,
          "offsetY": 0,
          "blur": 0,
          "spread": "{focusIndicator.outlineOffset}",
          "color": "{color.focus.support}"
        }
      ],
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.focusIndicator.boxShadow",
    "attributes": {
      "category": "focusIndicator",
      "type": "boxShadow"
    },
    "path": [
      "focusIndicator",
      "boxShadow"
    ],
    "key": "{focusIndicator.boxShadow}"
  },
  "hpe.fontStack.primary": {
    "$type": "fontFamily",
    "$value": "'Graphik', Arial, sans-serif",
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
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "fontFamily",
      "$value": "'Graphik', Arial, sans-serif",
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
  "hpe.breakpoint.xsmall": {
    "$type": "number",
    "$value": "576px",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [
          "WIDTH_HEIGHT"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 576,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "WIDTH_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.breakpoint.xsmall",
    "attributes": {
      "category": "breakpoint",
      "type": "xsmall"
    },
    "path": [
      "breakpoint",
      "xsmall"
    ],
    "key": "{breakpoint.xsmall}"
  },
  "hpe.breakpoint.small": {
    "$type": "number",
    "$value": "768px",
    "$description": "The breakpoint where spacing and typography sizes shift down to accommodate smaller screen sizes.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [
          "WIDTH_HEIGHT"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 768,
      "$description": "The breakpoint where spacing and typography sizes shift down to accommodate smaller screen sizes.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "WIDTH_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.breakpoint.small",
    "attributes": {
      "category": "breakpoint",
      "type": "small"
    },
    "path": [
      "breakpoint",
      "small"
    ],
    "key": "{breakpoint.small}"
  },
  "hpe.breakpoint.medium": {
    "$type": "number",
    "$value": "1080px",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [
          "WIDTH_HEIGHT"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 1080,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "WIDTH_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.breakpoint.medium",
    "attributes": {
      "category": "breakpoint",
      "type": "medium"
    },
    "path": [
      "breakpoint",
      "medium"
    ],
    "key": "{breakpoint.medium}"
  },
  "hpe.breakpoint.large": {
    "$type": "number",
    "$value": "1440px",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": true,
        "scopes": [
          "WIDTH_HEIGHT"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 1440,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "WIDTH_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.breakpoint.large",
    "attributes": {
      "category": "breakpoint",
      "type": "large"
    },
    "path": [
      "breakpoint",
      "large"
    ],
    "key": "{breakpoint.large}"
  },
  "hpe.fontWeight.thin": {
    "$type": "number",
    "$value": 100,
    "$description": "Thin is rarely, if at all, used.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 100,
      "$description": "Thin is rarely, if at all, used.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.thin",
    "attributes": {
      "category": "fontWeight",
      "type": "thin"
    },
    "path": [
      "fontWeight",
      "thin"
    ],
    "key": "{fontWeight.thin}"
  },
  "hpe.fontWeight.light": {
    "$type": "number",
    "$value": 300,
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 300,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.light",
    "attributes": {
      "category": "fontWeight",
      "type": "light"
    },
    "path": [
      "fontWeight",
      "light"
    ],
    "key": "{fontWeight.light}"
  },
  "hpe.fontWeight.regular": {
    "$type": "number",
    "$value": 400,
    "$description": "The default font-weight for most text.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 400,
      "$description": "The default font-weight for most text.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.regular",
    "attributes": {
      "category": "fontWeight",
      "type": "regular"
    },
    "path": [
      "fontWeight",
      "regular"
    ],
    "key": "{fontWeight.regular}"
  },
  "hpe.fontWeight.medium": {
    "$type": "number",
    "$value": 500,
    "$description": "The font-weight generally used when increased emphasis is desired.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 500,
      "$description": "The font-weight generally used when increased emphasis is desired.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.medium",
    "attributes": {
      "category": "fontWeight",
      "type": "medium"
    },
    "path": [
      "fontWeight",
      "medium"
    ],
    "key": "{fontWeight.medium}"
  },
  "hpe.fontWeight.semibold": {
    "$type": "number",
    "$value": 600,
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 600,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.semibold",
    "attributes": {
      "category": "fontWeight",
      "type": "semibold"
    },
    "path": [
      "fontWeight",
      "semibold"
    ],
    "key": "{fontWeight.semibold}"
  },
  "hpe.fontWeight.bold": {
    "$type": "number",
    "$value": 700,
    "$description": "Bold is used sparingly because it has reduced readability especially at smaller font sizes.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 700,
      "$description": "Bold is used sparingly because it has reduced readability especially at smaller font sizes.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.bold",
    "attributes": {
      "category": "fontWeight",
      "type": "bold"
    },
    "path": [
      "fontWeight",
      "bold"
    ],
    "key": "{fontWeight.bold}"
  },
  "hpe.fontWeight.black": {
    "$type": "number",
    "$value": 900,
    "$description": "Black is rarely, if at all, used.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FONT_STYLE"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/global.default.json",
    "isSource": true,
    "original": {
      "$type": "number",
      "$value": 900,
      "$description": "Black is rarely, if at all, used.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_STYLE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.fontWeight.black",
    "attributes": {
      "category": "fontWeight",
      "type": "black"
    },
    "path": [
      "fontWeight",
      "black"
    ],
    "key": "{fontWeight.black}"
  }
}
