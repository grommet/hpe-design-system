import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { StatusGood } from '@hpe-design/icons-grommet';
import { nameToSlug } from '../../utils';
import { ViewContext } from '../../pages/_app';

const useActiveHeadingId = (headings, offset = 0) => {
  const [activeHeadingId, setActiveHeadingId] = useState();

  useEffect(() => {
    // Main is the scroll container within the Grid layout
    const scrollContainer = document.querySelector('main');
    if (!scrollContainer) return undefined;

    const handleScroll = () => {
      if (scrollContainer.scrollTop === 0) {
        setActiveHeadingId(null);
        return;
      }
      // Find the last heading that has scrolled past the top of main.
      // Measure relative to the scroll container, not the viewport,
      // since main starts below the header in the grid layout.
      const containerTop = scrollContainer.getBoundingClientRect().top;
      let currentId = null;
      for (let i = 0; i < headings.length; i += 1) {
        const id = nameToSlug(headings[i][1]);
        const el = document.getElementById(id);
        if (el) {
          const relativeTop = el.getBoundingClientRect().top - containerTop;
          if (relativeTop <= offset) {
            currentId = id;
          }
        }
      }
      setActiveHeadingId(currentId);
    };

    scrollContainer.addEventListener(
      'scroll', handleScroll,
    );
    handleScroll();

    return () => {
      scrollContainer.removeEventListener(
        'scroll', handleScroll,
      );
    };
  }, [headings, offset]);

  return activeHeadingId;
};

export const InPageNavigation = ({ headings, title }) => {
  const theme = useContext(ThemeContext);

  let { xlarge, medium } = theme.global.edgeSize;
  xlarge = parseInt(xlarge.replace('px', ''), 10); // 48
  medium = parseInt(medium.replace('px', ''), 10); // 24

  // offset derived from theme tokens (header + content padding)
  const activeId = useActiveHeadingId(headings, xlarge + medium);

  // align "Jump to section" with page title at start
  const marginTop = `${xlarge + medium}px`;

  const { pageUpdateReady, contentHistory } = useContext(ViewContext);

  return (
    <Box
      pad={{ horizontal: '5xsmall' }} // pad for keyboard focus
      style={{
        // determine when TOC scroll is needed
        height: `calc(100vh - ${marginTop})`,
        overflowY: 'auto',
        position: 'sticky',
        marginTop,
        top: theme.global.edgeSize.xlarge,
      }}
      width="xsmall"
      flex={false}
    >
      <Box
        pad={{ horizontal: 'xsmall', bottom: 'xsmall' }}
        flex={false}
        border={{ side: 'left', color: 'transparent', size: 'small' }}
      >
        <Text
          color="text-strong"
          // align with button labels
          margin={{ left: theme.button.size.small.default.pad.horizontal }}
        >
          On this page
        </Text>
      </Box>
      <Nav gap="none" a11yTitle="Jump to section">
        {headings.map((heading, index) => {
          const levelRegexp = new RegExp(/^(#)+/);
          // remove space from in front of #s
          const [level] = heading[0].substring(1).match(levelRegexp);
          // heading[1] refers to the full heading title matched by regex
          const headingTitle = heading[1];
          const active = activeId === nameToSlug(headingTitle);

          let subsectionPad = 'xsmall';
          if (level.length > 3) subsectionPad = 'xlarge';
          else if (level.length === 3) subsectionPad = 'medium';

          let sectionList;
          let showUpdate = false;

          if (
            contentHistory &&
            title in contentHistory &&
            contentHistory[title].update &&
            contentHistory[title].sections[0].length > 0
          ) {
            sectionList = contentHistory[title].sections;
            Object.values(sectionList).forEach(val => {
              if (val.toLowerCase() === headingTitle.toLowerCase()) {
                showUpdate = true;
              }
            });
          }

          return (
            <Box
              key={index}
              pad={{
                left: subsectionPad,
                right: '5xsmall',
              }}
            >
              <Link
                href={`#${nameToSlug(headingTitle)}`}
                passHref
                legacyBehavior
              >
                <Button
                  active={active}
                  justify="start"
                  align="start"
                  label={headingTitle}
                  size="small"
                  icon={
                    showUpdate && pageUpdateReady ? (
                      <Box background={{ dark: true }} justify="top">
                        <StatusGood
                          a11yTitle="Section has been updated"
                          size="10px"
                          color="decorative-cyan"
                          height="small"
                        />
                      </Box>
                    ) : undefined
                  }
                />
              </Link>
            </Box>
          );
        })}
      </Nav>
    </Box>
  );
};

InPageNavigation.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.array),
  title: PropTypes.string,
};
