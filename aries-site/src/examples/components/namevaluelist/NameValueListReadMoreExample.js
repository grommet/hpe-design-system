import React, { useState } from 'react';
import { Box, Button, NameValueList, NameValuePair } from 'grommet';
import { contentTruncationData } from './data';

export const NameValueListReadMoreExample = () => {
  const MAX_LENGTH = 140;
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
              <Box direction="row">
                {value}
                <Button label="Read less" onClick={showLess} />
              </Box>
            )}
            {value.length > MAX_LENGTH && !showAll && (
              <>
                {`${value.substring(0, MAX_LENGTH)}...`}
                <Button label="Read more" onClick={showMore} />
              </>
            )}
          </NameValuePair>
        ))}
      </NameValueList>
    </Box>
  );
};
