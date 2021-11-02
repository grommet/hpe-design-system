import React, { useState } from 'react';
import { Box, Button, NameValueList, NameValuePair } from 'grommet';
import { contentTruncationData } from '../data';

export const NameValueListReadMoreExample = () => {
  const MAX_LENGTH = 192;
  const [showAll, setShowAll] = useState(false);

  const showMore = () => setShowAll(true);
  const showLess = () => setShowAll(false);
  return (
    <Box pad="small">
      <NameValueList>
        {Object.entries(contentTruncationData).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value.length <= MAX_LENGTH && <>{value}</>}
            {value.length > MAX_LENGTH && showAll && (
              <>
                {value}
                <Button
                  alignSelf="start"
                  size="small"
                  label="Read less"
                  onClick={showLess}
                />
              </>
            )}
            {value.length > MAX_LENGTH && !showAll && (
              <>
                {`${value.substring(0, MAX_LENGTH)}...`}
                <Button
                  size="small"
                  label="Read more"
                  onClick={showMore}
                  alignSelf="start"
                />
              </>
            )}
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
};
