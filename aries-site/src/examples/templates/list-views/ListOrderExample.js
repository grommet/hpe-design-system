import React, { useState } from 'react';
import { Box, Button, Heading, List } from 'grommet';
import { ContentPane } from '../../../layouts';

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
    <ContentPane role="application">
      <Box gap='xsmall' width='xlarge'>
        <Box direction="row" justify="between">
          <Heading level={2} margin="none">
            Favorite movies
          </Heading>
          <Button
            label={allowReorder ? 'Done' : 'Reorder items'}
            secondary
            alignSelf="end"
            onClick={() => setAllowReorder(!allowReorder)}
          />
        </Box>
        <List
          aria-label="Favorite movies"
          defaultItemProps={{
            align: 'start',
          }}
          data={ordered}
          onOrder={allowReorder ? setOrder : undefined}
          primaryKey="title"
          secondaryKey="genre"
        />
      </Box>
    </ContentPane>
  );
};
