import { Box } from 'grommet';
import { Controls, Map, Marker } from 'grommet-leaflet';

export const MapView = () => {
  const locations = [
    [0, 0],
    [10, -10],
    [-10, -10],
  ];

  return (
    <Box height="medium" width="large" background="background-contrast">
      <Map>
        <Controls locations={locations} />
        {locations.map((location, index) => (
          <Marker key={index} position={location} />
        ))}
      </Map>
    </Box>
  );
};