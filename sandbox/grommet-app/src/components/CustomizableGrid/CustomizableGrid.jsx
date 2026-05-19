import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { OrderableGrid } from '../OrderableGrid/OrderableGrid';
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

const sizeToSpanProps = (size) => {
  const result = {};
  if (typeof size === 'object') {
    if (size.columns) {
      result.gridColumn = `span ${size.columns}`;
    }
    if (size.rows) {
      result.gridRow = `span ${size.rows}`;
    }
  };
  return result;
};
export const CustomizableGrid = ({ data, onOrder, onResize, ...rest }) => {
 
  const handleOrder = (nextChildren) => {
    if (onOrder) {
      const nextData = nextChildren.map(child =>
        data.find(item => item.id === child.props.id),
      );
      onOrder(nextData);
    }
  };

  const renderItem = (item, index) => {
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

    return cloneElement(item.component, {
      id: item.id,
      key: item.id,
      ...onOrderProps,
      ...sizeToSpanProps(item.size),
     });
  };

  return (
    <OrderableGrid onOrder={onOrder ? handleOrder : undefined} {...rest} >
      {data.map((item, index) => renderItem(item, index))}
    </OrderableGrid>
  );
};

CustomizableGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    component: PropTypes.node.isRequired,
    size: PropTypes.shape({
      columns: PropTypes.number,
      rows: PropTypes.number,
    }),
  })).isRequired,
  onOrder: PropTypes.func,
  onResize: PropTypes.func,
};