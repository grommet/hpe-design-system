import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { ButtonGroup } from '../ButtonGroup';
import { FormChildObject } from './FormChildObject';

export const FormChildObjects = ({
  collection,
  fields,
  level,
  onAdd,
  onRemove,
  onRemoveAll,
  primaryKey,
  required,
  summarize,
  values,
}) => (
  <Box gap="small">
    {values?.length ? (
      values.map((obj, index) => (
        <FormChildObject
          key={index}
          collectionName={collection.itemName}
          index={index}
          level={level}
          name={obj.name}
          // keep at least one child when child objects are required by parent
          onRemove={required && values.length <= 1 ? null : onRemove}
          open={obj[primaryKey] === ''}
          summarize={summarize}
          values={obj}
        >
          {Object.entries(obj).map(([key, value]) =>
            fields[key]({ key, value, index }),
          )}
        </FormChildObject>
      ))
    ) : (
      <Text>No {collection.itemName} has been added yet.</Text>
    )}
    <ButtonGroup justify="end">
      {/* keep at least one child when child objects are required by parent */}
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
);

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
  level: PropTypes.number, // Semantic heading level 1-6
  onAdd: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  primaryKey: PropTypes.string,
  required: PropTypes.bool,
  summarize: PropTypes.arrayOf(PropTypes.string),
  values: PropTypes.arrayOf(PropTypes.object).isRequired,
};
