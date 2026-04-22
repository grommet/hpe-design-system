import React from 'react';
import { useInert } from '@shared/hooks';
import { SearchExample } from '../components/search';

export const SearchPreview = () => {
    const ref = useInert();

    return <SearchExample ref={ref} />;
};
