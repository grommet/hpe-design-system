// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Anchor, Box, Button, Heading, Skeleton } from 'grommet';
import PropTypes from 'prop-types';
import { Edit } from '@hpe-design/icons-grommet';
import { Link as LinkIcon } from 'grommet-icons';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useLoading } from '../utils/skeleton';

const layoutLinks = [
  { label: 'PageContent multiple', to: '/pagecontent-multiple' },
  { label: 'Collection', to: '/layouts/collection' },
  { label: 'Dashboard', to: '/layouts/dashboard' },
  { label: 'Detail - COM', to: '/layouts/detail-com' },
  { label: 'Detail - DSCC System', to: '/layouts/detail-dscc-system' },
  { label: 'Detail - OpsRamp', to: '/layouts/detail-opsramp' },
  { label: 'Empty state', to: '/layouts/empty-state' },
  { label: 'Form', to: '/layouts/form' },
  { label: 'Results', to: '/layouts/results' },
  { label: 'Navigational sidebar', to: '/layouts/navigational-sidebar' },
];

export const QuickActions = ({ edit = true, icons }) => {
  const theme = useContext(ThemeContext);
  const skeleton = useLoading(200);
  return (
    <Box gap="medium">
      <Box direction="row" align="center" justify="between">
        <Heading level={2} margin="none">
          Quick Actions
        </Heading>
        {edit && <Button label="Edit" icon={<Edit />} reverse />}
      </Box>
      <Box gap="small" animation={!skeleton ? 'fadeIn' : undefined}>
        {layoutLinks.map(({ label, to }) =>
          skeleton ? (
            <Skeleton key={to} height={theme.text.medium.size} />
          ) : (
            <Anchor
              key={to}
              as={Link}
              to={to}
              icon={icons && <LinkIcon />}
              label={label}
            />
          ),
        )}
      </Box>
    </Box>
  );
};

QuickActions.propTypes = {
  icons: PropTypes.bool,
  edit: PropTypes.bool,
};
