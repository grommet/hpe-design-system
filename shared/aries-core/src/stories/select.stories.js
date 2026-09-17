// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Loading } from './select/LoadingStory';
import { CustomOptions } from './select/CustomOptionsStory';
import { GroupedOptions } from './select/GroupedOptionsStory';

const meta = {
  title: 'Patterns/Forms/Input customization',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export { Loading, CustomOptions, GroupedOptions };
