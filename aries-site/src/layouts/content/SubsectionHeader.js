import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';
import { Link as LinkIcon } from 'grommet-icons';

import { HighlightPhrase } from '../../components';
import { nameToSlug } from '../../utils';
import { ViewContext } from '../../pages/_app';
import { NotificationTag } from './NotificationTag';

export const SubsectionHeader = ({ children, level }) => {
  const [over, setOver] = useState(false);
  const id = nameToSlug(children);
  const { contentHistory, currentPage } = useContext(ViewContext);
  const sectionsSlug = contentHistory[currentPage]?.sections?.map(i =>
    nameToSlug(i),
  );

  return (
    <Box
      direction="row"
      align="center"
      gap="small"
      id={id}
      margin={{ top: level === 3 ? 'medium' : 'large' }}
      onMouseOver={() => setOver(true)}
      onFocus={() => setOver(true)}
      onMouseOut={() => setOver(false)}
      onBlur={() => setOver(false)}
    >
      <Heading margin={{ vertical: 'small' }} level={level}>
        <HighlightPhrase size="inherit">{children}</HighlightPhrase>
      </Heading>
      {contentHistory &&
        currentPage in contentHistory &&
        contentHistory[currentPage]?.update &&
        sectionsSlug?.includes(id) && (
          <Box pad={{ left: 'small' }}>
            <NotificationTag
              size={'small'}
              value="Updated"
              backgroundColor="teal"
              a11yTitle={`There's been updates for ${children}`}
            />
          </Box>
        )}
      <Button
        tip="Copy link to clipboard"
        a11yTitle={`Jump to section titled ${children} 
                    and copy link to clipboard`}
        icon={<LinkIcon color={over ? 'text-xweak' : 'transparent'} />}
        onClick={() => {
          window.location.href = `#${id}`;
          navigator.clipboard.writeText(window.location.href);
        }}
      />
    </Box>
  );
};

SubsectionHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  level: PropTypes.number,
};
