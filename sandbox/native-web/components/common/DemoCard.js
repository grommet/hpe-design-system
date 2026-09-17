// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export const DemoCard = ({ title, body, footer }) => `
    <div class="card">
        <h2>${title}</h2>
        <div class="card-body">${body}</div>
        <div class="card-footer">${footer}</div>
    </div>
`;
