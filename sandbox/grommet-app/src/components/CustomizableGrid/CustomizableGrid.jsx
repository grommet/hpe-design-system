import PropTypes from 'prop-types';
import { cloneElement } from 'react';
import { OrderableGrid } from '../OrderableGrid/OrderableGrid';
import { CustomizeMenu } from './CustomizeMenu';
import { DragControl } from './DragControl';

const sizeToSpan = {
  '1x1': { gridColumn: 'span 1', gridRow: 'span 1' },
  '1x2': { gridColumn: 'span 1', gridRow: 'span 2' },
  '1x3': { gridColumn: 'span 1', gridRow: 'span 3' },
  '2x1': { gridColumn: 'span 2', gridRow: 'span 1' },
  '2x2': { gridColumn: 'span 2', gridRow: 'span 2' },
  '2x3': { gridColumn: 'span 2', gridRow: 'span 3' },
  '3x1': { gridColumn: 'span 3', gridRow: 'span 1' },
  '3x2': { gridColumn: 'span 3', gridRow: 'span 2' },
  '3x3': { gridColumn: 'span 3', gridRow: 'span 3' },
};
const resizeOptions = Object.keys(sizeToSpan);

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
              onResize(item.id, newSize);
            }
          }}
          resizeOptions={resizeOptions}
        />,
      ],
    } : {};

    return cloneElement(item.component, { id: item.id, key: item.id, ...onOrderProps });
  };

  const itemStyles = data.map(item => sizeToSpan[item.size] || {});

  return (
    <OrderableGrid itemStyles={itemStyles} onOrder={onOrder ? handleOrder : undefined} {...rest} >
      {data.map((item, index) => renderItem(item, index))}
    </OrderableGrid>
  );
};

CustomizableGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    component: PropTypes.node.isRequired,
    size: PropTypes.string,
  })).isRequired,
  onOrder: PropTypes.func,
  onResize: PropTypes.func,
};