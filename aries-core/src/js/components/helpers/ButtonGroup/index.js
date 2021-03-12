/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from 'grommet';

export const ButtonGroup = ({ items }) => (
    <>
      {items &&
        items.map((item, index) => (
          <Button key={index} label={item.label} icon={item.icon} />
        ))}
    </>
  );
