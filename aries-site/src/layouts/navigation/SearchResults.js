import { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Box, Button, List, Paragraph, Text } from 'grommet';
import { FormClose } from 'grommet-icons';

import { internalLink } from '../../components';
import { nameToPath } from '../../utils';
import { HighlightPhrase, SearchInput } from '.';

export const SearchResults = forwardRef(
  (
    {
      allSuggestions,
      onClose,
      query: queryProp,
      results,
      setSuggestions,
      ...rest
    },
    inputRef,
  ) => {
    const router = useRouter();
    const [query, setQuery] = useState(queryProp);
    // const [results, setResults] = useState(resultsProp);
    const [focused, setFocused] = useState(true);

    useEffect(() => {
      if (focused && inputRef.current) {
        inputRef.current.focus();
      }
    }, [focused, inputRef]);

    const onChange = event => {
      const {
        target: { value: nextValue },
      } = event;
      let nextSuggestions;
      if (nextValue) {
        const regexp = new RegExp(nextValue, 'i');
        nextSuggestions = allSuggestions.filter(
          c => regexp.test(c.label) || regexp.test(c.value.tags),
        );
      } else {
        nextSuggestions = allSuggestions;
      }

      setSuggestions(nextSuggestions);
      setQuery(nextValue);
      // setValue(nextValue);
    };

    const onSelect = event => {
      const href = nameToPath(event.item.page.label);
      onClose();
      if (internalLink.test(href)) {
        router.push(href);
        setFocused(false);
      } else {
        // external links should open in a new tab
        window.open(href);
      }
    };

    return (
      <Box
        background="background-front"
        round="small"
        pad={{ horizontal: 'medium', top: 'small', bottom: 'large' }}
        gap="medium"
        width="large"
        height="large"
        {...rest}
      >
        <Button icon={<FormClose />} onClick={onClose} alignSelf="end" />
        <Box background="background-contrast" flex={false} round="xsmall">
          <SearchInput
            ref={inputRef}
            placeholder="Search the HPE Design System"
            value={query}
            onChange={onChange}
            size="xlarge"
          />
        </Box>
        <Box overflow="auto" pad="xsmall">
          <List
            data={results}
            onClickItem={onSelect}
            border="bottom"
            round
            paginate
            step={4}
          >
            {datum => (
              <Box gap="xsmall">
                <>
                  <Text size="large" color="text-strong">
                    <HighlightPhrase
                      phrase={query}
                      size="large"
                      color="text-strong"
                    >
                      {datum.title}
                    </HighlightPhrase>
                  </Text>
                  <Text size="small" weight={100}>
                    <HighlightPhrase phrase={query} size="small" weight={100}>
                      {datum.url}
                    </HighlightPhrase>
                  </Text>
                </>

                {datum.preview && (
                  <Paragraph margin="none" fill>
                    <HighlightPhrase phrase={query}>
                      {datum.preview}
                    </HighlightPhrase>
                  </Paragraph>
                )}
                <Paragraph margin="none" size="small" weight={100}>
                  {datum.page.value.tags && 'tags: '}
                  {datum.page.value.tags &&
                    datum.page.value.tags.map(tag => (
                      <>
                        <HighlightPhrase
                          phrase={query}
                          size="small"
                          weight={100}
                        >
                          {tag}
                        </HighlightPhrase>
                        ,{' '}
                      </>
                    ))}
                </Paragraph>
              </Box>
            )}
          </List>
        </Box>
      </Box>
    );
  },
);

SearchResults.propTypes = {
  allSuggestions: PropTypes.array,
  onClose: PropTypes.func,
  query: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      query: PropTypes.string,
      matchedText: PropTypes.string,
      matchType: PropTypes.string,
      url: PropTypes.string,
      preview: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),
    }),
  ),
  setSuggestions: PropTypes.func,
};
