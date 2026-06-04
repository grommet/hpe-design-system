import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, Menu } from 'grommet';
import { More } from '@hpe-design/icons-grommet';
import { ResizeDialog } from './ResizeDialog';

export const CustomizeMenu = ({ item, onResize, resizeOptions, ...rest }) => {
  const [resizeOpen, setResizeOpen] = useState(false);

  return (
    <>
      <Menu
        icon={<More />}
        items={[{ label: 'Resize', onClick: () => setResizeOpen(true) },
        { label: <Box border={{ side: 'bottom' }} /> },
        { label: 'Remove', onClick: () => { } }]}
        {...rest}
      />
      {resizeOpen && <ResizeDialog 
        onSubmit={(value) => {
          onResize(value);
          setResizeOpen(false);
        }}
        onCancel={() => setResizeOpen(false)}
        resizeOptions={resizeOptions}
        defaultValue={item?.size}
      />}
    </>
  );
};

CustomizeMenu.propTypes = {
  onResize: PropTypes.func,
  resizeOptions: PropTypes.arrayOf(PropTypes.string),
  item: PropTypes.shape({
    size: PropTypes.string,
  }),
};
