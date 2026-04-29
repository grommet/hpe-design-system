import PropTypes from 'prop-types';
import { cloneElement, useState } from 'react';
import { Grid } from 'grommet';
import { CustomizeMenu } from './CustomizeMenu';
import { DragControl } from './DragControl';

const reorder = (array, source, target) => {
  const result = array.slice(0);
  const tmp = result[source];
  if (source < target)
    for (let i = source; i < target; i += 1) result[i] = result[i + 1];
  else for (let i = source; i > target; i -= 1) result[i] = result[i - 1];
  result[target] = tmp;
  return result;
};

export const CustomizableGrid = ({ data, onOrder, onResize: onResizeProp, resizeOptions, ...rest }) => {
  const [dragging, setDragging] = useState();
  const [orderingData, setOrderingData] = useState();

  const currentItems = orderingData || data;

  // console.log('dragging', dragging);

  const renderItem = (item, index) => {

    const move = (count) => {
      const newIndex = index + count;
      onOrder(reorder(
        currentItems,
        index, 
        Math.max(0, Math.min(newIndex, currentItems.length - 1)),
      ));
    };

    const onResize = (newSize) => {
      if (onResizeProp) {
        onResizeProp(item.id, newSize);
      }
    };

    const onOrderProps = onOrder ? {
      draggable: true,
      onDragStart: (event) => {
        // console.log('start', item.id, index);
        event.dataTransfer.setData('text/plain', '');
        // allowed per
        // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
        event.dataTransfer.effectAllowed = 'move';
        setDragging(index);
        // updateFocused(undefined);
      },
      onDragEnd: () => {
        setDragging(undefined);
        setOrderingData(undefined);
      },
      onDragEnter: (event) => {
        // console.log('enter', item.id, index);
        if (dragging !== undefined && dragging !== index) {
          // Ignore synthetic re-fires caused by entering a child of this element
          if (event.currentTarget.contains(event.relatedTarget)) return;
          event.dataTransfer.dropEffect = 'move';
          setOrderingData(reorder(currentItems, dragging, index));
          setDragging(index);
        }
      },
      onDragOver: (event) => {
        if (dragging !== undefined) {
          // preventDefault is required to allow the drop to occur
          event.preventDefault();
        }
      },
      onDrop: () => {
        if (orderingData) {
          onOrder(orderingData);
        }
      },
      controls: [
        <DragControl
          key={`move-${item.id || index}`}
          a11yTitle={`Move ${item.id || index}`}
          onUp={(event) => {
            console.log('up', index);
            event.preventDefault();
            move(-1);
          }}
          onDown={(event) => {
            console.log('down', index);
            event.preventDefault();
            move(1);
          }}
          onLeft={(event) => {
            console.log('left', index);
            event.preventDefault();
            move(-1);
          }}
          onRight={(event) => {
            console.log('right', index);
            event.preventDefault();
            move(1);
          }}
        />,
        <CustomizeMenu
          key={`menu-${item.id || index}`}
          item={item}
          onResize={onResize}
          resizeOptions={resizeOptions}
        />,
      ],
    } : {};


    console.log('rendering', item.id, onOrderProps, item.size);
    return cloneElement(item.component, {
      key: item.id || index,
      ...onOrderProps,
      style: item.sizeProps || {},
    });
  };

  return (
    <Grid {...rest}>
      {currentItems.map((item, index) => renderItem(item, index))}
    </Grid>
  );
};

CustomizableGrid.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    component: PropTypes.node.isRequired,
  })).isRequired,
  onOrder: PropTypes.func,
  onResize: PropTypes.func,
  resizeOptions: PropTypes.arrayOf(PropTypes.string),
};