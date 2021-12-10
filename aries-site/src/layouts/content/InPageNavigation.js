import Link from 'next/link';
import PropTypes from 'prop-types';
import { Anchor, Box, Nav, Text } from 'grommet';
import { siteContents } from '../../data/search/contentForSearch';
import { nameToSlug } from '../../utils';

export const InPageNavigation = ({ title }) => {
  const match = siteContents.find(
    item => item.name.toLowerCase() === title.toLowerCase(),
  );
  const regexp = new RegExp(/#{1,} (...+?) ?~{2}/, 'g');
  const headings = match && [...match.content.matchAll(regexp)];

  return headings ? (
    <Box
      gap="xsmall"
      style={{
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        position: 'sticky',
        marginTop: '50px',
        flexShrink: 0,
        top: '30px',
      }}
      width="small"
      flex={false}
    >
      <Text color="text-strong" size="small" weight="bold">
        Contents
      </Text>
      <Nav gap="xsmall">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          const [level] = heading[0].match(levelRegexp);
          return (
            <Link key={index} href={`#${nameToSlug(heading[1])}`} passHref>
              <Anchor
                size="small"
                label={heading[1]}
                margin={{ left: level.length > 2 ? 'small' : undefined }}
              />
            </Link>
          );
        })}
      </Nav>
    </Box>
  ) : null;
};

InPageNavigation.propTypes = {
  title: PropTypes.string.isRequired,
};
