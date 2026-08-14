// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Button, Footer } from 'grommet';
import { Left, Right } from '@hpe-design/icons-grommet';

export const FooterPageExample = () => (
  <Footer fill="horizontal">
    <Button label="Go back" icon={<Left />} />
    <Button label="Next" icon={<Right />} reverse />
  </Footer>
);
