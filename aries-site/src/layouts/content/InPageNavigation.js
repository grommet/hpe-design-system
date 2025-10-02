import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
import { ThemeContext } from 'styled-components';
import { StatusGoodSmall } from 'grommet-icons';
import { nameToSlug } from '../../utils';
import { ViewContext } from '../../pages/_app';

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

export const InPageNavigation = ({ headings, title }) => {
  const theme = useContext(ThemeContext);

  let { xlarge, medium } = theme.global.edgeSize;
  xlarge = parseInt(xlarge.replace('px', ''), 10); // 48
  medium = parseInt(medium.replace('px', ''), 10); // 24

  // top and bottom margin values to calculate intersection window
  const topMargin = xlarge;
  const bottomMargin = `-${2 * xlarge}`;
  const activeId = useActiveHeadingId(headings, {
    rootMargin: `${topMargin}% 0% ${bottomMargin}% 0%`,
  });

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
            <Box pad={{ left: subsectionPad, right: '5xsmall' }}>
              <Link
                key={index}
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
                        <StatusGoodSmall
                          a11yTitle="Section has been updated"
                          size="10px"
                          color="teal"
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
