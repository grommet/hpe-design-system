import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ResponsiveContext } from 'grommet';
import { AnchorUndecorated } from './AnchorUndecorated';

export const AnchorGroup = ({ direction, items }) => {
  const size = useContext(ResponsiveContext);

  return (
    <>
      {items &&
        items.map((item, index) => {
          return (
            <AnchorUndecorated
              index={index}
              key={index}
              // On desktop, allow final nav item to be completely
              // right justified
              margin={{
                vertical: 'small',
                left:
                  direction !== 'vertical' && size !== 'small'
                    ? 'small'
                    : undefined,
                right:
                  direction !== 'vertical' &&
                  index !== items.length - 1 &&
                  size !== 'small'
                    ? 'small'
                    : undefined,
              }}
              {...item}
            />
          );
        })}
    </>
  );
};

AnchorGroup.propTypes = {
  activePath: PropTypes.string,
  defaultActiveItem: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  direction: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
  level: PropTypes.number,
};

AnchorGroup.defaultProps = {
  activePath: undefined,
  defaultActiveItem: undefined,
  direction: 'horizontal',
  level: 1,
};
