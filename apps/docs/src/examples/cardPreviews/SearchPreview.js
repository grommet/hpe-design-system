// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { useInert } from '@shared/hooks';
import { SearchExample } from '../components/search';

export const SearchPreview = () => {
    const ref = useInert();

    return <SearchExample ref={ref} />;
};
