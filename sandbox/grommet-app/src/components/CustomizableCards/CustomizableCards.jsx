import propTypes from 'prop-types';
import { cloneElement } from 'react';

//import { OrderableCards } from '../OrderableCards/OrderableCards';
import { Cards } from 'grommet';
import { CustomizeMenu } from './CustomizeMenu';
import { DragControl } from './DragControl';

const sizeToSpan = {
  '1x1': { columns: 1, rows: 1 },
  '1x2': { columns: 1, rows: 2 },
  '1x3': { columns: 1, rows: 3 },
  '2x1': { columns: 2, rows: 1 },
  '2x2': { columns: 2, rows: 2 },
  '2x3': { columns: 2, rows: 3 },
  '3x1': { columns: 3, rows: 1 },
  '3x2': { columns: 3, rows: 2 },
  '3x3': { columns: 3, rows: 3 },
};
const resizeOptions = Object.keys(sizeToSpan);

export const CustomizableCards = ({ data, onOrder, onResize, ...rest }) => {
 
  return (
    <Cards data={data} onOrder={onOrder} sizeKey="size"{...rest}>
      {(item, index ) => { 
        const onOrderProps = onOrder ? {
          controls: [
            <DragControl
              key={`move-${item.id || index}`}
              a11yTitle={`Move ${item.id || index}`}
            />,
            <CustomizeMenu
              key={`menu-${item.id || index}`}
              item={item}
              onResize={(newSize) => {
                if (onResize) {
                  onResize(item.id, sizeToSpan[newSize.size]);
                }
              }}
              resizeOptions={resizeOptions}
            />,
          ],
        } : {};

        return cloneElement(item.component, { id: item.id, key: item.id, ...onOrderProps });
      }}
    </Cards>
  );
};

CustomizableCards.propTypes = {
  data: propTypes.arrayOf(propTypes.shape({
    id: propTypes.string.isRequired,
    size: propTypes.shape({
      columns: propTypes.number,
      rows: propTypes.number,
    }),
    component: propTypes.node.isRequired,
  })).isRequired,
  onOrder: propTypes.func,
  onResize: propTypes.func,
};