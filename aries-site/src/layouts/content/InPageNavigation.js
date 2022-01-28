import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
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
      pad={{ left: 'xxsmall' }} // account for focus indicator space
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
      <Text color="text-strong" size="xsmall" weight="bold">
        CONTENTS
      </Text>
      <Nav gap="none">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          const [level] = heading[0].match(levelRegexp);
          let margin;
          if (level.length > 3) margin = 'medium';
          else if (level.length === 3) margin = 'small';
          return (
            <Link key={index} href={`#${nameToSlug(heading[1])}`} passHref>
              <Button
                alignSelf="start"
                style={{ textAlign: 'start', borderRadius: '3px' }}
                size="small"
                kind="option"
                label={
                  <Text color="text-strong" size="small">
                    {heading[1]}
                  </Text>
                }
                margin={{ left: margin }}
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
