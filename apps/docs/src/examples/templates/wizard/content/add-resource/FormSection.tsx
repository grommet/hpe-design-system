// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps } from 'react';
import { Box, Heading, Text } from 'grommet';
import type { ThemeType } from 'grommet/themes';
import { ThemeContext } from 'styled-components';

type FormSectionProps = ComponentProps<typeof Box> & {
  description?: string;
  title: string;
};

// A grouped region of the form. Stands in for the experimental Figma
// "Container" component. Each section reuses the theme's wizard.content
// surface so it reads as a native Wizard step card (WizardContent itself is
// flattened in AddResourceWizard so these cards are not nested in another).
export const FormSection = ({
  children,
  description,
  gap = 'medium',
  title,
  ...rest
}: FormSectionProps) => {
  const theme = useContext(ThemeContext) as ThemeType;
  const { background, pad, round } = theme.wizard?.content ?? {};

  return (
    <Box
      as="section"
      background={background}
      pad={pad}
      round={round}
      gap="small"
      flex={false}
      {...rest}
    >
      <Box gap="xxsmall">
        <Heading level={3} margin="none">
          {title}
        </Heading>
        {description && <Text>{description}</Text>}
      </Box>
      <Box gap={gap}>{children}</Box>
    </Box>
  );
};
