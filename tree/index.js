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
          "name": "button.toolbar.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.focus.background",
          "mode": "default"
        },
        {
          "name": "formField.input.group.container.disabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.enabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.hover.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.enabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.background",
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
          "name": "button.toolbar.hover.background",
          "mode": "default"
        },
        {
          "name": "select.option.hover.background",
          "mode": "default"
        },
        {
          "name": "formField.input.group.item.hover.background",
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
      "$value": "{base.color.white.opacity7}",
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
          "name": "button.secondary.disabled.background",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.background",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.background",
          "mode": "default"
        },
        {
          "name": "select.option.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.disabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.disabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.disabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.background",
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
          "name": "formField.input.container.readOnly.background",
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
      }
    },
    "color.background.floating": {
      "$type": "color",
      "$value": "{base.color.grey.1100}",
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
          "name": "drop.background",
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
          "name": "button.default.selected.enabled.background",
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
          "name": "formField.input.group.item.validation.critical.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.validation.critical.background",
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
          "name": "checkbox.control.selected.enabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.focus.background",
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
          "name": "select.option.selected.background",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "checkbox.control.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.validation.critical.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.borderColor",
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
            "STROKE_COLOR"
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
          "name": "menu.group.separator.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "headerCell.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.focus.borderColor",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "formField.input.container.readOnly.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.disabled": {
      "$type": "color",
      "$value": "{base.color.white.opacity12}",
      "$description": "Disabled colour for borders. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.group.container.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.borderColor",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.borderColor",
          "mode": "default"
        }
      ]
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
          "name": "checkbox.label.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "switch.labelText.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.helpText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.infoText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.errorText.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.errorText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.valueText.enabled.color",
          "mode": "default"
        },
        {
          "name": "radioButton.label.textColor",
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
          "name": "select.option.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.hover.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.selected.textColor",
          "mode": "default"
        },
        {
          "name": "dataCell.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.labelText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.labelText.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.hover.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.focus.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.disabled.textColor",
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
      }
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
      },
      "usedBy": [
        {
          "name": "formField.placeholderText.enabled.textColor",
          "mode": "default"
        }
      ]
    },
    "color.text.disabled": {
      "$type": "color",
      "$value": "{base.color.white.opacity24}",
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
          "name": "button.default.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.secondary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "checkbox.label.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "switch.labelText.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.placeholderText.disabled",
          "mode": "default"
        },
        {
          "name": "formField.helpText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.infoText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.valueText.disabled.textColor",
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
      },
      "usedBy": [
        {
          "name": "anchor.emphasized.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.hover.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.focus.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.disabled.textColor",
          "mode": "default"
        }
      ]
    },
    "color.text.inverse.default": {
      "$type": "color",
      "$value": "{base.color.grey.1200}",
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
      "$value": "{base.color.white.opacity24}",
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
          "name": "button.default.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.secondary.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.iconColor",
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
        },
        {
          "name": "checkbox.control.selected.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.iconColor",
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
      },
      "usedBy": [
        {
          "name": "radioButton.control.selected.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.iconColor",
          "mode": "default"
        }
      ]
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
    },
    "color.transparent": {
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
          "name": "button.toolbar.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.focus.background",
          "mode": "default"
        },
        {
          "name": "formField.input.group.container.disabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.enabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.hover.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.enabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.background",
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
          "name": "button.toolbar.hover.background",
          "mode": "default"
        },
        {
          "name": "select.option.hover.background",
          "mode": "default"
        },
        {
          "name": "formField.input.group.item.hover.background",
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
          "name": "button.secondary.disabled.background",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.background",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.background",
          "mode": "default"
        },
        {
          "name": "select.option.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.disabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.track.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.disabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.disabled.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.disabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.disabled.background",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.background",
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
          "name": "formField.input.container.readOnly.background",
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
          "name": "drop.background",
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
          "name": "button.default.selected.enabled.background",
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
          "name": "formField.input.group.item.validation.critical.background",
          "mode": "default"
        },
        {
          "name": "formField.input.container.validation.critical.background",
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
          "name": "checkbox.control.selected.enabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.enabled.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.hover.background",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.focus.background",
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
          "name": "select.option.selected.background",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "checkbox.control.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.validation.critical.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.borderColor",
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
            "STROKE_COLOR"
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
          "name": "menu.group.separator.background",
          "mode": "default"
        },
        {
          "name": "checkbox.control.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "headerCell.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.focus.borderColor",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "formField.input.container.readOnly.borderColor",
          "mode": "default"
        }
      ]
    },
    "color.border.disabled": {
      "$type": "color",
      "$value": "{base.color.black.opacity12}",
      "$description": "Disabled colour for borders. Using disabled colours ensures that disabled components are similarly styled and consistent. Furthermore, it allows us to control disabled colours at the token level, rather than the component build level.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.track.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.handle.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.track.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "switch.control.selected.handle.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.group.container.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "formField.input.container.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.disabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.borderColor",
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
            "STROKE_COLOR"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.secondary.hover.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.enabled.borderColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.borderColor",
          "mode": "default"
        }
      ]
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
          "name": "checkbox.label.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "switch.labelText.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.helpText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.infoText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.errorText.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.errorText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.valueText.enabled.color",
          "mode": "default"
        },
        {
          "name": "radioButton.label.textColor",
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
          "name": "select.option.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.hover.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.selected.textColor",
          "mode": "default"
        },
        {
          "name": "dataCell.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.labelText.enabled.color",
          "mode": "default"
        },
        {
          "name": "formField.labelText.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.hover.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.focus.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.default.disabled.textColor",
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
      }
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
      },
      "usedBy": [
        {
          "name": "formField.placeholderText.enabled.textColor",
          "mode": "default"
        }
      ]
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
          "name": "button.default.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.secondary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "select.option.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "checkbox.label.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "switch.labelText.disabled.textColor",
          "mode": "default"
        },
        {
          "name": "formField.placeholderText.disabled",
          "mode": "default"
        },
        {
          "name": "formField.helpText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.infoText.disabled.color",
          "mode": "default"
        },
        {
          "name": "formField.valueText.disabled.textColor",
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
      },
      "usedBy": [
        {
          "name": "anchor.emphasized.enabled.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.hover.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.focus.textColor",
          "mode": "default"
        },
        {
          "name": "anchor.emphasized.disabled.textColor",
          "mode": "default"
        }
      ]
    },
    "color.text.inverse.default": {
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
          "name": "button.default.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.secondary.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.primary.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "button.toolbar.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.disabled.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.disabled.iconColor",
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
        },
        {
          "name": "checkbox.control.selected.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.selected.focus.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "checkbox.control.indeterminate.focus.iconColor",
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
      },
      "usedBy": [
        {
          "name": "radioButton.control.selected.enabled.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.hover.iconColor",
          "mode": "default"
        },
        {
          "name": "radioButton.control.selected.focus.iconColor",
          "mode": "default"
        }
      ]
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
    },
    "color.transparent": {
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
    }
  },
  "default": {
    "button.default.enabled.background": {
      "$type": "color",
      "$value": "#00000000",
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
    "button.default.enabled.borderColor": {
      "$type": "color",
      "$value": "#00000000",
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
    "button.default.enabled.textColor": {
      "$type": "color",
      "$value": "{color.text.strong}",
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
    "button.default.enabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.strong}",
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
    "button.default.enabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
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
    "button.default.disabled.background": {
      "$type": "color",
      "$value": "{button.default.enabled.background}",
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
    "button.default.disabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.enabled.borderColor}",
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
    "button.default.disabled.textColor": {
      "$type": "color",
      "$value": "{color.text.disabled}",
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
    "button.default.disabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.disabled}",
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
    "button.default.disabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
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
    "button.default.hover.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.default.selected.enabled.background": {
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
    "button.default.selected.enabled.borderColor": {
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
    "button.default.selected.enabled.textColor": {
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
    "button.default.selected.enabled.iconColor": {
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
    "button.default.selected.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.secondary.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
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
    "button.secondary.hover.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.secondary.disabled.borderColor": {
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
    "button.secondary.disabled.textColor": {
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
    "button.secondary.disabled.iconColor": {
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
    "button.secondary.disabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.secondary.selected.enabled.background": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.secondary.selected.enabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.secondary.selected.enabled.textColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.secondary.selected.enabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.secondary.selected.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.primary.enabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
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
    "button.primary.disabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.primary.hover.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.primary.selected.enabled.background": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.primary.selected.enabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.primary.selected.enabled.textColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.primary.selected.enabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.primary.selected.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.toolbar.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.toolbar.disabled.borderColor": {
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
    "button.toolbar.disabled.textColor": {
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
    "button.toolbar.disabled.iconColor": {
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
    "button.toolbar.disabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.toolbar.hover.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.toolbar.selected.enabled.background": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.toolbar.selected.enabled.borderColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.toolbar.selected.enabled.textColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.toolbar.selected.enabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.selected.enabled.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.toolbar.selected.enabled.fontWeight": {
      "$type": "number",
      "$value": "{button.default.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.paddingX": {
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
      }
    },
    "button.small.default.paddingY": {
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
    "button.small.default.borderRadius": {
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
    "button.small.default.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.minHeight": {
      "$type": "number",
      "$value": "{component.small.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.fontSize": {
      "$type": "number",
      "$value": "{text.small.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.lineHeight": {
      "$type": "number",
      "$value": "{text.small.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.default.gapX": {
      "$type": "number",
      "$value": "{component.xsmall.textToIconX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.paddingX": {
      "$type": "number",
      "$value": "{button.small.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.paddingY": {
      "$type": "number",
      "$value": "{button.small.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.borderRadius": {
      "$type": "number",
      "$value": "{button.small.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.borderWidth": {
      "$type": "number",
      "$value": "{button.small.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.minHeight": {
      "$type": "number",
      "$value": "{button.small.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.fontSize": {
      "$type": "number",
      "$value": "{button.small.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.lineHeight": {
      "$type": "number",
      "$value": "{button.small.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.primary.gapX": {
      "$type": "number",
      "$value": "{button.small.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.paddingX": {
      "$type": "number",
      "$value": "{button.small.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.paddingY": {
      "$type": "number",
      "$value": "{button.small.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.borderRadius": {
      "$type": "number",
      "$value": "{button.small.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.borderWidth": {
      "$type": "number",
      "$value": "{button.small.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.minHeight": {
      "$type": "number",
      "$value": "{button.small.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.fontSize": {
      "$type": "number",
      "$value": "{button.small.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.lineHeight": {
      "$type": "number",
      "$value": "{button.small.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.secondary.gapX": {
      "$type": "number",
      "$value": "{button.small.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.paddingX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xxsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.borderWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.minHeight": {
      "$type": "number",
      "$value": "{component.small.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.fontSize": {
      "$type": "number",
      "$value": "{text.small.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.lineHeight": {
      "$type": "number",
      "$value": "{text.small.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.small.toolbar.gapX": {
      "$type": "number",
      "$value": "{component.xsmall.textToIconX}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
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
      "$value": "{component.medium.minHeight}",
      "$description": "",
      "$extensions": {
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
    "button.medium.default.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
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
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
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
      "$value": "{component.medium.textToIconX}",
      "$description": "",
      "$extensions": {
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
    "button.medium.primary.fontWeight": {
      "$type": "number",
      "$value": "{button.medium.default.fontWeight}",
      "$description": "",
      "$extensions": {
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
    "button.medium.secondary.fontWeight": {
      "$type": "number",
      "$value": "{button.medium.default.fontWeight}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.xsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
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
    "button.medium.toolbar.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
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
    "button.large.default.paddingX": {
      "$type": "number",
      "$value": "{base.static.spacing.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.borderRadius": {
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
    "button.large.default.borderWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.minHeight": {
      "$type": "number",
      "$value": "{component.large.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.fontSize": {
      "$type": "number",
      "$value": "{text.large.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.lineHeight": {
      "$type": "number",
      "$value": "{text.large.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.default.gapX": {
      "$type": "number",
      "$value": "{component.large.textToIconX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.paddingX": {
      "$type": "number",
      "$value": "{button.large.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.paddingY": {
      "$type": "number",
      "$value": "{button.large.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.borderRadius": {
      "$type": "number",
      "$value": "{button.large.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.borderWidth": {
      "$type": "number",
      "$value": "{button.large.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.minHeight": {
      "$type": "number",
      "$value": "{button.large.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.fontSize": {
      "$type": "number",
      "$value": "{button.large.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.lineHeight": {
      "$type": "number",
      "$value": "{button.large.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.primary.gapX": {
      "$type": "number",
      "$value": "{button.large.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.paddingX": {
      "$type": "number",
      "$value": "{button.large.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.paddingY": {
      "$type": "number",
      "$value": "{button.large.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.borderRadius": {
      "$type": "number",
      "$value": "{button.large.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.borderWidth": {
      "$type": "number",
      "$value": "{button.large.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.minHeight": {
      "$type": "number",
      "$value": "{button.large.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.fontSize": {
      "$type": "number",
      "$value": "{button.large.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.lineHeight": {
      "$type": "number",
      "$value": "{button.large.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.secondary.gapX": {
      "$type": "number",
      "$value": "{button.large.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.paddingX": {
      "$type": "number",
      "$value": "{base.dimension.250}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.225}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.minHeight": {
      "$type": "number",
      "$value": "{button.large.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.fontSize": {
      "$type": "number",
      "$value": "{button.large.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.lineHeight": {
      "$type": "number",
      "$value": "{button.large.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.large.toolbar.gapX": {
      "$type": "number",
      "$value": "{button.large.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.paddingX": {
      "$type": "number",
      "$value": "{base.dimension.750}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.paddingY": {
      "$type": "number",
      "$value": "{base.dimension.475}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.borderRadius": {
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
    "button.xLarge.default.borderWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.minHeight": {
      "$type": "number",
      "$value": "{component.xlarge.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.xlarge.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.xlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.default.gapX": {
      "$type": "number",
      "$value": "{component.xlarge.textToIconX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.paddingX": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.paddingY": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.borderRadius": {
      "$type": "number",
      "$value": "{button.xLarge.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.borderWidth": {
      "$type": "number",
      "$value": "{button.xLarge.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.minHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.fontSize": {
      "$type": "number",
      "$value": "{button.xLarge.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.lineHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.primary.gapX": {
      "$type": "number",
      "$value": "{button.xLarge.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.paddingX": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.paddingY": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.borderRadius": {
      "$type": "number",
      "$value": "{button.xLarge.default.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.borderWidth": {
      "$type": "number",
      "$value": "{button.xLarge.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.minHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.fontSize": {
      "$type": "number",
      "$value": "{button.xLarge.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.lineHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.secondary.gapX": {
      "$type": "number",
      "$value": "{button.xLarge.default.gapX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.paddingX": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.paddingY": {
      "$type": "number",
      "$value": "{button.xLarge.default.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.borderWidth": {
      "$type": "number",
      "$value": "{button.xLarge.default.borderWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.minHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.fontSize": {
      "$type": "number",
      "$value": "{button.xLarge.default.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.lineHeight": {
      "$type": "number",
      "$value": "{button.xLarge.default.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "button.xLarge.toolbar.gapX": {
      "$type": "number",
      "$value": "{button.xLarge.default.gapX}",
      "$description": "",
      "$extensions": {
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
    "drop.background": {
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
    "drop.borderRadius": {
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
    "drop.margin": {
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
    "drop.zIndex": {
      "$type": "number",
      "$value": 110,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.enabled.background": {
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
    "menu.item.enabled.borderColor": {
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
    "menu.item.enabled.textColor": {
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
    "menu.item.enabled.iconColor": {
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
    "menu.item.hover.background": {
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
    "menu.item.hover.borderColor": {
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
    "menu.item.hover.textColor": {
      "$type": "color",
      "$value": "{button.default.hover.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.hover.iconColor": {
      "$type": "color",
      "$value": "{button.default.hover.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.focus.background": {
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
    "menu.item.focus.borderColor": {
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
    "menu.item.focus.textColor": {
      "$type": "color",
      "$value": "{button.default.hover.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.focus.iconColor": {
      "$type": "color",
      "$value": "{button.default.hover.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.disabled.background": {
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
    "menu.item.disabled.borderColor": {
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
    "menu.item.disabled.textColor": {
      "$type": "color",
      "$value": "{button.default.disabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.item.disabled.iconColor": {
      "$type": "color",
      "$value": "{button.default.disabled.iconColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.group.separator.background": {
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
    "menu.medium.item.paddingX": {
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
    "menu.medium.item.paddingY": {
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
    "menu.medium.item.borderRadius": {
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
    "menu.medium.item.borderWidth": {
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
    "menu.medium.item.minHeight": {
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
    "menu.medium.item.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.medium.item.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.medium.group.container.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "menu.medium.group.separator.height": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.minHeight": {
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
    "component.xsmall.textToElementX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.textToIconX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.fontSize": {
      "$type": "number",
      "$value": "{text.xsmall.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xsmall.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xxsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xxsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.fontSize": {
      "$type": "number",
      "$value": "{text.small.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.lineHeight": {
      "$type": "number",
      "$value": "{text.small.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.textToElementX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.small.textToIconX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.minHeight": {
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
    "component.medium.textToElementX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.textToIconX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.medium.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.fontSize": {
      "$type": "number",
      "$value": "{text.large.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.lineHeight": {
      "$type": "number",
      "$value": "{text.large.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.minHeight": {
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
      }
    },
    "component.large.textToElementX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.textToIconX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.large.paddingY": {
      "$type": "number",
      "$value": 9,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.fontSize": {
      "$type": "number",
      "$value": "{text.xlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{text.xlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.minHeight": {
      "$type": "number",
      "$value": "{base.dimension.1800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.textToElementX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.textToIconX": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "component.xlarge.paddingY": {
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
    "select.medium.option.paddingX": {
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
    "select.medium.option.paddingY": {
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
    "select.medium.option.minHeight": {
      "$type": "number",
      "$value": "{component.medium.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.medium.option.borderRadius": {
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
    "select.medium.option.borderWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.medium.option.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.medium.option.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.option.enabled.background": {
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
    "select.option.enabled.borderColor": {
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
    "select.option.enabled.textColor": {
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
    "select.option.enabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.option.hover.background": {
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
    "select.option.hover.borderColor": {
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
    "select.option.hover.textColor": {
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
    "select.option.hover.fontWeight": {
      "$type": "number",
      "$value": "{select.option.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.option.disabled.background": {
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
    "select.option.disabled.borderColor": {
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
    "select.option.disabled.textColor": {
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
    "select.option.disabled.fontWeight": {
      "$type": "number",
      "$value": "{select.option.enabled.fontWeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "select.option.selected.background": {
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
    "select.option.selected.borderColor": {
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
    "select.option.selected.textColor": {
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
    "select.option.selected.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.control.enabled.background": {
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
    "checkbox.control.enabled.borderColor": {
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
    "checkbox.control.hover.background": {
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
    "checkbox.control.hover.borderColor": {
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
    "checkbox.control.focus.background": {
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
    "checkbox.control.focus.borderColor": {
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
    "checkbox.control.selected.enabled.background": {
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
    "checkbox.control.selected.enabled.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.control.selected.enabled.iconColor": {
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
    "checkbox.control.selected.hover.background": {
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
    "checkbox.control.selected.hover.borderColor": {
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
    "checkbox.control.selected.hover.iconColor": {
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
    "checkbox.control.selected.focus.background": {
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
    "checkbox.control.selected.focus.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.control.selected.focus.iconColor": {
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
    "checkbox.control.selected.disabled.background": {
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
    "checkbox.control.selected.disabled.borderColor": {
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
    "checkbox.control.selected.disabled.iconColor": {
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
    "checkbox.control.disabled.background": {
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
    "checkbox.control.disabled.borderColor": {
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
    "checkbox.control.indeterminate.enabled.background": {
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
    "checkbox.control.indeterminate.enabled.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.control.indeterminate.enabled.iconColor": {
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
    "checkbox.control.indeterminate.hover.background": {
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
    "checkbox.control.indeterminate.hover.borderColor": {
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
    "checkbox.control.indeterminate.hover.iconColor": {
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
    "checkbox.control.indeterminate.focus.background": {
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
    "checkbox.control.indeterminate.focus.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.control.indeterminate.focus.iconColor": {
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
    "checkbox.control.indeterminate.disabled.background": {
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
    "checkbox.control.indeterminate.disabled.borderColor": {
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
    "checkbox.control.indeterminate.disabled.iconColor": {
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
    "checkbox.label.enabled.textColor": {
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
    "checkbox.label.disabled.textColor": {
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
    "checkbox.medium.gapX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "Space between checkbox control and value (label)",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.medium.label.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.medium.label.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.medium.label.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.medium.control.height": {
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
    "checkbox.medium.control.width": {
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
    "checkbox.medium.control.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "checkbox.medium.control.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.xxsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.control.track.enabled.background": {
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
    "switch.control.track.enabled.borderColor": {
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
    "switch.control.track.hover.background": {
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
    "switch.control.track.hover.borderColor": {
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
    "switch.control.track.focus.background": {
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
    "switch.control.track.focus.borderColor": {
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
    "switch.control.track.disabled.background": {
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
    "switch.control.track.disabled.borderColor": {
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
    "switch.control.handle.enabled.background": {
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
    "switch.control.handle.enabled.borderColor": {
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
    "switch.control.handle.hover.background": {
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
    "switch.control.handle.hover.borderColor": {
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
    "switch.control.handle.focus.background": {
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
    "switch.control.handle.focus.borderColor": {
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
    "switch.control.handle.disabled.background": {
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
    "switch.control.handle.disabled.borderColor": {
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
    "switch.control.selected.track.enabled.background": {
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
    "switch.control.selected.track.enabled.borderColor": {
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
    "switch.control.selected.track.hover.background": {
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
    "switch.control.selected.track.hover.borderColor": {
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
    "switch.control.selected.track.focus.background": {
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
    "switch.control.selected.track.focus.borderColor": {
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
    "switch.control.selected.track.disabled.background": {
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
    "switch.control.selected.track.disabled.borderColor": {
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
    "switch.control.selected.handle.enabled.background": {
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
    "switch.control.selected.handle.enabled.borderColor": {
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
    "switch.control.selected.handle.hover.background": {
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
    "switch.control.selected.handle.hover.borderColor": {
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
    "switch.control.selected.handle.focus.background": {
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
    "switch.control.selected.handle.focus.borderColor": {
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
    "switch.control.selected.handle.disabled.background": {
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
    "switch.control.selected.handle.disabled.borderColor": {
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
    "switch.labelText.enabled.textColor": {
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
    "switch.labelText.disabled.textColor": {
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
    "switch.medium.gapX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.width": {
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
    "switch.medium.height": {
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
    "switch.medium.borderRadius": {
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
    "switch.medium.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.label.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.label.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.label.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.control.track.height": {
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
    "switch.medium.control.track.width": {
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
      }
    },
    "switch.medium.control.track.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.control.track.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.control.handle.height": {
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
    "switch.medium.control.handle.width": {
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
    "switch.medium.control.handle.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "switch.medium.control.handle.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.paddingX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.borderBottomWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.paddingTop": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.paddingBottom": {
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
    "dataCell.enabled.textColor": {
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
    "dataCell.enabled.borderColor": {
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
    "dataCell.enabled.background": {
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
    "dataCell.hover.textColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.hover.borderColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.hover.background": {
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
    "dataCell.disabled.textColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.disabled.borderColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.disabled.background": {
      "$type": "color",
      "$value": "{dataCell.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.pinned.textColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.pinned.borderColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "dataCell.pinned.backgroundColor": {
      "$type": "color",
      "$value": "{dataCell.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.paddingX": {
      "$type": "number",
      "$value": "{dataCell.paddingX}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.fontSize": {
      "$type": "number",
      "$value": "{dataCell.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.lineHeight": {
      "$type": "number",
      "$value": "{dataCell.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.borderBottomWidth": {
      "$type": "number",
      "$value": "{dataCell.borderBottomWidth}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.paddingTop": {
      "$type": "number",
      "$value": "{dataCell.paddingTop}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.paddingBottom": {
      "$type": "number",
      "$value": "{dataCell.paddingBottom}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.enabled.color": {
      "$type": "color",
      "$value": "{dataCell.enabled.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.enabled.borderColor": {
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
    "headerCell.enabled.background": {
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
    "headerCell.hover.color": {
      "$type": "color",
      "$value": "{dataCell.hover.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.hover.borderColor": {
      "$type": "color",
      "$value": "{dataCell.hover.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.hover.background": {
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
    "headerCell.pinned.color": {
      "$type": "color",
      "$value": "{dataCell.hover.textColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.pinned.borderColor": {
      "$type": "color",
      "$value": "{dataCell.hover.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "headerCell.pinned.background": {
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
    "formField.medium.input.group.item.paddingX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.item.paddingY": {
      "$type": "number",
      "$value": "{component.medium.paddingY}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.item.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.item.minHeight": {
      "$type": "number",
      "$value": "{component.medium.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.item.borderRadius": {
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
    "formField.medium.input.group.container.paddingX": {
      "$type": "number",
      "$value": "{spacing.none}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.container.paddingY": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.container.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.group.container.borderRadius": {
      "$type": "number",
      "$value": "{formField.medium.input.container.borderRadius}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.container.paddingX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.container.paddingY": {
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
    "formField.medium.input.container.borderWidth": {
      "$type": "number",
      "$value": "{base.static.borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.container.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.input.container.minHeight": {
      "$type": "number",
      "$value": "{component.medium.minHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.labelText.fontSize": {
      "$type": "number",
      "$value": "{text.xsmall.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.labelText.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.labelText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.placeholderText.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.placeholderText.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.placeholderText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.helpText.fontSize": {
      "$type": "number",
      "$value": "{text.xsmall.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.helpText.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.helpText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.infoText.fontSize": {
      "$type": "number",
      "$value": "{text.xsmall.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.infoText.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.infoText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.errorText.fontSize": {
      "$type": "number",
      "$value": "{text.xsmall.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.errorText.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.errorText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.valueText.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.valueText.lineHeight": {
      "$type": "number",
      "$value": "{text.xsmall.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.medium.valueText.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.enabled.background": {
      "$type": "color",
      "$value": "{formField.input.container.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.enabled.borderColor": {
      "$type": "color",
      "$value": "{formField.input.container.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.hover.background": {
      "$type": "color",
      "$value": "{formField.input.group.container.enabled.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.hover.borderColor": {
      "$type": "color",
      "$value": "{formField.input.group.container.enabled.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.readOnly.background": {
      "$type": "color",
      "$value": "{formField.input.container.readOnly.background}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.readOnly.borderColor": {
      "$type": "color",
      "$value": "{formField.input.container.readOnly.borderColor}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.group.container.disabled.background": {
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
    "formField.input.group.container.disabled.borderColor": {
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
    "formField.input.group.item.enabled.background": {
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
    "formField.input.group.item.enabled.borderColor": {
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
    "formField.input.group.item.validation.critical.background": {
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
    "formField.input.group.item.validation.critical.borderColor": {
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
    "formField.input.group.item.hover.background": {
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
    "formField.input.group.item.hover.borderColor": {
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
    "formField.input.group.item.readOnly.background": {
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
    "formField.input.group.item.readOnly.borderColor": {
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
    "formField.input.group.item.disabled.background": {
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
    "formField.input.group.item.disabled.borderColor": {
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
    "formField.input.container.enabled.background": {
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
    "formField.input.container.enabled.borderColor": {
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
    "formField.input.container.hover.background": {
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
    "formField.input.container.hover.borderColor": {
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
    "formField.input.container.readOnly.background": {
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
    "formField.input.container.readOnly.borderColor": {
      "$type": "color",
      "$value": "{color.border.weak}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.input.container.validation.critical.background": {
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
    "formField.input.container.validation.critical.borderColor": {
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
    "formField.input.container.disabled.background": {
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
    "formField.input.container.disabled.borderColor": {
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
    "formField.labelText.enabled.color": {
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
    "formField.labelText.disabled.textColor": {
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
    "formField.placeholderText.disabled": {
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
      },
      "color": {
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
      }
    },
    "formField.placeholderText.enabled.textColor": {
      "$type": "color",
      "$value": "{color.text.xweak}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "formField.helpText.enabled.color": {
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
    "formField.helpText.disabled.color": {
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
    "formField.infoText.enabled.color": {
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
    "formField.infoText.disabled.color": {
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
    "formField.errorText.enabled.textColor": {
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
    "formField.errorText.disabled.color": {
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
    "formField.valueText.enabled.color": {
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
    "formField.valueText.disabled.textColor": {
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
    "radioButton.control.enabled.background": {
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
    "radioButton.control.enabled.borderColor": {
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
    "radioButton.control.hover.background": {
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
    "radioButton.control.hover.borderColor": {
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
    "radioButton.control.focus.background": {
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
    "radioButton.control.focus.borderColor": {
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
    "radioButton.control.disabled.background": {
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
    "radioButton.control.disabled.borderColor": {
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
    "radioButton.control.selected.enabled.background": {
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
    "radioButton.control.selected.enabled.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.control.selected.enabled.iconColor": {
      "$type": "color",
      "$value": "{color.icon.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.control.selected.hover.background": {
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
    "radioButton.control.selected.hover.borderColor": {
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
    "radioButton.control.selected.hover.iconColor": {
      "$type": "color",
      "$value": "{color.icon.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.control.selected.focus.background": {
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
    "radioButton.control.selected.focus.borderColor": {
      "$type": "color",
      "$value": "{color.border.selected}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.control.selected.focus.iconColor": {
      "$type": "color",
      "$value": "{color.icon.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.control.selected.disabled.background": {
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
    "radioButton.control.selected.disabled.borderColor": {
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
    "radioButton.control.selected.disabled.iconColor": {
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
    "radioButton.label.textColor": {
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
    "radioButton.medium.gapX": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "Space between checkbox control and value (label)",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.medium.label.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.medium.label.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.medium.label.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.medium.control.height": {
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
    "radioButton.medium.control.width": {
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
    "radioButton.medium.control.borderWidth": {
      "$type": "number",
      "$value": "{borderWidth.default}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "radioButton.medium.control.borderRadius": {
      "$type": "number",
      "$value": "{base.static.radius.xxsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.enabled.textColor": {
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
    "anchor.default.enabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.enabled.textDecoration": {
      "$type": "string",
      "$value": "underline",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.hover.textColor": {
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
    "anchor.default.hover.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.hover.textDecoration": {
      "$type": "string",
      "$value": "underline",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.focus.textColor": {
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
    "anchor.default.focus.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.focus.textDecoration": {
      "$type": "string",
      "$value": "underline",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.disabled.textColor": {
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
    "anchor.default.disabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.regular}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.default.disabled.textDecoration": {
      "$type": "string",
      "$value": "underline",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.enabled.textColor": {
      "$type": "color",
      "$value": "{color.text.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.enabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.hover.textColor": {
      "$type": "color",
      "$value": "{color.text.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.hover.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.hover.textDecoration": {
      "$type": "string",
      "$value": "underline",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.focus.textColor": {
      "$type": "color",
      "$value": "{color.text.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.focus.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.disabled.textColor": {
      "$type": "color",
      "$value": "{color.text.brand}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.emphasized.disabled.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.bold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.small.default.fontSize": {
      "$type": "number",
      "$value": "{text.small.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.small.default.lineHeight": {
      "$type": "number",
      "$value": "{text.small.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.small.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.small.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.small.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.small.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.medium.default.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.medium.default.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.medium.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.medium.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.medium.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.medium.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.large.default.fontSize": {
      "$type": "number",
      "$value": "{text.large.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.large.default.lineHeight": {
      "$type": "number",
      "$value": "{text.large.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.large.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.large.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.large.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.large.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.xlarge.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.xlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.xlarge.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.xlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xxlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.xxlarge.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xxlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.xxlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xxlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.xxlarge.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.xxlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.xxlarge.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.3xlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.3xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.3xlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.3xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.3xlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.3xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.3xlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.3xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.4xlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.4xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.4xlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.4xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.4xlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.4xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.4xlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.4xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.5xlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.5xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.5xlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.5xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.5xlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.5xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.5xlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.5xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.6xlarge.default.fontSize": {
      "$type": "number",
      "$value": "{text.6xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.6xlarge.default.lineHeight": {
      "$type": "number",
      "$value": "{text.6xl.lineHeight}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.6xlarge.emphasized.fontSize": {
      "$type": "number",
      "$value": "{text.6xl.fontSize}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "anchor.6xlarge.emphasized.lineHeight": {
      "$type": "number",
      "$value": "{text.6xl.lineHeight}",
      "$description": "",
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
      "$value": "{base.static.spacing.none}",
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
          "name": "formField.medium.input.group.container.paddingX",
          "mode": "default"
        }
      ]
    },
    "spacing.hair": {
      "$type": "number",
      "$value": "{base.static.spacing.hair}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xxsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xsmall}",
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
          "name": "drop.margin",
          "mode": "default"
        }
      ]
    },
    "spacing.small": {
      "$type": "number",
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.medium}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.large}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xlarge}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.none}",
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
          "name": "menu.medium.item.borderRadius",
          "mode": "default"
        },
        {
          "name": "select.medium.option.borderRadius",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.item.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.hair": {
      "$type": "number",
      "$value": "{base.static.radius.hair}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.xxsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.xsmall}",
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
          "name": "drop.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.small": {
      "$type": "number",
      "$value": "{base.static.radius.small}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.medium}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.large}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.xlarge}",
      "$description": "",
      "$extensions": {
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
          "name": "button.small.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.medium.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.large.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.xLarge.default.borderRadius",
          "mode": "default"
        }
      ]
    },
    "borderWidth.none": {
      "$type": "number",
      "$value": "{base.static.borderWidth.none}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.xsmall": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.small": {
      "$type": "number",
      "$value": "{base.static.borderWidth.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.medium": {
      "$type": "number",
      "$value": "{base.static.borderWidth.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.large": {
      "$type": "number",
      "$value": "{base.static.borderWidth.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.xlarge": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xlarge}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.default": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
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
          "name": "button.small.default.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.medium.default.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.medium.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.large.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.xsmall.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.small.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.large.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.xlarge.borderWidth",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.control.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.control.track.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.control.handle.borderWidth",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.item.borderWidth",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.container.borderWidth",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.control.borderWidth",
          "mode": "default"
        }
      ]
    },
    "content.xxsmall": {
      "$type": "number",
      "$value": "{base.static.content.xxsmall}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xsmall}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.small}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.medium}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.large}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xlarge}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xxlarge}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.small": {
      "$type": "number",
      "$value": "{base.dimension.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.medium": {
      "$type": "number",
      "$value": "{base.dimension.450}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.large": {
      "$type": "number",
      "$value": "{base.dimension.550}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.xlarge": {
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
    "size.icon.xxlarge": {
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
    "text.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.90}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "component.xsmall.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.labelText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.helpText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.infoText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.errorText.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "component.xsmall.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.labelText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.helpText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.infoText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.errorText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.valueText.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.small.default.fontSize",
          "mode": "default"
        },
        {
          "name": "button.small.toolbar.fontSize",
          "mode": "default"
        },
        {
          "name": "component.small.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.small.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.small.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.small.lineHeight": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.small.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "button.small.toolbar.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.small.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.small.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.small.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "menu.medium.item.fontSize",
          "mode": "default"
        },
        {
          "name": "component.medium.fontSize",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "switch.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "dataCell.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.placeholderText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.valueText.fontSize",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.medium.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.medium.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.medium.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "menu.medium.item.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.medium.lineHeight",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "switch.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "dataCell.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.placeholderText.lineHeight",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.medium.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.medium.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.large.default.fontSize",
          "mode": "default"
        },
        {
          "name": "component.large.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.large.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.large.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.300}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.large.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.large.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.large.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.large.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.xLarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.xLarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.xlarge.fontSize",
          "mode": "default"
        },
        {
          "name": "component.xlarge.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.xxlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xxlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.xxlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xxlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.3xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.3xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.3xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.3xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.3xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.3xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.4xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.4xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.4xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.4xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.4xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.4xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.5xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.900}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.5xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.5xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.5xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.900}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.5xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.5xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.6xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.1000}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.6xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.6xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.6xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.1000}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.6xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.6xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "heading.xlarge.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.600}",
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
    "heading.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.500}",
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
    "heading.large.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
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
    "heading.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
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
    "heading.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
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
    "heading.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.100}",
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
    "heading.medium.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
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
    "heading.small.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
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
    "heading.small.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.80}",
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
    "heading.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.80}",
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
    "heading.xsmall.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xxsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.80}",
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
    "heading.xxsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.80}",
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
    "heading.xxsmall.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "paragraph.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.90}",
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
    "paragraph.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
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
    "paragraph.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
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
    "paragraph.small.lineHeight": {
      "$type": "number",
      "$value": "{base.fontSize.300}",
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
    "paragraph.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
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
    "paragraph.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
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
    "paragraph.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.400}",
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
    "paragraph.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.300}",
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
    "paragraph.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
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
    "paragraph.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.400}",
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
    "paragraph.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.600}",
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
    "paragraph.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.600}",
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
      "$value": "{base.static.spacing.none}",
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
          "name": "formField.medium.input.group.container.paddingX",
          "mode": "default"
        }
      ]
    },
    "spacing.hair": {
      "$type": "number",
      "$value": "{base.static.spacing.hair}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xxsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.xxsmall}",
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
          "name": "drop.margin",
          "mode": "default"
        }
      ]
    },
    "spacing.small": {
      "$type": "number",
      "$value": "{base.static.spacing.xsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.small}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.medium}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.spacing.large}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.none}",
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
          "name": "menu.medium.item.borderRadius",
          "mode": "default"
        },
        {
          "name": "select.medium.option.borderRadius",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.item.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.hair": {
      "$type": "number",
      "$value": "{base.static.radius.hair}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.hair}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.xxsmall}",
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
          "name": "drop.borderRadius",
          "mode": "default"
        }
      ]
    },
    "radius.small": {
      "$type": "number",
      "$value": "{base.static.radius.xsmall}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.small}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.medium}",
      "$description": "",
      "$extensions": {
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
      "$value": "{base.static.radius.large}",
      "$description": "",
      "$extensions": {
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
          "name": "button.small.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.medium.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.large.default.borderRadius",
          "mode": "default"
        },
        {
          "name": "button.xLarge.default.borderRadius",
          "mode": "default"
        }
      ]
    },
    "borderWidth.none": {
      "$type": "number",
      "$value": "{base.static.borderWidth.none}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.xsmall": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.small": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.medium": {
      "$type": "number",
      "$value": "{base.static.borderWidth.small}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.large": {
      "$type": "number",
      "$value": "{base.static.borderWidth.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.xlarge": {
      "$type": "number",
      "$value": "{base.static.borderWidth.large}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "borderWidth.default": {
      "$type": "number",
      "$value": "{base.static.borderWidth.xsmall}",
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
          "name": "button.small.default.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.medium.default.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.medium.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "button.large.toolbar.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.xsmall.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.small.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.large.borderWidth",
          "mode": "default"
        },
        {
          "name": "component.xlarge.borderWidth",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.control.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.control.track.borderWidth",
          "mode": "default"
        },
        {
          "name": "switch.medium.control.handle.borderWidth",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.item.borderWidth",
          "mode": "default"
        },
        {
          "name": "formField.medium.input.group.container.borderWidth",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.control.borderWidth",
          "mode": "default"
        }
      ]
    },
    "content.xxsmall": {
      "$type": "number",
      "$value": "{base.static.content.xxsmall}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xxsmall}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xsmall}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.small}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.medium}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.large}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
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
      "$value": "{base.static.content.xlarge}",
      "$description": "Content tokens are generally scoped for the width and height of containers or layout elements. For example, box, card, layout-grids and page padding widths.",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.small": {
      "$type": "number",
      "$value": "{base.dimension.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.medium": {
      "$type": "number",
      "$value": "{base.dimension.450}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.large": {
      "$type": "number",
      "$value": "{base.dimension.550}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "size.icon.xlarge": {
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
    "size.icon.xxlarge": {
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
    "text.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.90}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "component.xsmall.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.labelText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.helpText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.infoText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.errorText.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "component.xsmall.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.labelText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.helpText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.infoText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.errorText.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.valueText.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.small.default.fontSize",
          "mode": "default"
        },
        {
          "name": "button.small.toolbar.fontSize",
          "mode": "default"
        },
        {
          "name": "component.small.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.small.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.small.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.small.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.small.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "button.small.toolbar.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.small.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.small.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.small.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "menu.medium.item.fontSize",
          "mode": "default"
        },
        {
          "name": "component.medium.fontSize",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "switch.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "dataCell.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.placeholderText.fontSize",
          "mode": "default"
        },
        {
          "name": "formField.medium.valueText.fontSize",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.label.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.medium.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.medium.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.medium.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "menu.medium.item.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.medium.lineHeight",
          "mode": "default"
        },
        {
          "name": "checkbox.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "switch.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "dataCell.lineHeight",
          "mode": "default"
        },
        {
          "name": "formField.medium.placeholderText.lineHeight",
          "mode": "default"
        },
        {
          "name": "radioButton.medium.label.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.medium.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.medium.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.large.default.fontSize",
          "mode": "default"
        },
        {
          "name": "component.large.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.large.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.large.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.300}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.large.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.large.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.large.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.large.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.xLarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "button.xLarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "component.xlarge.fontSize",
          "mode": "default"
        },
        {
          "name": "component.xlarge.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.xxlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.xxlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.xxlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.xxlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.3xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.3xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.3xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.3xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.700}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.3xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.3xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.4xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.4xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.4xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.4xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.4xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.4xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.5xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.900}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.5xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.5xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.5xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.900}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.5xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.5xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "text.6xl.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.1000}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "FONT_SIZE"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.6xlarge.default.fontSize",
          "mode": "default"
        },
        {
          "name": "anchor.6xlarge.emphasized.fontSize",
          "mode": "default"
        }
      ]
    },
    "text.6xl.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.1000}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "LINE_HEIGHT"
          ],
          "codeSyntax": {}
        }
      },
      "usedBy": [
        {
          "name": "anchor.6xlarge.default.lineHeight",
          "mode": "default"
        },
        {
          "name": "anchor.6xlarge.emphasized.lineHeight",
          "mode": "default"
        }
      ]
    },
    "heading.xlarge.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
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
    "heading.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
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
    "heading.large.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.300}",
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
    "heading.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.100}",
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
    "heading.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
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
    "heading.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
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
    "heading.medium.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.80}",
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
    "heading.small.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.80}",
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
    "heading.small.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.medium}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.80}",
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
    "heading.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.80}",
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
    "heading.xsmall.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "heading.xxsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.80}",
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
    "heading.xxsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.80}",
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
    "heading.xxsmall.fontWeight": {
      "$type": "number",
      "$value": "{base.fontWeight.semibold}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "paragraph.xsmall.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.90}",
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
    "paragraph.xsmall.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.90}",
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
    "paragraph.small.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.100}",
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
    "paragraph.small.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.300}",
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
    "paragraph.medium.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.200}",
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
    "paragraph.medium.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.200}",
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
    "paragraph.large.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.400}",
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
    "paragraph.large.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.300}",
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
    "paragraph.xlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.500}",
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
    "paragraph.xlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.400}",
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
    "paragraph.xxlarge.fontSize": {
      "$type": "number",
      "$value": "{base.fontSize.600}",
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
    "paragraph.xxlarge.lineHeight": {
      "$type": "number",
      "$value": "{base.lineHeight.600}",
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
          "name": "base.static.spacing.none",
          "mode": "base"
        },
        {
          "name": "base.static.radius.none",
          "mode": "base"
        },
        {
          "name": "base.static.borderWidth.none",
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
          "name": "base.static.spacing.hair",
          "mode": "base"
        },
        {
          "name": "base.static.radius.hair",
          "mode": "base"
        },
        {
          "name": "base.static.borderWidth.xsmall",
          "mode": "base"
        },
        {
          "name": "base.static.borderWidth.default",
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
          "name": "base.static.borderWidth.small",
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
          "name": "base.static.spacing.xxsmall",
          "mode": "base"
        },
        {
          "name": "base.static.radius.xxsmall",
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
          "name": "base.static.borderWidth.medium",
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
          "name": "base.static.spacing.xsmall",
          "mode": "base"
        },
        {
          "name": "base.static.radius.xsmall",
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
    "base.dimension.225": {
      "$type": "number",
      "$value": 9,
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "ALL_SCOPES"
          ],
          "codeSyntax": {}
        }
      }
    },
    "base.dimension.250": {
      "$type": "number",
      "$value": 10,
      "$description": "",
      "$extensions": {
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
          "name": "base.static.spacing.small",
          "mode": "base"
        },
        {
          "name": "base.static.radius.small",
          "mode": "base"
        },
        {
          "name": "base.static.borderWidth.large",
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
      },
      "usedBy": [
        {
          "name": "size.icon.xsmall",
          "mode": "large"
        },
        {
          "name": "size.icon.small",
          "mode": "large"
        },
        {
          "name": "size.icon.xsmall",
          "mode": "small"
        },
        {
          "name": "size.icon.small",
          "mode": "small"
        }
      ]
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
      },
      "usedBy": [
        {
          "name": "size.icon.medium",
          "mode": "large"
        },
        {
          "name": "size.icon.medium",
          "mode": "small"
        }
      ]
    },
    "base.dimension.475": {
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
    "base.dimension.550": {
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
          "name": "size.icon.large",
          "mode": "large"
        },
        {
          "name": "size.icon.large",
          "mode": "small"
        }
      ]
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
          "name": "size.icon.xlarge",
          "mode": "large"
        },
        {
          "name": "size.icon.xlarge",
          "mode": "small"
        },
        {
          "name": "base.static.spacing.medium",
          "mode": "base"
        },
        {
          "name": "base.static.radius.medium",
          "mode": "base"
        },
        {
          "name": "base.static.borderWidth.xlarge",
          "mode": "base"
        }
      ]
    },
    "base.dimension.700": {
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
      }
    },
    "base.dimension.750": {
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
      }
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
      },
      "usedBy": [
        {
          "name": "size.icon.xxlarge",
          "mode": "large"
        },
        {
          "name": "size.icon.xxlarge",
          "mode": "small"
        }
      ]
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
          "name": "base.static.spacing.large",
          "mode": "base"
        },
        {
          "name": "base.static.radius.large",
          "mode": "base"
        },
        {
          "name": "base.static.content.xxsmall",
          "mode": "base"
        }
      ]
    },
    "base.dimension.1800": {
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
      }
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
          "name": "base.static.spacing.xlarge",
          "mode": "base"
        },
        {
          "name": "base.static.radius.xlarge",
          "mode": "base"
        },
        {
          "name": "base.static.content.xsmall",
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
          "name": "base.static.content.small",
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
          "name": "radius.full",
          "mode": "large"
        },
        {
          "name": "radius.full",
          "mode": "small"
        },
        {
          "name": "base.static.content.medium",
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
          "name": "base.static.content.large",
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
          "name": "base.static.content.xlarge",
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
          "name": "base.static.content.xxlarge",
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
    "base.color.grey.1100": {
      "$type": "color",
      "$value": "#292929",
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
          "name": "color.background.floating",
          "mode": "dark"
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
        },
        {
          "name": "color.text.inverse.default",
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
          "name": "color.background.floating",
          "mode": "light"
        },
        {
          "name": "color.text.onPrimary",
          "mode": "light"
        },
        {
          "name": "color.text.inverse.default",
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
    "base.color.white.opacity7": {
      "$type": "color",
      "$value": "#ffffff12",
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
          "name": "color.background.disabled",
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
          "name": "color.border.weak",
          "mode": "dark"
        },
        {
          "name": "color.border.disabled",
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
          "name": "color.text.xweak",
          "mode": "dark"
        },
        {
          "name": "color.icon.xweak",
          "mode": "dark"
        }
      ]
    },
    "base.color.white.opacity24": {
      "$type": "color",
      "$value": "#ffffff3d",
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
          "mode": "dark"
        },
        {
          "name": "color.icon.disabled",
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
    "base.fontFamily.primary": {
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
    "base.fontFamily.code": {
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
    "base.fontSize.80": {
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
          "name": "heading.xsmall.fontSize",
          "mode": "large"
        },
        {
          "name": "heading.xxsmall.fontSize",
          "mode": "large"
        },
        {
          "name": "heading.small.fontSize",
          "mode": "small"
        },
        {
          "name": "heading.xsmall.fontSize",
          "mode": "small"
        },
        {
          "name": "heading.xxsmall.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.90": {
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
          "name": "paragraph.xsmall.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xsmall.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.xsmall.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.100": {
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
          "name": "heading.medium.fontSize",
          "mode": "large"
        },
        {
          "name": "heading.small.fontSize",
          "mode": "large"
        },
        {
          "name": "paragraph.small.fontSize",
          "mode": "large"
        },
        {
          "name": "text.small.fontSize",
          "mode": "small"
        },
        {
          "name": "heading.medium.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.small.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.200": {
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
          "name": "text.small.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.medium.fontSize",
          "mode": "large"
        },
        {
          "name": "paragraph.medium.fontSize",
          "mode": "large"
        },
        {
          "name": "text.medium.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.medium.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.300": {
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
          "name": "paragraph.small.lineHeight",
          "mode": "large"
        },
        {
          "name": "heading.large.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.400": {
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
          "name": "paragraph.large.fontSize",
          "mode": "large"
        },
        {
          "name": "text.large.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.large.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.500": {
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
          "name": "heading.large.fontSize",
          "mode": "large"
        },
        {
          "name": "paragraph.xlarge.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xlarge.fontSize",
          "mode": "small"
        },
        {
          "name": "heading.xlarge.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.xlarge.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.600": {
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
          "name": "heading.xlarge.fontSize",
          "mode": "large"
        },
        {
          "name": "paragraph.xxlarge.fontSize",
          "mode": "large"
        },
        {
          "name": "text.xxlarge.fontSize",
          "mode": "small"
        },
        {
          "name": "paragraph.xxlarge.fontSize",
          "mode": "small"
        }
      ]
    },
    "base.fontSize.700": {
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
    "base.fontSize.800": {
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
    "base.fontSize.900": {
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
    "base.fontSize.1000": {
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
    "base.lineHeight.80": {
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
          "name": "heading.xsmall.lineHeight",
          "mode": "large"
        },
        {
          "name": "heading.xxsmall.lineHeight",
          "mode": "large"
        },
        {
          "name": "heading.small.lineHeight",
          "mode": "small"
        },
        {
          "name": "heading.xsmall.lineHeight",
          "mode": "small"
        },
        {
          "name": "heading.xxsmall.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.90": {
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
          "name": "heading.small.lineHeight",
          "mode": "large"
        },
        {
          "name": "paragraph.xsmall.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xsmall.lineHeight",
          "mode": "small"
        },
        {
          "name": "heading.medium.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.xsmall.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.100": {
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
          "name": "heading.medium.lineHeight",
          "mode": "large"
        },
        {
          "name": "heading.large.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.200": {
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
          "name": "heading.large.lineHeight",
          "mode": "large"
        },
        {
          "name": "paragraph.medium.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.small.lineHeight",
          "mode": "small"
        },
        {
          "name": "text.medium.lineHeight",
          "mode": "small"
        },
        {
          "name": "heading.xlarge.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.medium.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.300": {
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
          "name": "paragraph.large.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.large.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.small.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.large.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.400": {
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
          "name": "paragraph.xlarge.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xlarge.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.xlarge.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.500": {
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
          "name": "heading.xlarge.lineHeight",
          "mode": "large"
        }
      ]
    },
    "base.lineHeight.600": {
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
          "name": "paragraph.xxlarge.lineHeight",
          "mode": "large"
        },
        {
          "name": "text.xxlarge.lineHeight",
          "mode": "small"
        },
        {
          "name": "paragraph.xxlarge.lineHeight",
          "mode": "small"
        }
      ]
    },
    "base.lineHeight.700": {
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
    "base.lineHeight.800": {
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
    "base.lineHeight.900": {
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
    "base.lineHeight.1000": {
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
    "base.fontWeight.thin": {
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
    "base.fontWeight.light": {
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
    "base.fontWeight.regular": {
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
    "base.fontWeight.medium": {
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
      },
      "usedBy": [
        {
          "name": "heading.xlarge.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.large.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.medium.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.small.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.xlarge.fontWeight",
          "mode": "small"
        },
        {
          "name": "heading.large.fontWeight",
          "mode": "small"
        },
        {
          "name": "heading.medium.fontWeight",
          "mode": "small"
        },
        {
          "name": "heading.small.fontWeight",
          "mode": "small"
        }
      ]
    },
    "base.fontWeight.semibold": {
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
      "usedBy": [
        {
          "name": "heading.xsmall.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.xxsmall.fontWeight",
          "mode": "large"
        },
        {
          "name": "heading.xsmall.fontWeight",
          "mode": "small"
        },
        {
          "name": "heading.xxsmall.fontWeight",
          "mode": "small"
        }
      ]
    },
    "base.fontWeight.bold": {
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
    "base.fontWeight.black": {
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
    "base.static.spacing.none": {
      "$type": "number",
      "$value": "{base.dimension.0}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.hair": {
      "$type": "number",
      "$value": "{base.dimension.25}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.75}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.150}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.small": {
      "$type": "number",
      "$value": "{base.dimension.300}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.medium": {
      "$type": "number",
      "$value": "{base.dimension.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.large": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.spacing.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP"
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
    "base.static.radius.none": {
      "$type": "number",
      "$value": "{base.dimension.0}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.hair": {
      "$type": "number",
      "$value": "{base.dimension.25}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.75}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.150}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.small": {
      "$type": "number",
      "$value": "{base.dimension.300}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.medium": {
      "$type": "number",
      "$value": "{base.dimension.600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.large": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.radius.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "CORNER_RADIUS"
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
    "base.static.borderWidth.none": {
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
          "name": "borderWidth.none",
          "mode": "large"
        },
        {
          "name": "borderWidth.none",
          "mode": "small"
        }
      ]
    },
    "base.static.borderWidth.xsmall": {
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
          "name": "borderWidth.xsmall",
          "mode": "large"
        },
        {
          "name": "borderWidth.default",
          "mode": "large"
        },
        {
          "name": "borderWidth.xsmall",
          "mode": "small"
        },
        {
          "name": "borderWidth.small",
          "mode": "small"
        },
        {
          "name": "borderWidth.default",
          "mode": "small"
        }
      ]
    },
    "base.static.borderWidth.small": {
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
          "name": "borderWidth.small",
          "mode": "large"
        },
        {
          "name": "borderWidth.medium",
          "mode": "small"
        }
      ]
    },
    "base.static.borderWidth.medium": {
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
          "name": "borderWidth.medium",
          "mode": "large"
        },
        {
          "name": "borderWidth.large",
          "mode": "small"
        }
      ]
    },
    "base.static.borderWidth.large": {
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
          "name": "borderWidth.large",
          "mode": "large"
        },
        {
          "name": "borderWidth.xlarge",
          "mode": "small"
        }
      ]
    },
    "base.static.borderWidth.xlarge": {
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
          "name": "borderWidth.xlarge",
          "mode": "large"
        }
      ]
    },
    "base.static.borderWidth.default": {
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
      }
    },
    "base.static.content.xxsmall": {
      "$type": "number",
      "$value": "{base.dimension.1200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.xsmall": {
      "$type": "number",
      "$value": "{base.dimension.2400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.small": {
      "$type": "number",
      "$value": "{base.dimension.4800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.medium": {
      "$type": "number",
      "$value": "{base.dimension.9600}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.large": {
      "$type": "number",
      "$value": "{base.dimension.19200}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.xlarge": {
      "$type": "number",
      "$value": "{base.dimension.38400}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
    "base.static.content.xxlarge": {
      "$type": "number",
      "$value": "{base.dimension.76800}",
      "$description": "",
      "$extensions": {
        "com.figma": {
          "hiddenFromPublishing": false,
          "scopes": [
            "GAP",
            "WIDTH_HEIGHT"
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
          "name": "color.background.primary.hover",
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
    }
  }
}