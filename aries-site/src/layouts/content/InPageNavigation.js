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

  // top and bottom margin values to calculate intersection window
  const topMargin = '50';
  const bottomMargin = '-95';
  const activeId = useActiveHeadingId(headings, {
    rootMargin: `${topMargin}% 0% ${bottomMargin}% 0%`,
  });

  return headings.length > 0 ? (
    <Box
      pad={{ horizontal: 'xsmall' }} // pad for keyboard focus
      style={{
        height: 'calc(100vh - 50px)',
        overflowY: 'auto',
        position: 'sticky',
        marginTop: '123px', // align "Jump to section" with page title at start
        flexShrink: 0,
        top: '30px',
      }}
      width="small"
      flex={false}
    >
      <Box pad="small" flex={false}>
        <Text color="text-strong" weight="bold">
          Jump to section
        </Text>
      </Box>

      <Nav gap="none" a11yTitle="Table of Contents Heading">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          const [level] = heading[0].match(levelRegexp);
          // heading[1] refers to the full heading title matched by regex
          const headingTitle = heading[1];
          const active = activeId === nameToSlug(headingTitle);

          const borderStyle = {
            side: 'left',
            size: active ? 'medium' : 'small',
            color: active ? 'border-strong' : 'border-weak',
          };

          let subsectionPad;
          if (level.length > 3) subsectionPad = 'medium';
          else if (level.length === 3) subsectionPad = 'small';
          return (
            <Box border={borderStyle}>
              <Link key={index} href={`#${nameToSlug(headingTitle)}`} passHref>
                <Button
                  style={{ textAlign: 'start' }}
                  size="small"
                  kind="option"
                  label={
                    <Box
                      pad={{ left: subsectionPad }}
                      // margin={active ? undefined : { left: '2px' }}
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
