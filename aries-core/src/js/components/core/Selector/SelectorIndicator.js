import React, { useContext } from 'react';
import { CheckBox, RadioButton } from 'grommet';
import { SelectorGroupContext } from './SelectorGroup';

const SelectorIndicator = () => {
  const { multiple } = useContext(SelectorGroupContext);

  return (
    <>
      {/* TO DO ability to hide when not selected */}
      {multiple ? (
        <CheckBox pad="none" tabIndex={-1} />
      ) : (
        // TO DO how to overcome pad from extend in single selection?
        <RadioButton pad="none" tabIndex={-1} />
      )}
    </>
  );
};

export { SelectorIndicator };
