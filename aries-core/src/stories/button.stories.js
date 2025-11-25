/* eslint-disable grommet/button-single-kind */
import React from 'react';
import { Box, Button } from 'grommet';
import { Add } from 'grommet-icons';

const meta = {
  title: 'Button',
  component: Button,
  parameters: { actions: { argTypesRegex: '^on.*' } },
};

export default meta;

export const ButtonStorybookExample = {
  render: (args, { globals }) => {
    const { variant, label } = args;
    const theme = globals?.theme;
    const boxPad = theme === 'grommet' ? 'large' : 'xlarge';

    // Map variant to the correct boolean props
    const primary = variant === 'primary';
    const secondary = variant === 'secondary';
    const defaultBtn = variant === 'default';
    const disabled = variant === 'disabled';

    return (
      <Box direction="row" pad={boxPad} align="center">
        <Button
          primary={primary}
          secondary={secondary}
          default={defaultBtn}
          disabled={disabled}
          label={label}
          icon={<Add />}
          gap={args.gap}
          color={args.color}
          busy={args.busy}
        />
      </Box>
    );
  },

  play: async ({ canvas, userEvent }) => {
    const button = canvas.getByRole('button', {
      name: /Active Primary/i, // matches your default label
    });

    await userEvent.click(button);
  },
  args: {
    reverse: false,
    variant: 'primary',
    label: 'Active Primary',
    alignSelf: 'center',
    busy: false,
    color: 'brand',
    disabled: false,
    gap: 'small',
  },
  argTypes: {
    alignSelf: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: `How to align along the cross axis when contained in a Box
         or along the column axis when contained in a Grid.`,
    },
    busy: {
      control: 'boolean',
      description: `Whether the button is in a busy state and should
         display an animation.`,
    },
    color: {
      control: 'color',
      description: `Fill color for primary, label color for plain, border color
         otherwise.`,
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled.',
    },
    gap: {
      control: 'select',
      options: ['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'],
      description:
        'The amount of spacing between icon and label in the button.',
    },
    reverse: {
      control: 'boolean',
      description: 'Whether the icon and label should be reversed in order.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      codePanel: true,
      source: {
        transform: (code, storyContext) => {
          const theme = storyContext.globals?.theme;

          const iconImport =
            theme === 'grommet'
              ? "import { Add } from 'grommet-icons';"
              : "import { Add } from '@hpe-design/icons-grommet';";

          const componentImports = "import { Box, Button } from 'grommet';";

          let transformedCode = code;

          if (theme === 'grommet') {
            transformedCode = transformedCode.replace(
              /pad="xlarge"/g,
              'pad="large"',
            );
          } else {
            transformedCode = transformedCode.replace(
              /pad="large"/g,
              'pad="xlarge"',
            );
          }

          return `${componentImports}\n${iconImport}\n\n${transformedCode}`;
        },
      },
    },
  },
};
