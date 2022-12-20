import { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { ButtonGroup } from '../ButtonGroup';
import { FormChildObject } from './FormChildObject';

export const FormChildObjectsContext = createContext({});

export const FormChildObjects = ({
  collection,
  fields,
  headingLevel,
  onAdd,
  onRemove,
  onRemoveAll,
  required,
  summarize,
  values,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(Math.max(values.length - 1, 0));
  }, [values.length]);

  const contextValue = useMemo(
    () => ({ activeIndex, setActiveIndex }),
    [activeIndex],
  );

  return (
    <FormChildObjectsContext.Provider value={contextValue}>
      <Box>
        {values?.length
          ? values.map((obj, index) => (
              <FormChildObject
                key={index}
                collectionName={collection.itemName}
                index={index}
                headingLevel={headingLevel}
                name={obj.name}
                // keep at least one child when child objects are
                // required by parent
                onRemove={required && values.length <= 1 ? null : onRemove}
                open={activeIndex === index}
                summarize={summarize}
                values={obj}
              >
                {Object.entries(obj).map(([key, value]) =>
                  fields[key]({ key, value, index }),
                )}
              </FormChildObject>
            ))
          : null}
        <ButtonGroup
          justify="end"
          border={{ side: 'top', color: 'border-weak' }}
          pad={{ top: 'small' }}
        >
          {/* keep at least one child when child 
        objects are required by parent */}
          {values?.length >= 2 && !required && (
            <Button
              label="Remove all"
              // Move into messages map
              aria-label={`Remove all ${collection.name}`}
              onClick={onRemoveAll}
            />
          )}
          <Button
            // Move into messages map
            label={`Add ${collection.itemName}`}
            // Move into messages map
            a11yTitle={`Add ${collection.itemName} to ${collection.parentName}`}
            secondary
            onClick={onAdd}
          />
        </ButtonGroup>
      </Box>
    </FormChildObjectsContext.Provider>
  );
};

FormChildObjects.propTypes = {
  collection: PropTypes.shape({
    // Name of the collection of objects e.g. "servers"
    name: PropTypes.string.isRequired,
    // Name of a single object e.g. "server"
    itemName: PropTypes.string.isRequired,
    // Name of parent object e.g. "group", "cluster"
    parentName: PropTypes.string,
  }).isRequired,
  fields: PropTypes.objectOf(PropTypes.func).isRequired,
  headingLevel: PropTypes.number, // Semantic heading headingLevel 1-6
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  required: PropTypes.bool,
  summarize: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};
