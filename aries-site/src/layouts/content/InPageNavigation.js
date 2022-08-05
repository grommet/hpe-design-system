import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { siteContents } from '../../data/search/contentForSearch';
import { nameToSlug } from '../../utils';

const useActiveHeadingId = (headings, options) => {
  const [activeHeadingId, setActiveHeadingId] = useState();
  const observer = useRef();
  // useEffect finds which page heading is on screen as the user scrolls
  useEffect(() => {
    // if at top of page, do not show active heading on ToC
    window.onscroll = () => {
      if (window.pageYOffset === 0) {
        setActiveHeadingId(null);
      } else {
        // find page active page heading
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
      }
      return () => observer.current?.disconnect();
    };
  }, [headings, options]);
  return activeHeadingId;
};

export const InPageNavigation = ({ title }) => {
  const match = siteContents.find(
    item => item.name.toLowerCase() === title.toLowerCase(),
  );

  const theme = useContext(ThemeContext);
  const regexp = new RegExp(/#{1,} (...+?) ?~{2}/, 'g');
  const headings = match && [...match.content.matchAll(regexp)];

  let { large, medium } = theme.global.edgeSize;
  large = parseInt(large.replace('px', ''), 10); // 48
  medium = parseInt(medium.replace('px', ''), 10); // 24

  // top and bottom margin values to calculate intersection window
  const topMargin = large;
  const bottomMargin = `-${2 * large}`;
  const activeId = useActiveHeadingId(headings, {
    rootMargin: `${topMargin}% 0% ${bottomMargin}% 0%`,
  });

  // align "Jump to section" with page title at start
  const marginTop = `${large + medium}px`;

  return headings.length > 0 ? (
    <Box
      pad={{ horizontal: 'xxsmall' }} // pad for keyboard focus
      style={{
        // determine when TOC scroll is needed
        height: `calc(100vh - ${marginTop})`,
        overflowY: 'auto',
        position: 'sticky',
        marginTop,
        top: theme.global.edgeSize.large,
      }}
      width="small"
      flex={false}
    >
      <Box
        pad={{ horizontal: 'small', bottom: 'small' }}
        flex={false}
        border={{ side: 'left', color: 'border-weak', size: 'small' }}
      >
        <Text color="text-strong" weight="bold">
          Jump to section
        </Text>
      </Box>
      <Nav gap="none" a11yTitle="Jump to section">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          const [level] = heading[0].match(levelRegexp);
          // heading[1] refers to the full heading title matched by regex
          const headingTitle = heading[1];
          const active = activeId === nameToSlug(headingTitle);

          const borderLeft = {
            side: 'left',
            size: active ? 'medium' : 'small',
            color: active ? 'border-strong' : 'border-weak',
          };

          let subsectionPad = 'xsmall';
          if (level.length > 3) subsectionPad = 'large';
          else if (level.length === 3) subsectionPad = 'medium';
          return (
            <Box key={index} border={borderLeft}>
              <Link href={`#${nameToSlug(headingTitle)}`} passHref>
                <Button
                  style={{ textAlign: 'start' }}
                  size="small"
                  label={
                    <Box
                      pad={{ left: subsectionPad }}
                      margin={
                        active
                          ? undefined
                          : { left: theme.global.borderSize.small }
                      }
                    >
                      <Text color="text-strong" size="small" weight="normal">
                        {headingTitle}
                      </Text>
                    </Box>
                  }
                />
              </Link>
            </Box>
          );
        })}
      </Nav>
    </Box>
  ) : null;
};

InPageNavigation.propTypes = {
  title: PropTypes.string.isRequired,
};
