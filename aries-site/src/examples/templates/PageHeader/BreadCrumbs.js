import { PropTypes } from 'prop-types';
import { Anchor, Box, Text } from 'grommet';

export const BreadCrumbs = ({ links }) => (
  <Box direction="row" gap="xxsmall">
    {links.map((crumb, index) =>
      index < links.length - 1 ? (
        <Box key={crumb.label} direction="row">
          <Text size="xsmall">
            <Anchor label={crumb.label} href={crumb.href} /> /{' '}
          </Text>
        </Box>
      ) : (
        <Text key={crumb.label} size="xsmall">
          <Anchor label={crumb.label} href={crumb.href} />
        </Text>
      ),
    )}
  </Box>
);

BreadCrumbs.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};
