import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
import { siteContents } from '../../data/search/contentForSearch';
import { nameToSlug } from '../../utils';

const useActiveHeadingId = (headings, options) => {
  const [activeHeadingId, setActiveHeadingId] = useState();
  const observer = useRef();
  useEffect(() => {
    const elements = headings.map(heading =>
      document.getElementById(nameToSlug(heading[1])),
    );
    observer.current?.disconnect();
    observer.current = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry?.isIntersecting) {
          setActiveHeadingId(entry.target.id);
        }
      });
    }, options);
    elements.forEach(el => {
      if (el) {
        observer.current?.observe(el);
      }
    });
    return () => observer.current?.disconnect();
  }, [headings, options]);
  return activeHeadingId;
};

export const InPageNavigation = ({ title }) => {
  const match = siteContents.find(
    item => item.name.toLowerCase() === title.toLowerCase(),
  );

  const regexp = new RegExp(/#{1,} (...+?) ?~{2}/, 'g');
  const headings = match && [...match.content.matchAll(regexp)];

  // top and bottom margin values for calculating intersection window
  const topMargin = '50';
  const bottomMargin = '-95';
  const activeId = useActiveHeadingId(headings, {
    rootMargin: `${topMargin}% 0% ${bottomMargin}% 0%`,
  });

  return headings.length > 0 ? (
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
      <Text
        color="text-strong"
        weight="bold"
        margin={{
          vertical: 'xsmall',
        }}
      >
        Jump to section
      </Text>

      <Nav gap="none">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          const [level] = heading[0].match(levelRegexp);
          // heading[1] refers to the full heading title matched by regex
          const headingTitle = heading[1];
          const active = activeId === nameToSlug(headingTitle);

          // TODO: margin/spacing for subheadings within ToC TBD,
          let margin;
          if (level.length > 3) margin = 'medium';
          else if (level.length === 3) margin = 'small';
          return (
            <Link key={index} href={`#${nameToSlug(headingTitle)}`} passHref>
              <Button
                alignSelf="start"
                style={{ textAlign: 'start', borderRadius: '3px' }}
                size="small"
                kind="option"
                margin={{ left: margin }}
                active={active}
                label={
                  <Text
                    // TODO: final text design TBD (based on active/hover)
                    color="text-strong"
                    size="small"
                    weight="normal"
                  >
                    {headingTitle}
                  </Text>
                }
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
