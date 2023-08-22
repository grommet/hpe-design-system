import PropTypes from 'prop-types';
import { Box, Paragraph, Text, Tag } from 'grommet';

import { getPageDetails } from '../../utils';
import { HighlightPhrase } from '../../components';

import pageVisitTracker from '../../utils/pageVisitTracker';
import { NotificationTag } from '../content/NotificationTag';

export const SearchResult = ({ query, result }) => {
  const hub = result.url && result.url.split('/')[1];
  const parent = getPageDetails(hub);

  const history = JSON.parse(window.localStorage.getItem('update-history'));
  let newUpdate, changeKind;
  if (result.title in history) {
    newUpdate = pageVisitTracker(result.title);
    changeKind = history[result.title].changeKind;
  } else {
    newUpdate = false;
  }

  return (
    <Box gap="xsmall" pad={{ vertical: 'xxsmall' }} width="large">
      <>
        {parent && (
          <Box align="center" direction="row" gap="xsmall">
            {parent.icon && parent.icon('8px', parent.color)}
            <Text size="small">
              {result.name === result.title ? parent.name : result.name}
            </Text>
          </Box>
        )}
        {result.title && (
          <Box direction="row" gap="medium" align="center">
            <Text size="large" color="text-strong">
              <HighlightPhrase phrase={query} fade={false} size="large">
                {result.title}
              </HighlightPhrase>
            </Text>
            {newUpdate && changeKind === 'New' && (
              <NotificationTag
                size="xsmall"
                color="purple"
                value="New!"
                a11yTitle={`There's a new item called ${result.title}`}
              />
            )}
            {newUpdate && changeKind === 'Update' && (
              <NotificationTag
                size="xsmall"
                color="teal"
                value="Updated"
                a11yTitle={`There's been updates for ${result.title}`}
              />
            )}
          </Box>
        )}
      </>
      {result.matches?.length > 0 ? (
        <Paragraph margin="none" fill>
          <HighlightPhrase phrase={query} fade={false}>
            {result.matches[0].preview}
          </HighlightPhrase>
        </Paragraph>
      ) : (
        result.description && (
          <Paragraph margin="none" fill>
            <HighlightPhrase phrase={query} fade={false}>
              {result.description}
            </HighlightPhrase>
          </Paragraph>
        )
      )}
    </Box>
  );
};

SearchResult.propTypes = {
  query: PropTypes.string,
  result: PropTypes.object,
};
