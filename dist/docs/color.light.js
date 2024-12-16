/**
 * Do not edit directly, this file was auto-generated.
 */

export default {
  "hpe.color.background.default": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Default color for component backgrounds in the default/enabled state. Can also be used for page background.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Default color for component backgrounds in the default/enabled state. Can also be used for page background.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.default",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "default"
    },
    "path": [
      "color",
      "background",
      "default"
    ],
    "key": "{color.background.default}"
  },
  "hpe.color.background.hover": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.04)",
    "$description": "Generic hover state of components that have no fill in their default/enabled state. For example, unselected menu-items.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.background.contrast}",
      "$description": "Generic hover state of components that have no fill in their default/enabled state. For example, unselected menu-items.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.hover",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "hover"
    },
    "path": [
      "color",
      "background",
      "hover"
    ],
    "key": "{color.background.hover}"
  },
  "hpe.color.background.active": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.04)",
    "$description": "Standard active state color",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.background.hover}",
      "$description": "Standard active state color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.active",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "active"
    },
    "path": [
      "color",
      "background",
      "active"
    ],
    "key": "{color.background.active}"
  },
  "hpe.color.background.disabled": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.04)",
    "$description": "Disabled background color. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity4}",
      "$description": "Disabled background color. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.disabled",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "disabled"
    },
    "path": [
      "color",
      "background",
      "disabled"
    ],
    "key": "{color.background.disabled}"
  },
  "hpe.color.background.back": {
    "$type": "color",
    "$value": "#f7f7f7",
    "$description": "Elevation level 0. Typically used for the page color. color.background.back creates a contrasted page backdrop for components to sit on. It’s useful to make components stand out on pages that use it. The nature of back is that it forms a contrast with any foreground component.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.50}",
      "$description": "Elevation level 0. Typically used for the page color. color.background.back creates a contrasted page backdrop for components to sit on. It’s useful to make components stand out on pages that use it. The nature of back is that it forms a contrast with any foreground component.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.back",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "back"
    },
    "path": [
      "color",
      "background",
      "back"
    ],
    "key": "{color.background.back}"
  },
  "hpe.color.background.front": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Elevation level 1. Lowest level of elevation for container/surfaces that sit directly on top of the page. Example: container that houses a data table.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Elevation level 1. Lowest level of elevation for container/surfaces that sit directly on top of the page. Example: container that houses a data table.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.front",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "front"
    },
    "path": [
      "color",
      "background",
      "front"
    ],
    "key": "{color.background.front}"
  },
  "hpe.color.background.floating": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Elevation level 3. The highest level of elevation for elements that sit above everything else. Example: dropdowns, layer, side drawers and floating buttons.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Elevation level 3. The highest level of elevation for elements that sit above everything else. Example: dropdowns, layer, side drawers and floating buttons.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.floating",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "floating"
    },
    "path": [
      "color",
      "background",
      "floating"
    ],
    "key": "{color.background.floating}"
  },
  "hpe.color.background.screenOverlay": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.12)",
    "$description": "Use for the backdrop overlay that sits behind dialogues, modals or layers.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Use for the backdrop overlay that sits behind dialogues, modals or layers.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.screenOverlay",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "screenOverlay"
    },
    "path": [
      "color",
      "background",
      "screenOverlay"
    ],
    "key": "{color.background.screenOverlay}"
  },
  "hpe.color.background.contrast": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.04)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity4}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.contrast",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "contrast"
    },
    "path": [
      "color",
      "background",
      "contrast"
    ],
    "key": "{color.background.contrast}"
  },
  "hpe.color.background.warning": {
    "$type": "color",
    "$value": "rgba(255, 188, 68, 0.24)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.orange.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.warning",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "warning"
    },
    "path": [
      "color",
      "background",
      "warning"
    ],
    "key": "{color.background.warning}"
  },
  "hpe.color.background.info": {
    "$type": "color",
    "$value": "rgba(0, 200, 255, 0.24)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.blue.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.info",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "info"
    },
    "path": [
      "color",
      "background",
      "info"
    ],
    "key": "{color.background.info}"
  },
  "hpe.color.background.critical": {
    "$type": "color",
    "$value": "rgba(252, 97, 97, 0.24)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.red.500-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.critical",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "critical"
    },
    "path": [
      "color",
      "background",
      "critical"
    ],
    "key": "{color.background.critical}"
  },
  "hpe.color.background.primary.default": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "The default primary color of components at a rest/ enabled state. The term ‘primary’ denoting hierarchy - the most important thing. Use to style components prominently and give greater visual hierarchy.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "The default primary color of components at a rest/ enabled state. The term ‘primary’ denoting hierarchy - the most important thing. Use to style components prominently and give greater visual hierarchy.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.primary.default",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "primary",
      "subitem": "default"
    },
    "path": [
      "color",
      "background",
      "primary",
      "default"
    ],
    "key": "{color.background.primary.default}"
  },
  "hpe.color.background.primary.hover": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "Hover color variant of the primary color.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Hover color variant of the primary color.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.primary.hover",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "primary",
      "subitem": "hover"
    },
    "path": [
      "color",
      "background",
      "primary",
      "hover"
    ],
    "key": "{color.background.primary.hover}"
  },
  "hpe.color.background.unknown": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.04)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity4}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.unknown",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "unknown"
    },
    "path": [
      "color",
      "background",
      "unknown"
    ],
    "key": "{color.background.unknown}"
  },
  "hpe.color.background.ok": {
    "$type": "color",
    "$value": "rgba(23, 235, 160, 0.24)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.ok",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "ok"
    },
    "path": [
      "color",
      "background",
      "ok"
    ],
    "key": "{color.background.ok}"
  },
  "hpe.color.background.selected.strong.enabled": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.brand}",
      "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.selected.strong.enabled",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "selected",
      "subitem": "strong",
      "state": "enabled"
    },
    "path": [
      "color",
      "background",
      "selected",
      "strong",
      "enabled"
    ],
    "key": "{color.background.selected.strong.enabled}"
  },
  "hpe.color.background.selected.strong.hover": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.brand}",
      "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.selected.strong.hover",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "selected",
      "subitem": "strong",
      "state": "hover"
    },
    "path": [
      "color",
      "background",
      "selected",
      "strong",
      "hover"
    ],
    "key": "{color.background.selected.strong.hover}"
  },
  "hpe.color.background.selected.weak.enabled": {
    "$type": "color",
    "$value": "#cbfaeb",
    "$description": "Lower emphasis variant of selected color. Use if selection color needs to be less prominent.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.100}",
      "$description": "Lower emphasis variant of selected color. Use if selection color needs to be less prominent.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.selected.weak.enabled",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "selected",
      "subitem": "weak",
      "state": "enabled"
    },
    "path": [
      "color",
      "background",
      "selected",
      "weak",
      "enabled"
    ],
    "key": "{color.background.selected.weak.enabled}"
  },
  "hpe.color.background.selected.weak.hover": {
    "$type": "color",
    "$value": "#aef6df",
    "$description": "Lower emphasis variant of selected color. Use if selection color needs to be less prominent.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.125}",
      "$description": "Lower emphasis variant of selected color. Use if selection color needs to be less prominent.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.background.selected.weak.hover",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "selected",
      "subitem": "weak",
      "state": "hover"
    },
    "path": [
      "color",
      "background",
      "selected",
      "weak",
      "hover"
    ],
    "key": "{color.background.selected.weak.hover}"
  },
  "hpe.color.background.neutral.xstrong": {
    "$type": "color",
    "$value": "#333333",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.1000}",
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
    "name": "hpe.color.background.neutral.xstrong",
    "attributes": {
      "category": "color",
      "type": "background",
      "item": "neutral",
      "subitem": "xstrong"
    },
    "path": [
      "color",
      "background",
      "neutral",
      "xstrong"
    ],
    "key": "{color.background.neutral.xstrong}"
  },
  "hpe.color.border.strong": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.72)",
    "$description": "Stronger border color for added emphasis",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity72}",
      "$description": "Stronger border color for added emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.strong",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "strong"
    },
    "path": [
      "color",
      "border",
      "strong"
    ],
    "key": "{color.border.strong}"
  },
  "hpe.color.border.default": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
    "$description": "Default border color",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR",
          "EFFECT_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity36}",
      "$description": "Default border color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "EFFECT_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.default",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "default"
    },
    "path": [
      "color",
      "border",
      "default"
    ],
    "key": "{color.border.default}"
  },
  "hpe.color.border.weak": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.12)",
    "$description": "Weaker border color for reduced emphasis",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR",
          "EFFECT_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Weaker border color for reduced emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "EFFECT_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.weak",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "weak"
    },
    "path": [
      "color",
      "border",
      "weak"
    ],
    "key": "{color.border.weak}"
  },
  "hpe.color.border.disabled": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.12)",
    "$description": "Disabled color for borders. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR",
          "EFFECT_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Disabled color for borders. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "EFFECT_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.disabled",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "disabled"
    },
    "path": [
      "color",
      "border",
      "disabled"
    ],
    "key": "{color.border.disabled}"
  },
  "hpe.color.border.selected": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggles, active tabs.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR",
          "EFFECT_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Selected (or checked) color. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggles, active tabs.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "EFFECT_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.selected",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "selected"
    },
    "path": [
      "color",
      "border",
      "selected"
    ],
    "key": "{color.border.selected}"
  },
  "hpe.color.border.critical": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.border.default}",
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
    "name": "hpe.color.border.critical",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "critical"
    },
    "path": [
      "color",
      "border",
      "critical"
    ],
    "key": "{color.border.critical}"
  },
  "hpe.color.border.info": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.border.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.info",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "info"
    },
    "path": [
      "color",
      "border",
      "info"
    ],
    "key": "{color.border.info}"
  },
  "hpe.color.border.ok": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.border.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.ok",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "ok"
    },
    "path": [
      "color",
      "border",
      "ok"
    ],
    "key": "{color.border.ok}"
  },
  "hpe.color.border.warning": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.border.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.warning",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "warning"
    },
    "path": [
      "color",
      "border",
      "warning"
    ],
    "key": "{color.border.warning}"
  },
  "hpe.color.border.unknown": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.36)",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.border.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.border.unknown",
    "attributes": {
      "category": "color",
      "type": "border",
      "item": "unknown"
    },
    "path": [
      "color",
      "border",
      "unknown"
    ],
    "key": "{color.border.unknown}"
  },
  "hpe.color.text.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Default text color that is accessible on standard background colors",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.800}",
      "$description": "Default text color that is accessible on standard background colors",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "default"
    },
    "path": [
      "color",
      "text",
      "default"
    ],
    "key": "{color.text.default}"
  },
  "hpe.color.text.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Stronger text color for added prominence",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "SHAPE_FILL",
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.1000}",
      "$description": "Stronger text color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "strong"
    },
    "path": [
      "color",
      "text",
      "strong"
    ],
    "key": "{color.text.strong}"
  },
  "hpe.color.text.weak": {
    "$type": "color",
    "$value": "#757575",
    "$description": "Weaker text color for reduced emphasis",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.700}",
      "$description": "Weaker text color for reduced emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.weak",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "weak"
    },
    "path": [
      "color",
      "text",
      "weak"
    ],
    "key": "{color.text.weak}"
  },
  "hpe.color.text.placeholder": {
    "$type": "color",
    "$value": "#757575",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.weak}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.placeholder",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "placeholder"
    },
    "path": [
      "color",
      "text",
      "placeholder"
    ],
    "key": "{color.text.placeholder}"
  },
  "hpe.color.text.disabled": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.24)",
    "$description": "Disabled color for text. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity24}",
      "$description": "Disabled color for text. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.disabled",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "disabled"
    },
    "path": [
      "color",
      "text",
      "disabled"
    ],
    "key": "{color.text.disabled}"
  },
  "hpe.color.text.onPrimary": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Text color to be used for text sitting on a primary color (for example a background styled with the primary color). This text and background pairing helps ensure accessibility. Furthermore, it enables precise theming updates and allows easier maintenance of colors, where if the primary color changes, we can update color.text.onPrimary to be accessible on the new primary color.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Text color to be used for text sitting on a primary color (for example a background styled with the primary color). This text and background pairing helps ensure accessibility. Furthermore, it enables precise theming updates and allows easier maintenance of colors, where if the primary color changes, we can update color.text.onPrimary to be accessible on the new primary color.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onPrimary",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onPrimary"
    },
    "path": [
      "color",
      "text",
      "onPrimary"
    ],
    "key": "{color.text.onPrimary}"
  },
  "hpe.color.text.onStrong.default": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onStrong.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onStrong",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onStrong",
      "default"
    ],
    "key": "{color.text.onStrong.default}"
  },
  "hpe.color.text.heading.default": {
    "$type": "color",
    "$value": "#333333",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
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
    "name": "hpe.color.text.heading.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "heading",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "heading",
      "default"
    ],
    "key": "{color.text.heading.default}"
  },
  "hpe.color.text.primary": {
    "$type": "color",
    "$value": "#006750",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.primary",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "primary"
    },
    "path": [
      "color",
      "text",
      "primary"
    ],
    "key": "{color.text.primary}"
  },
  "hpe.color.text.critical": {
    "$type": "color",
    "$value": "#555555",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.critical",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "critical"
    },
    "path": [
      "color",
      "text",
      "critical"
    ],
    "key": "{color.text.critical}"
  },
  "hpe.color.text.info": {
    "$type": "color",
    "$value": "#555555",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.info",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "info"
    },
    "path": [
      "color",
      "text",
      "info"
    ],
    "key": "{color.text.info}"
  },
  "hpe.color.text.ok": {
    "$type": "color",
    "$value": "#555555",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.ok",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "ok"
    },
    "path": [
      "color",
      "text",
      "ok"
    ],
    "key": "{color.text.ok}"
  },
  "hpe.color.text.warning": {
    "$type": "color",
    "$value": "#555555",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.warning",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "warning"
    },
    "path": [
      "color",
      "text",
      "warning"
    ],
    "key": "{color.text.warning}"
  },
  "hpe.color.text.unknown": {
    "$type": "color",
    "$value": "#555555",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.unknown",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "unknown"
    },
    "path": [
      "color",
      "text",
      "unknown"
    ],
    "key": "{color.text.unknown}"
  },
  "hpe.color.text.onSelectedStrong": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Text color to be used for text sitting on background-selected-strong.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Text color to be used for text sitting on background-selected-strong.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onSelectedStrong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onSelectedStrong"
    },
    "path": [
      "color",
      "text",
      "onSelectedStrong"
    ],
    "key": "{color.text.onSelectedStrong}"
  },
  "hpe.color.text.onSelected": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used for text sitting on background-selected-strong.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used for text sitting on background-selected-strong.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onSelected",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onSelected"
    },
    "path": [
      "color",
      "text",
      "onSelected"
    ],
    "key": "{color.text.onSelected}"
  },
  "hpe.color.text.onCritical.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onCritical.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onCritical",
      "subitem": "strong"
    },
    "path": [
      "color",
      "text",
      "onCritical",
      "strong"
    ],
    "key": "{color.text.onCritical.strong}"
  },
  "hpe.color.text.onCritical.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onCritical.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onCritical",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onCritical",
      "default"
    ],
    "key": "{color.text.onCritical.default}"
  },
  "hpe.color.text.onInfo.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onInfo.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onInfo",
      "subitem": "strong"
    },
    "path": [
      "color",
      "text",
      "onInfo",
      "strong"
    ],
    "key": "{color.text.onInfo.strong}"
  },
  "hpe.color.text.onInfo.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onInfo.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onInfo",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onInfo",
      "default"
    ],
    "key": "{color.text.onInfo.default}"
  },
  "hpe.color.text.onOk.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onOk.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onOk",
      "subitem": "strong"
    },
    "path": [
      "color",
      "text",
      "onOk",
      "strong"
    ],
    "key": "{color.text.onOk.strong}"
  },
  "hpe.color.text.onOk.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onOk.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onOk",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onOk",
      "default"
    ],
    "key": "{color.text.onOk.default}"
  },
  "hpe.color.text.onUnknown.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onUnknown.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onUnknown",
      "subitem": "strong"
    },
    "path": [
      "color",
      "text",
      "onUnknown",
      "strong"
    ],
    "key": "{color.text.onUnknown.strong}"
  },
  "hpe.color.text.onUnknown.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onUnknown.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onUnknown",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onUnknown",
      "default"
    ],
    "key": "{color.text.onUnknown.default}"
  },
  "hpe.color.text.onWarning.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onWarning.strong",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onWarning",
      "subitem": "strong"
    },
    "path": [
      "color",
      "text",
      "onWarning",
      "strong"
    ],
    "key": "{color.text.onWarning.strong}"
  },
  "hpe.color.text.onWarning.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Text color to be used on status backgrounds.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "TEXT_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.default}",
      "$description": "Text color to be used on status backgrounds.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.text.onWarning.default",
    "attributes": {
      "category": "color",
      "type": "text",
      "item": "onWarning",
      "subitem": "default"
    },
    "path": [
      "color",
      "text",
      "onWarning",
      "default"
    ],
    "key": "{color.text.onWarning.default}"
  },
  "hpe.color.icon.default": {
    "$type": "color",
    "$value": "#555555",
    "$description": "Default icon color that is accessible on standard background colors",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.800}",
      "$description": "Default icon color that is accessible on standard background colors",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.default",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "default"
    },
    "path": [
      "color",
      "icon",
      "default"
    ],
    "key": "{color.icon.default}"
  },
  "hpe.color.icon.strong": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Stronger icon color for added prominence",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.1000}",
      "$description": "Stronger icon color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.strong",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "strong"
    },
    "path": [
      "color",
      "icon",
      "strong"
    ],
    "key": "{color.icon.strong}"
  },
  "hpe.color.icon.weak": {
    "$type": "color",
    "$value": "#757575",
    "$description": "Weaker icon color for reduced emphasis",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.700}",
      "$description": "Weaker icon color for reduced emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.weak",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "weak"
    },
    "path": [
      "color",
      "icon",
      "weak"
    ],
    "key": "{color.icon.weak}"
  },
  "hpe.color.icon.disabled": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0.24)",
    "$description": "Disabled color for icons. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.black.opacity24}",
      "$description": "Disabled color for icons. Using disabled colors ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colors at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.disabled",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "disabled"
    },
    "path": [
      "color",
      "icon",
      "disabled"
    ],
    "key": "{color.icon.disabled}"
  },
  "hpe.color.icon.critical": {
    "$type": "color",
    "$value": "#ec3331",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.red.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.critical",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "critical"
    },
    "path": [
      "color",
      "icon",
      "critical"
    ],
    "key": "{color.icon.critical}"
  },
  "hpe.color.icon.info": {
    "$type": "color",
    "$value": "#00c8ff",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.blue.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.info",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "info"
    },
    "path": [
      "color",
      "icon",
      "info"
    ],
    "key": "{color.icon.info}"
  },
  "hpe.color.icon.ok": {
    "$type": "color",
    "$value": "#009a71",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.650}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.ok",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "ok"
    },
    "path": [
      "color",
      "icon",
      "ok"
    ],
    "key": "{color.icon.ok}"
  },
  "hpe.color.icon.warning": {
    "$type": "color",
    "$value": "#d36d00",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.orange.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.warning",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "warning"
    },
    "path": [
      "color",
      "icon",
      "warning"
    ],
    "key": "{color.icon.warning}"
  },
  "hpe.color.icon.unknown": {
    "$type": "color",
    "$value": "#8c8c8c",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.unknown",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "unknown"
    },
    "path": [
      "color",
      "icon",
      "unknown"
    ],
    "key": "{color.icon.unknown}"
  },
  "hpe.color.icon.primary": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.primary",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "primary"
    },
    "path": [
      "color",
      "icon",
      "primary"
    ],
    "key": "{color.icon.primary}"
  },
  "hpe.color.icon.onPrimary": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Icon color to be used when text sits on primary color (for example a background styled with the primary color). This text and background pairing ensures text used on primary is accessible. Furthermore, it enables precise theming updates and allows for easier maintenance of colors, where if the primary color changes, we can update color.text.onPrimary to be accessible on the new primary color.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Icon color to be used when text sits on primary color (for example a background styled with the primary color). This text and background pairing ensures text used on primary is accessible. Furthermore, it enables precise theming updates and allows for easier maintenance of colors, where if the primary color changes, we can update color.text.onPrimary to be accessible on the new primary color.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.onPrimary",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "onPrimary"
    },
    "path": [
      "color",
      "icon",
      "onPrimary"
    ],
    "key": "{color.icon.onPrimary}"
  },
  "hpe.color.icon.onSelectedStrong": {
    "$type": "color",
    "$value": "#ffffff",
    "$description": "Icon color to be used for Icon sitting on background-selected-strong.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Icon color to be used for Icon sitting on background-selected-strong.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.onSelectedStrong",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "onSelectedStrong"
    },
    "path": [
      "color",
      "icon",
      "onSelectedStrong"
    ],
    "key": "{color.icon.onSelectedStrong}"
  },
  "hpe.color.icon.onSelected": {
    "$type": "color",
    "$value": "#333333",
    "$description": "Icon color to be used for icon sitting on background-selected-strong.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{color.text.strong}",
      "$description": "Icon color to be used for icon sitting on background-selected-strong.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.icon.onSelected",
    "attributes": {
      "category": "color",
      "type": "icon",
      "item": "onSelected"
    },
    "path": [
      "color",
      "icon",
      "onSelected"
    ],
    "key": "{color.icon.onSelected}"
  },
  "hpe.color.decorative.brand": {
    "$type": "color",
    "$value": "#01a982",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.brand}",
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
    "name": "hpe.color.decorative.brand",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "brand"
    },
    "path": [
      "color",
      "decorative",
      "brand"
    ],
    "key": "{color.decorative.brand}"
  },
  "hpe.color.decorative.green": {
    "$type": "color",
    "$value": "#17eba0",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.green.400}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.green",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "green"
    },
    "path": [
      "color",
      "decorative",
      "green"
    ],
    "key": "{color.decorative.green}"
  },
  "hpe.color.decorative.purple": {
    "$type": "color",
    "$value": "#f740ff",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.purple.500}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.purple",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "purple"
    },
    "path": [
      "color",
      "decorative",
      "purple"
    ],
    "key": "{color.decorative.purple}"
  },
  "hpe.color.decorative.teal": {
    "$type": "color",
    "$value": "#82fff2",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.teal.200}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.teal",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "teal"
    },
    "path": [
      "color",
      "decorative",
      "teal"
    ],
    "key": "{color.decorative.teal}"
  },
  "hpe.color.decorative.blue": {
    "$type": "color",
    "$value": "#00c8ff",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.blue.400}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.blue",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "blue"
    },
    "path": [
      "color",
      "decorative",
      "blue"
    ],
    "key": "{color.decorative.blue}"
  },
  "hpe.color.decorative.red": {
    "$type": "color",
    "$value": "#fc6161",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.red.500}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.red",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "red"
    },
    "path": [
      "color",
      "decorative",
      "red"
    ],
    "key": "{color.decorative.red}"
  },
  "hpe.color.decorative.orange": {
    "$type": "color",
    "$value": "#ffbc44",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.orange.400}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.orange",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "orange"
    },
    "path": [
      "color",
      "decorative",
      "orange"
    ],
    "key": "{color.decorative.orange}"
  },
  "hpe.color.decorative.yellow": {
    "$type": "color",
    "$value": "#ffeb59",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.yellow.200}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.yellow",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "yellow"
    },
    "path": [
      "color",
      "decorative",
      "yellow"
    ],
    "key": "{color.decorative.yellow}"
  },
  "hpe.color.decorative.purple!": {
    "$type": "color",
    "$value": "#7630ea",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.purple.800}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.purple!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "purple!"
    },
    "path": [
      "color",
      "decorative",
      "purple!"
    ],
    "key": "{color.decorative.purple!}"
  },
  "hpe.color.decorative.green!": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.brand}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.green!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "green!"
    },
    "path": [
      "color",
      "decorative",
      "green!"
    ],
    "key": "{color.decorative.green!}"
  },
  "hpe.color.decorative.teal!": {
    "$type": "color",
    "$value": "#00e8cf",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.teal.400}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.teal!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "teal!"
    },
    "path": [
      "color",
      "decorative",
      "teal!"
    ],
    "key": "{color.decorative.teal!}"
  },
  "hpe.color.decorative.blue!": {
    "$type": "color",
    "$value": "#00739d",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.blue.700}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.blue!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "blue!"
    },
    "path": [
      "color",
      "decorative",
      "blue!"
    ],
    "key": "{color.decorative.blue!}"
  },
  "hpe.color.decorative.red!": {
    "$type": "color",
    "$value": "#c54e4b",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.red.750}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.red!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "red!"
    },
    "path": [
      "color",
      "decorative",
      "red!"
    ],
    "key": "{color.decorative.red!}"
  },
  "hpe.color.decorative.orange!": {
    "$type": "color",
    "$value": "#ff8300",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.orange.500}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.orange!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "orange!"
    },
    "path": [
      "color",
      "decorative",
      "orange!"
    ],
    "key": "{color.decorative.orange!}"
  },
  "hpe.color.decorative.yellow!": {
    "$type": "color",
    "$value": "#fec901",
    "$description": "Use for decorative purposes when color has no specific meaning.",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "ALL_SCOPES"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.yellow.400}",
      "$description": "Use for decorative purposes when color has no specific meaning.",
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
    "name": "hpe.color.decorative.yellow!",
    "attributes": {
      "category": "color",
      "type": "decorative",
      "item": "yellow!"
    },
    "path": [
      "color",
      "decorative",
      "yellow!"
    ],
    "key": "{color.decorative.yellow!}"
  },
  "hpe.color.dataVis.categorical.10": {
    "$type": "color",
    "$value": "#01a982",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.green1}",
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
    "name": "hpe.color.dataVis.categorical.10",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "10"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "10"
    ],
    "key": "{color.dataVis.categorical.10}"
  },
  "hpe.color.dataVis.categorical.20": {
    "$type": "color",
    "$value": "#00384d",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.darkblue1}",
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
    "name": "hpe.color.dataVis.categorical.20",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "20"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "20"
    ],
    "key": "{color.dataVis.categorical.20}"
  },
  "hpe.color.dataVis.categorical.30": {
    "$type": "color",
    "$value": "#bd8d09",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.gold1}",
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
    "name": "hpe.color.dataVis.categorical.30",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "30"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "30"
    ],
    "key": "{color.dataVis.categorical.30}"
  },
  "hpe.color.dataVis.categorical.40": {
    "$type": "color",
    "$value": "#7022ec",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.purple1}",
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
    "name": "hpe.color.dataVis.categorical.40",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "40"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "40"
    ],
    "key": "{color.dataVis.categorical.40}"
  },
  "hpe.color.dataVis.categorical.50": {
    "$type": "color",
    "$value": "#3e92cc",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.lightblue1}",
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
    "name": "hpe.color.dataVis.categorical.50",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "50"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "50"
    ],
    "key": "{color.dataVis.categorical.50}"
  },
  "hpe.color.dataVis.categorical.60": {
    "$type": "color",
    "$value": "#a70179",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.pink1}",
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
    "name": "hpe.color.dataVis.categorical.60",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "60"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "60"
    ],
    "key": "{color.dataVis.categorical.60}"
  },
  "hpe.color.dataVis.categorical.70": {
    "$type": "color",
    "$value": "#01609f",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.blue1}",
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
    "name": "hpe.color.dataVis.categorical.70",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "70"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "70"
    ],
    "key": "{color.dataVis.categorical.70}"
  },
  "hpe.color.dataVis.categorical.80": {
    "$type": "color",
    "$value": "#7800a7",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.dataVis.grape1}",
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
    "name": "hpe.color.dataVis.categorical.80",
    "attributes": {
      "category": "color",
      "type": "dataVis",
      "item": "categorical",
      "subitem": "80"
    },
    "path": [
      "color",
      "dataVis",
      "categorical",
      "80"
    ],
    "key": "{color.dataVis.categorical.80}"
  },
  "hpe.color.transparent": {
    "$type": "color",
    "$value": "rgba(0, 0, 0, 0)",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "#00000000",
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
    "name": "hpe.color.transparent",
    "attributes": {
      "category": "color",
      "type": "transparent"
    },
    "path": [
      "color",
      "transparent"
    ],
    "key": "{color.transparent}"
  },
  "hpe.color.focus": {
    "$type": "color",
    "$value": "#00e8cf",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.teal.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.focus",
    "attributes": {
      "category": "color",
      "type": "focus"
    },
    "path": [
      "color",
      "focus"
    ],
    "key": "{color.focus}"
  },
  "hpe.color.foreground.primary": {
    "$type": "color",
    "$value": "#01a982",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.foreground.primary",
    "attributes": {
      "category": "color",
      "type": "foreground",
      "item": "primary"
    },
    "path": [
      "color",
      "foreground",
      "primary"
    ],
    "key": "{color.foreground.primary}"
  },
  "hpe.color.foreground.critical": {
    "$type": "color",
    "$value": "#ec3331",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.red.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.foreground.critical",
    "attributes": {
      "category": "color",
      "type": "foreground",
      "item": "critical"
    },
    "path": [
      "color",
      "foreground",
      "critical"
    ],
    "key": "{color.foreground.critical}"
  },
  "hpe.color.foreground.warning": {
    "$type": "color",
    "$value": "#d36d00",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.orange.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.foreground.warning",
    "attributes": {
      "category": "color",
      "type": "foreground",
      "item": "warning"
    },
    "path": [
      "color",
      "foreground",
      "warning"
    ],
    "key": "{color.foreground.warning}"
  },
  "hpe.color.foreground.unknown": {
    "$type": "color",
    "$value": "#8c8c8c",
    "$description": "",
    "$extensions": {
      "com.figma": {
        "hiddenFromPublishing": false,
        "scopes": [
          "FRAME_FILL",
          "SHAPE_FILL",
          "STROKE_COLOR"
        ],
        "codeSyntax": {}
      }
    },
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "color",
      "$value": "{base.color.grey.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FRAME_FILL",
            "SHAPE_FILL",
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      }
    },
    "name": "hpe.color.foreground.unknown",
    "attributes": {
      "category": "color",
      "type": "foreground",
      "item": "unknown"
    },
    "path": [
      "color",
      "foreground",
      "unknown"
    ],
    "key": "{color.foreground.unknown}"
  },
  "hpe.shadow.small": {
    "$type": "shadow",
    "$value": "0 4px 4px rgba(0, 0, 0, 0.12) ",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": 0,
          "offsetY": "{base.dimension.100}",
          "blur": "{base.dimension.100}",
          "spread": 0,
          "color": "{base.color.black.opacity12}"
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
    "name": "hpe.shadow.small",
    "attributes": {
      "category": "shadow",
      "type": "small"
    },
    "path": [
      "shadow",
      "small"
    ],
    "key": "{shadow.small}"
  },
  "hpe.shadow.medium": {
    "$type": "shadow",
    "$value": "0px 6px 12px 0px rgba(0, 0, 0, 0.12) ",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "{static.spacing.none}",
          "offsetY": "{static.spacing.xsmall}",
          "blur": "{static.spacing.small}",
          "spread": "{static.spacing.none}",
          "color": "{base.color.black.opacity12}"
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
    "name": "hpe.shadow.medium",
    "attributes": {
      "category": "shadow",
      "type": "medium"
    },
    "path": [
      "shadow",
      "medium"
    ],
    "key": "{shadow.medium}"
  },
  "hpe.shadow.large": {
    "$type": "shadow",
    "$value": "0px 12px 24px 0px rgba(0, 0, 0, 0.24) ",
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
    "filePath": "tokens/semantic/color.light.json",
    "isSource": true,
    "original": {
      "$type": "shadow",
      "$value": [
        {
          "offsetX": "{static.spacing.none}",
          "offsetY": "{static.spacing.small}",
          "blur": "{static.spacing.medium}",
          "spread": "{static.spacing.none}",
          "color": "{base.color.black.opacity24}"
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
    "name": "hpe.shadow.large",
    "attributes": {
      "category": "shadow",
      "type": "large"
    },
    "path": [
      "shadow",
      "large"
    ],
    "key": "{shadow.large}"
  }
}
