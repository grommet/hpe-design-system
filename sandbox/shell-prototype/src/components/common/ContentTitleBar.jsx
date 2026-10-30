// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, Menu, Text } from 'grommet';
import { Bookmark, More } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';

// Top of the primary content area: page title, page-level actions
// (more, bookmark) and breadcrumbs. Owned by the service, inside the frame.
export const ContentTitleBar = ({ title, crumbs = [], onCrumb }) => {
  const { dispatch } = useShell();
  return (
    <Box flex={false} gap="xsmall" pad={{ top: 'medium' }}>
      <Box direction="row" justify="between" align="center" gap="small">
        <Text size="large" weight={500} color="text-strong">
          {title}
        </Text>
        <Box direction="row" flex={false}>
          <Menu
            icon={<More aria-hidden="true" />}
            a11yTitle="Page actions"
            dropAlign={{ top: 'bottom', right: 'right' }}
            items={[
              { label: 'Customize dashboard' },
              { label: 'Share page' },
              { label: 'Export' },
            ]}
          />
          <Button
            icon={<Bookmark aria-hidden="true" />}
            a11yTitle="Bookmark this page"
            tip="Bookmark"
            onClick={() =>
              dispatch({
                type: 'SHOW_TOAST',
                title: 'Page bookmarked',
                message: `${crumbs[crumbs.length - 1] || title} was added to your bookmarks.`,
              })
            }
          />
        </Box>
      </Box>
      {crumbs.length > 0 && (
        <Box
          direction="row"
          align="center"
          gap="xsmall"
          as="nav"
          aria-label="Breadcrumb"
        >
          <Anchor
            label="…"
            size="small"
            a11yTitle={`${title} overview`}
            onClick={() => onCrumb && onCrumb()}
          />
          {crumbs.map((crumb, index) => (
            <Fragment key={crumb}>
              <Text size="small" color="text-weak">
                /
              </Text>
              <Box
                background={
                  index === crumbs.length - 1
                    ? 'background-contrast'
                    : undefined
                }
                round="xsmall"
                pad={{ horizontal: '3xsmall', vertical: '5xsmall' }}
              >
                <Text
                  size="small"
                  color="text-strong"
                  aria-current={
                    index === crumbs.length - 1 ? 'page' : undefined
                  }
                >
                  {crumb}
                </Text>
              </Box>
            </Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

ContentTitleBar.propTypes = {
  title: PropTypes.string.isRequired,
  crumbs: PropTypes.arrayOf(PropTypes.string),
  onCrumb: PropTypes.func,
};
