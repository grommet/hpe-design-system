import React, { useState } from 'react';
import { Box, Button, Text } from 'grommet';
import { Bookmark } from '@hpe-design/icons-grommet';

export const ButtonTogglingStatesExample = () => {
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <Box align="center" justify="center" gap="small" pad="large">
      <Button
        a11yTitle={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
        icon={<Bookmark />}
        active={bookmarked}
        onClick={() => setBookmarked(prev => !prev)}
        tip={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      />
      <Text size="small" color="text-weak">
        {bookmarked ? 'Bookmarked' : 'Not bookmarked'}
      </Text>
    </Box>
  );
};
