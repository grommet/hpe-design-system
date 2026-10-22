# Design Tokens in Figma

Use variables from the **Design tokens - Semantic** library when creating or
updating product designs in Figma. Bind variables to properties instead of
typing token values or copying values from elsewhere.

Use semantic variables for color, typography, and effects according to their
names and intended roles.

## Choose a Variable for Its Intended Use

Use a variable that matches the property you are styling. Keep spacing,
container dimensions, corner radius, and border width in their respective
scales:

- Spacing variables are for gaps: use the `GAP` scope.
- Container variables are for width and height: use the `WIDTH_HEIGHT` scope.
- Radius variables are for corner rounding: use the `CORNER_RADIUS` scope.
- Border-width variables are for strokes: use the `STROKE_FLOAT` scope.

These scopes keep the scales distinct. For example, do not use a container
dimension to set the gap between items.

## Keep Variables Bound

Bind the semantic variable rather than entering its resolved value as a number.
A typed value has no variable behind it, so Dev Mode shows a value instead of
the token name, and the design will not follow future updates to the variable.

## Use Layout Variables for Compositions

For layouts such as cards, lists, toolbars, and layers, use semantic spacing and
container variables to define the composition. Use spacing variables for gaps
between stacked children, including inside an element.

For more information, see [Using tokens in Figma](https://design-system.hpe.design/design-tokens/using-design-tokens-in-figma).
