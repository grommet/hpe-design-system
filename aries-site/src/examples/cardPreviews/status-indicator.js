import React from 'react';
import { StatusGoodSmall } from 'grommet-icons/icons/StatusGoodSmall';
import { StatusWarningSmall } from 'grommet-icons/icons/StatusWarningSmall';
import { StatusCriticalSmall } from 'grommet-icons/icons/StatusCriticalSmall';
import { StatusUnknownSmall } from 'grommet-icons/icons/StatusUnknownSmall';

import { Box } from 'grommet';

export const StatusIndicatorPreview = () => (
    <Box align="center" justify="center" fill background="background-back">
        <Box direction="row" gap="small">
            <StatusGoodSmall color="status-ok" />
            <StatusWarningSmall color="status-warning" />
            <StatusCriticalSmall color="status-critical" />
            <StatusUnknownSmall color="status-unknown" />
        </Box>
    </Box>
);
