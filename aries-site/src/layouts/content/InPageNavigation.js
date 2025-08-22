import { useState, useRef, useEffect, useContext } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Box, Button, Nav, Text } from 'grommet';
import {
  // styled,
  ThemeContext,
} from 'styled-components';
// import { StatusGoodSmall } from 'grommet-icons';
import { nameToSlug } from '../../utils';
import { ViewContext } from '../../pages/_app';

// const SectionButton = styled(Button)`
//   border-radius: 0 ${props => props.theme.global.edgeSize.xsmall}
//     ${props => props.theme.global.edgeSize.xsmall} 0;
// `;

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

  const {
    // pageUpdateReady,
    contentHistory,
  } = useContext(ViewContext);

  return (
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
        gap="small"
      >
        <Text color="text" size="small">
          On this page
        </Text>
        <Text size="large" style={{ fontWeight: 500 }}>
          {title}
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

          let subsectionPad;
          if (level.length > 3) subsectionPad = 'medium';
          else if (level.length === 3) subsectionPad = 'small';

          let sectionList;
          // let showUpdate = false;

          if (
            contentHistory &&
            title in contentHistory &&
            contentHistory[title].update &&
            contentHistory[title].sections[0].length > 0
          ) {
            sectionList = contentHistory[title].sections;
            Object.values(sectionList).forEach(val => {
              if (val.toLowerCase() === headingTitle.toLowerCase()) {
                // showUpdate = true;
              }
            });
          }

          return (
            <Link
              key={index}
              href={`#${nameToSlug(headingTitle)}`}
              passHref
              legacyBehavior
            >
              <Button
                label={headingTitle}
                active={active}
                size="small"
                align="start"
                margin={{ left: subsectionPad }}
              />
              {/* <SectionButton theme={theme} hoverIndicator>
                <Box border={borderLeft}>
                  <Box
                    pad={{
                      left: subsectionPad,
                      vertical: theme.button.size.small.pad.vertical,
                      right: theme.button.size.small.pad.horizontal,
                    }}
                    margin={
                      active
                        ? undefined
                        : { left: theme.global.borderSize.small }
                    }
                    direction="row"
                    align="top"
                    gap="small"
                  >
                    <Text color="text-strong" size="small" weight="normal">
                      {headingTitle}
                    </Text>
                    {showUpdate && pageUpdateReady && (
                      <Box background={{ dark: true }} justify="top">
                        <StatusGoodSmall
                          a11yTitle="Section has been updated"
                          size="10px"
                          color="teal"
                          height="small"
                        />
                      </Box>
                    )}
                  </Box>
                </Box>
              </SectionButton> */}
            </Link>
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
