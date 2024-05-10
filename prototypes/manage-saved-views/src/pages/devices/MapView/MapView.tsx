import { useEffect, useRef, useState } from 'react';
import { Box } from 'grommet';
import {
  Controls,
  Map,
  Marker,
  MarkerCluster
} from 'grommet-leaflet';
import { hpeMap } from '../../../themes/hpeMap';

export const MapView = () => {
  const containerRef = useRef();
  const mapContainerRef = useRef();

  const locations = [
    [0, 0],
    [10, -10],
    [-10, -10],
  ];

  return (
    <Box
      ref={containerRef}
      flex="grow"
      background="background-contrast"
      height="medium"
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
          {locations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}
        </MarkerCluster>
      </Map>
    </Box>
  );
};