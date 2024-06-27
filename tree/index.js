export default {
  "dark": {
    "color.background.default": {
      "$type": "color",
      "$value": "{base.color.grey.1300}",
      "$description": "Default color for component backgrounds in the default/enabled state. Can also be used for page background.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.default.backgroundColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.hover.backgroundColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.focus.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.hover": {
      "$type": "color",
      "$value": "{base.color.white.opacity6}",
      "$description": "Standard hover state color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.hover.background",
          "mode": "default"
        },
        {
          "name": "test.select.option.hover.background",
          "mode": "default"
        }
      ]
    },
    "color.background.active": {
      "$type": "color",
      "$value": "{base.color.white.opacity6}",
      "$description": "Standard active state color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.disabled": {
      "$type": "color",
      "$value": "{base.color.white.opacity12}",
      "$description": "Disabled background color. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.background",
          "mode": "default"
        },
        {
          "name": "test.select.option.disabled.background",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.disabled.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.back": {
      "$type": "color",
      "$value": "{base.color.grey.1300}",
      "$description": "Elevation level 0. Typically used for the page colour. color.background.back creates a contrasted page backdrop for components to sit on. It’s useful to make components stand out on pages that use it. The nature of back is that it forms a contrast with any foreground component.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.readOnly.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.front": {
      "$type": "color",
      "$value": "{base.color.grey.1200}",
      "$description": "Elevation level 1. Lowest level of elevation for container/surfaces that sit directly on top of the page. Example: container that houses a data table.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.switch.selected.knob.background",
          "mode": "default"
        }
      ]
    },
    "color.background.raised": {
      "$type": "color",
      "$value": "{TBD}",
      "$description": "Elevation level 2. Used for raised components, that can sit on top of both background.back or background.front. Example: cards.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.floating": {
      "$type": "color",
      "$value": "{TBD}",
      "$description": "Elevation level 3. The highest level of elevation for elements that sit above everything else. Example: dropdowns, layer, side drawers and floating buttons.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.drop.background",
          "mode": "default"
        }
      ]
    },
    "color.background.contrast": {
      "$type": "color",
      "$value": "{base.color.white.opacity6}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.background.validation.critical": {
      "$type": "color",
      "$value": "{base.color.red.800-Opacity30}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.validation.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.validation.info": {
      "$type": "color",
      "$value": "{base.color.blue.400-Opacity12}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.unknown": {
      "$type": "color",
      "$value": "{base.color.grey.1200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.ok": {
      "$type": "color",
      "$value": "{base.color.green.500-Opacity30}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.warning": {
      "$type": "color",
      "$value": "{base.color.yellow.400-Opacity12}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.primary.hover": {
      "$type": "color",
      "$value": "{TBD}",
      "$description": "Hover color variant of the primary color.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.primary.default": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "The default primary color of components at a rest/ enabled state. The term ‘primary’ denoting hierarchy - the most important thing. Use to style components prominently and give greater visual hierarchy.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "button.primary.enabled.background",
          "mode": "default"
        }
      ]
    },
    "color.background.selected.strong": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Selected (or checked) colour. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.checkbox.selected.check.background",
          "mode": "default"
        },
        {
          "name": "test.switch.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.background.selected.weak": {
      "$type": "color",
      "$value": "{base.color.green.1000}",
      "$description": "Lower emphasis variant of selected colour. Use if selection colour needs to be less prominent.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.select.option.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.border.strong": {
      "$type": "color",
      "$value": "{base.color.white.opacity72}",
      "$description": "Stronger border color for added emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.validation.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.readOnly.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.hover.check.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.hover.knob.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.default": {
      "$type": "color",
      "$value": "{base.color.white.opacity36}",
      "$description": "Default border colour",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.toolbar.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.default.borderColor",
          "mode": "default"
        },
        {
          "name": "test.headerCell.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.enabled.check.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.enabled.knob.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.weak": {
      "$type": "color",
      "$value": "{base.color.white.opacity12}",
      "$description": "Weaker border color for reduced emphasis",
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
    "color.border.disabled": {
      "$type": "color",
      "$value": "{base.color.white.opacity20}",
      "$description": "Disabled colour for borders. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.disabled.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.selected": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Selected (or checked) colour. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggles, active tabs.",
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
    "color.text.default": {
      "$type": "color",
      "$value": "{base.color.white.100}",
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
      "usedBy": [
        {
          "name": "test.input.text.error.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.info.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.description.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.valueText.color",
          "mode": "default"
        }
      ]
    },
    "color.text.strong": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Stronger text color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.selected.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.selected.iconColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.hover.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.selected.textColor",
          "mode": "default"
        },
        {
          "name": "test.input.text.label.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.helpText.color",
          "mode": "default"
        },
        {
          "name": "test.dataCell.enabled.color",
          "mode": "default"
        },
        {
          "name": "test.headerCell.color",
          "mode": "default"
        }
      ]
    },
    "color.text.weak": {
      "$type": "color",
      "$value": "{base.color.white.opacity50}",
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
      "usedBy": [
        {
          "name": "test.input.text.placeholder.color",
          "mode": "default"
        }
      ]
    },
    "color.text.xweak": {
      "$type": "color",
      "$value": "{base.color.white.opacity20}",
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
    "color.text.disabled": {
      "$type": "color",
      "$value": "{TBD}",
      "$description": "Disabled color for text. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.input.text.disabled.color",
          "mode": "default"
        }
      ]
    },
    "color.text.onPrimary": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Text color to be used for text sitting on a primary colour (for example a background styled with the primary color). This text and background pairing helps ensure accessibility. Furthermore, it enables precise theming updates and allows easier maintenance of colours, where if the primary colour changes, we can update color.text.onPrimary to be accessible on the new primary colour.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.hover.textColor",
          "mode": "default"
        }
      ]
    },
    "color.text.brand": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Brand text color. Use with caution. Currently not accessible for text that is below a bold weight and below 19px.",
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
    "color.icon.default": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Default icon colour that is accessible on standard background colours",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.strong": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Stronger icon color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.enabled.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.weak": {
      "$type": "color",
      "$value": "{base.color.white.opacity50}",
      "$description": "Weaker icon color for reduced emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.xweak": {
      "$type": "color",
      "$value": "{base.color.white.opacity20}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.disabled": {
      "$type": "color",
      "$value": "{base.color.white.opacity36}",
      "$description": "Disabled colour for icons. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.critical": {
      "$type": "color",
      "$value": "{base.color.red.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.info": {
      "$type": "color",
      "$value": "{base.color.blue.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.ok": {
      "$type": "color",
      "$value": "{base.color.green.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.warning": {
      "$type": "color",
      "$value": "{base.color.orange.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.unknown": {
      "$type": "color",
      "$value": "{base.color.grey.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.onPrimary": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Icon colour to be used when text sits on primary colour (for example a background styled with the primary color). This text and background pairing ensures text used on primary is accessible. Furthermore, it enables precise theming updates and allows for easier maintenance of colours, where if the primary colour changes, we can update color.text.onPrimary to be accessible on the new primary colour.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.primary.hover.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.brand": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Brand color for icons.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.decorative.green": {
      "$type": "color",
      "$value": "{base.color.green.700}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.purple": {
      "$type": "color",
      "$value": "{base.color.purple.900}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.turquoise": {
      "$type": "color",
      "$value": "{base.color.turquoise.700}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.blue": {
      "$type": "color",
      "$value": "{base.color.blue.700}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.red": {
      "$type": "color",
      "$value": "{base.color.red.850}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.orange": {
      "$type": "color",
      "$value": "{base.color.orange.700}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.yellow": {
      "$type": "color",
      "$value": "{base.color.yellow.700}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.dataVis.categorical.10": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.20": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.30": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.40": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.50": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.60": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.70": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.10Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.20Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.30weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.40Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.50Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.60Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    "color.dataVis.categorical.70Weak": {
      "$type": "color",
      "$value": "{TBD}",
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
    }
  },
  "light": {
    "color.background.default": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Default color for component backgrounds in the default/enabled state. Can also be used for page background.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.default.backgroundColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.hover.backgroundColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.focus.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.hover": {
      "$type": "color",
      "$value": "{color.background.contrast}",
      "$description": "Standard hover state color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.active",
          "mode": "light"
        },
        {
          "name": "button.default.hover.background",
          "mode": "default"
        },
        {
          "name": "test.select.option.hover.background",
          "mode": "default"
        }
      ]
    },
    "color.background.active": {
      "$type": "color",
      "$value": "{color.background.hover}",
      "$description": "Standard active state color",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.disabled": {
      "$type": "color",
      "$value": "{base.color.black.opacity4}",
      "$description": "Disabled background color. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.background",
          "mode": "default"
        },
        {
          "name": "test.select.option.disabled.background",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.disabled.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.back": {
      "$type": "color",
      "$value": "{base.color.grey.50}",
      "$description": "Elevation level 0. Typically used for the page colour. color.background.back creates a contrasted page backdrop for components to sit on. It’s useful to make components stand out on pages that use it. The nature of back is that it forms a contrast with any foreground component.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.readOnly.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.front": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Elevation level 1. Lowest level of elevation for container/surfaces that sit directly on top of the page. Example: container that houses a data table.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.switch.selected.knob.background",
          "mode": "default"
        }
      ]
    },
    "color.background.raised": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Elevation level 2. Used for raised components, that can sit on top of both background.back or background.front. Example: cards.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.floating": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Elevation level 3. The highest level of elevation for elements that sit above everything else. Example: dropdowns, layer, side drawers and floating buttons.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.drop.background",
          "mode": "default"
        }
      ]
    },
    "color.background.contrast": {
      "$type": "color",
      "$value": "{base.color.black.opacity4}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.hover",
          "mode": "light"
        },
        {
          "name": "button.default.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.background.validation.critical": {
      "$type": "color",
      "$value": "{base.color.red.500-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.validation.backgroundColor",
          "mode": "default"
        }
      ]
    },
    "color.background.validation.info": {
      "$type": "color",
      "$value": "{base.color.blue.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.unknown": {
      "$type": "color",
      "$value": "{base.color.grey.50}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.ok": {
      "$type": "color",
      "$value": "{base.color.green.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.validation.warning": {
      "$type": "color",
      "$value": "{base.color.orange.400-Opacity24}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.primary.hover": {
      "$type": "color",
      "$value": "{TBD}",
      "$description": "Hover color variant of the primary color.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.background.primary.default": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "The default primary color of components at a rest/ enabled state. The term ‘primary’ denoting hierarchy - the most important thing. Use to style components prominently and give greater visual hierarchy.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "button.primary.enabled.background",
          "mode": "default"
        }
      ]
    },
    "color.background.selected.strong": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Selected (or checked) colour. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggle, active tabs.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.checkbox.selected.check.background",
          "mode": "default"
        },
        {
          "name": "test.switch.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.background.selected.weak": {
      "$type": "color",
      "$value": "{base.color.green.100}",
      "$description": "Lower emphasis variant of selected colour. Use if selection colour needs to be less prominent.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.select.option.selected.background",
          "mode": "default"
        }
      ]
    },
    "color.border.strong": {
      "$type": "color",
      "$value": "{base.color.black.opacity72}",
      "$description": "Stronger border color for added emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.validation.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.readOnly.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.hover.check.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.hover.knob.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.default": {
      "$type": "color",
      "$value": "{base.color.black.opacity36}",
      "$description": "Default border colour",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.toolbar.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.default.borderColor",
          "mode": "default"
        },
        {
          "name": "test.headerCell.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.checkbox.enabled.check.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "test.switch.enabled.knob.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.weak": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Weaker border color for reduced emphasis",
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
    "color.border.disabled": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Disabled colour for borders. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "test.input.fieldContainer.disabled.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.selected": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Selected (or checked) colour. Used for ‘selected’ state. Examples include, checked checkboxes, checked radios, on toggles, active tabs.",
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
    "color.text.default": {
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
      },
      "usedBy": [
        {
          "name": "test.input.text.error.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.info.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.description.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.valueText.color",
          "mode": "default"
        }
      ]
    },
    "color.text.strong": {
      "$type": "color",
      "$value": "{base.color.grey.1000}",
      "$description": "Stronger text color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.selected.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.selected.iconColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.hover.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.selected.textColor",
          "mode": "default"
        },
        {
          "name": "test.input.text.label.color",
          "mode": "default"
        },
        {
          "name": "test.input.text.helpText.color",
          "mode": "default"
        },
        {
          "name": "test.dataCell.enabled.color",
          "mode": "default"
        },
        {
          "name": "test.headerCell.color",
          "mode": "default"
        }
      ]
    },
    "color.text.weak": {
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
      },
      "usedBy": [
        {
          "name": "test.input.text.placeholder.color",
          "mode": "default"
        }
      ]
    },
    "color.text.xweak": {
      "$type": "color",
      "$value": "{base.color.grey.500}",
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
    "color.text.disabled": {
      "$type": "color",
      "$value": "{base.color.black.opacity24}",
      "$description": "Disabled color for text. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.select.option.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "test.input.text.disabled.color",
          "mode": "default"
        }
      ]
    },
    "color.text.onPrimary": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Text color to be used for text sitting on a primary colour (for example a background styled with the primary color). This text and background pairing helps ensure accessibility. Furthermore, it enables precise theming updates and allows easier maintenance of colours, where if the primary colour changes, we can update color.text.onPrimary to be accessible on the new primary colour.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "TEXT_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.hover.textColor",
          "mode": "default"
        }
      ]
    },
    "color.text.brand": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Brand text color. Use with caution. Currently not accessible for text that is below a bold weight and below 19px.",
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
    "color.icon.default": {
      "$type": "color",
      "$value": "{base.color.grey.800}",
      "$description": "Default icon colour that is accessible on standard background colours",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.strong": {
      "$type": "color",
      "$value": "{base.color.grey.1000}",
      "$description": "Stronger icon color for added prominence",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.default.enabled.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.weak": {
      "$type": "color",
      "$value": "{base.color.grey.700}",
      "$description": "Weaker icon color for reduced emphasis",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.xweak": {
      "$type": "color",
      "$value": "{base.color.grey.500}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.disabled": {
      "$type": "color",
      "$value": "{base.color.black.opacity24}",
      "$description": "Disabled colour for icons. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.disabled.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.critical": {
      "$type": "color",
      "$value": "{base.color.red.550}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.info": {
      "$type": "color",
      "$value": "{base.color.blue.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.ok": {
      "$type": "color",
      "$value": "{base.color.green.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.warning": {
      "$type": "color",
      "$value": "{base.color.orange.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.unknown": {
      "$type": "color",
      "$value": "{base.color.grey.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.icon.onPrimary": {
      "$type": "color",
      "$value": "{base.color.white.100}",
      "$description": "Icon colour to be used when text sits on primary colour (for example a background styled with the primary color). This text and background pairing ensures text used on primary is accessible. Furthermore, it enables precise theming updates and allows for easier maintenance of colours, where if the primary colour changes, we can update color.text.onPrimary to be accessible on the new primary colour.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.primary.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.primary.hover.iconColor",
          "mode": "default"
        }
      ]
    },
    "color.icon.brand": {
      "$type": "color",
      "$value": "{base.color.green.600}",
      "$description": "Brand color for icons.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR",
            "SHAPE_FILL",
            "FRAME_FILL"
          ],
          "codeSyntax": {}
        }
      }
    },
    "color.decorative.green": {
      "$type": "color",
      "$value": "{base.color.green.400}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.purple": {
      "$type": "color",
      "$value": "{base.color.purple.500}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.turquoise": {
      "$type": "color",
      "$value": "{base.color.turquoise.200}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.blue": {
      "$type": "color",
      "$value": "{base.color.blue.400}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.red": {
      "$type": "color",
      "$value": "{base.color.red.500}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.orange": {
      "$type": "color",
      "$value": "{base.color.orange.400}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.decorative.yellow": {
      "$type": "color",
      "$value": "{base.color.yellow.200}",
      "$description": "Use for decorative purposes when colour has no specific meaning.",
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
    "color.dataVis.categorical.10": {
      "$type": "color",
      "$value": "{base.color.blue.700}",
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
    "color.dataVis.categorical.20": {
      "$type": "color",
      "$value": "{base.color.orange.500}",
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
    "color.dataVis.categorical.30": {
      "$type": "color",
      "$value": "{base.color.purple.800}",
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
    "color.dataVis.categorical.40": {
      "$type": "color",
      "$value": "{base.color.turquoise.200}",
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
    "color.dataVis.categorical.50": {
      "$type": "color",
      "$value": "{base.color.yellow.300}",
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
    "color.dataVis.categorical.60": {
      "$type": "color",
      "$value": "{base.color.purple.500}",
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
    "color.dataVis.categorical.70": {
      "$type": "color",
      "$value": "{base.color.blue.400}",
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
    "color.dataVis.categorical.10Weak": {
      "$type": "color",
      "$value": "{base.color.blue.700-Opacity12}",
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
    "color.dataVis.categorical.20Weak": {
      "$type": "color",
      "$value": "{base.color.orange.500-Opacity12}",
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
    "color.dataVis.categorical.30weak": {
      "$type": "color",
      "$value": "{base.color.purple.800-Opacity12}",
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
    "color.dataVis.categorical.40Weak": {
      "$type": "color",
      "$value": "{base.color.turquoise.200-Opacity12}",
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
    "color.dataVis.categorical.50Weak": {
      "$type": "color",
      "$value": "{base.color.yellow.300-Opacity12}",
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
    "color.dataVis.categorical.60Weak": {
      "$type": "color",
      "$value": "{base.color.purple.500-Opacity12}",
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
    "color.dataVis.categorical.70Weak": {
      "$type": "color",
      "$value": "{base.color.blue.400-Opacity12}",
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
    }
  },
  "default": {
    "archived.button.medium.default.paddingX": {
      "$type": "number",
      "$value": 16,
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
    "archived.button.medium.default.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.100}",
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
    "archived.button.medium.default.borderRadius": {
      "$type": "number",
      "$value": 1000,
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
    "archived.button.medium.default.borderWidth": {
      "$type": "number",
      "$value": "{static.border.small}",
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
    "archived.button.medium.default.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.900}",
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
    "archived.button.medium.default.fontSize": {
      "$type": "number",
      "$value": 19,
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
    "archived.button.medium.default.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "archived.button.medium.default.gapX": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "archived.button.medium.default.enabled.paddingX": {
      "$type": "number",
      "$value": 18,
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
    "archived.button.medium.default.enabled.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.100}",
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
    "archived.button.medium.default.enabled.borderRadius": {
      "$type": "number",
      "$value": 1000,
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
    "archived.button.medium.default.enabled.borderWidth": {
      "$type": "number",
      "$value": "{static.border.small}",
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
    "archived.button.medium.default.enabled.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.900}",
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
    "archived.button.medium.default.enabled.fontSize": {
      "$type": "number",
      "$value": 19,
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
    "archived.button.medium.default.enabled.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "archived.button.medium.default.enabled.gapX": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "archived.button.medium.default.disabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.default.disabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.default.disabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.default.disabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.default.disabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.default.disabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.default.disabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.default.disabled.gapX": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "archived.button.medium.default.hover.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.default.hover.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.default.hover.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.default.hover.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.default.hover.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.default.hover.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.default.hover.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.default.hover.gapX": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "archived.button.medium.default.selected.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.default.selected.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.default.selected.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.default.selected.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.default.selected.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.default.selected.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.default.selected.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.default.selected.gapX": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "archived.button.medium.primary.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.paddingX}",
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
    "archived.button.medium.primary.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.paddingY}",
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
    "archived.button.medium.primary.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.borderRadius}",
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
    "archived.button.medium.primary.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.borderWidth}",
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
    "archived.button.medium.primary.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.minHeight}",
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
    "archived.button.medium.primary.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.fontSize}",
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
    "archived.button.medium.primary.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.lineHeight}",
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
    "archived.button.medium.primary.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.gapX}",
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
    "archived.button.medium.primary.enabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.primary.enabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.primary.enabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.primary.enabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.primary.enabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.primary.enabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.primary.enabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.primary.enabled.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.gapX}",
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
    "archived.button.medium.primary.disabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.primary.disabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.primary.disabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.primary.disabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.primary.disabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.primary.disabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.primary.disabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.primary.disabled.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.gapX}",
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
    "archived.button.medium.primary.hover.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.primary.hover.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.primary.hover.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.primary.hover.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.primary.hover.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.primary.hover.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.primary.hover.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.primary.hover.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.gapX}",
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
    "archived.button.medium.primary.selected.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.primary.selected.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.primary.selected.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.primary.selected.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.primary.selected.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.primary.selected.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.primary.selected.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.primary.selected.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.gapX}",
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
    "archived.button.medium.secondary.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.paddingX}",
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
    "archived.button.medium.secondary.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.paddingY}",
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
    "archived.button.medium.secondary.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.borderRadius}",
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
    "archived.button.medium.secondary.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.borderWidth}",
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
    "archived.button.medium.secondary.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.minHeight}",
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
    "archived.button.medium.secondary.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.fontSize}",
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
    "archived.button.medium.secondary.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.lineHeight}",
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
    "archived.button.medium.secondary.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.gapX}",
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
    "archived.button.medium.secondary.enabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.secondary.enabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.secondary.enabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.secondary.enabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.secondary.enabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.secondary.enabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.secondary.enabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.secondary.disabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.secondary.disabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.secondary.disabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.secondary.disabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.secondary.disabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.secondary.disabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.secondary.disabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.secondary.hover.borderWidth": {
      "$type": "number",
      "$value": 3,
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
    "archived.button.medium.secondary.hover.paddingX": {
      "$type": "number",
      "$value": 17,
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
    "archived.button.medium.secondary.hover.paddingY": {
      "$type": "number",
      "$value": 3,
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
    "archived.button.medium.secondary.hover.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
          ],
          "codeSyntax": {}
        }
      }
    },
    "archived.button.medium.secondary.hover.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
          ],
          "codeSyntax": {}
        }
      }
    },
    "archived.button.medium.secondary.hover.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.secondary.hover.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.secondary.selected.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.secondary.selected.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.secondary.selected.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderRadius}",
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
    "archived.button.medium.secondary.selected.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.borderWidth}",
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
    "archived.button.medium.secondary.selected.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.secondary.selected.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.secondary.selected.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.toolbar.paddingX": {
      "$type": "number",
      "$value": 6,
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
    "archived.button.medium.toolbar.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.paddingY}",
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
    "archived.button.medium.toolbar.borderRadius": {
      "$type": "number",
      "$value": 6,
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
    "archived.button.medium.toolbar.borderWidth": {
      "$type": "number",
      "$value": 1,
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
    "archived.button.medium.toolbar.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.minHeight}",
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
    "archived.button.medium.toolbar.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.fontSize}",
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
    "archived.button.medium.toolbar.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.lineHeight}",
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
    "archived.button.medium.toolbar.gapX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.gapX}",
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
    "archived.button.medium.toolbar.enabled.paddingX": {
      "$type": "number",
      "$value": 6,
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
    "archived.button.medium.toolbar.enabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.toolbar.enabled.borderRadius": {
      "$type": "number",
      "$value": 6,
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
    "archived.button.medium.toolbar.enabled.borderWidth": {
      "$type": "number",
      "$value": 1,
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
    "archived.button.medium.toolbar.enabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.toolbar.enabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.toolbar.enabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.toolbar.disabled.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.toolbar.disabled.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.toolbar.disabled.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderRadius}",
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
    "archived.button.medium.toolbar.disabled.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderWidth}",
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
    "archived.button.medium.toolbar.disabled.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.toolbar.disabled.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.toolbar.disabled.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.toolbar.hover.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.toolbar.hover.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.toolbar.hover.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderRadius}",
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
    "archived.button.medium.toolbar.hover.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderWidth}",
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
    "archived.button.medium.toolbar.hover.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.toolbar.hover.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.toolbar.hover.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "archived.button.medium.toolbar.selected.paddingX": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingX}",
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
    "archived.button.medium.toolbar.selected.paddingY": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.paddingY}",
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
    "archived.button.medium.toolbar.selected.borderRadius": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderRadius}",
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
    "archived.button.medium.toolbar.selected.borderWidth": {
      "$type": "number",
      "$value": "{archived.button.medium.toolbar.enabled.borderWidth}",
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
    "archived.button.medium.toolbar.selected.minHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.minHeight}",
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
    "archived.button.medium.toolbar.selected.fontSize": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.fontSize}",
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
    "archived.button.medium.toolbar.selected.lineHeight": {
      "$type": "number",
      "$value": "{archived.button.medium.default.enabled.lineHeight}",
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
    "button.default.enabled.background": {
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
    "button.default.enabled.borderColor": {
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
    "button.default.enabled.textColor": {
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
    "button.default.enabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.strong}",
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
    "button.default.disabled.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.default.disabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.default.disabled.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.default.disabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.default.hover.background": {
      "$type": "color",
      "$value": "{color.background.hover}",
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
    "button.default.hover.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.default.hover.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.default.hover.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.default.selected.background": {
      "$type": "color",
      "$value": "{color.background.contrast}",
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
    "button.default.selected.borderColor": {
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
    "button.default.selected.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.default.selected.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.secondary.enabled.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.secondary.enabled.borderColor": {
      "$type": "color",
      "$value": "{color.background.primary.default}",
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
    "button.secondary.enabled.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.secondary.enabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.secondary.disabled.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.secondary.disabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.secondary.disabled.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.secondary.disabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.secondary.hover.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.secondary.hover.borderColor": {
      "$type": "color",
      "$value": "{base.color.green.700}",
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
    "button.secondary.hover.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.secondary.hover.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.secondary.selected.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.secondary.selected.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.secondary.selected.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.secondary.selected.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.primary.enabled.background": {
      "$type": "color",
      "$value": "{color.background.primary.default}",
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
    "button.primary.enabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.primary.enabled.textColor": {
      "$type": "color",
      "$value": "{color.text.onPrimary}",
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
    "button.primary.enabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.onPrimary}",
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
    "button.primary.disabled.background": {
      "$type": "color",
      "$value": "{color.background.disabled}",
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
    "button.primary.disabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.primary.disabled.textColor": {
      "$type": "color",
      "$value": "{color.text.disabled}",
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
    "button.primary.disabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.disabled}",
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
    "button.primary.hover.background": {
      "$type": "color",
      "$value": "{button.primary.enabled.background}",
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
    "button.primary.hover.borderColor": {
      "$type": "color",
      "$value": "{button.primary.enabled.borderColor}",
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
    "button.primary.hover.textColor": {
      "$type": "color",
      "$value": "{color.text.onPrimary}",
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
    "button.primary.hover.iconColor": {
      "$type": "color",
      "$value": "{color.icon.onPrimary}",
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
    "button.primary.selected.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.primary.selected.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.primary.selected.textColor": {
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
    "button.primary.selected.iconColor": {
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
    "button.toolbar.enabled.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.toolbar.enabled.borderColor": {
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
    "button.toolbar.enabled.textColor": {
      "$type": "color",
      "$value": "{button.default.enabled.textColor}",
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
    "button.toolbar.enabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.enabled.iconColor}",
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
    "button.toolbar.disabled.background": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.background}",
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
    "button.toolbar.disabled.borderColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.borderColor}",
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
    "button.toolbar.disabled.textColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.textColor}",
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
    "button.toolbar.disabled.iconColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.iconColor}",
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
    "button.toolbar.hover.background": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.background}",
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
    "button.toolbar.hover.borderColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.borderColor}",
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
    "button.toolbar.hover.textColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.textColor}",
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
    "button.toolbar.hover.iconColor": {
      "$type": "color",
      "$value": "{button.toolbar.enabled.iconColor}",
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
    "button.toolbar.selected.background": {
      "$type": "color",
      "$value": "#ffffff",
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
    "button.toolbar.selected.borderColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "button.toolbar.selected.textColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "button.toolbar.selected.iconColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "button.medium.Color": {
      "$type": "color",
      "$value": "#ffffff",
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
    "button.medium.default.paddingX": {
      "$type": "number",
      "$value": 18,
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
    "button.medium.default.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.100}",
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
    "button.medium.default.borderRadius": {
      "$type": "number",
      "$value": "{radius.full}",
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
    "button.medium.default.borderWidth": {
      "$type": "number",
      "$value": "{static.border.small}",
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
    "button.medium.default.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.900}",
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
    "button.medium.default.fontSize": {
      "$type": "number",
      "$value": 19,
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
    "button.medium.default.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "button.medium.default.gapX": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "button.medium.primary.paddingX": {
      "$type": "number",
      "$value": "{button.medium.default.paddingX}",
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
    "button.medium.primary.paddingY": {
      "$type": "number",
      "$value": "{button.medium.default.paddingY}",
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
    "button.medium.primary.borderRadius": {
      "$type": "number",
      "$value": "{button.medium.default.borderRadius}",
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
    "button.medium.primary.borderWidth": {
      "$type": "number",
      "$value": "{button.medium.default.borderWidth}",
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
    "button.medium.primary.minHeight": {
      "$type": "number",
      "$value": "{button.medium.default.minHeight}",
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
    "button.medium.primary.fontSize": {
      "$type": "number",
      "$value": "{button.medium.default.fontSize}",
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
    "button.medium.primary.lineHeight": {
      "$type": "number",
      "$value": "{button.medium.default.lineHeight}",
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
    "button.medium.primary.gapX": {
      "$type": "number",
      "$value": "{button.medium.default.gapX}",
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
    "button.medium.secondary.paddingX": {
      "$type": "number",
      "$value": "{button.medium.default.paddingX}",
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
    "button.medium.secondary.paddingY": {
      "$type": "number",
      "$value": "{button.medium.default.paddingY}",
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
    "button.medium.secondary.borderRadius": {
      "$type": "number",
      "$value": "{button.medium.default.borderRadius}",
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
    "button.medium.secondary.borderWidth": {
      "$type": "number",
      "$value": "{button.medium.default.borderWidth}",
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
    "button.medium.secondary.minHeight": {
      "$type": "number",
      "$value": "{button.medium.default.minHeight}",
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
    "button.medium.secondary.fontSize": {
      "$type": "number",
      "$value": "{button.medium.default.fontSize}",
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
    "button.medium.secondary.lineHeight": {
      "$type": "number",
      "$value": "{button.medium.default.lineHeight}",
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
    "button.medium.secondary.gapX": {
      "$type": "number",
      "$value": "{button.medium.default.gapX}",
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
    "button.medium.toolbar.paddingX": {
      "$type": "number",
      "$value": "{base.dimension.150}",
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
    "button.medium.toolbar.paddingY": {
      "$type": "number",
      "$value": "{button.medium.default.paddingY}",
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
    "button.medium.toolbar.borderRadius": {
      "$type": "number",
      "$value": "{static.radius.xsmall}",
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
    "button.medium.toolbar.borderWidth": {
      "$type": "number",
      "$value": "{border.default}",
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
    "button.medium.toolbar.minHeight": {
      "$type": "number",
      "$value": "{button.medium.default.minHeight}",
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
    "button.medium.toolbar.fontSize": {
      "$type": "number",
      "$value": "{button.medium.default.fontSize}",
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
    "button.medium.toolbar.lineHeight": {
      "$type": "number",
      "$value": "{button.medium.default.lineHeight}",
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
    "button.medium.toolbar.gapX": {
      "$type": "number",
      "$value": "{button.medium.default.gapX}",
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
    "focusRing.color": {
      "$type": "color",
      "$value": "{base.color.turquoise.400}",
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
    "test.drop.background": {
      "$type": "color",
      "$value": "{color.background.floating}",
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
    "test.drop.borderRadius": {
      "$type": "number",
      "$value": "{radius.xsmall}",
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
    "test.drop.zIndex": {
      "$type": "number",
      "$value": 0,
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
    "test.menu.item.enabled.background": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.enabled.borderColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.enabled.textColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.enabled.iconColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.hover.background": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.hover.borderColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.hover.textColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.item.hover.iconColor": {
      "$type": "color",
      "$value": "#ffffff",
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
    "test.menu.medium.item.paddingX": {
      "$type": "number",
      "$value": 0,
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
    "test.menu.medium.item.paddingY": {
      "$type": "number",
      "$value": 0,
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
    "test.menu.medium.item.borderRadius": {
      "$type": "number",
      "$value": 0,
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
    "test.menu.medium.item.borderWidth": {
      "$type": "number",
      "$value": 0,
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
    "test.menu.medium.item.minHeight": {
      "$type": "number",
      "$value": 0,
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
    "test.select.medium.option.paddingX": {
      "$type": "number",
      "$value": "{test.input.fieldContainer.medium.paddingX}",
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
    "test.select.medium.option.paddingY": {
      "$type": "number",
      "$value": "{test.input.fieldContainer.medium.paddingY}",
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
    "test.select.medium.option.minHeight": {
      "$type": "number",
      "$value": "{test.input.fieldContainer.medium.minHeight}",
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
    "test.select.medium.option.borderRadius": {
      "$type": "number",
      "$value": "{radius.none}",
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
    "test.select.medium.option.borderWidth": {
      "$type": "number",
      "$value": "{test.input.fieldContainer.medium.borderWidth}",
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
    "test.select.medium.option.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
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
    "test.select.medium.option.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "test.select.option.enabled.background": {
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
    "test.select.option.enabled.borderColor": {
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
    "test.select.option.enabled.textColor": {
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
    "test.select.option.hover.background": {
      "$type": "color",
      "$value": "{color.background.hover}",
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
    "test.select.option.hover.borderColor": {
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
    "test.select.option.hover.textColor": {
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
    "test.select.option.disabled.background": {
      "$type": "color",
      "$value": "{color.background.disabled}",
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
    "test.select.option.disabled.borderColor": {
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
    "test.select.option.disabled.textColor": {
      "$type": "color",
      "$value": "{color.text.disabled}",
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
    "test.select.option.selected.background": {
      "$type": "color",
      "$value": "{color.background.selected.weak}",
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
    "test.select.option.selected.borderColor": {
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
    "test.select.option.selected.textColor": {
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
    "test.input.fieldContainer.default.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.default}",
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
    "test.input.fieldContainer.default.borderColor": {
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
    "test.input.fieldContainer.hover.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.default}",
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
    "test.input.fieldContainer.hover.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.input.fieldContainer.focus.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.default}",
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
    "test.input.fieldContainer.focus.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.input.fieldContainer.validation.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.validation.critical}",
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
    "test.input.fieldContainer.validation.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.input.fieldContainer.disabled.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.disabled}",
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
    "test.input.fieldContainer.disabled.borderColor": {
      "$type": "color",
      "$value": "{color.border.disabled}",
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
    "test.input.fieldContainer.readOnly.backgroundColor": {
      "$type": "color",
      "$value": "{color.background.back}",
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
    "test.input.fieldContainer.readOnly.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.input.fieldContainer.medium.borderRadius": {
      "$type": "number",
      "$value": "{static.radius.xsmall}",
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
    "test.input.fieldContainer.medium.borderWidth": {
      "$type": "number",
      "$value": "{border.default}",
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
    "test.input.fieldContainer.medium.paddingX": {
      "$type": "number",
      "$value": 11,
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
    "test.input.fieldContainer.medium.paddingY": {
      "$type": "number",
      "$value": 5,
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
    "test.input.fieldContainer.medium.gapX": {
      "$type": "number",
      "$value": "{static.spacing.large}",
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
    "test.input.fieldContainer.medium.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.900}",
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
    "test.input.fieldContainer.medium.iconSize": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
    "test.input.fieldContainer.medium.label.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xsmall}",
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
    "test.input.fieldContainer.medium.label.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xsmall}",
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
    "test.input.fieldContainer.medium.label.fontWeight": {
      "$type": "number",
      "$value": "{base.font.weight.medium}",
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
    "test.input.fieldContainer.medium.helpText.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xsmall}",
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
    "test.input.fieldContainer.medium.helpText.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xsmall}",
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
    "test.input.fieldContainer.medium.helpText.fontWeight": {
      "$type": "number",
      "$value": "{base.font.weight.regular}",
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
    "test.input.fieldContainer.medium.placeholder.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
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
    "test.input.fieldContainer.medium.placeholder.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "test.input.fieldContainer.medium.placeholder.fontWeight": {
      "$type": "number",
      "$value": "{base.font.weight.regular}",
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
    "test.input.fieldContainer.medium.valueText.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
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
    "test.input.fieldContainer.medium.valueText.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "test.input.fieldContainer.medium.valueText.fontWeight": {
      "$type": "number",
      "$value": "{base.font.weight.medium}",
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
    "test.input.text.error.color": {
      "$type": "color",
      "$value": "{color.text.default}",
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
    "test.input.text.info.color": {
      "$type": "color",
      "$value": "{color.text.default}",
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
    "test.input.text.disabled.color": {
      "$type": "color",
      "$value": "{color.text.disabled}",
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
    "test.input.text.description.color": {
      "$type": "color",
      "$value": "{color.text.default}",
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
    "test.input.text.label.color": {
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
    "test.input.text.placeholder.color": {
      "$type": "color",
      "$value": "{color.text.weak}",
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
    "test.input.text.valueText.color": {
      "$type": "color",
      "$value": "{color.text.default}",
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
    "test.input.text.helpText.color": {
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
    "test.dataCell.paddingX": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "test.dataCell.paddingY": {
      "$type": "number",
      "$value": "{spacing.xsmall}",
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
    "test.dataCell.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
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
    "test.dataCell.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
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
    "test.dataCell.borderBottomWidth": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
    "test.dataCell.paddingTop": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "test.dataCell.paddingBottom": {
      "$type": "number",
      "$value": 5,
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
    "test.dataCell.enabled.color": {
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
    "test.dataCell.enabled.borderColor": {
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
    "test.dataCell.enabled.background": {
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
    "test.dataCell.hover.color": {
      "$type": "color",
      "$value": "{test.dataCell.enabled.color}",
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
    "test.dataCell.hover.borderColor": {
      "$type": "color",
      "$value": "{test.dataCell.enabled.borderColor}",
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
    "test.dataCell.hover.background": {
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
    "test.dataCell.disabled.color": {
      "$type": "color",
      "$value": "{test.dataCell.enabled.color}",
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
    "test.dataCell.disabled.borderColor": {
      "$type": "color",
      "$value": "{test.dataCell.enabled.borderColor}",
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
    "test.headerCell.paddingX": {
      "$type": "number",
      "$value": "{test.dataCell.paddingX}",
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
    "test.headerCell.paddingY": {
      "$type": "number",
      "$value": "{test.dataCell.paddingY}",
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
    "test.headerCell.fontSize": {
      "$type": "number",
      "$value": "{test.dataCell.fontSize}",
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
    "test.headerCell.lineHeight": {
      "$type": "number",
      "$value": "{test.dataCell.lineHeight}",
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
    "test.headerCell.fontWeight": {
      "$type": "number",
      "$value": "{base.font.weight.medium}",
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
    "test.headerCell.color": {
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
    "test.headerCell.borderBottomWidth": {
      "$type": "number",
      "$value": "{test.dataCell.borderBottomWidth}",
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
    "test.headerCell.paddingTop": {
      "$type": "number",
      "$value": "{test.dataCell.paddingTop}",
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
    "test.headerCell.paddingBottom": {
      "$type": "number",
      "$value": "{test.dataCell.paddingBottom}",
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
    "test.headerCell.enabled.color": {
      "$type": "color",
      "$value": "{test.dataCell.enabled.color}",
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
    "test.headerCell.enabled.borderColor": {
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
    "test.headerCell.enabled.background": {
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
    "test.headerCell.hover.color": {
      "$type": "color",
      "$value": "{test.dataCell.hover.color}",
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
    "test.headerCell.hover.borderColor": {
      "$type": "color",
      "$value": "{test.dataCell.hover.borderColor}",
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
    "test.headerCell.hover.background": {
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
    "test.checkbox.medium.gapX": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "test.checkbox.medium.check.height": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
    "test.checkbox.medium.check.width": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
    "test.checkbox.medium.check.borderWidth": {
      "$type": "number",
      "$value": "{border.default}",
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
    "test.checkbox.medium.check.borderRadius": {
      "$type": "number",
      "$value": "{static.radius.xxsmall}",
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
    "test.checkbox.enabled.background": {
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
    "test.checkbox.enabled.borderColor": {
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
    "test.checkbox.enabled.check.background": {
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
    "test.checkbox.enabled.check.borderColor": {
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
    "test.checkbox.hover.background": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.background}",
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
    "test.checkbox.hover.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.checkbox.hover.check.background": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.check.background}",
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
    "test.checkbox.hover.check.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.checkbox.selected.check.background": {
      "$type": "color",
      "$value": "{color.background.selected.strong}",
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
    "test.checkbox.selected.check.borderColor": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.check.borderColor}",
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
    "test.switch.medium.gapX": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "test.switch.medium.width": {
      "$type": "number",
      "$value": 48,
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
    "test.switch.medium.height": {
      "$type": "number",
      "$value": 24,
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
    "test.switch.medium.borderRadius": {
      "$type": "number",
      "$value": 9999,
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
    "test.switch.medium.borderWidth": {
      "$type": "number",
      "$value": "{border.default}",
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
    "test.switch.medium.knob.height": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
    "test.switch.medium.knob.width": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
    "test.switch.medium.knob.borderWidth": {
      "$type": "number",
      "$value": "{border.default}",
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
    "test.switch.medium.knob.borderRadius": {
      "$type": "number",
      "$value": "{static.radius.xxsmall}",
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
    "test.switch.enabled.background": {
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
    "test.switch.enabled.borderColor": {
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
    "test.switch.enabled.knob.background": {
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
    "test.switch.enabled.knob.borderColor": {
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
    "test.switch.hover.background": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.background}",
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
    "test.switch.hover.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.switch.hover.knob.background": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.check.background}",
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
    "test.switch.hover.knob.borderColor": {
      "$type": "color",
      "$value": "{color.border.strong}",
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
    "test.switch.selected.background": {
      "$type": "color",
      "$value": "{color.background.selected.strong}",
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
    "test.switch.selected.borderColor": {
      "$type": "color",
      "$value": "{test.switch.enabled.borderColor}",
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
    "test.switch.selected.knob.borderColor": {
      "$type": "color",
      "$value": "{test.checkbox.enabled.check.borderColor}",
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
    "test.switch.selected.knob.background": {
      "$type": "color",
      "$value": "{color.background.front}",
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
    }
  },
  "large": {
    "spacing.none": {
      "$type": "number",
      "$value": "{static.spacing.none}",
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
    "spacing.hair": {
      "$type": "number",
      "$value": "{static.spacing.hair}",
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
    "spacing.xxsmall": {
      "$type": "number",
      "$value": "{static.spacing.xxsmall}",
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
    "spacing.xsmall": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
      "usedBy": [
        {
          "name": "test.dataCell.paddingY",
          "mode": "default"
        }
      ]
    },
    "spacing.small": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "spacing.medium": {
      "$type": "number",
      "$value": "{static.spacing.medium}",
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
    "spacing.large": {
      "$type": "number",
      "$value": "{static.spacing.large}",
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
    "spacing.xlarge": {
      "$type": "number",
      "$value": "{static.spacing.xlarge}",
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
    "radius.none": {
      "$type": "number",
      "$value": "{static.radius.none}",
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
      "usedBy": [
        {
          "name": "test.select.medium.option.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.hair": {
      "$type": "number",
      "$value": "{static.radius.hair}",
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
    "radius.xxsmall": {
      "$type": "number",
      "$value": "{static.radius.xxsmall}",
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
    "radius.xsmall": {
      "$type": "number",
      "$value": "{static.radius.xsmall}",
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
      "usedBy": [
        {
          "name": "test.drop.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.small": {
      "$type": "number",
      "$value": "{static.radius.small}",
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
    "radius.medium": {
      "$type": "number",
      "$value": "{static.radius.medium}",
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
    "radius.large": {
      "$type": "number",
      "$value": "{static.radius.large}",
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
    "radius.xlarge": {
      "$type": "number",
      "$value": "{static.radius.xlarge}",
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
    "radius.full": {
      "$type": "number",
      "$value": "{base.dimension.76800}",
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
      "usedBy": [
        {
          "name": "button.medium.default.borderRadius",
          "mode": "default"
        }
      ]
    },
    "border.none": {
      "$type": "number",
      "$value": "{static.border.none}",
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
    "border.xsmall": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
    "border.small": {
      "$type": "number",
      "$value": "{static.border.small}",
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
    "border.medium": {
      "$type": "number",
      "$value": "{static.border.medium}",
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
    "border.large": {
      "$type": "number",
      "$value": "{static.border.large}",
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
    "border.xlarge": {
      "$type": "number",
      "$value": "{static.border.xlarge}",
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
    "border.default": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
      "usedBy": [
        {
          "name": "button.medium.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.checkbox.medium.check.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.switch.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.switch.medium.knob.borderWidth",
          "mode": "default"
        }
      ]
    },
    "content.xxsmall": {
      "$type": "number",
      "$value": "{static.content.xxsmall}",
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
    "content.xsmall": {
      "$type": "number",
      "$value": "{static.content.xsmall}",
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
    "content.small": {
      "$type": "number",
      "$value": "{static.content.small}",
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
    "content.medium": {
      "$type": "number",
      "$value": "{static.content.medium}",
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
    "content.large": {
      "$type": "number",
      "$value": "{static.content.large}",
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
    "content.xlarge": {
      "$type": "number",
      "$value": "{static.content.xlarge}",
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
    "content.xxlarge": {
      "$type": "number",
      "$value": "{static.content.xxlarge}",
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
    "text.xsmall.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.small.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.small.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.medium.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.medium.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.large.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.large.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xlarge.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xxlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xxlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.3xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.3xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.3xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.3xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.4xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.4xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.4xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.4xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.5xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.5xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.5xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.5xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.6xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.6xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.6xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.6xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h1.fontSize": {
      "$type": "number",
      "$value": 36,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h1.lineHeight": {
      "$type": "number",
      "$value": 36,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h2.fontSize": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h2.lineHeight": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h3.fontSize": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h3.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h4.fontSize": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h4.lineHeight": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h5.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h5.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h6.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h6.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.label.fontSize": {
      "$type": "number",
      "$value": 14,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.label.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.description.fontSize": {
      "$type": "number",
      "$value": 14,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.description.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.placeholder.fontSize": {
      "$type": "number",
      "$value": 18,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.placeholder.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.value.fontSize": {
      "$type": "number",
      "$value": 18,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.value.lineHeight": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    }
  },
  "small": {
    "spacing.none": {
      "$type": "number",
      "$value": "{static.spacing.none}",
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
    "spacing.hair": {
      "$type": "number",
      "$value": "{static.spacing.hair}",
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
    "spacing.xxsmall": {
      "$type": "number",
      "$value": "{static.spacing.xxsmall}",
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
    "spacing.xsmall": {
      "$type": "number",
      "$value": "{static.spacing.xxsmall}",
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
      "usedBy": [
        {
          "name": "test.dataCell.paddingY",
          "mode": "default"
        }
      ]
    },
    "spacing.small": {
      "$type": "number",
      "$value": "{static.spacing.xsmall}",
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
    "spacing.medium": {
      "$type": "number",
      "$value": "{static.spacing.small}",
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
    "spacing.large": {
      "$type": "number",
      "$value": "{static.spacing.medium}",
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
    "spacing.xlarge": {
      "$type": "number",
      "$value": "{static.spacing.large}",
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
    "radius.none": {
      "$type": "number",
      "$value": "{static.radius.none}",
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
      "usedBy": [
        {
          "name": "test.select.medium.option.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.hair": {
      "$type": "number",
      "$value": "{static.radius.hair}",
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
    "radius.xxsmall": {
      "$type": "number",
      "$value": "{static.radius.hair}",
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
    "radius.xsmall": {
      "$type": "number",
      "$value": "{static.radius.xxsmall}",
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
      "usedBy": [
        {
          "name": "test.drop.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.small": {
      "$type": "number",
      "$value": "{static.radius.xsmall}",
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
    "radius.medium": {
      "$type": "number",
      "$value": "{static.radius.small}",
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
    "radius.large": {
      "$type": "number",
      "$value": "{static.radius.medium}",
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
    "radius.xlarge": {
      "$type": "number",
      "$value": "{static.radius.large}",
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
    "radius.full": {
      "$type": "number",
      "$value": "{base.dimension.76800}",
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
      "usedBy": [
        {
          "name": "button.medium.default.borderRadius",
          "mode": "default"
        }
      ]
    },
    "border.none": {
      "$type": "number",
      "$value": "{static.border.none}",
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
    "border.xsmall": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
    "border.small": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
    "border.medium": {
      "$type": "number",
      "$value": "{static.border.small}",
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
    "border.large": {
      "$type": "number",
      "$value": "{static.border.medium}",
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
    "border.xlarge": {
      "$type": "number",
      "$value": "{static.border.large}",
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
    "border.default": {
      "$type": "number",
      "$value": "{static.border.xsmall}",
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
      "usedBy": [
        {
          "name": "button.medium.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.input.fieldContainer.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.checkbox.medium.check.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.switch.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "test.switch.medium.knob.borderWidth",
          "mode": "default"
        }
      ]
    },
    "content.xxsmall": {
      "$type": "number",
      "$value": "{static.content.xxsmall}",
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
    "content.xsmall": {
      "$type": "number",
      "$value": "{static.content.xxsmall}",
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
    "content.small": {
      "$type": "number",
      "$value": "{static.content.xsmall}",
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
    "content.medium": {
      "$type": "number",
      "$value": "{static.content.small}",
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
    "content.large": {
      "$type": "number",
      "$value": "{static.content.medium}",
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
    "content.xlarge": {
      "$type": "number",
      "$value": "{static.content.large}",
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
    "content.xxlarge": {
      "$type": "number",
      "$value": "{static.content.xlarge}",
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
    "text.xsmall.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.small.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.small.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.medium.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.medium.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.large.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.large.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xlarge.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.xxlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.xxlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.3xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.3xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.3xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.3xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.4xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.4xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.4xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.4xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.5xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.5xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.5xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.5xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.6xl.fontSize": {
      "$type": "number",
      "$value": "{static.font.size.6xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "text.6xl.lineHeight": {
      "$type": "number",
      "$value": "{static.font.height.6xl}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h1.fontSize": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h1.lineHeight": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h2.fontSize": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h2.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h3.fontSize": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h3.lineHeight": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h4.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h4.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h5.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h5.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h6.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.medium.h6.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.label.fontSize": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.label.lineHeight": {
      "$type": "number",
      "$value": 24,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.description.fontSize": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.description.lineHeight": {
      "$type": "number",
      "$value": 20,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.placeholder.fontSize": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.placeholder.lineHeight": {
      "$type": "number",
      "$value": 16,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.value.fontSize": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      }
    },
    "form.value.lineHeight": {
      "$type": "number",
      "$value": 12,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      }
    }
  },
  "base": {
    "base.dimension.0": {
      "$type": "number",
      "$value": 0,
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
      "usedBy": [
        {
          "name": "static.spacing.none",
          "mode": "base"
        },
        {
          "name": "static.radius.none",
          "mode": "base"
        },
        {
          "name": "static.border.none",
          "mode": "base"
        }
      ]
    },
    "base.dimension.25": {
      "$type": "number",
      "$value": 1,
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
      "usedBy": [
        {
          "name": "static.spacing.hair",
          "mode": "base"
        },
        {
          "name": "static.radius.hair",
          "mode": "base"
        },
        {
          "name": "static.border.xsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.50": {
      "$type": "number",
      "$value": 2,
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
      "usedBy": [
        {
          "name": "static.border.small",
          "mode": "base"
        }
      ]
    },
    "base.dimension.75": {
      "$type": "number",
      "$value": 3,
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
      "usedBy": [
        {
          "name": "static.spacing.xxsmall",
          "mode": "base"
        },
        {
          "name": "static.radius.xxsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.100": {
      "$type": "number",
      "$value": 4,
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
      "usedBy": [
        {
          "name": "static.border.medium",
          "mode": "base"
        }
      ]
    },
    "base.dimension.150": {
      "$type": "number",
      "$value": 6,
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
      "usedBy": [
        {
          "name": "static.spacing.xsmall",
          "mode": "base"
        },
        {
          "name": "static.radius.xsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.200": {
      "$type": "number",
      "$value": 8,
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
    "base.dimension.300": {
      "$type": "number",
      "$value": 12,
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
      "usedBy": [
        {
          "name": "static.spacing.small",
          "mode": "base"
        },
        {
          "name": "static.radius.small",
          "mode": "base"
        },
        {
          "name": "static.border.large",
          "mode": "base"
        }
      ]
    },
    "base.dimension.400": {
      "$type": "number",
      "$value": 16,
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
    "base.dimension.450": {
      "$type": "number",
      "$value": 18,
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
    "base.dimension.500": {
      "$type": "number",
      "$value": 20,
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
    "base.dimension.600": {
      "$type": "number",
      "$value": 24,
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
      "usedBy": [
        {
          "name": "static.spacing.medium",
          "mode": "base"
        },
        {
          "name": "static.radius.medium",
          "mode": "base"
        },
        {
          "name": "static.border.xlarge",
          "mode": "base"
        }
      ]
    },
    "base.dimension.900": {
      "$type": "number",
      "$value": 36,
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
    "base.dimension.1200": {
      "$type": "number",
      "$value": 48,
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
      "usedBy": [
        {
          "name": "static.spacing.large",
          "mode": "base"
        },
        {
          "name": "static.radius.large",
          "mode": "base"
        },
        {
          "name": "static.content.xxsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.2400": {
      "$type": "number",
      "$value": 96,
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
      "usedBy": [
        {
          "name": "static.spacing.xlarge",
          "mode": "base"
        },
        {
          "name": "static.radius.xlarge",
          "mode": "base"
        },
        {
          "name": "static.content.xsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.4800": {
      "$type": "number",
      "$value": 192,
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
      "usedBy": [
        {
          "name": "static.content.small",
          "mode": "base"
        }
      ]
    },
    "base.dimension.9600": {
      "$type": "number",
      "$value": 384,
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
      "usedBy": [
        {
          "name": "static.content.medium",
          "mode": "base"
        }
      ]
    },
    "base.dimension.19200": {
      "$type": "number",
      "$value": 768,
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
      "usedBy": [
        {
          "name": "static.content.large",
          "mode": "base"
        }
      ]
    },
    "base.dimension.38400": {
      "$type": "number",
      "$value": 1152,
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
      "usedBy": [
        {
          "name": "static.content.xlarge",
          "mode": "base"
        }
      ]
    },
    "base.dimension.76800": {
      "$type": "number",
      "$value": 1536,
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
      "usedBy": [
        {
          "name": "radius.full",
          "mode": "large"
        },
        {
          "name": "radius.full",
          "mode": "small"
        },
        {
          "name": "static.content.xxlarge",
          "mode": "base"
        }
      ]
    },
    "base.color.red.500": {
      "$type": "color",
      "$value": "#fc6161",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.red",
          "mode": "light"
        }
      ]
    },
    "base.color.red.550": {
      "$type": "color",
      "$value": "#fc5a5a",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.critical",
          "mode": "light"
        }
      ]
    },
    "base.color.red.700": {
      "$type": "color",
      "$value": "#d04f4e",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.critical",
          "mode": "dark"
        }
      ]
    },
    "base.color.red.750": {
      "$type": "color",
      "$value": "#c54e4b",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.red.800": {
      "$type": "color",
      "$value": "#cc1f1a",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.red.850": {
      "$type": "color",
      "$value": "#a2423d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.red",
          "mode": "dark"
        }
      ]
    },
    "base.color.red.500-Opacity12": {
      "$type": "color",
      "$value": "#fc61611f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.red.500-Opacity24": {
      "$type": "color",
      "$value": "#fc61613d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.critical",
          "mode": "light"
        }
      ]
    },
    "base.color.red.800-Opacity30": {
      "$type": "color",
      "$value": "#cc1f1a4d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.critical",
          "mode": "dark"
        }
      ]
    },
    "base.color.orange.400": {
      "$type": "color",
      "$value": "#ffbc44",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.warning",
          "mode": "light"
        },
        {
          "name": "color.decorative.orange",
          "mode": "light"
        }
      ]
    },
    "base.color.orange.500": {
      "$type": "color",
      "$value": "#ff8300",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.20",
          "mode": "light"
        }
      ]
    },
    "base.color.orange.700": {
      "$type": "color",
      "$value": "#9b6310",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.warning",
          "mode": "dark"
        },
        {
          "name": "color.decorative.orange",
          "mode": "dark"
        }
      ]
    },
    "base.color.orange.400-Opacity12": {
      "$type": "color",
      "$value": "#ffbc441f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.orange.400-Opacity24": {
      "$type": "color",
      "$value": "#ffbc443d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.warning",
          "mode": "light"
        }
      ]
    },
    "base.color.orange.500-Opacity12": {
      "$type": "color",
      "$value": "#ff83001f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.20Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.yellow.200": {
      "$type": "color",
      "$value": "#ffeb59",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.yellow",
          "mode": "light"
        }
      ]
    },
    "base.color.yellow.300": {
      "$type": "color",
      "$value": "#ffd829",
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
      "usedBy": [
        {
          "name": "color.dataVis.categorical.50",
          "mode": "light"
        }
      ]
    },
    "base.color.yellow.400": {
      "$type": "color",
      "$value": "#fec901",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.yellow.500": {
      "$type": "color",
      "$value": "#d89128",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.yellow.700": {
      "$type": "color",
      "$value": "#8d741c",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.yellow",
          "mode": "dark"
        }
      ]
    },
    "base.color.yellow.200-Opacity12": {
      "$type": "color",
      "$value": "#ffeb591f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.yellow.300-Opacity12": {
      "$type": "color",
      "$value": "#ffd8291f",
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
      "usedBy": [
        {
          "name": "color.dataVis.categorical.50Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.yellow.400-Opacity12": {
      "$type": "color",
      "$value": "#fec9011f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.warning",
          "mode": "dark"
        }
      ]
    },
    "base.color.yellow.500-Opacity30": {
      "$type": "color",
      "$value": "#d891284d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.green.100": {
      "$type": "color",
      "$value": "#cbfaeb",
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
      "usedBy": [
        {
          "name": "color.background.selected.weak",
          "mode": "light"
        }
      ]
    },
    "base.color.green.400": {
      "$type": "color",
      "$value": "#17eba0",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.ok",
          "mode": "light"
        },
        {
          "name": "color.decorative.green",
          "mode": "light"
        }
      ]
    },
    "base.color.green.500": {
      "$type": "color",
      "$value": "#17d0a6",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.green.600": {
      "$type": "color",
      "$value": "#01a982",
      "$description": "HPE Brand",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.primary.default",
          "mode": "dark"
        },
        {
          "name": "color.background.selected.strong",
          "mode": "dark"
        },
        {
          "name": "color.border.selected",
          "mode": "dark"
        },
        {
          "name": "color.text.brand",
          "mode": "dark"
        },
        {
          "name": "color.icon.brand",
          "mode": "dark"
        },
        {
          "name": "color.background.primary.default",
          "mode": "light"
        },
        {
          "name": "color.background.selected.strong",
          "mode": "light"
        },
        {
          "name": "color.border.selected",
          "mode": "light"
        },
        {
          "name": "color.text.brand",
          "mode": "light"
        },
        {
          "name": "color.icon.brand",
          "mode": "light"
        }
      ]
    },
    "base.color.green.700": {
      "$type": "color",
      "$value": "#008567",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.ok",
          "mode": "dark"
        },
        {
          "name": "color.decorative.green",
          "mode": "dark"
        }
      ]
    },
    "base.color.green.1000": {
      "$type": "color",
      "$value": "#093a2f",
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
      "usedBy": [
        {
          "name": "color.background.selected.weak",
          "mode": "dark"
        }
      ]
    },
    "base.color.green.400-Opacity12": {
      "$type": "color",
      "$value": "#17eba01f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.green.400-Opacity24": {
      "$type": "color",
      "$value": "#17eba03d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.ok",
          "mode": "light"
        }
      ]
    },
    "base.color.green.500-Opacity30": {
      "$type": "color",
      "$value": "#17d0a64d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.ok",
          "mode": "dark"
        }
      ]
    },
    "base.color.turquoise.200": {
      "$type": "color",
      "$value": "#82fff2",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.turquoise",
          "mode": "light"
        },
        {
          "name": "color.dataVis.categorical.40",
          "mode": "light"
        }
      ]
    },
    "base.color.turquoise.400": {
      "$type": "color",
      "$value": "#00e8cf",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.turquoise.700": {
      "$type": "color",
      "$value": "#117b82",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.turquoise",
          "mode": "dark"
        }
      ]
    },
    "base.color.turquoise.200-Opacity12": {
      "$type": "color",
      "$value": "#82fff21f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.40Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.blue.400": {
      "$type": "color",
      "$value": "#00c8ff",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.info",
          "mode": "light"
        },
        {
          "name": "color.decorative.blue",
          "mode": "light"
        },
        {
          "name": "color.dataVis.categorical.70",
          "mode": "light"
        }
      ]
    },
    "base.color.blue.700": {
      "$type": "color",
      "$value": "#00739d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.info",
          "mode": "dark"
        },
        {
          "name": "color.decorative.blue",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.10",
          "mode": "light"
        }
      ]
    },
    "base.color.blue.900": {
      "$type": "color",
      "$value": "#00567a",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.blue.400-Opacity12": {
      "$type": "color",
      "$value": "#00c8ff1f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.info",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.70Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.blue.400-Opacity24": {
      "$type": "color",
      "$value": "#00c8ff3d",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.validation.info",
          "mode": "light"
        }
      ]
    },
    "base.color.blue.700-Opacity12": {
      "$type": "color",
      "$value": "#00739d1f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.10Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.purple.500": {
      "$type": "color",
      "$value": "#f740ff",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.purple",
          "mode": "light"
        },
        {
          "name": "color.dataVis.categorical.60",
          "mode": "light"
        }
      ]
    },
    "base.color.purple.800": {
      "$type": "color",
      "$value": "#7630ea",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.30",
          "mode": "light"
        }
      ]
    },
    "base.color.purple.900": {
      "$type": "color",
      "$value": "#6633bc",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.decorative.purple",
          "mode": "dark"
        }
      ]
    },
    "base.color.purple.500-Opacity12": {
      "$type": "color",
      "$value": "#f740ff1f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.60Weak",
          "mode": "light"
        }
      ]
    },
    "base.color.purple.800-Opacity12": {
      "$type": "color",
      "$value": "#7630ea1f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.dataVis.categorical.30weak",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity4": {
      "$type": "color",
      "$value": "#0000000a",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.disabled",
          "mode": "light"
        },
        {
          "name": "color.background.contrast",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity12": {
      "$type": "color",
      "$value": "#0000001f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.weak",
          "mode": "light"
        },
        {
          "name": "color.border.disabled",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity24": {
      "$type": "color",
      "$value": "#0000003d",
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
      "usedBy": [
        {
          "name": "color.text.disabled",
          "mode": "light"
        },
        {
          "name": "color.icon.disabled",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity36": {
      "$type": "color",
      "$value": "#0000005c",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.default",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity50": {
      "$type": "color",
      "$value": "#00000080",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.black.opacity72": {
      "$type": "color",
      "$value": "#000000b8",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.strong",
          "mode": "light"
        }
      ]
    },
    "base.color.black.opacity100": {
      "$type": "color",
      "$value": "#000000",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.color.grey.50": {
      "$type": "color",
      "$value": "#f7f7f7",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.back",
          "mode": "light"
        },
        {
          "name": "color.background.validation.unknown",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.400": {
      "$type": "color",
      "$value": "#cccccc",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.unknown",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.500": {
      "$type": "color",
      "$value": "#bbbbbb",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.text.xweak",
          "mode": "light"
        },
        {
          "name": "color.icon.xweak",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.700": {
      "$type": "color",
      "$value": "#757575",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.text.weak",
          "mode": "light"
        },
        {
          "name": "color.icon.weak",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.800": {
      "$type": "color",
      "$value": "#555555",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.icon.unknown",
          "mode": "dark"
        },
        {
          "name": "color.text.default",
          "mode": "light"
        },
        {
          "name": "color.icon.default",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.1000": {
      "$type": "color",
      "$value": "#333333",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.text.strong",
          "mode": "light"
        },
        {
          "name": "color.icon.strong",
          "mode": "light"
        }
      ]
    },
    "base.color.grey.1200": {
      "$type": "color",
      "$value": "#222222",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.front",
          "mode": "dark"
        },
        {
          "name": "color.background.validation.unknown",
          "mode": "dark"
        }
      ]
    },
    "base.color.grey.1300": {
      "$type": "color",
      "$value": "#1c1c1c",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.default",
          "mode": "dark"
        },
        {
          "name": "color.background.back",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.100": {
      "$type": "color",
      "$value": "#ffffff",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.text.default",
          "mode": "dark"
        },
        {
          "name": "color.text.strong",
          "mode": "dark"
        },
        {
          "name": "color.text.onPrimary",
          "mode": "dark"
        },
        {
          "name": "color.icon.default",
          "mode": "dark"
        },
        {
          "name": "color.icon.strong",
          "mode": "dark"
        },
        {
          "name": "color.icon.onPrimary",
          "mode": "dark"
        },
        {
          "name": "color.background.default",
          "mode": "light"
        },
        {
          "name": "color.background.front",
          "mode": "light"
        },
        {
          "name": "color.background.raised",
          "mode": "light"
        },
        {
          "name": "color.background.floating",
          "mode": "light"
        },
        {
          "name": "color.text.onPrimary",
          "mode": "light"
        },
        {
          "name": "color.icon.onPrimary",
          "mode": "light"
        }
      ]
    },
    "base.color.white.opacity6": {
      "$type": "color",
      "$value": "#ffffff0f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.hover",
          "mode": "dark"
        },
        {
          "name": "color.background.active",
          "mode": "dark"
        },
        {
          "name": "color.background.contrast",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity12": {
      "$type": "color",
      "$value": "#ffffff1f",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.disabled",
          "mode": "dark"
        },
        {
          "name": "color.border.weak",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity20": {
      "$type": "color",
      "$value": "#ffffff33",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.disabled",
          "mode": "dark"
        },
        {
          "name": "color.text.xweak",
          "mode": "dark"
        },
        {
          "name": "color.icon.xweak",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity36": {
      "$type": "color",
      "$value": "#ffffff5c",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.default",
          "mode": "dark"
        },
        {
          "name": "color.icon.disabled",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity50": {
      "$type": "color",
      "$value": "#ffffff80",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.text.weak",
          "mode": "dark"
        },
        {
          "name": "color.icon.weak",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity72": {
      "$type": "color",
      "$value": "#ffffffb8",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.border.strong",
          "mode": "dark"
        }
      ]
    },
    "base.font.family.primary": {
      "$type": "string",
      "$value": "MetricHPEXS",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_FAMILY"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.font.family.code": {
      "$type": "string",
      "$value": "Fira Mono",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_FAMILY"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.font.weight.thin": {
      "$type": "number",
      "$value": 100,
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
    "base.font.weight.light": {
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
    "base.font.weight.regular": {
      "$type": "number",
      "$value": 400,
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
    "base.font.weight.medium": {
      "$type": "number",
      "$value": 500,
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
    "base.font.weight.semibold": {
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
    "base.font.weight.bold": {
      "$type": "number",
      "$value": 700,
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
    "base.font.weight.black": {
      "$type": "number",
      "$value": 900,
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
    "base.breakpoint.xsmall": {
      "$type": "number",
      "$value": 576,
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
    "base.breakpoint.small": {
      "$type": "number",
      "$value": 768,
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
    "base.breakpoint.medium": {
      "$type": "number",
      "$value": 1080,
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
    "base.breakpoint.large": {
      "$type": "number",
      "$value": 1440,
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
    "TBD": {
      "$type": "color",
      "$value": "#00ff0a00",
      "$description": "Placeholder for colours that still need finalising.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": true,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "color.background.raised",
          "mode": "dark"
        },
        {
          "name": "color.background.floating",
          "mode": "dark"
        },
        {
          "name": "color.background.primary.hover",
          "mode": "dark"
        },
        {
          "name": "color.text.disabled",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.10",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.20",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.30",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.40",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.50",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.60",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.70",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.10Weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.20Weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.30weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.40Weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.50Weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.60Weak",
          "mode": "dark"
        },
        {
          "name": "color.dataVis.categorical.70Weak",
          "mode": "dark"
        },
        {
          "name": "color.background.primary.hover",
          "mode": "light"
        }
      ]
    },
    "static.font.size.xsmall": {
      "$type": "number",
      "$value": 14,
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
      "usedBy": [
        {
          "name": "text.xsmall.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xsmall.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.small": {
      "$type": "number",
      "$value": 16,
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
      "usedBy": [
        {
          "name": "text.small.fontSize",
          "mode": "large"
        },
        {
          "name": "text.small.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.medium": {
      "$type": "number",
      "$value": 18,
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
      "usedBy": [
        {
          "name": "text.medium.fontSize",
          "mode": "large"
        },
        {
          "name": "text.medium.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.large": {
      "$type": "number",
      "$value": 22,
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
      "usedBy": [
        {
          "name": "text.large.fontSize",
          "mode": "large"
        },
        {
          "name": "text.large.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.xlarge": {
      "$type": "number",
      "$value": 24,
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
      "usedBy": [
        {
          "name": "text.xlarge.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xlarge.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.xxlarge": {
      "$type": "number",
      "$value": 36,
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
      "usedBy": [
        {
          "name": "text.xxlarge.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xxlarge.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.3xl": {
      "$type": "number",
      "$value": 42,
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
      "usedBy": [
        {
          "name": "text.3xl.fontSize",
          "mode": "large"
        },
        {
          "name": "text.3xl.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.4xl": {
      "$type": "number",
      "$value": 48,
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
      "usedBy": [
        {
          "name": "text.4xl.fontSize",
          "mode": "large"
        },
        {
          "name": "text.4xl.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.5xl": {
      "$type": "number",
      "$value": 72,
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
      "usedBy": [
        {
          "name": "text.5xl.fontSize",
          "mode": "large"
        },
        {
          "name": "text.5xl.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.size.6xl": {
      "$type": "number",
      "$value": 72,
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
      "usedBy": [
        {
          "name": "text.6xl.fontSize",
          "mode": "large"
        },
        {
          "name": "text.6xl.fontSize",
          "mode": "small"
        }
      ]
    },
    "static.font.height.xsmall": {
      "$type": "number",
      "$value": 16,
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
      "usedBy": [
        {
          "name": "text.xsmall.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xsmall.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.small": {
      "$type": "number",
      "$value": 20,
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
      "usedBy": [
        {
          "name": "text.small.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.small.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.medium": {
      "$type": "number",
      "$value": 24,
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
      "usedBy": [
        {
          "name": "text.medium.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.medium.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.large": {
      "$type": "number",
      "$value": 28,
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
      "usedBy": [
        {
          "name": "text.large.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.large.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.xlarge": {
      "$type": "number",
      "$value": 30,
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
      "usedBy": [
        {
          "name": "text.xlarge.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xlarge.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.xxlarge": {
      "$type": "number",
      "$value": 40,
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
      "usedBy": [
        {
          "name": "text.xxlarge.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xxlarge.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.3xl": {
      "$type": "number",
      "$value": 46,
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
      "usedBy": [
        {
          "name": "text.3xl.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.3xl.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.4xl": {
      "$type": "number",
      "$value": 48,
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
      "usedBy": [
        {
          "name": "text.4xl.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.4xl.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.5xl": {
      "$type": "number",
      "$value": 72,
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
      "usedBy": [
        {
          "name": "text.5xl.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.5xl.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.font.height.6xl": {
      "$type": "number",
      "$value": 72,
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
      "usedBy": [
        {
          "name": "text.6xl.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.6xl.lineHeight",
          "mode": "small"
        }
      ]
    },
    "static.spacing.none": {
      "$type": "number",
      "$value": "{base.dimension.0}",
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
      "usedBy": [
        {
          "name": "spacing.none",
          "mode": "large"
        },
        {
          "name": "spacing.none",
          "mode": "small"
        }
      ]
    },
    "static.spacing.hair": {
      "$type": "number",
      "$value": "{base.dimension.25}",
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
      "usedBy": [
        {
          "name": "spacing.hair",
          "mode": "large"
        },
        {
          "name": "spacing.hair",
          "mode": "small"
        }
      ]
    },
    "static.spacing.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.75}",
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
      "usedBy": [
        {
          "name": "spacing.xxsmall",
          "mode": "large"
        },
        {
          "name": "spacing.xxsmall",
          "mode": "small"
        },
        {
          "name": "spacing.xsmall",
          "mode": "small"
        }
      ]
    },
    "static.spacing.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.150}",
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
      "usedBy": [
        {
          "name": "spacing.xsmall",
          "mode": "large"
        },
        {
          "name": "spacing.small",
          "mode": "small"
        }
      ]
    },
    "static.spacing.small": {
      "$type": "number",
      "$value": "{base.dimension.300}",
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
      "usedBy": [
        {
          "name": "spacing.small",
          "mode": "large"
        },
        {
          "name": "spacing.medium",
          "mode": "small"
        }
      ]
    },
    "static.spacing.medium": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
      "usedBy": [
        {
          "name": "spacing.medium",
          "mode": "large"
        },
        {
          "name": "spacing.large",
          "mode": "small"
        }
      ]
    },
    "static.spacing.large": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
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
      "usedBy": [
        {
          "name": "spacing.large",
          "mode": "large"
        },
        {
          "name": "spacing.xlarge",
          "mode": "small"
        }
      ]
    },
    "static.spacing.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
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
      "usedBy": [
        {
          "name": "spacing.xlarge",
          "mode": "large"
        }
      ]
    },
    "static.radius.none": {
      "$type": "number",
      "$value": "{base.dimension.0}",
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
      "usedBy": [
        {
          "name": "radius.none",
          "mode": "large"
        },
        {
          "name": "radius.none",
          "mode": "small"
        }
      ]
    },
    "static.radius.hair": {
      "$type": "number",
      "$value": "{base.dimension.25}",
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
      "usedBy": [
        {
          "name": "radius.hair",
          "mode": "large"
        },
        {
          "name": "radius.hair",
          "mode": "small"
        },
        {
          "name": "radius.xxsmall",
          "mode": "small"
        }
      ]
    },
    "static.radius.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.75}",
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
      "usedBy": [
        {
          "name": "radius.xxsmall",
          "mode": "large"
        },
        {
          "name": "radius.xsmall",
          "mode": "small"
        }
      ]
    },
    "static.radius.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.150}",
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
      "usedBy": [
        {
          "name": "radius.xsmall",
          "mode": "large"
        },
        {
          "name": "radius.small",
          "mode": "small"
        }
      ]
    },
    "static.radius.small": {
      "$type": "number",
      "$value": "{base.dimension.300}",
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
      "usedBy": [
        {
          "name": "radius.small",
          "mode": "large"
        },
        {
          "name": "radius.medium",
          "mode": "small"
        }
      ]
    },
    "static.radius.medium": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
      "usedBy": [
        {
          "name": "radius.medium",
          "mode": "large"
        },
        {
          "name": "radius.large",
          "mode": "small"
        }
      ]
    },
    "static.radius.large": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
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
      "usedBy": [
        {
          "name": "radius.large",
          "mode": "large"
        },
        {
          "name": "radius.xlarge",
          "mode": "small"
        }
      ]
    },
    "static.radius.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
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
      "usedBy": [
        {
          "name": "radius.xlarge",
          "mode": "large"
        }
      ]
    },
    "static.border.none": {
      "$type": "number",
      "$value": "{base.dimension.0}",
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
      "usedBy": [
        {
          "name": "border.none",
          "mode": "large"
        },
        {
          "name": "border.none",
          "mode": "small"
        }
      ]
    },
    "static.border.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.25}",
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
      "usedBy": [
        {
          "name": "border.xsmall",
          "mode": "large"
        },
        {
          "name": "border.default",
          "mode": "large"
        },
        {
          "name": "border.xsmall",
          "mode": "small"
        },
        {
          "name": "border.small",
          "mode": "small"
        },
        {
          "name": "border.default",
          "mode": "small"
        }
      ]
    },
    "static.border.small": {
      "$type": "number",
      "$value": "{base.dimension.50}",
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
      "usedBy": [
        {
          "name": "border.small",
          "mode": "large"
        },
        {
          "name": "border.medium",
          "mode": "small"
        }
      ]
    },
    "static.border.medium": {
      "$type": "number",
      "$value": "{base.dimension.100}",
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
      "usedBy": [
        {
          "name": "border.medium",
          "mode": "large"
        },
        {
          "name": "border.large",
          "mode": "small"
        }
      ]
    },
    "static.border.large": {
      "$type": "number",
      "$value": "{base.dimension.300}",
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
      "usedBy": [
        {
          "name": "border.large",
          "mode": "large"
        },
        {
          "name": "border.xlarge",
          "mode": "small"
        }
      ]
    },
    "static.border.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.600}",
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
      "usedBy": [
        {
          "name": "border.xlarge",
          "mode": "large"
        }
      ]
    },
    "static.content.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
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
      "usedBy": [
        {
          "name": "content.xxsmall",
          "mode": "large"
        },
        {
          "name": "content.xxsmall",
          "mode": "small"
        },
        {
          "name": "content.xsmall",
          "mode": "small"
        }
      ]
    },
    "static.content.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
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
      "usedBy": [
        {
          "name": "content.xsmall",
          "mode": "large"
        },
        {
          "name": "content.small",
          "mode": "small"
        }
      ]
    },
    "static.content.small": {
      "$type": "number",
      "$value": "{base.dimension.4800}",
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
      "usedBy": [
        {
          "name": "content.small",
          "mode": "large"
        },
        {
          "name": "content.medium",
          "mode": "small"
        }
      ]
    },
    "static.content.medium": {
      "$type": "number",
      "$value": "{base.dimension.9600}",
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
      "usedBy": [
        {
          "name": "content.medium",
          "mode": "large"
        },
        {
          "name": "content.large",
          "mode": "small"
        }
      ]
    },
    "static.content.large": {
      "$type": "number",
      "$value": "{base.dimension.19200}",
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
      "usedBy": [
        {
          "name": "content.large",
          "mode": "large"
        },
        {
          "name": "content.xlarge",
          "mode": "small"
        }
      ]
    },
    "static.content.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.38400}",
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
      "usedBy": [
        {
          "name": "content.xlarge",
          "mode": "large"
        },
        {
          "name": "content.xxlarge",
          "mode": "small"
        }
      ]
    },
    "static.content.xxlarge": {
      "$type": "number",
      "$value": "{base.dimension.76800}",
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
      "usedBy": [
        {
          "name": "content.xxlarge",
          "mode": "large"
        }
      ]
    }
  }
}