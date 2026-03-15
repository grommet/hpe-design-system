## Responsiveness

Ensure you are always being mindful of our responsive page layouts when designing user experiences. Even if you don’t anticipate your users leveraging mobile or tablet devices, they may be reducing/expanding browser widths, zooming in on content, or manipulating the browser in unanticipated ways. As a best practice, always design for a usable UI on all browser widths and resolutions.

### Best practices

- Ensure the button label does not wrap, truncate, or alter the text content in any way when presented on smaller browser widths.
- Button label text should not scale down to fit on smaller browser widths.
- The minimum button width for any button should be 42px.

### Single buttons

On screen widths of less than or equal to 576px (Grommet "small"), it is best to have buttons fill the full width of the container. Because press target size and an unclear visual hierarchy are key concerns at smaller resolutions, this utilizes available space to ensure users can easily identify and interact with the buttons.

<BestPracticeGroup>
  <Example
    bestPractice={{
      type: 'do',
      message:
        'On small resolutions, full-width buttons help users more easily identify and interact with actions on smaller browser widths and when using the press gesture.',
    }}
  >
    <ButtonGoodSignUpPreview />
  </Example>
  <Example
    bestPractice={{
      type: 'dont',
      message:
        'On small resolutions, keeping button widths smaller lessen their visual impact and makes it more difficult for users to interact with them on smaller browser widths.',
    }}
  >
    <ButtonBadSignUpPreview />
  </Example>
</BestPracticeGroup>

### Button groups

For button groups on screen widths less than or equal to 576px (Grommet "small"), ensure each button within the group follows the established guidance for single buttons. If a button group is presented inline horizontally, rearrange the buttons vertically on smaller browser widths to ensure the proper full button widths can be achieved.

<BestPracticeGroup>
  <Example
    bestPractice={{
      type: 'do',
      message:
        'Reorder the button group vertically on smaller screens to ensure each individual button is given enough space to be easily read and actioned on.',
    }}
  >
    <ButtonGoodLongTitlePreview />
  </Example>
  <Example
    bestPractice={{
      type: 'dont',
      message:
        'Horizontal, inline button groups on smaller browser widths create opportunities for truncation, word wraps, and undersized press targets.',
    }}
  >
    <ButtonBadGroupPreview />
  </Example>
</BestPracticeGroup>

## Accessibility
