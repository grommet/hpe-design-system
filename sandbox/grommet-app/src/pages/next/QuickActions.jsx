import { Anchor, Box, Button, Heading, Skeleton } from 'grommet';
import PropTypes from 'prop-types';
import {
  ChapterAdd,
  Cloud,
  Edit,
  MapLocation,
  Stakeholder,
  UserAdd,
} from 'grommet-icons';
import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import { useLoading } from '../../utils/skeleton';

export const QuickActions = ({ edit = true, icons }) => {
  const theme = useContext(ThemeContext);
  const skeleton = useLoading(200);
  return (
    <Box gap="medium">
      <Box direction="row" align="center" justify="between">
        <Heading level={2} margin="none">
          Quick Actions
        </Heading>
        {edit && (
          <Button
            label="Edit"
            icon={<Edit color="foreground-brand-default" />}
            kind="subtle"
            reverse
          />
        )}
      </Box>
      <Box gap="small" animation={!skeleton ? 'fadeIn' : undefined}>
        {skeleton ? (
          <Skeleton height={theme.text.medium.size} />
        ) : (
          <Anchor
            icon={icons && <ChapterAdd color="foreground-brand-default" />}
            label="Add devices"
            href="#"
          />
        )}
        {skeleton ? (
          <Skeleton height={theme.text.medium.size} />
        ) : (
          <Anchor
            icon={icons && <Cloud color="foreground-brand-default" />}
            label="Add service subscriptions"
            href="#"
          />
        )}
        {skeleton ? (
          <Skeleton height={theme.text.medium.size} />
        ) : (
          <Anchor
            icon={icons && <UserAdd color="foreground-brand-default" />}
            label="Add users"
            href="#"
          />
        )}
        {skeleton ? (
          <Skeleton height={theme.text.medium.size} />
        ) : (
          <Anchor
            icon={icons && <Stakeholder color="foreground-brand-default" />}
            label="Assign roles"
            href="#"
          />
        )}
        {skeleton ? (
          <Skeleton height={theme.text.medium.size} />
        ) : (
          <Anchor
            icon={icons && <MapLocation color="foreground-brand-default" />}
            label="Create location"
            href="#"
          />
        )}
      </Box>
    </Box>
  );
};

QuickActions.propTypes = {
  icons: PropTypes.bool,
  edit: PropTypes.bool,
};
