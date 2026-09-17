// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { addStructuredTokens } from './tokenUtilsShared';

const addDocsTokens = structuredTokens => {
  addStructuredTokens(structuredTokens, {
    rootKey: undefined, // No root key for docs tokens
  });
};

export { addDocsTokens };
