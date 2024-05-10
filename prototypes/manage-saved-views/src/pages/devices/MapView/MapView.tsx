import { useContext, useRef } from 'react';
import { Box, DataContext } from 'grommet';
import {
  Controls,
  Map,
  Marker,
  MarkerCluster
} from 'grommet-leaflet';
import { hpeMap } from '../../../themes/hpeMap';
import '../../../themes/grommet-leaflet-reset.css';

export const MapView = () => {
  const containerRef = useRef();
  const mapContainerRef = useRef();
  const { data } = useContext(DataContext);
  console.log(data);

  const devicesWithLocation = data.filter(
    device => device.geo.location.coordinates[0] !== null,
  );

  const locations = devicesWithLocation.map(
    device => device.geo.location.coordinates,
  );

  return (
    <Box
      ref={containerRef}
      flex="grow"
      background="background-contrast"
      height="medium"
      // height={{ min: 'medium' }}
      round="small"
      overflow="hidden"
    >
      <Map
        id="map"
        ref={mapContainerRef}
        theme={hpeMap}
      >
        <Controls locations={locations} />
        <MarkerCluster>
          {devicesWithLocation.map((device) => (
            <Marker key={device.serial_number} position={device.geo.location.coordinates} />
          ))}
        </MarkerCluster>
      </Map>
    </Box>
  );
};