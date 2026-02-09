import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from 'grommet';
import {
  labelArg,
  textSizesArg,
  a11yTitleArg,
  backgroundArg,
  onChangeArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    a11yTitle: a11yTitleArg,
    background: backgroundArg,
    name: labelArg,
    onClick: onChangeArg,
    onRemove: onChangeArg,
    size: textSizesArg,
    value: labelArg,
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  render: args => <Tag {...args} />,
  args: {
    a11yTitle: undefined,
    background: undefined,
    name: 'name',
    onClick: undefined,
    onRemove: undefined,
    size: 'small',
    value: 'value',
  },
} satisfies Story;
