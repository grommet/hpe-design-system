// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const PageHeader = ({
  title,
  actions,
}) => `<div class="pageHeader align-center">
<h1>${title}</h1>
${actions || ''}
</div>`;
