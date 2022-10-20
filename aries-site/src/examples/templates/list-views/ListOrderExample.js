import React, { useState } from 'react';

import { Box, Button, Heading, List } from 'grommet';

const movies = [
  { title: 'Ponyo', genre: 'Fantasy/Adventure' },
  { title: 'Spritied Away', genre: 'Family/Fantasy' },
  { title: 'Grave of the Fireflies', genre: 'Fantasy/Adventure' },
  { title: "Wayne's World", genre: 'Comedy/Music' },
  { title: 'Detroit Rock City', genre: 'Comedy/Music' },
  { title: 'Home Alone 2', genre: 'Comedy/Family' },
  { title: 'The Lion King', genre: 'Family/Musical' },
  { title: 'Mulan', genre: 'Action/Adventure' },
  { title: 'Inside Out', genre: 'Comedy/Family' },
];

export const ListOrderExample = () => {
  const [ordered, setOrder] = useState(movies);
  const [allowReorder, setAllowReorder] = useState(true);

  return (
    <Box
      align="center"
      background="background-front"
      pad="large"
      role="application"
    >
      <Box gap="small" width="large">
        <Heading level={2} size="small" margin="none">
          Favorite Movies
        </Heading>
        <Box direction="row" justify="end">
          <Button
            label={allowReorder ? 'Done' : 'Reorder items'}
            primary
            onClick={() => setAllowReorder(!allowReorder)}
          />
        </Box>
        <List
          defaultItemProps={{
            align: 'start',
          }}
          data={ordered}
          onOrder={allowReorder ? setOrder : undefined}
          primaryKey="title"
          secondaryKey="genre"
        />
      </Box>
    </Box>
  );
};
