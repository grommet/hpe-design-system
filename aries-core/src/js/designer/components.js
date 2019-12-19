import { Button } from '../components/core/Button';
import { Tile } from '../components/core/Tile';
import { Tiles } from '../components/core/Tiles';

export const components = {
  Button: {
    component: Button,
    name: 'Button',
    container: true,
    properties: {
      label: '',
    },
  },
  Tile: {
    component: Tile,
    name: 'Tile',
    container: true,
    properties: {
      heading: '',
    },
  },
  Tiles: {
    component: Tiles,
    name: 'Tiles',
    container: true,
    properties: {
    },
  },
};
