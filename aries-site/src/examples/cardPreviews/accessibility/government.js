import React from 'react';
import { Box } from 'grommet';
import { Group, Organization } from 'grommet-icons';

export const AccessibilityGovernmentPreview = () => (
    <Box direction="row" gap="small">
        <Organization color="text-strong" size="xlarge" />
        <Group color="text-strong" size="xlarge" />
    </Box>
);
