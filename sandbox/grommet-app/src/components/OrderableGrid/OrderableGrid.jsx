import PropTypes from 'prop-types';
import { Children, useState } from 'react';
import { Grid, Keyboard } from 'grommet';
import styled from 'styled-components';

// display: grid makes the single child fill the wrapper (stretch in both axes)
const StyledDraggableCell = styled.div`
  display: grid;
`;

const reorder = (array, source, target) => {
  const result = array.slice(0);
  const tmp = result[source];
  if (source < target)
    for (let i = source; i < target; i += 1) result[i] = result[i + 1];
  else for (let i = source; i > target; i -= 1) result[i] = result[i - 1];
  result[target] = tmp;
  return result;
};

export const OrderableGrid = ({ children, onOrder, ...rest }) => {
  const [dragging, setDragging] = useState();
  const [orderedChildren, setOrderedChildren] = useState();
  const currentItems = orderedChildren || children;
  
  const renderChild = (child, index) => {

    const move = (count) => {
      const newIndex = index + count;
      onOrder(reorder(
        currentItems,
        index, 
        Math.max(0, Math.min(newIndex, currentItems.length - 1)),
      ));
    };

    const onOrderProps = onOrder ? {
      draggable: true,
      onDragStart: (event) => {
        event.dataTransfer.setData('text/plain', '');
        // allowed per
        // https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#define_the_drag_effect
        event.dataTransfer.effectAllowed = 'move';
        setDragging(index);
      },
      onDragEnd: () => {
        setDragging(undefined);
        setOrderedChildren(undefined);
      },
      onDragEnter: (event) => {
        if (dragging !== undefined && dragging !== index) {
          // Ignore synthetic re-fires caused by entering a child of this element
          if (event.currentTarget.contains(event.relatedTarget)) return;
          event.dataTransfer.dropEffect = 'move';
          setOrderedChildren(reorder(currentItems, dragging, index));
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
        if (orderedChildren) {
          onOrder(orderedChildren);
        }
      },
      tabIndex: 0,
      keyboard: {
        onUp: (event) => {
          event.preventDefault();
          move(-1);
        },
        onDown: (event) => {
          event.preventDefault();
          move(1);
        },
        onLeft: (event) => {
          event.preventDefault();
          move(-1);
        },
        onRight: (event) => {
          event.preventDefault();
          move(1);
        },
      },
    } : {};

    const { keyboard, ...wrapperProps } = onOrderProps;
 
    const sizeStyles = {};

    let content = child;
    if (onOrder || sizeStyles) {
      content = (
        <StyledDraggableCell {...wrapperProps} style={{ ...sizeStyles }}>
          {child}
        </StyledDraggableCell>
      );
    }

    return keyboard ? (
      <Keyboard key={index} {...keyboard}>
        {content}
      </Keyboard>
    ) : content;
  };

  return (
    <Grid {...rest}>
      {Children.map(currentItems, (child, index) => renderChild(child, index))}
    </Grid>
  );
};

OrderableGrid.propTypes = {
  children: PropTypes.node,
  onOrder: PropTypes.func,
};