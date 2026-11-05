// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import { ThemeContext, type ThemeType } from 'grommet';
import { RepositoriesTable } from './RepositoriesTable';
import { SetupPage } from './SetupPage';

/**
 * Same recommended table, with the theme's `text.small` token (14px / 20px)
 * applied as the default text size for this region only. This is the
 * sanctioned way for a product to opt one dense surface into smaller text
 * without changing the application-wide default or inventing a 13px value.
 */
const CompactText = ({ children }: { children: React.ReactNode }) => {
  const theme = useContext(ThemeContext) as ThemeType;
  return (
    <ThemeContext.Extend value={{ text: { medium: theme.text?.small } }}>
      {children}
    </ThemeContext.Extend>
  );
};

export const ZertoSetupCompactText = () => (
  <SetupPage>
    <CompactText>
      <RepositoriesTable />
    </CompactText>
  </SetupPage>
);
