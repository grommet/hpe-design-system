// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { RepositoriesTable } from './RepositoriesTable';
import { SetupPage } from './SetupPage';

export const ZertoSetupRecommended = () => (
  <SetupPage>
    <RepositoriesTable />
  </SetupPage>
);
