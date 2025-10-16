import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Button, NameValueList, NameValuePair } from 'grommet';
import { Down, Up } from '@hpe-design/icons-grommet';
import { contentTruncationData } from '../data';

export const NameValueListReadMoreExample = () => {
  // HPE Design System guidance for string length prior to truncation.
  const MAX_STRING_LENGTH = 192;
  // HPE Design System guidance for list length prior to truncation.
  const MAX_LIST_LENGTH = 6;
  // HPE Design System guidance for list display length when truncated.
  const TRUNC_LIST_LENGTH = 3;
  const [showAllServices, setShowAllServices] = useState(false);
  const [showAllSources, setShowAllSources] = useState(false);

  const dataSources = contentTruncationData.services
    .map(service => ` ${service.name}`)
    .toString();

  return (
    <Box pad="xsmall">
      <NameValueList
        nameProps={{ width: ['3xsmall', 'xsmall'] }}
        valueProps={{ width: ['auto', 'medium'] }}
      >
        <NameValuePair name="State">
          {contentTruncationData.state}
        </NameValuePair>
        <NameValuePair name="Data sources">
          {dataSources.length <= MAX_STRING_LENGTH ? (
            dataSources
          ) : (
            <>
              {!showAllSources
                ? `${dataSources.substring(0, MAX_STRING_LENGTH)} ...`
                : dataSources}
              <TruncateButton
                showAll={showAllSources}
                setShowAll={setShowAllSources}
              />
            </>
          )}
        </NameValuePair>
        <NameValuePair name="Services">
          <>
            {contentTruncationData.services
              .sort((a, b) => {
                let result = 0;
                if (a.name > b.name) {
                  result = 1;
                } else if (a.name < b.name) {
                  result = -1;
                }
                return result;
              })
              .slice(
                0,
                showAllServices ||
                  contentTruncationData.services.length < MAX_LIST_LENGTH
                  ? contentTruncationData.services.length
                  : TRUNC_LIST_LENGTH,
              )
              .map(service => (
                <Anchor
                  key={service.name}
                  onClick={() => {
                    // eslint-disable-next-line no-alert
                    alert(
                      `Alert for demonstration purposes. Typically this would 
route the user to a detailed view of the service.`,
                    );
                  }}
                >
                  {service.name}
                </Anchor>
              ))}
            {contentTruncationData.services.length >= MAX_LIST_LENGTH && (
              <TruncateButton
                showAll={showAllServices}
                setShowAll={setShowAllServices}
              />
            )}
          </>
        </NameValuePair>
      </NameValueList>
    </Box>
  );
};

const TruncateButton = ({ showAll, setShowAll }) => (
  <Button
    alignSelf="start"
    size="small"
    label={`Show ${!showAll ? 'all' : 'less'}`}
    onClick={() => setShowAll(!showAll)}
    icon={!showAll ? <Down /> : <Up />}
    reverse
  />
);

TruncateButton.propTypes = {
  showAll: PropTypes.bool,
  setShowAll: PropTypes.func,
};
